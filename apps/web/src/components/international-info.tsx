"use client";

import { useTranslations } from "next-intl";

interface InternationalInfo {
  cultural_context?: string;
  dress_code?: string;
  food_safety?: string;
  scams?: string[];
  cards_accepted?: string;
  english_level?: string;
  nearest_embassy?: string;
  sim_info?: string;
  visa_notes?: string;
}

export function InternationalInfoSection({ info }: { info: InternationalInfo | null }) {
  const t = useTranslations("intl");
  if (!info) return null;

  return (
    <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-6">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <span className="text-2xl">🌍</span> {t("forInternational")}
      </h3>

      <div className="space-y-4 text-sm text-muted-foreground">
        {info.cultural_context && (
          <div>
            <h4 className="font-semibold text-foreground mb-1">{t("culturalContext")}</h4>
            <p className="leading-relaxed">{info.cultural_context}</p>
          </div>
        )}

        {info.dress_code && (
          <div>
            <h4 className="font-semibold text-foreground mb-1">{t("whatToWear")}</h4>
            <p className="leading-relaxed">{info.dress_code}</p>
          </div>
        )}

        {info.food_safety && (
          <div>
            <h4 className="font-semibold text-foreground mb-1">{t("foodSafety")}</h4>
            <p className="leading-relaxed">{info.food_safety}</p>
          </div>
        )}

        {info.scams && info.scams.length > 0 && (
          <div>
            <h4 className="font-semibold text-foreground mb-1">{t("commonScams")}</h4>
            <ul className="list-disc list-inside space-y-1">
              {info.scams.map((scam, i) => (
                <li key={i}>{scam}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-border/30">
          {info.cards_accepted && (
            <div>
              <h4 className="font-semibold text-foreground mb-1">{t("cardsAndCash")}</h4>
              <p>{info.cards_accepted}</p>
            </div>
          )}
          {info.english_level && (
            <div>
              <h4 className="font-semibold text-foreground mb-1">{t("englishSpoken")}</h4>
              <p>{info.english_level}</p>
            </div>
          )}
          {info.sim_info && (
            <div>
              <h4 className="font-semibold text-foreground mb-1">{t("phoneAndSim")}</h4>
              <p>{info.sim_info}</p>
            </div>
          )}
          {info.nearest_embassy && (
            <div>
              <h4 className="font-semibold text-foreground mb-1">{t("nearestEmbassy")}</h4>
              <p>{info.nearest_embassy}</p>
            </div>
          )}
        </div>

        {info.visa_notes && (
          <p className="mt-3 text-xs text-muted-foreground/70 italic">{info.visa_notes}</p>
        )}
      </div>
    </div>
  );
}
