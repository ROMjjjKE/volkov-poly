import puppeteer from 'puppeteer-core';
const URL = 'https://romjjjke.github.io/volkov-poly/';
const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
const errs = [];
const p = await b.newPage();
p.on('pageerror', e => errs.push(e.message));
await p.setViewport({ width: 1440, height: 900 });
await p.goto(URL, { waitUntil: 'networkidle2' });
await p.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; });
await p.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 900));
await p.screenshot({ path: 'screenshots/desktop-1440.png' });
for (const [id, name] of [['#pokrytiya', 'pokrytiya'], ['#osnovanie', 'osnovanie'], ['#pravila', 'pravila'], ['#voprosy', 'voprosy'], ['#zayavka', 'zayavka']]) {
  await p.evaluate(s => document.querySelector(s).scrollIntoView(), id);
  await new Promise(r => setTimeout(r, 700));
  await p.screenshot({ path: `screenshots/desktop-${name}.png` });
}
await p.evaluate(() => { const el = document.querySelector('#pirog'); window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 500, behavior: 'instant' }); });
await new Promise(r => setTimeout(r, 1100));
const stage = await p.evaluate(() => Math.round(document.querySelector('.pie__stage').getBoundingClientRect().top + window.scrollY));
await p.evaluate(y => window.scrollTo({ top: y + 900, behavior: 'instant' }), stage);
await new Promise(r => setTimeout(r, 800));
await p.screenshot({ path: 'screenshots/desktop-pirog.png' });
console.log('pie', await p.evaluate(() => ({ cls: document.querySelector('.pie').className, n: document.querySelector('.pie__count').textContent.trim() })));
await p.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await p.goto(URL, { waitUntil: 'networkidle2' });
await p.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 800));
await p.screenshot({ path: 'screenshots/mobile-390.png' });
for (const [id, name] of [['#pokrytiya', 'pokrytiya'], ['#pirog', 'pirog'], ['#zayavka', 'zayavka']]) {
  await p.evaluate(s => document.querySelector(s).scrollIntoView(), id);
  await new Promise(r => setTimeout(r, 650));
  await p.screenshot({ path: `screenshots/mobile-390-${name}.png` });
}
await p.setViewport({ width: 1200, height: 630 });
await p.goto(URL, { waitUntil: 'networkidle2' });
await p.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 800));
await p.screenshot({ path: 'og-src.png' });
console.log('shots ok, errors:', errs.slice(0, 2));
await b.close();
