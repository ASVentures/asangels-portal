import express from 'express';
import Anthropic from '@anthropic-ai/sdk';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

if (!process.env.ANTHROPIC_API_KEY) {
  console.error('FATAL: ANTHROPIC_API_KEY environment variable is not set. Exiting.');
  process.exit(1);
}

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const NEWS_FEEDS = [
  {query:"Red Sky Health AI denial management insurance 2026",label:"Red Sky Health",type:"Portfolio"},
  {query:"Youlify medical billing AI automation 2026",label:"Youlify",type:"Portfolio"},
  {query:"Adipothera lymphedema PPARgamma topical 2026",label:"Adipothera",type:"Portfolio"},
  {query:"Calaris Diagnostics salivary liver fibrosis SALF 2026",label:"Calaris Dx",type:"Portfolio"},
  {query:"Extrinsic Immunity NETrolyze TNBC neutrophil 2026",label:"EIT",type:"Portfolio"},
  {query:"Epic Airway Systems 510k airway intubation EMS 2026",label:"Epic Airway",type:"Portfolio"},
  {query:"OraTek saliva concussion TBI biomarker NFL 2026",label:"OraTek",type:"Portfolio"},
  {query:"SeeMedX heart failure bioimpedance hemodynamic 2026",label:"SeeMedX",type:"Portfolio"},
  {query:"KareFusion AI multilingual healthcare voice agent 2026",label:"KareFusion AI",type:"Portfolio"},
  {query:"insurance claim denial AI revenue cycle management 2026",label:"RCM Industry",type:"Industry"},
  {query:"salivary diagnostics biomarker FDA clearance 2026",label:"Salivary Dx",type:"Industry"},
  {query:"lymphedema drug treatment clinical trial FDA 2026",label:"Lymphedema",type:"Industry"},
];

const app = express();
const PORT = process.env.PORT || 3001;

// --- Rate limiting (in-memory, per IP, 10 req/min) ---
const rateMap = new Map();
function rateLimiter(req, res, next) {
  const ip = req.ip || req.socket?.remoteAddress || 'unknown';
  const now = Date.now();
  const windowMs = 60_000;
  const max = 10;
  const entry = rateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + windowMs });
    return next();
  }
  if (entry.count >= max) {
    return res.status(429).json({ error: 'Too many requests — try again in a minute.' });
  }
  entry.count++;
  next();
}

// --- In-memory cache ---
let cachedArticles = null;
let cacheTimestamp = 0;
const CACHE_TTL_MS = 4 * 60 * 60 * 1000; // 4 hours

async function refreshCache() {
  console.log('[news] refreshing cache...');
  const articles = [];
  for (const feed of NEWS_FEEDS) {
    try {
      const response = await anthropic.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 500,
        tools: [{ type: 'web_search_20250305', name: 'web_search' }],
        messages: [{
          role: 'user',
          content: `Search for the 2 most recent news headlines (2025-2026) about: "${feed.query}". Return ONLY a JSON array like: [{"headline":"...","source":"...","date":"...","summary":"..."}]. No other text.`,
        }],
      });

      const text = response.content
        .filter(c => c.type === 'text')
        .map(c => c.text)
        .join('');

      const clean = text.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(clean);
      parsed.forEach(item => articles.push({ ...item, label: feed.label, type: feed.type }));
    } catch (e) {
      console.error(`[news] feed "${feed.label}" failed:`, e.message);
    }
  }
  if (articles.length > 0) {
    cachedArticles = articles;
    cacheTimestamp = Date.now();
    console.log(`[news] cache refreshed: ${articles.length} articles`);
  } else {
    console.error('[news] cache refresh failed: 0 articles');
  }
}

// Kick off initial cache fill in background, do NOT await
refreshCache();

// Refresh cache every hour
setInterval(refreshCache, CACHE_TTL_MS);

app.get('/api/news', rateLimiter, (req, res) => {
  if (cachedArticles) return res.json({ articles: cachedArticles });
  return res.status(503).json({ error: 'News feed warming up — try again in a minute.' });
});

// VCP Meeting Calendar — served from calendar-data.json, written by the
// Python agent every 2 hours. Returns { events: [], generated_at: null }
// when the file isn't present yet so the client can render an empty state
// gracefully.
app.get('/api/calendar', rateLimiter, (req, res) => {
  const calPath = join(__dirname, 'calendar-data.json');
  if (!existsSync(calPath)) return res.json({ events: [], generated_at: null });
  try {
    const data = JSON.parse(readFileSync(calPath, 'utf8'));
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: 'Could not read calendar data' });
  }
});

// Serve built client for all other routes (SPA fallback)
app.use(express.static(join(__dirname, 'dist')));
app.get(/.*/, (_req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`ASAngels portal server running on port ${PORT}`);
});
