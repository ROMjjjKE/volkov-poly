import { useMemo, useState } from 'react';
import { CRITERIA, MATERIALS, type Verdict } from '../data';

const MARK: Record<Verdict, string> = { '+': 'да', '~': 'с оговоркой', '-': 'нет' };

function rank(v: Verdict) {
  return v === '+' ? 2 : v === '~' ? 1 : 0;
}

export default function Pick() {
  const [on, setOn] = useState<string[]>([]);

  const rows = useMemo(() => {
    return MATERIALS.map((m) => {
      const picked = on.map((c) => m.values[c]);
      const worst: Verdict = picked.length
        ? picked.reduce<Verdict>((acc, v) => (rank(v) < rank(acc) ? v : acc), '+')
        : '~';
      return { m, worst, hit: on.length > 0 && worst === '+' };
    });
  }, [on]);

  const hits = rows.filter((r) => r.hit).length;

  const toggle = (id: string) =>
    setOn((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  return (
    <section className="section" id="pokrytiya">
      <div className="wrap">
        <div className="cols shead">
          <div className="shead__num">01</div>
          <div>
            <h2>Пять покрытий и их пределы</h2>
            <p className="shead__note">
              Отметьте условия — таблица покажет, что под ними живёт, а что нет.
            </p>
          </div>
        </div>

        <div className="pick__chips" role="group" aria-label="Условия эксплуатации">
          {CRITERIA.map((c) => (
            <button
              key={c.id}
              className="chip"
              aria-pressed={on.includes(c.id)}
              onClick={() => toggle(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>

        <p className="pick__sum" aria-live="polite">
          {on.length === 0 ? (
            <span>Ничего не отмечено — показаны свойства всех пяти покрытий.</span>
          ) : (
            <>
              <span>
                Под выбранные условия подходят: <b>{hits}</b> из 5
              </span>
              <span>
                {hits === 0 ? '— придётся менять условия или комбинировать покрытия' : ''}
              </span>
            </>
          )}
        </p>

        <div className="mtx">
          <div className="mtx__head" aria-hidden="true">
            <span>№</span>
            <span>Материал</span>
            {CRITERIA.map((c) => (
              <span key={c.id}>{c.short}</span>
            ))}
          </div>

          {rows.map(({ m, worst, hit }) => (
            <article
              key={m.n}
              className={`mtx__row${on.length && !hit && worst === '-' ? ' mtx__row--dim' : ''}${hit ? ' mtx__row--hit' : ''}`}
            >
              <div className="mtx__n">{m.n}</div>
              <div className="mtx__name">
                <b>{m.name}</b>
                <span>{m.what}</span>
              </div>
              {CRITERIA.map((c) => {
                const v = m.values[c.id];
                const cls = v === '+' ? ' mtx__v--ok' : v === '~' ? ' mtx__v--mid' : '';
                return (
                  <div key={c.id} className={`mtx__v${cls}`} data-k={c.short}>
                    {MARK[v]}
                  </div>
                );
              })}
            </article>
          ))}
        </div>

        <p className="pick__note">
          Это ориентир по свойствам материалов, а не замена осмотру: решают состояние основания,
          толщина и производитель. На месте скажу точнее.
        </p>
      </div>
    </section>
  );
}
