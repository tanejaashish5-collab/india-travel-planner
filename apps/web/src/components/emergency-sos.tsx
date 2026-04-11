"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

export function EmergencySOSSection({ sos, destinationName }: { sos: EmergencySOS | null; destinationName: string }) {
  const [expanded, setExpanded] = useState(true);

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
                        <div className="flex items-center gap-2 mt-0.5">
                          {sos.nearest_hospital_km != null && (
                            <span className="text-xs text-muted-foreground">{sos.nearest_hospital_km}km away</span>
                          )}
                          {sos.hospital_has_er && (
                            <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 text-[10px] font-bold">Has ER</span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  {sos.nearest_pharmacy && (
                    <div className="flex items-start gap-2">
                      <span className="text-base mt-0.5">💊</span>
                      <div>
                        <p className="text-sm">{sos.nearest_pharmacy}</p>
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
                  </div>
                </div>
              )}

              {/* ── Vehicle Help ── */}
              {hasVehicleHelp && (
                <div className="rounded-xl border border-border/50 p-4">
                  <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Vehicle & Road Help</h3>
                  <div className="space-y-2">
                    {sos.mechanic_contact && (
                      <div className="flex items-center gap-2">
                        <span>🔧</span>
                        <span className="text-sm">Mechanic:</span>
                        <PhoneLink number={sos.mechanic_contact} />
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
                      <div className="flex items-center gap-2">
                        <span>⛽</span>
                        <span className="text-sm">{sos.fuel_station_name}</span>
                        {sos.nearest_fuel_km != null && (
                          <span className="text-xs text-muted-foreground">({sos.nearest_fuel_km}km)</span>
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

              {/* Updated timestamp */}
              {sos.updated_at && (
                <p className="text-[10px] text-muted-foreground/40 text-right">
                  Last verified: {new Date(sos.updated_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </p>
              )}
            </div>
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
      className="fixed bottom-24 right-4 md:bottom-8 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white shadow-lg shadow-red-600/30 hover:bg-red-700 transition-all animate-pulse-subtle"
      aria-label="Emergency SOS"
    >
      <span className="text-xs font-bold tracking-wider">SOS</span>
    </button>
  );
}
