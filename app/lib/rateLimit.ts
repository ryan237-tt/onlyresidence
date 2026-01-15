const hits = new Map<string, { count: number; ts: number }>();

export function rateLimit(key: string, limit = 60, windowMs = 60_000) {
  const now = Date.now();
  const cur = hits.get(key);

  if (!cur || now - cur.ts > windowMs) {
    hits.set(key, { count: 1, ts: now });
    return { ok: true };
  }

  cur.count += 1;
  if (cur.count > limit) return { ok: false };

  return { ok: true };
}
