// One-off utility: capture screenshots of each page on namou-ae1.vercel.app
// for the v2 deck-walkthrough section on the broker and buyer pages.
// Run: node capture-deck.js

const { chromium } = require('playwright');
const path = require('path');

const BASE = 'https://namou-ae1.vercel.app';
const OUT = path.join(__dirname, 'assets', 'images', 'deck');

const pages = [
  { path: '/home',        slug: 'deck-home' },
  { path: '/master-plan', slug: 'deck-master-plan' },
  { path: '/offer',       slug: 'deck-offer' },
  { path: '/roi',         slug: 'deck-roi' },
  { path: '/cta',         slug: 'deck-cta' },
  { path: '/thank-you',   slug: 'deck-thank-you' },
];

(async () => {
  require('fs').mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: { width: 1600, height: 1000 },
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();
  for (const p of pages) {
    const url = BASE + p.path;
    console.log('→', url);
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(1500); // let any animations settle
      const file = path.join(OUT, `${p.slug}.png`);
      await page.screenshot({ path: file, fullPage: false });
      console.log('   saved', file);
    } catch (err) {
      console.error('   FAILED:', err.message);
    }
  }
  await browser.close();
})();
