import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
for (const w of [320, 390, 480, 768, 1024, 1200, 1440, 1680]) {
  const p = await b.newPage();
  await p.setViewport({ width: w, height: 860 });
  await p.goto('http://127.0.0.1:4280/volkov-poly/', { waitUntil: 'networkidle2' });
  await p.evaluate(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 400));
  console.log(w, await p.evaluate(() => ({
    sw: document.documentElement.scrollWidth,
    h1: getComputedStyle(document.querySelector('h1')).fontSize,
  })));
  await p.close();
}
// пин-сцена
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 900 });
await p.goto('http://127.0.0.1:4280/volkov-poly/', { waitUntil: 'networkidle2' });
await p.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; });
await p.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 700));
const pre = await p.evaluate(() => Math.round(document.querySelector('#pirog').getBoundingClientRect().top + window.scrollY));
await p.evaluate(y => window.scrollTo({ top: y - 500, behavior: 'instant' }), pre);
await new Promise(r => setTimeout(r, 1100));
const stage = await p.evaluate(() => Math.round(document.querySelector('.pie__stage').getBoundingClientRect().top + window.scrollY));
for (const off of [30, 300, 700, 1100, 1500]) {
  await p.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), stage + off);
  await new Promise(r => setTimeout(r, 600));
  console.log(off, await p.evaluate(() => ({
    cls: document.querySelector('.pie').className,
    y: Math.round(document.querySelector('.pie__stage').getBoundingClientRect().top),
    on: document.querySelectorAll('.plate--on').length,
    step: getComputedStyle(document.querySelector('.pie__stack')).getPropertyValue('--step').trim(),
    count: document.querySelector('.pie__count').textContent.trim(),
  })));
}
await b.close();
