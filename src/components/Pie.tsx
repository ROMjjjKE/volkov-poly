import { useEffect, useRef, useState } from 'react';
import { LAYERS } from '../data';

export default function Pie() {
  const [pin, setPin] = useState(false);
  const [active, setActive] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 981px)');
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!desktop.matches || calm.matches) {
      setActive(LAYERS.length - 1);
      return;
    }

    let killed = false;
    let st: { kill: () => void } | null = null;
    let io: IntersectionObserver | null = null;

    const begin = () =>
      Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
        ([{ default: gsap }, { ScrollTrigger }]) => {
          if (killed || !stageRef.current) return;
          gsap.registerPlugin(ScrollTrigger);
          setPin(true);
          requestAnimationFrame(() => {
            if (killed || !stageRef.current || !stackRef.current) return;
            const stack = stackRef.current;
            let last = -1;
            st = ScrollTrigger.create({
              trigger: stageRef.current,
              start: 'top top',
              end: '+=170%',
              pin: true,
              scrub: 0.5,
              invalidateOnRefresh: true,
              onUpdate: (self: { progress: number }) => {
                const p = self.progress;
                const step = 6 + p * 26;
                stack.style.setProperty('--step', `${step.toFixed(1)}px`);
                const idx = Math.min(LAYERS.length - 1, Math.floor(p * LAYERS.length * 0.999));
                if (idx !== last) {
                  last = idx;
                  setActive(idx);
                }
              },
            });
          });
        }
      );

    io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io?.disconnect();
          io = null;
          begin();
        }
      },
      { rootMargin: '320px 0px' }
    );
    if (stageRef.current) io.observe(stageRef.current);

    return () => {
      killed = true;
      io?.disconnect();
      st?.kill();
    };
  }, []);

  return (
    <section className={`section pie${pin ? ' pie--pin' : ''}`} id="pirog">
      <div ref={stageRef} className="pie__stage">
        <div className="wrap pie__grid">
          <div className="pie__scene" aria-hidden="true">
            <div ref={stackRef} className="pie__stack">
              {LAYERS.map((l, i) => (
                <div
                  key={l.n}
                  className={`plate${i === active ? ' plate--on' : ''}`}
                  style={{ ['--i' as string]: i }}
                />
              ))}
            </div>
          </div>

          <div>
            <div className="cols shead">
              <div className="shead__num">02</div>
              <div>
                <h2>Пирог пола: что под покрытием</h2>
                <p className="shead__note">
                  Шесть слоёв снизу вверх. Пол живёт не из-за ламината, а из-за того, что под ним.
                </p>
              </div>
            </div>

            <div className="pie__list">
              {LAYERS.map((l, i) => (
                <div
                  key={l.n}
                  className={`pie__item${i === active ? ' pie__item--on' : ''}${i < active ? ' pie__item--done' : ''}`}
                >
                  <span className="pie__i">{l.n}</span>
                  <span className="pie__t">
                    {l.t}
                    <small>{l.d}</small>
                  </span>
                  <span className="pie__mm">{l.mm} мм</span>
                </div>
              ))}
            </div>
            <p className="pie__count">
              {String(active + 1).padStart(2, '0')} / {String(LAYERS.length).padStart(2, '0')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
