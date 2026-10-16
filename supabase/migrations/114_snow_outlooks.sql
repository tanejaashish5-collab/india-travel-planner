-- APPLIED 2026-10-16 via Supabase MCP apply_migration (114_snow_outlooks, 114b_snow_outlooks_passes, 114c_snow_watch_exclude_summits, 114d_snow_watch_hindi_names, 114e_snow_watch_from_1500m).
-- 114: snow outlook — a multi-model, dated, self-scoring snow forecast for
-- mountain destinations AND the road passes that close first.
--
-- Why: on 15 Oct 2026 the season's first snow fell at Sissu and Keylong. IMD had
-- forecast it on 12 Oct and the global models had it 3 days out, yet NakshIQ's
-- only signal was the road feed, which logs closures AFTER they happen. This
-- table holds the forward-looking half: what the models and IMD say is coming.
--
-- Why passes: the backtest (scripts/snow-outlook-backtest.mjs, 10 Sep-16 Oct)
-- showed the models DID forecast the 13-14 Oct Kashmir spell, but at Gulmarg and
-- Sonamarg town level it was +3 to +9 C (rain); the snow fell on Zoji La, Razdan
-- Top and Affarwat. Watching towns alone misses what closes roads.
--
-- Honesty rules that live in the schema, not in a prompt:
--   * one row per (run_date, point): every run is kept, so the page can show
--     what we said and when; nothing is rewritten after the fact
--   * models_agree / models_total are stored, never a bare "snow coming"
--   * after the window ends, scripts/snow-outlook.mjs verify sets outcome from
--     evidence (IMD measured snowfall, dated road-feed rows). No evidence is
--     'unconfirmed', never 'miss': silence from a remote valley is not proof
--     that it stayed dry.
--
-- Life-cycle:
--   write    scripts/snow-outlook.mjs run   (LaunchAgent com.nakshiq.snow-outlook, twice daily)
--   render   apps/web/src/components/snow-outlook.tsx (/road-conditions + destination pages)
--   verify   scripts/snow-outlook.mjs verify (same job, scores windows that have ended)
--   reels    nakshiq-autoposter/data/snow_alerts/<date>.json fact pack per new 'likely' outlook

-- Road passes. Coordinates + elevation from Wikidata / the English Wikipedia
-- infobox or article text (source_url per row), fetched 2026-10-16.
create table if not exists public.snow_watch_passes (
  id text primary key,
  name text not null,
  region_id text not null,      -- road_updates region ids (states.id)
  elevation_m int not null check (elevation_m between 2000 and 6000),
  lat double precision not null,
  lng double precision not null,
  road text not null,           -- the corridor it closes, as travellers name it
  source_url text not null,
  name_hi text                  -- Hindi pages; destinations use translations.hi.name
);
alter table public.snow_watch_passes enable row level security;
drop policy if exists "anon read snow passes" on public.snow_watch_passes;
create policy "anon read snow passes" on public.snow_watch_passes for select to anon, authenticated using (true);

insert into public.snow_watch_passes (id, name, region_id, elevation_m, lat, lng, road, source_url) values
  ('rohtang-pass',  'Rohtang Pass',  'himachal-pradesh', 3978, 32.3714, 77.2464, 'Manali–Gramphu (old Leh road, Spiti turn-off)', 'https://www.wikidata.org/wiki/Q633415'),
  ('kunzum-pass',   'Kunzum Pass',   'himachal-pradesh', 4590, 32.4158, 77.6485, 'Manali–Kaza (Batal–Losar)',                    'https://www.wikidata.org/wiki/Q6445192'),
  ('baralacha-la',  'Baralacha La',  'himachal-pradesh', 4850, 32.7586, 77.4203, 'Manali–Leh (Darcha–Sarchu)',                   'https://en.wikipedia.org/wiki/Bara-lacha_la'),
  ('shinku-la',     'Shinku La',     'himachal-pradesh', 5040, 32.9089, 77.1997, 'Darcha–Padum (Zanskar)',                       'https://www.wikidata.org/wiki/Q2091797'),
  ('sach-pass',     'Sach Pass',     'himachal-pradesh', 4414, 33.0060, 76.2400, 'Bairagarh–Killar (Chamba to Pangi)',           'https://en.wikipedia.org/wiki/Sach_pass'),
  ('zoji-la',       'Zoji La',       'jammu-kashmir',    3528, 34.2789, 75.4719, 'Srinagar–Leh (Sonamarg–Drass)',                'https://www.wikidata.org/wiki/Q867075'),
  ('razdan-pass',   'Razdan Top',    'jammu-kashmir',    3556, 34.5412, 74.6367, 'Bandipora–Gurez',                              'https://en.wikipedia.org/wiki/Razdan_Pass'),
  ('peer-ki-gali',  'Peer Ki Gali',  'jammu-kashmir',    3485, 33.6299, 74.5200, 'Mughal Road (Shopian–Poonch)',                 'https://en.wikipedia.org/wiki/Pir_Panjal_Pass'),
  ('chang-la',      'Chang La',      'ladakh',           5360, 34.0470, 77.9305, 'Leh–Pangong',                                  'https://www.wikidata.org/wiki/Q866534'),
  ('taglang-la',    'Taglang La',    'ladakh',           5328, 33.5078, 77.7700, 'Manali–Leh (Pang–Upshi)',                      'https://www.wikidata.org/wiki/Q729667'),
  ('fotu-la',       'Fotu La',       'ladakh',           4108, 34.2892, 76.7015, 'Srinagar–Leh (Kargil–Lamayuru)',               'https://www.wikidata.org/wiki/Q2675874'),
  ('sela-pass',     'Sela Pass',     'arunachal-pradesh',4170, 27.5048, 92.1047, 'Bomdila–Tawang',                               'https://www.wikidata.org/wiki/Q7447387')
on conflict (id) do update set name = excluded.name, region_id = excluded.region_id, elevation_m = excluded.elevation_m,
  lat = excluded.lat, lng = excluded.lng, road = excluded.road, source_url = excluded.source_url;

update public.snow_watch_passes p set name_hi = v.hi from (values
  ('rohtang-pass','रोहतांग दर्रा'),('kunzum-pass','कुंज़ुम दर्रा'),('baralacha-la','बारालाचा ला'),('shinku-la','शिंकु ला'),
  ('sach-pass','साच दर्रा'),('zoji-la','ज़ोजी ला'),('razdan-pass','राज़दान टॉप'),('peer-ki-gali','पीर की गली'),
  ('chang-la','चांग ला'),('taglang-la','तगलांग ला'),('fotu-la','फ़ोटू ला'),('sela-pass','सेला दर्रा')) as v(id, hi)
where p.id = v.id;

create table if not exists public.snow_outlooks (
  id bigserial primary key,
  run_date date not null,                         -- IST date of the forecast run
  run_at timestamptz not null default now(),
  point_id text not null,                         -- destinations.id or snow_watch_passes.id
  point_kind text not null check (point_kind in ('destination', 'pass')),
  destination_id text references public.destinations(id) on delete cascade,
  pass_id text references public.snow_watch_passes(id) on delete cascade,
  region_id text not null,
  window_start date not null,                     -- first IST day snow is forecast
  window_end date not null,                       -- last IST day snow is forecast
  peak_date date not null,                        -- day with the most model agreement
  confidence text not null check (confidence in ('likely', 'possible')),
  models_agree int not null check (models_agree >= 0),
  models_total int not null check (models_total >= 4),
  snow_cm_low numeric(5,1),                       -- range across agreeing models, ~10:1 snow:water
  snow_cm_high numeric(5,1),
  model_detail jsonb not null default '[]'::jsonb, -- per model: {id,label,snow_mm,precip_mm,min_temp_c,vote}
  imd jsonb not null default '{}'::jsonb,         -- {centre,url,issued,status,mentions_snow,quote,district_warning}
  is_first_of_season boolean not null default false,
  outcome text not null default 'pending' check (outcome in ('pending', 'confirmed', 'unconfirmed')),
  outcome_note text,
  outcome_source_url text,
  outcome_at timestamptz,
  constraint snow_outlooks_window check (window_end >= window_start and peak_date between window_start and window_end),
  constraint snow_outlooks_agree check (models_agree <= models_total),
  constraint snow_outlooks_kind check (
    (point_kind = 'destination' and destination_id = point_id and pass_id is null)
    or (point_kind = 'pass' and pass_id = point_id and destination_id is null)),
  unique (run_date, point_id)
);
create index if not exists snow_outlooks_live_idx on public.snow_outlooks (run_date desc, window_end);
create index if not exists snow_outlooks_dest_idx on public.snow_outlooks (destination_id, run_date desc);
alter table public.snow_outlooks enable row level security;
drop policy if exists "anon read snow outlooks" on public.snow_outlooks;
create policy "anon read snow outlooks" on public.snow_outlooks for select to anon, authenticated using (true);
comment on table public.snow_outlooks is
  'Forward snow forecast per mountain destination or road pass, one row per daily run. Written only by scripts/snow-outlook.mjs. Outcome is scored from evidence after the window ends.';

-- Everything the engine forecasts for: destinations >= 1,500 m (was 1,800 until 114e, which
-- added Srinagar, Jibhi, Tirthan, Kasol, Almora, Gangtok and 16 more) in the snow
-- states, plus the passes. Excluded: Kailash-Mansarovar (Tibet, outcomes cannot
-- be verified) and five trekking SUMMITS whose stored elevation is the peak,
-- where any precipitation is snow and nobody reports it, so an alert is noise
-- (backtest 2026-10-16: they were most of the "flagged, no report" days).
-- Road-accessible high points (Khardung La, Umling La, Gurudongmar) stay.
create or replace view public.snow_watch_points
with (security_invoker = true) as
select d.id, d.name, 'destination'::text as kind, d.state_id as region_id, d.elevation_m,
       round(st_y(d.coords::geometry)::numeric, 4)::float as lat,
       round(st_x(d.coords::geometry)::numeric, 4)::float as lng,
       null::text as road,
       d.translations->'hi'->>'name' as name_hi
from public.destinations d
where d.coords is not null
  and d.elevation_m >= 1500
  and d.state_id in ('himachal-pradesh', 'uttarakhand', 'ladakh', 'jammu-kashmir', 'sikkim', 'arunachal-pradesh', 'west-bengal')
  and d.id not in ('mansarovar-kailash', 'kinner-kailash', 'manimahesh-kailash', 'shrikhand-mahadev', 'adi-kailash', 'roopkund')
union all
select p.id, p.name, 'pass', p.region_id, p.elevation_m, p.lat, p.lng, p.road, p.name_hi
from public.snow_watch_passes p;

grant select on public.snow_watch_points to anon, authenticated;
