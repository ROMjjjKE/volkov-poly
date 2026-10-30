import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 900 });
await p.goto('http://127.0.0.1:4280/volkov-poly/', { waitUntil: 'networkidle2' });
await p.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; });
await p.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 500));
const chips = await p.$$('.chip');
await chips[0].click(); // тёплый пол
await new Promise(r => setTimeout(r, 300));
console.log('тёплый пол:', await p.evaluate(() => document.querySelector('.pick__sum').innerText.trim()));
await chips[1].click(); // влага
await new Promise(r => setTimeout(r, 300));
console.log('+ влага:', await p.evaluate(() => ({
  sum: document.querySelector('.pick__sum').innerText.trim(),
  dim: document.querySelectorAll('.mtx__row--dim').length,
  hit: document.querySelectorAll('.mtx__row--hit').length,
})));
await chips[0].click(); await chips[1].click();
await new Promise(r => setTimeout(r, 300));
console.log('сброс:', await p.evaluate(() => ({ sum: document.querySelector('.pick__sum').innerText.trim().slice(0, 60), dim: document.querySelectorAll('.mtx__row--dim').length })));
// скриншоты
await p.evaluate(() => document.querySelector('#pokrytiya').scrollIntoView());
await new Promise(r => setTimeout(r, 500));
await p.screenshot({ path: 'shots/v-mtx.png' });
await p.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
await new Promise(r => setTimeout(r, 400));
await p.screenshot({ path: 'shots/v-hero.png' });
await b.close();
