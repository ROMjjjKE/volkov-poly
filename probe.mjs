import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
const p = await b.newPage();
const errs = [];
p.on('pageerror', e => errs.push(e.message));
await p.setViewport({ width: 1440, height: 900 });
await p.goto('http://127.0.0.1:4280/volkov-poly/', { waitUntil: 'networkidle2' });
await p.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 700));
console.log(JSON.stringify(await p.evaluate(() => {
  const c = document.createElement('canvas').getContext('2d');
  const s = 'Устройство пола: ламинат, кварц-винил, линолеум, дерево и ОСБ 8–10 мм';
  const w = f => { c.font = f; return +c.measureText(s).width.toFixed(1); };
  return {
    rubik: w('400 40px Rubik'), arial: w('400 40px Arial'),
    mono: w('400 40px "Mono"'), courier: w('400 40px "Courier New"'),
    rRubik: +(w('400 40px Rubik') / w('400 40px Arial')).toFixed(4),
    rMono: +(w('400 40px "Mono"') / w('400 40px "Courier New"')).toFixed(4),
    h1: document.querySelector('h1').textContent,
    rows: document.querySelectorAll('.mtx__row').length,
    plates: document.querySelectorAll('.plate').length,
    fonts: [...document.fonts].filter(f => f.status === 'loaded').length,
  };
}), null, 1), errs);
await b.close();
