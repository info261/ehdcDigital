-- First-party analytics for ehdcdigital.com.
-- Apply with: node --env-file=.env.local scripts/analytics-migrate.mjs

CREATE TABLE IF NOT EXISTS analytics_events (
  id            BIGSERIAL PRIMARY KEY,
  ts            TIMESTAMPTZ NOT NULL DEFAULT now(),
  -- 'pageview' | 'vital' | 'event'
  type          TEXT NOT NULL,
  path          TEXT NOT NULL,
  -- Event name ('outbound', a data-track value) or vital name ('LCP', 'INP', …)
  name          TEXT,
  value         DOUBLE PRECISION,
  -- Web-vitals rating: 'good' | 'needs-improvement' | 'poor'
  rating        TEXT,
  props         JSONB,
  referrer      TEXT,
  utm_source    TEXT,
  utm_medium    TEXT,
  utm_campaign  TEXT,
  country       TEXT,
  city          TEXT,
  device        TEXT,
  browser       TEXT,
  os            TEXT,
  -- Daily-rotating hash of IP + user agent. Not reversible, not linkable across days.
  visitor       TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS analytics_events_ts_idx ON analytics_events (ts);
CREATE INDEX IF NOT EXISTS analytics_events_type_ts_idx ON analytics_events (type, ts);
