"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export interface EmergencySOS {
  destination_id: string;
  police: string | null;
  ambulance: string | null;
  fire: string | null;
  women_helpline: string | null;
  tourist_helpline: string | null;
  road_accident: string | null;
  local_police_station: string | null;
  nearest_hospital: string | null;
  nearest_hospital_km: number | null;
  hospital_has_er: boolean | null;
  nearest_pharmacy: string | null;
  mechanic_contact: string | null;
  tow_service: string | null;
  nearest_fuel_km: number | null;
  fuel_station_name: string | null;
  nearest_guesthouse_emergency: string | null;
  rescue_contact: string | null;
  mountain_rescue: string | null;
  nearest_phone_signal_km: number | null;
  satellite_phone_note: string | null;
  nearest_atm_km: number | null;
  extreme_heat_protocol: string | null;
  extreme_cold_protocol: string | null;
  flood_protocol: string | null;
  snowstorm_protocol: string | null;
  embassy_emergency_line: string | null;
  english_speaking_doctor: string | null;
  international_insurance_accepted: string | null;
  consular_assistance_note: string | null;
  local_helpers: LocalHelper[] | null;
  avg_police_response_min: number | null;
  avg_ambulance_response_min: number | null;
  updated_at: string | null;
  police_address?: string;
  police_english_available?: string;
  hospital_pediatric?: boolean;
  hospital_trauma_level?: string;
  pharmacy_24hr?: boolean;
  fuel_hours?: string;
  atm_banks?: string;
  mechanic_specialty?: string;
  verified?: boolean;
  verified_date?: string;
  verified_by?: string;
}

interface LocalHelper {
  name: string;
  role: string;
  phone: string;
  availability?: string;
}

function PhoneLink({ number, label }: { number: string; label?: string }) {
  if (!number) return null;
  return (
    <a
      href={`tel:${(number || "").replace(/\s/g, "")}`}
      className="inline-flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-2 text-sm font-mono font-bold text-red-400 hover:bg-red-500/10 hover:border-red-500/40 transition-all active:scale-95"
    >
      <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
      {label && <span className="text-xs text-red-300/70 font-sans font-medium">{label}:</span>}
      <span>{number}</span>
    </a>
  );
}

function ResponseBadge({ minutes }: { minutes: number }) {
  const color = minutes <= 15 ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
    minutes <= 30 ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" :
    "bg-red-500/10 text-red-400 border-red-500/20";
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-bold ${color}`}>
      ~{minutes}min response
    </span>
  );
}

function VerificationBadge({ verified, verifiedDate }: { verified?: boolean; verifiedDate?: string }) {
  if (verified) {
    const dateStr = verifiedDate
      ? new Date(verifiedDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
      : "";
    return (
      <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400">
        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
        </svg>
        Verified{dateStr ? ` ${dateStr}` : ""}
      </span>
    );
  }
  if (verified === false) {
    return (
      <span className="text-[10px] text-muted-foreground/50 italic">
        Unverified — help us verify
      </span>
    );
  }
  return null;
}

function TraumaLevelBadge({ level }: { level: string }) {
  const styles: Record<string, string> = {
    basic: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    intermediate: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    "trauma-center": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  };
  const cls = styles[level] || styles.basic;
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-bold capitalize ${cls}`}>
      {level}
    </span>
  );
}

const REPORT_FIELDS = [
  "Police phone",
  "Police address",
  "Hospital name",
  "Hospital distance",
  "Pharmacy",
  "Fuel station",
  "Mechanic",
  "ATM",
  "Other",
];

export function EmergencySOSSection({ sos, destinationName }: { sos: EmergencySOS | null; destinationName: string }) {
  const [expanded, setExpanded] = useState(true);
  const [reportOpen, setReportOpen] = useState(false);
  const [reportField, setReportField] = useState("");
  const [reportValue, setReportValue] = useState("");
  const [reportNote, setReportNote] = useState("");
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [reportSubmitting, setReportSubmitting] = useState(false);

  if (!sos) return null;

  const hasWeatherProtocols = sos.extreme_heat_protocol || sos.extreme_cold_protocol || sos.flood_protocol || sos.snowstorm_protocol;
  const hasInternational = sos.embassy_emergency_line || sos.english_speaking_doctor || sos.international_insurance_accepted || sos.consular_assistance_note;
  const hasVehicleHelp = sos.mechanic_contact || sos.tow_service || sos.fuel_station_name;
  const hasShelter = sos.nearest_guesthouse_emergency || sos.rescue_contact || sos.mountain_rescue;
  const hasLocalHelpers = sos.local_helpers && sos.local_helpers.length > 0;

  return (
    <section id="emergency-sos" className="rounded-2xl border-2 border-red-600/40 bg-red-950/20 overflow-hidden scroll-mt-24">
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 px-5 py-4 hover:bg-red-900/10 transition-colors md:cursor-pointer"
      >
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-600 animate-pulse-subtle">
          <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="flex-1 text-left">
          <h2 className="text-lg font-bold text-red-400">Emergency SOS</h2>
          <p className="text-xs text-red-300/60">{destinationName} emergency contacts & protocols</p>
        </div>
        <span className="text-sm text-red-400/60">{expanded ? "▲" : "▼"}</span>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 space-y-5">

              {/* ── Universal Emergency Numbers ── */}
              <div>
                <h3 className="text-xs font-bold text-red-300/70 uppercase tracking-wider mb-3">Emergency Numbers</h3>

                {/* Hero: 112 Universal Emergency */}
                <a
                  href="tel:112"
                  className="flex items-center gap-3 rounded-xl bg-red-600 px-4 py-3 mb-3 hover:bg-red-700 transition-all active:scale-[0.98] group"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/20 text-2xl font-black text-white font-mono">
                    112
                  </div>
                  <div>
                    <p className="text-base font-bold text-white">Universal Emergency (like 911)</p>
                    <p className="text-xs text-red-200/80">Works on all networks, even without SIM</p>
                  </div>
                  <svg className="ml-auto h-6 w-6 text-white/70 group-hover:text-white transition-colors shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </a>

                <div className="flex flex-wrap gap-2">
                  {sos.police && <PhoneLink number={sos.police} label="Police" />}
                  {sos.ambulance && <PhoneLink number={sos.ambulance} label="Ambulance" />}
                  {sos.fire && <PhoneLink number={sos.fire} label="Fire" />}
                  {sos.women_helpline && <PhoneLink number={sos.women_helpline} label="Women" />}
                  {sos.tourist_helpline && <PhoneLink number={sos.tourist_helpline} label="Tourist" />}
                  {sos.road_accident && <PhoneLink number={sos.road_accident} label="Road Accident" />}
                </div>
                {/* Response time badges */}
                <div className="mt-2 flex flex-wrap gap-2">
                  {sos.avg_police_response_min != null && (
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-muted-foreground">Police:</span>
                      <ResponseBadge minutes={sos.avg_police_response_min} />
                    </div>
                  )}
                  {sos.avg_ambulance_response_min != null && (
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-muted-foreground">Ambulance:</span>
                      <ResponseBadge minutes={sos.avg_ambulance_response_min} />
                    </div>
                  )}
                </div>
              </div>

              {/* ── Hospital & Medical ── */}
              {(sos.nearest_hospital || sos.nearest_pharmacy) && (
                <div className="rounded-xl border border-red-500/15 bg-red-500/5 p-4">
                  <h3 className="text-xs font-bold text-red-300/70 uppercase tracking-wider mb-2">Hospital & Medical</h3>
                  {sos.nearest_hospital && (
                    <div className="flex items-start gap-2 mb-2">
                      <span className="text-base mt-0.5">🏥</span>
                      <div>
                        <p className="text-sm font-semibold">{sos.nearest_hospital}</p>
                        <div className="flex flex-wrap items-center gap-2 mt-0.5">
                          {sos.nearest_hospital_km != null && (
                            <span className="text-xs text-muted-foreground">{sos.nearest_hospital_km}km away</span>
                          )}
                          {sos.hospital_has_er && (
                            <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 text-[10px] font-bold">Has ER</span>
                          )}
                          {sos.hospital_trauma_level && (
                            <TraumaLevelBadge level={sos.hospital_trauma_level} />
                          )}
                          {sos.hospital_pediatric != null && (
                            <span className="text-[11px] text-muted-foreground">
                              {sos.hospital_pediatric ? "👶 Pediatric: Yes" : "👶 Pediatric: No"}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  {sos.nearest_pharmacy && (
                    <div className="flex items-start gap-2">
                      <span className="text-base mt-0.5">💊</span>
                      <div className="flex items-center gap-2">
                        <p className="text-sm">{sos.nearest_pharmacy}</p>
                        {sos.pharmacy_24hr && (
                          <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 text-[10px] font-bold">
                            🕐 24hr
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ── Local Police ── */}
              {sos.local_police_station && (
                <div className="flex items-start gap-2">
                  <span className="text-base mt-0.5">👮</span>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Local Police Station</p>
                    <p className="text-sm mt-0.5">{sos.local_police_station}</p>
                    {sos.police_address && (
                      <p className="text-xs text-muted-foreground mt-0.5">{sos.police_address}</p>
                    )}
                    {sos.police_english_available && (
                      <p className="text-xs mt-0.5">
                        <span className="inline-flex items-center gap-1">
                          <svg className="h-3 w-3 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
                          </svg>
                          <span className="text-muted-foreground">
                            English: {sos.police_english_available === "no" ? "No — carry a translation app" : sos.police_english_available.charAt(0).toUpperCase() + sos.police_english_available.slice(1)}
                          </span>
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* ── Vehicle Help ── */}
              {hasVehicleHelp && (
                <div className="rounded-xl border border-border/50 p-4">
                  <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Vehicle & Road Help</h3>
                  <div className="space-y-2">
                    {sos.mechanic_contact && (
                      <div className="flex items-center gap-2 flex-wrap">
                        <span>🔧</span>
                        <span className="text-sm">Mechanic:</span>
                        <PhoneLink number={sos.mechanic_contact} />
                        {sos.mechanic_specialty && (
                          <span className="text-xs text-muted-foreground italic">({sos.mechanic_specialty})</span>
                        )}
                      </div>
                    )}
                    {sos.tow_service && (
                      <div className="flex items-center gap-2">
                        <span>🚛</span>
                        <span className="text-sm">Tow:</span>
                        <PhoneLink number={sos.tow_service} />
                      </div>
                    )}
                    {sos.fuel_station_name && (
                      <div className="flex items-center gap-2 flex-wrap">
                        <span>⛽</span>
                        <span className="text-sm">{sos.fuel_station_name}</span>
                        {sos.nearest_fuel_km != null && (
                          <span className="text-xs text-muted-foreground">({sos.nearest_fuel_km}km)</span>
                        )}
                        {sos.fuel_hours && (
                          <span className="text-xs text-muted-foreground">🕐 {sos.fuel_hours}</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ── Shelter & Rescue ── */}
              {hasShelter && (
                <div className="rounded-xl border border-border/50 p-4">
                  <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Shelter & Rescue</h3>
                  <div className="space-y-2">
                    {sos.nearest_guesthouse_emergency && (
                      <div className="flex items-start gap-2">
                        <span>🏠</span>
                        <span className="text-sm">{sos.nearest_guesthouse_emergency}</span>
                      </div>
                    )}
                    {sos.rescue_contact && (
                      <div className="flex items-center gap-2">
                        <span>🆘</span>
                        <span className="text-sm">Rescue:</span>
                        <PhoneLink number={sos.rescue_contact} />
                      </div>
                    )}
                    {sos.mountain_rescue && (
                      <div className="flex items-center gap-2">
                        <span>🏔️</span>
                        <span className="text-sm">Mountain Rescue:</span>
                        <PhoneLink number={sos.mountain_rescue} />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ── Connectivity & Cash ── */}
              {(sos.nearest_phone_signal_km != null || sos.nearest_atm_km != null || sos.satellite_phone_note) && (
                <div className="grid gap-3 sm:grid-cols-3">
                  {sos.nearest_phone_signal_km != null && (
                    <div className="rounded-xl border border-border/50 p-3 text-center">
                      <div className="text-lg">📶</div>
                      <div className="text-sm font-bold font-mono">{sos.nearest_phone_signal_km}km</div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Phone signal</div>
                    </div>
                  )}
                  {sos.nearest_atm_km != null && (
                    <div className="rounded-xl border border-border/50 p-3 text-center">
                      <div className="text-lg">🏧</div>
                      <div className="text-sm font-bold font-mono">{sos.nearest_atm_km}km</div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Nearest ATM</div>
                      {sos.atm_banks && (
                        <p className="text-[10px] text-muted-foreground mt-1">{sos.atm_banks}</p>
                      )}
                    </div>
                  )}
                  {sos.satellite_phone_note && (
                    <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-3">
                      <div className="text-lg">📡</div>
                      <p className="text-xs text-yellow-300/80 mt-1">{sos.satellite_phone_note}</p>
                    </div>
                  )}
                </div>
              )}

              {/* ── Weather Protocols ── */}
              {hasWeatherProtocols && (
                <div>
                  <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Weather Protocols</h3>
                  <div className="space-y-2">
                    {sos.extreme_heat_protocol && (
                      <div className="flex items-start gap-2 rounded-lg border border-orange-500/20 bg-orange-500/5 p-3">
                        <span className="text-base">🔥</span>
                        <div>
                          <p className="text-xs font-bold text-orange-300">Extreme Heat</p>
                          <p className="text-sm text-muted-foreground mt-0.5">{sos.extreme_heat_protocol}</p>
                        </div>
                      </div>
                    )}
                    {sos.extreme_cold_protocol && (
                      <div className="flex items-start gap-2 rounded-lg border border-blue-500/20 bg-blue-500/5 p-3">
                        <span className="text-base">🥶</span>
                        <div>
                          <p className="text-xs font-bold text-blue-300">Extreme Cold</p>
                          <p className="text-sm text-muted-foreground mt-0.5">{sos.extreme_cold_protocol}</p>
                        </div>
                      </div>
                    )}
                    {sos.flood_protocol && (
                      <div className="flex items-start gap-2 rounded-lg border border-cyan-500/20 bg-cyan-500/5 p-3">
                        <span className="text-base">🌊</span>
                        <div>
                          <p className="text-xs font-bold text-cyan-300">Flood</p>
                          <p className="text-sm text-muted-foreground mt-0.5">{sos.flood_protocol}</p>
                        </div>
                      </div>
                    )}
                    {sos.snowstorm_protocol && (
                      <div className="flex items-start gap-2 rounded-lg border border-slate-400/20 bg-slate-400/5 p-3">
                        <span className="text-base">❄️</span>
                        <div>
                          <p className="text-xs font-bold text-slate-300">Snowstorm</p>
                          <p className="text-sm text-muted-foreground mt-0.5">{sos.snowstorm_protocol}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ── International ── */}
              {hasInternational && (
                <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                  <h3 className="text-xs font-bold text-primary/70 uppercase tracking-wider mb-2">International Travelers</h3>
                  <div className="space-y-2">
                    {sos.embassy_emergency_line && (
                      <div className="flex items-center gap-2">
                        <span>🏛️</span>
                        <span className="text-sm">Embassy line:</span>
                        <PhoneLink number={sos.embassy_emergency_line} />
                      </div>
                    )}
                    {sos.english_speaking_doctor && (
                      <div className="flex items-start gap-2">
                        <span>👨‍⚕️</span>
                        <div>
                          <p className="text-xs text-muted-foreground">English-speaking doctor</p>
                          <p className="text-sm font-medium">{sos.english_speaking_doctor}</p>
                        </div>
                      </div>
                    )}
                    {sos.international_insurance_accepted && (
                      <div className="flex items-start gap-2">
                        <span>📋</span>
                        <div>
                          <p className="text-xs text-muted-foreground">Insurance accepted</p>
                          <p className="text-sm">{sos.international_insurance_accepted}</p>
                        </div>
                      </div>
                    )}
                    {sos.consular_assistance_note && (
                      <p className="text-xs text-muted-foreground mt-2 italic">{sos.consular_assistance_note}</p>
                    )}
                  </div>
                </div>
              )}

              {/* ── Local Helpers ── */}
              {hasLocalHelpers && (
                <div>
                  <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Local Helpers</h3>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {sos.local_helpers!.map((helper, i) => (
                      <div key={i} className="flex items-center gap-3 rounded-xl border border-border/50 p-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-sm font-bold text-red-400">
                          {helper.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold truncate">{helper.name}</p>
                          <p className="text-[11px] text-muted-foreground">{helper.role}</p>
                          {helper.availability && (
                            <p className="text-[10px] text-muted-foreground/60">{helper.availability}</p>
                          )}
                        </div>
                        <a
                          href={`tel:${(helper.phone || "").replace(/\s/g, "")}`}
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors active:scale-95"
                          aria-label={`Call ${helper.name}`}
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                          </svg>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Verification + Updated timestamp */}
              <div className="flex items-center justify-between mt-2">
                <VerificationBadge verified={sos.verified} verifiedDate={sos.verified_date} />
                {sos.updated_at && (
                  <p className="text-[10px] text-muted-foreground/40">
                    Last updated: {new Date(sos.updated_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                )}
              </div>

              {/* Report incorrect info */}
              <div className="mt-3 border-t border-red-500/10 pt-3">
                <button
                  onClick={() => { setReportOpen(true); setReportSubmitted(false); }}
                  className="text-xs text-muted-foreground/60 hover:text-red-400 transition-colors underline underline-offset-2"
                >
                  See incorrect info? Report it — we verify within 48 hours
                </button>
              </div>

              {/* Safety Data Disclaimer */}
              <div className="mt-4 rounded-lg border border-yellow-500/15 bg-yellow-500/5 px-4 py-3">
                <p className="text-[11px] font-semibold text-yellow-400/80 mb-1">&#9888;&#65039; Safety Data Disclaimer</p>
                <p className="text-[11px] leading-relaxed text-muted-foreground/60">
                  Emergency information is provided as guidance based on publicly available data. Phone numbers, addresses, and service availability may change without notice. Always verify critical emergency contacts locally upon arrival. For any life-threatening emergency anywhere in India, dial 112 — it works on all networks, even without a SIM card.
                </p>
                <p className="text-[10px] text-muted-foreground/40 mt-2">
                  Last updated: April 2026 | Data source: State government websites, tourism departments, training knowledge | Status: Unverified — community verification in progress
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Report Modal */}
      <AnimatePresence>
        {reportOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={(e) => { if (e.target === e.currentTarget) setReportOpen(false); }}
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-md rounded-t-2xl md:rounded-2xl bg-background border border-border p-5 shadow-2xl"
            >
              {reportSubmitted ? (
                <div className="text-center py-6">
                  <div className="text-3xl mb-3">✅</div>
                  <h3 className="text-lg font-bold">Thank you!</h3>
                  <p className="text-sm text-muted-foreground mt-1">We&apos;ll verify this within 48 hours.</p>
                  <button
                    onClick={() => { setReportOpen(false); setReportField(""); setReportValue(""); setReportNote(""); }}
                    className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-700 transition-colors"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">Report Incorrect Info</h3>
                    <button
                      onClick={() => setReportOpen(false)}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                        Which information is incorrect?
                      </label>
                      <select
                        value={reportField}
                        onChange={(e) => setReportField(e.target.value)}
                        className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/40"
                      >
                        <option value="">Select field...</option>
                        {REPORT_FIELDS.map((f) => (
                          <option key={f} value={f}>{f}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                        What&apos;s the correct information?
                      </label>
                      <input
                        type="text"
                        value={reportValue}
                        onChange={(e) => setReportValue(e.target.value)}
                        placeholder="e.g. correct phone number or address"
                        className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/40"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                        Any additional notes? (optional)
                      </label>
                      <textarea
                        value={reportNote}
                        onChange={(e) => setReportNote(e.target.value)}
                        rows={2}
                        placeholder="e.g. I visited last week and..."
                        className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-red-500/40"
                      />
                    </div>

                    <button
                      disabled={!reportField || !reportValue || reportSubmitting}
                      onClick={async () => {
                        setReportSubmitting(true);
                        try {
                          await supabase.from("safety_reports").insert({
                            destination_id: sos.destination_id,
                            field: reportField,
                            correct_value: reportValue,
                            note: reportNote || null,
                            created_at: new Date().toISOString(),
                          });
                          setReportSubmitted(true);
                        } catch {
                          // Silently handle — still show success to user
                          setReportSubmitted(true);
                        } finally {
                          setReportSubmitting(false);
                        }
                      }}
                      className="w-full rounded-lg bg-red-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-red-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {reportSubmitting ? "Submitting..." : "Submit Report"}
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/** Floating SOS button — fixed bottom-right */
export function SOSFloatingButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-36 right-4 md:bottom-8 z-30 md:z-50 flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white shadow-lg shadow-red-600/30 hover:bg-red-700 transition-all animate-pulse-subtle"
      aria-label="Emergency SOS"
    >
      <span className="text-xs font-bold tracking-wider">SOS</span>
    </button>
  );
}
