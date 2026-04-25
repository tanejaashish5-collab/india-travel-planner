/**
 * Sprint 13b — Mutation queue for the mobile app.
 * Stores trip-board mutations + saved-destination toggles when offline,
 * drains them when the network comes back.
 *
 * Mutations are stored as named operations + serialisable args. The drain
 * function receives a dispatch table that maps op name → real Supabase call.
 */
import AsyncStorage from "@react-native-async-storage/async-storage";

const QUEUE_KEY = "nakshiq:offline_queue:v1";

export type QueuedMutation = {
  id: string;
  op: string;
  args: Record<string, unknown>;
  queuedAt: number;
  attempts: number;
};

export type Dispatch = Record<
  string,
  (args: Record<string, unknown>) => Promise<unknown>
>;

async function readQueue(): Promise<QueuedMutation[]> {
  try {
    const raw = await AsyncStorage.getItem(QUEUE_KEY);
    return raw ? (JSON.parse(raw) as QueuedMutation[]) : [];
  } catch {
    return [];
  }
}

async function writeQueue(queue: QueuedMutation[]): Promise<void> {
  try {
    await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
  } catch {}
}

export async function enqueue(op: string, args: Record<string, unknown>): Promise<void> {
  const queue = await readQueue();
  queue.push({
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    op,
    args,
    queuedAt: Date.now(),
    attempts: 0,
  });
  await writeQueue(queue);
}

export async function getQueueDepth(): Promise<number> {
  return (await readQueue()).length;
}

/**
 * Walk the queue, attempting each mutation in turn. Successes are removed.
 * Failures stay queued, with attempts++ — caller may surface "5 changes
 * waiting to sync" UI. Drains stop after MAX_ATTEMPTS to prevent runaway loops.
 */
const MAX_ATTEMPTS = 5;

export async function drain(dispatch: Dispatch): Promise<{
  succeeded: number;
  failed: number;
  remaining: number;
}> {
  const queue = await readQueue();
  if (queue.length === 0) return { succeeded: 0, failed: 0, remaining: 0 };

  const survivors: QueuedMutation[] = [];
  let succeeded = 0;
  let failed = 0;

  for (const mutation of queue) {
    if (mutation.attempts >= MAX_ATTEMPTS) {
      // Give up — drop from queue (would be surfaced to user via a sync-conflict log later)
      continue;
    }
    const handler = dispatch[mutation.op];
    if (!handler) {
      // Unknown op — keep so a future build with the handler can drain
      survivors.push(mutation);
      continue;
    }
    try {
      await handler(mutation.args);
      succeeded += 1;
    } catch {
      failed += 1;
      survivors.push({ ...mutation, attempts: mutation.attempts + 1 });
    }
  }

  await writeQueue(survivors);
  return { succeeded, failed, remaining: survivors.length };
}

export async function clearQueue(): Promise<void> {
  try { await AsyncStorage.removeItem(QUEUE_KEY); } catch {}
}
