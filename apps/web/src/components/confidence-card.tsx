"use client";

import { useTranslations } from "next-intl";
import { formatScore } from "@itp/shared";

interface ConfidenceCardProps {
  safety_rating: number | null;
  safety_notes: string | null;
  // Honest-scarcity rows store NULL for sections with no verified source —
  // every section field must tolerate null and render nothing, not crash.
  reach: {
    from_nearest_city?: string;
    road_condition?: string;
    public_transport?: string;
    self_drive?: string;
    last_km_difficulty?: string;
  } | null;
  sleep: {
    options_count?: number;
    types?: string[];
    price_range_inr?: string;
    booking_method?: string;
    emergency_stay?: string;
    note?: string;
  } | null;
  fuel: {
    nearest_petrol_pump?: string;
    next_after_that?: string;
    ev_charging?: boolean;
    carry_extra?: boolean;
    jerry_can_size_liters?: number;
    note?: string;
  } | null;
  weather_night: {
    summer_low_c?: number;
    winter_low_c?: number;
    note?: string;
  } | null;
  emergency: {
    nearest_hospital?: string;
    police_station?: string;
    rescue?: string;
    ambulance?: string;
    helpline?: string;
  } | null;
  network: {
    jio?: boolean;
    airtel?: boolean;
    bsnl?: boolean;
    vi?: boolean;
    wifi_available?: string;
    note?: string;
  } | null;
  // Two real shapes exist in the DB: an array of named people (canonical) and a
  // legacy object that maps a facet (atm/guides/medical_shops/…) to a fact string.
  // Both carry verified, hand-authored content — render whichever arrives.
  people_who_help:
    | Array<{
        name: string;
        role: string;
        contact: string;
        note: string;
      }>
    | Record<string, string>
    | null;
}

// Legacy "people_who_help" object rows store a facet→fact map. Render each facet
// with a human label; acronyms get explicit casing, the rest title-case cleanly.
const HELPER_KEY_LABELS: Record<string, string> = {
  key_contact: "Key contact",
  tourist_police: "Tourist police",
  police: "Police",
  army: "Army",
  bro: "BRO",
  forest_dept: "Forest dept",
  atm: "ATM",
  medical_shops: "Medical shops",
  hospital: "Hospital",
  guides: "Guides",
  locals: "Locals",
  tourism_office: "Tourism office",
  hptdc: "HPTDC",
  war_memorial: "War memorial",
  note: "Note",
};

// Stable display order; "note" reads as a free sentence so it renders last.
const HELPER_KEY_ORDER = [
  "key_contact",
  "tourist_police",
  "police",
  "army",
  "bro",
  "forest_dept",
  "atm",
  "medical_shops",
  "hospital",
  "guides",
  "locals",
  "tourism_office",
  "hptdc",
  "war_memorial",
  "note",
];

function humanizeHelperKey(key: string): string {
  return (
    HELPER_KEY_LABELS[key] ??
    key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
  );
}

function orderedHelperFacts(obj: Record<string, string>): [string, string][] {
  return (Object.entries(obj) as [string, string][])
    .filter(([, v]) => typeof v === "string" && v.trim() !== "")
    .sort(([a], [b]) => {
      const ia = HELPER_KEY_ORDER.indexOf(a);
      const ib = HELPER_KEY_ORDER.indexOf(b);
      return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
    });
}

const SAFETY_COLORS: Record<number, string> = {
  5: "text-emerald-400",
  4: "text-blue-400",
  3: "text-yellow-400",
  2: "text-orange-400",
  1: "text-red-400",
};

function NetworkBadge({ name, active }: { name: string; active: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${active ? "bg-emerald-500/20 text-emerald-400" : "bg-zinc-800 text-zinc-500 line-through"}`}
    >
      {active && <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />}
      {name}
    </span>
  );
}

function Section({
  icon,
  title,
  children,
}: {
  icon: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-border p-4">
      <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground">
        <span>{icon}</span>
        <span>{title}</span>
      </div>
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
}

export function ConfidenceCardComponent(props: ConfidenceCardProps) {
  const t = useTranslations("destination");

  // Honest scarcity: a NULL/empty section means "no verified source" — skip
  // the section box entirely rather than rendering an empty frame (or, worse,
  // asserting defaults like "EV charging: Not available" with no data).
  const reach = props.reach ?? {};
  const sleep = props.sleep ?? {};
  const fuel = props.fuel ?? {};
  const weatherNight = props.weather_night ?? {};
  const emergency = props.emergency ?? {};
  const network = props.network ?? {};
  const hasReach = Object.keys(reach).length > 0;
  const hasSleep = Object.keys(sleep).length > 0;
  const hasFuel = Object.keys(fuel).length > 0;
  const hasWeatherNight = Object.keys(weatherNight).length > 0;
  const hasEmergency = Object.keys(emergency).length > 0;
  const hasNetwork = Object.keys(network).length > 0;

  return (
    <div className="space-y-3">
      {/* Safety header — only render when we have a rating */}
      {props.safety_rating != null && (
        <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
          <div
            className={`text-3xl font-mono font-bold tabular-nums ${SAFETY_COLORS[props.safety_rating] ?? "text-zinc-400"}`}
          >
            {formatScore(props.safety_rating)}
          </div>
          <div>
            <div className="text-sm font-medium">Safety Rating</div>
            {props.safety_notes && (
              <div className="text-xs text-muted-foreground">
                {props.safety_notes}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        {/* How to Reach */}
        {hasReach && (
          <Section icon="🚗" title={t("howToReach")}>
            {reach.from_nearest_city && (
              <p className="mb-1">{reach.from_nearest_city}</p>
            )}
            {reach.road_condition && (
              <p className="text-muted-foreground">
                Road: {reach.road_condition}
              </p>
            )}
            {reach.public_transport && (
              <p className="text-muted-foreground">
                Public transport: {reach.public_transport}
              </p>
            )}
            {reach.self_drive && (
              <p className="text-muted-foreground">
                Self-drive: {reach.self_drive}
              </p>
            )}
          </Section>
        )}

        {/* Where to Sleep */}
        {hasSleep && (
          <Section icon="🏠" title={t("whereToSleep")}>
            {sleep.options_count && (
              <p>
                <span className="font-mono font-bold">
                  {sleep.options_count}
                </span>{" "}
                options ({sleep.types?.join(", ")})
              </p>
            )}
            {sleep.price_range_inr ? (
              <p className="text-muted-foreground">
                ₹{sleep.price_range_inr}/night
              </p>
            ) : sleep.note ? (
              <p className="text-muted-foreground">{sleep.note}</p>
            ) : null}
            {sleep.booking_method && (
              <p className="text-muted-foreground">
                {sleep.booking_method}
              </p>
            )}
            {sleep.emergency_stay && (
              <p className="mt-1 text-xs text-emerald-400">
                Emergency: {sleep.emergency_stay}
              </p>
            )}
          </Section>
        )}

        {/* Fuel */}
        {hasFuel && (
          <Section icon="⛽" title={t("fuel")}>
            {fuel.nearest_petrol_pump ? (
              <p>Nearest: {fuel.nearest_petrol_pump}</p>
            ) : fuel.note ? (
              <p className="text-muted-foreground">{fuel.note}</p>
            ) : null}
            {fuel.next_after_that && (
              <p className="text-muted-foreground">
                Next: {fuel.next_after_that}
              </p>
            )}
            {fuel.carry_extra && (
              <p className="mt-1 text-orange-400 text-xs font-medium">
                ⚠ Carry extra fuel
                {fuel.jerry_can_size_liters &&
                  ` (${fuel.jerry_can_size_liters}L jerry can recommended)`}
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              EV charging: {fuel.ev_charging ? "Available" : "Not available"}
            </p>
          </Section>
        )}

        {/* Weather at Night */}
        {hasWeatherNight && (
          <Section icon="🌙" title={t("weatherAtNight")}>
            <div className="flex gap-4">
              {weatherNight.summer_low_c !== undefined && (
                <div>
                  <span className="text-xs text-muted-foreground">Summer</span>
                  <div className="font-mono font-bold">
                    {weatherNight.summer_low_c}°C
                  </div>
                </div>
              )}
              {weatherNight.winter_low_c !== undefined && (
                <div>
                  <span className="text-xs text-muted-foreground">Winter</span>
                  <div className="font-mono font-bold text-blue-400">
                    {weatherNight.winter_low_c}°C
                  </div>
                </div>
              )}
            </div>
            {weatherNight.note && (
              <p className="mt-1 text-xs text-muted-foreground">
                {weatherNight.note}
              </p>
            )}
          </Section>
        )}

        {/* Emergency */}
        {hasEmergency && (
          <Section icon="🚨" title={t("emergencyContacts")}>
            {emergency.nearest_hospital && (
              <p>Hospital: {emergency.nearest_hospital}</p>
            )}
            {emergency.police_station && (
              <p className="text-muted-foreground">
                Police: {emergency.police_station}
              </p>
            )}
            {emergency.rescue && (
              <p className="text-muted-foreground">
                Rescue: {emergency.rescue}
              </p>
            )}
            {emergency.ambulance && (
              <p className="text-muted-foreground">
                Ambulance: {emergency.ambulance}
              </p>
            )}
            {emergency.helpline && (
              <p className="text-xs text-muted-foreground">
                Helpline: {emergency.helpline}
              </p>
            )}
          </Section>
        )}

        {/* Network */}
        {hasNetwork && (
          <Section icon="📶" title={t("network")}>
            <div className="flex flex-wrap gap-1.5 mb-2">
              <NetworkBadge name="Jio" active={network.jio ?? false} />
              <NetworkBadge name="Airtel" active={network.airtel ?? false} />
              <NetworkBadge name="BSNL" active={network.bsnl ?? false} />
              <NetworkBadge name="Vi" active={network.vi ?? false} />
            </div>
            {network.wifi_available && (
              <p className="text-xs text-muted-foreground">
                WiFi: {network.wifi_available}
              </p>
            )}
            {network.note && (
              <p className="text-xs text-orange-400">{network.note}</p>
            )}
          </Section>
        )}
      </div>

      {/* People Who Can Help — array = named people, object = legacy facts map */}
      {(() => {
        const pwh = props.people_who_help;
        const people = Array.isArray(pwh) ? pwh : null;
        const facts =
          Array.isArray(pwh) || pwh == null ? null : orderedHelperFacts(pwh);
        const hasContent = people
          ? people.length > 0
          : (facts?.length ?? 0) > 0;
        if (!hasContent) return null;
        return (
          <div className="rounded-lg border border-border p-4">
            <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground">
              <span>🤝</span>
              <span>{t("peopleWhoHelp")}</span>
            </div>
            <div className="space-y-3">
              {people
                ? people.map((person, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                        {person.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-medium">{person.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {person.role}
                        </div>
                        {person.contact && (
                          <div className="mt-0.5 text-xs text-primary">
                            {person.contact}
                          </div>
                        )}
                        {person.note && (
                          <div className="mt-0.5 text-xs text-muted-foreground">
                            {person.note}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                : facts!.map(([key, value]) =>
                    key === "note" ? (
                      <div key={key} className="text-xs text-muted-foreground">
                        {value}
                      </div>
                    ) : (
                      <div key={key}>
                        <div className="text-sm font-medium">
                          {humanizeHelperKey(key)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {value}
                        </div>
                      </div>
                    ),
                  )}
            </div>
          </div>
        );
      })()}
    </div>
  );
}
