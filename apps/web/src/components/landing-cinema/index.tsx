"use client";

import "./cinema.css";
import { Act1Dispatch, type DispatchHero } from "./act-1-dispatch";
import { Act2Skip, type SkipEntry } from "./act-2-skip";
import { Act3Scenes, type SceneEntry } from "./act-3-scenes";
import { Act4Atlas, type AtlasPin } from "./act-4-atlas";
import { Act5DirectorsCut, type VerdictMap } from "./act-5-directors-cut";
import { Act5hFieldNote, type FieldNote } from "./act-5h-field-note";
import { Act6Dailies, type DailyEntry, type DailiesStats } from "./act-6-dailies";
import { Act7HowWeScore } from "./act-7-how-we-score";
import { Act8Stories, type StoryCollection } from "./act-8-stories";
import { Act9Coda } from "./act-9-coda";
import { ScrollRail } from "./scroll-rail";

/* ============================================================
   LandingCinema — orchestrator for the cinematic landing.

   PR 1 ship: only ACT I (Dispatch slideshow) is cinematic. Everything
   below the fold (Featured destinations, Collections, Routes, Newsletter,
   final CTA) keeps rendering via the existing <LandingHero/> component
   with `hideOwnHero={true}` so its old hero section is suppressed.

   PRs 2-7 will progressively replace each LandingHero section with its
   ACT counterpart (II Skip, III Scenes, IV Atlas, V Director's Cut,
   V½ Field Note, VI Dailies, VII How We Score, VIII Map-led Stories,
   IX Coda) until <LandingHero/> is fully replaced and removed.

   Wrapper class `.nakshiq-cinema` scopes all cinema tokens (--paper,
   --bone, --vermillion, etc.) so the rest of the site renders unchanged.
   ============================================================ */

// Loose pass-through type — collection objects come from Supabase with a
// shifting shape (the JSON output may include a tags array, a description,
// and an optional cover_image_url depending on which migration last touched
// `collections`). The Act8Stories component reads only id/name/description,
// and resolveCover handles its own field probing, so we keep the input
// permissive and let downstream do the shape checks.
type LooseCollection = StoryCollection & Record<string, unknown>;

export function LandingCinema({
  dispatchHeroes,
  skipList,
  scenes,
  atlasPins,
  verdictMap,
  fieldNote,
  dailies,
  dailiesStats,
  collections,
}: {
  dispatchHeroes: DispatchHero[];
  skipList: SkipEntry[];
  scenes: SceneEntry[];
  atlasPins: AtlasPin[];
  verdictMap: VerdictMap;
  fieldNote: FieldNote | null;
  dailies: DailyEntry[];
  dailiesStats: DailiesStats;
  collections: LooseCollection[];
}) {
  // Ambient image carousel for ACT IX Coda — top dispatch heroes give us
  // the most-vetted images on the page.
  const ambientImageIds = dispatchHeroes
    .map((h) => h.id)
    .filter((id): id is string => !!id)
    .slice(0, 3);

  return (
    <div className="nakshiq-cinema">
      {/* Section-id anchors for the right-edge scroll rail. */}
      <div id="act-1">
        <Act1Dispatch heroes={dispatchHeroes} />
      </div>
      <div id="act-2">
        <Act2Skip entries={skipList} />
      </div>
      <div id="act-3">
        <Act3Scenes scenes={scenes} />
      </div>
      <div id="act-4">
        <Act4Atlas pins={atlasPins} />
      </div>
      <div id="act-5">
        <Act5DirectorsCut verdictMap={verdictMap} />
      </div>
      <Act5hFieldNote note={fieldNote} />
      <div id="act-6">
        <Act6Dailies entries={dailies} stats={dailiesStats} />
      </div>
      <div id="act-7">
        <Act7HowWeScore />
      </div>
      <div id="act-8">
        <Act8Stories collections={collections} />
      </div>
      <div id="act-9">
        <Act9Coda ambientImageIds={ambientImageIds} />
      </div>

      <ScrollRail />
    </div>
  );
}
