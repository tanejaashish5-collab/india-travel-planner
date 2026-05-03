"use client";

// ShareMenu — Phase 5. Triggered by the existing `Share · Export` button(s)
// in board-canvas toolbar + cost-panel sticky bottom (both previously fired
// alert("Phase 5")).
//
// Uses the nq-modal pattern (Esc + backdrop click) for consistency with
// AiModal + PermitDialog. Three options:
//   1. Copy share link    — calls generateShareToken (signed-in only)
//   2. Download JSON      — calls downloadBoard from lib/json-export
//   3. Import JSON        — file input → importBoard → setState
//
// Anonymous users see option 1 disabled with the "sign in to share" copy.

import { useEffect, useRef, useState } from "react";
import { generateShareToken, type TripStateV2 } from "@/lib/trip-storage";
import { downloadBoard, importBoard } from "@/lib/json-export";

type Status =
  | { kind: "idle" }
  | { kind: "linking" }
  | { kind: "linked"; url: string }
  | { kind: "import-error"; message: string }
  | { kind: "share-error"; message: string };

export function ShareMenu({
  state,
  signedIn,
  onClose,
  onImported,
}: {
  state: TripStateV2;
  signedIn: boolean;
  onClose: () => void;
  onImported: (next: TripStateV2) => void;
}) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeBtnRef.current?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function handleShare() {
    if (!signedIn) return;
    setStatus({ kind: "linking" });
    const res = await generateShareToken(state);
    if (!res.url) {
      setStatus({ kind: "share-error", message: res.error ?? "Couldn't generate share link." });
      return;
    }
    try {
      await navigator.clipboard.writeText(res.url);
    } catch {
      // Clipboard may fail in non-https or older browsers — still surface the URL.
    }
    setStatus({ kind: "linked", url: res.url });
  }

  function handleDownload() {
    downloadBoard(state);
  }

  async function handleImportFile(file: File) {
    try {
      const next = await importBoard(file);
      onImported(next);
      onClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Couldn't read that file.";
      setStatus({ kind: "import-error", message: msg });
    }
  }

  return (
    <div
      className="nq-modal-bg"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Share or export trip board"
      data-share-menu
    >
      <div className="nq-modal" style={{ maxWidth: 520 }}>
        <div className="nq-modal-head" style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
          <div>
            <div className="nq-eyebrow" style={{ marginBottom: 4 }}>
              Share · Export
            </div>
            <h2 style={{ margin: 0, fontFamily: "var(--serif)", fontSize: 22, fontWeight: 500 }}>
              Send your board somewhere
            </h2>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            className="nq-btn nq-btn-ghost"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="nq-modal-body" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Copy share link */}
          <div style={{ paddingBottom: 14, borderBottom: "1px solid var(--rule)" }}>
            <div className="nq-eyebrow" style={{ marginBottom: 4 }}>
              Read-only link
            </div>
            <p
              style={{
                margin: "0 0 12px 0",
                fontSize: 14,
                color: "var(--ink-2)",
                lineHeight: 1.5,
              }}
            >
              {signedIn
                ? "Anyone with the link sees your board view-only — no edits."
                : "Sign in to share — anonymous boards live only in your browser."}
            </p>
            <button
              type="button"
              className="nq-btn nq-btn-primary"
              onClick={handleShare}
              disabled={!signedIn || status.kind === "linking"}
            >
              {status.kind === "linking" ? "Generating…" : "Copy share link"}
            </button>
            {status.kind === "linked" && (
              <div
                className="nq-alert"
                style={{ marginTop: 12 }}
              >
                <div className="nq-alert-eyebrow">Copied</div>
                {/* URL stays mono — it's tabular-numeric-style and benefits from
                    fixed-width to reduce visual ambiguity in tokens. */}
                <code
                  style={{
                    display: "block",
                    fontFamily: "var(--mono)",
                    fontSize: 13,
                    wordBreak: "break-all",
                    color: "var(--ink)",
                    marginTop: 6,
                  }}
                >
                  {status.url}
                </code>
              </div>
            )}
            {status.kind === "share-error" && (
              <div
                style={{
                  marginTop: 12,
                  background: "rgba(217,96,80,.10)",
                  border: "1px solid rgba(217,96,80,.3)",
                  padding: 12,
                  color: "var(--score-1)",
                  fontSize: 14,
                  lineHeight: 1.5,
                }}
              >
                {status.message}
              </div>
            )}
          </div>

          {/* Download JSON */}
          <div style={{ paddingBottom: 14, borderBottom: "1px solid var(--rule)" }}>
            <div className="nq-eyebrow" style={{ marginBottom: 4 }}>
              Download JSON
            </div>
            <p
              style={{
                margin: "0 0 12px 0",
                fontSize: 14,
                color: "var(--ink-2)",
                lineHeight: 1.5,
              }}
            >
              Backup or transfer the board to another device. Re-import via the box below.
            </p>
            <button type="button" className="nq-btn" onClick={handleDownload}>
              Download .json
            </button>
          </div>

          {/* Import JSON */}
          <div>
            <div className="nq-eyebrow" style={{ marginBottom: 4 }}>
              Import JSON
            </div>
            <p
              style={{
                margin: "0 0 12px 0",
                fontSize: 14,
                color: "var(--ink-2)",
                lineHeight: 1.5,
              }}
            >
              Replaces the current board with the imported one. Pick a file the trip board exported.
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/json,.json"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleImportFile(f);
              }}
              style={{ display: "none" }}
            />
            <button
              type="button"
              className="nq-btn"
              onClick={() => fileInputRef.current?.click()}
            >
              Choose .json file
            </button>
            {status.kind === "import-error" && (
              <div
                style={{
                  marginTop: 12,
                  background: "rgba(217,96,80,.10)",
                  border: "1px solid rgba(217,96,80,.3)",
                  padding: 12,
                  color: "var(--score-1)",
                  fontSize: 14,
                  lineHeight: 1.5,
                }}
              >
                {status.message}
              </div>
            )}
          </div>
        </div>

        <div className="nq-modal-foot">
          <span style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.5 }}>
            Share links work without sign-in for the recipient. Imports overwrite the current board.
          </span>
          <button type="button" className="nq-btn nq-btn-primary" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
