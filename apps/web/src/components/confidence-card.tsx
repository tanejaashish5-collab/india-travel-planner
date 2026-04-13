"use client";

import { useTranslations } from "next-intl";

interface ConfidenceCardProps {
  safety_rating: number;
  safety_notes: string;
  reach: {
    from_nearest_city?: string;
    road_condition?: string;
    public_transport?: string;
    self_drive?: string;
    last_km_difficulty?: string;
  };
  sleep: {
    options_count?: number;
    types?: string[];
    price_range_inr?: string;
    booking_method?: string;
    emergency_stay?: string;
    note?: string;
  };
  fuel: {
    nearest_petrol_pump?: string;
    next_after_that?: string;
    ev_charging?: boolean;
    carry_extra?: boolean;
    jerry_can_size_liters?: number;
    note?: string;
  };
  weather_night: {
    summer_low_c?: number;
    winter_low_c?: number;
    note?: string;
  };
  emergency: {
    nearest_hospital?: string;
    police_station?: string;
    rescue?: string;
    ambulance?: string;
    helpline?: string;
  };
  network: {
    jio?: boolean;
    airtel?: boolean;
    bsnl?: boolean;
    vi?: boolean;
    wifi_available?: string;
    note?: string;
  };
  people_who_help: Array<{
    name: string;
    role: string;
    contact: string;
    note: string;
  }>;
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
      <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        <span>{icon}</span>
        <span>{title}</span>
      </div>
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
}

export function ConfidenceCardComponent(props: ConfidenceCardProps) {
  const t = useTranslations("destination");

  return (
    <div className="space-y-3">
      {/* Safety header */}
      <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
        <div
          className={`text-3xl font-mono font-bold ${SAFETY_COLORS[props.safety_rating] ?? "text-zinc-400"}`}
        >
          {props.safety_rating}/5
        </div>
        <div>
          <div className="text-sm font-medium">Safety Rating</div>
          <div className="text-xs text-muted-foreground">
            {props.safety_notes}
          </div>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {/* How to Reach */}
        <Section icon="🚗" title={t("howToReach")}>
          {props.reach.from_nearest_city && (
            <p className="mb-1">{props.reach.from_nearest_city}</p>
          )}
          {props.reach.road_condition && (
            <p className="text-muted-foreground">
              Road: {props.reach.road_condition}
            </p>
          )}
          {props.reach.public_transport && (
            <p className="text-muted-foreground">
              Public transport: {props.reach.public_transport}
            </p>
          )}
          {props.reach.self_drive && (
            <p className="text-muted-foreground">
              Self-drive: {props.reach.self_drive}
            </p>
          )}
        </Section>

        {/* Where to Sleep */}
        <Section icon="🏠" title={t("whereToSleep")}>
          {props.sleep.options_count && (
            <p>
              <span className="font-mono font-bold">
                {props.sleep.options_count}
              </span>{" "}
              options ({props.sleep.types?.join(", ")})
            </p>
          )}
          {props.sleep.price_range_inr ? (
            <p className="text-muted-foreground">
              ₹{props.sleep.price_range_inr}/night
            </p>
          ) : props.sleep.note ? (
            <p className="text-muted-foreground">{props.sleep.note}</p>
          ) : null}
          {props.sleep.booking_method && (
            <p className="text-muted-foreground">
              {props.sleep.booking_method}
            </p>
          )}
          {props.sleep.emergency_stay && (
            <p className="mt-1 text-xs text-emerald-400">
              Emergency: {props.sleep.emergency_stay}
            </p>
          )}
        </Section>

        {/* Fuel */}
        <Section icon="⛽" title={t("fuel")}>
          {props.fuel.nearest_petrol_pump ? (
            <p>Nearest: {props.fuel.nearest_petrol_pump}</p>
          ) : props.fuel.note ? (
            <p className="text-muted-foreground">{props.fuel.note}</p>
          ) : null}
          {props.fuel.next_after_that && (
            <p className="text-muted-foreground">
              Next: {props.fuel.next_after_that}
            </p>
          )}
          {props.fuel.carry_extra && (
            <p className="mt-1 text-orange-400 text-xs font-medium">
              ⚠ Carry extra fuel
              {props.fuel.jerry_can_size_liters &&
                ` (${props.fuel.jerry_can_size_liters}L jerry can recommended)`}
            </p>
          )}
          <p className="text-xs text-muted-foreground">
            EV charging: {props.fuel.ev_charging ? "Available" : "Not available"}
          </p>
        </Section>

        {/* Weather at Night */}
        <Section icon="🌙" title={t("weatherAtNight")}>
          <div className="flex gap-4">
            {props.weather_night.summer_low_c !== undefined && (
              <div>
                <span className="text-xs text-muted-foreground">Summer</span>
                <div className="font-mono font-bold">
                  {props.weather_night.summer_low_c}°C
                </div>
              </div>
            )}
            {props.weather_night.winter_low_c !== undefined && (
              <div>
                <span className="text-xs text-muted-foreground">Winter</span>
                <div className="font-mono font-bold text-blue-400">
                  {props.weather_night.winter_low_c}°C
                </div>
              </div>
            )}
          </div>
          {props.weather_night.note && (
            <p className="mt-1 text-xs text-muted-foreground">
              {props.weather_night.note}
            </p>
          )}
        </Section>

        {/* Emergency */}
        <Section icon="🚨" title={t("emergencyContacts")}>
          {props.emergency.nearest_hospital && (
            <p>Hospital: {props.emergency.nearest_hospital}</p>
          )}
          {props.emergency.police_station && (
            <p className="text-muted-foreground">
              Police: {props.emergency.police_station}
            </p>
          )}
          {props.emergency.rescue && (
            <p className="text-muted-foreground">
              Rescue: {props.emergency.rescue}
            </p>
          )}
          {props.emergency.ambulance && (
            <p className="text-muted-foreground">
              Ambulance: {props.emergency.ambulance}
            </p>
          )}
          {props.emergency.helpline && (
            <p className="text-xs text-muted-foreground">
              Helpline: {props.emergency.helpline}
            </p>
          )}
        </Section>

        {/* Network */}
        <Section icon="📶" title={t("network")}>
          <div className="flex flex-wrap gap-1.5 mb-2">
            <NetworkBadge name="Jio" active={props.network.jio ?? false} />
            <NetworkBadge name="Airtel" active={props.network.airtel ?? false} />
            <NetworkBadge name="BSNL" active={props.network.bsnl ?? false} />
            <NetworkBadge name="Vi" active={props.network.vi ?? false} />
          </div>
          {props.network.wifi_available && (
            <p className="text-xs text-muted-foreground">
              WiFi: {props.network.wifi_available}
            </p>
          )}
          {props.network.note && (
            <p className="text-xs text-orange-400">{props.network.note}</p>
          )}
        </Section>
      </div>

      {/* People Who Can Help */}
      {props.people_who_help.length > 0 && (
        <div className="rounded-lg border border-border p-4">
          <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            <span>🤝</span>
            <span>{t("peopleWhoHelp")}</span>
          </div>
          <div className="space-y-3">
            {props.people_who_help.map((person, i) => (
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
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
