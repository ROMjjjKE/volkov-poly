import { useEffect, useRef } from 'react';

const PHONE = '+375 44 763-11-74';
const TEL = 'tel:+375447631174';

export default function Header() {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = bar.current;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        const p = h > 0 ? Math.min(1, window.scrollY / h) : 0;
        if (el) el.style.transform = `scaleX(${p})`;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);

  return (
    <header className="hdr">
      <div className="wrap hdr__in">
        <a className="hdr__name" href="#top">Волков<i>устройство пола</i></a>
        <nav className="hdr__nav" aria-label="Разделы">
          <a href="#pokrytiya">Покрытия</a>
          <a href="#pirog">Пирог пола</a>
          <a href="#osnovanie">Основание</a>
          <a href="#voprosy">Вопросы</a>
        </nav>
        <a className="tel hdr__tel" href={TEL}>{PHONE}</a>
      </div>
      <div ref={bar} className="hdr__bar" aria-hidden="true" />
    </header>
  );
}
