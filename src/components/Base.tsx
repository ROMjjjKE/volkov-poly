const ITEMS: Array<[string, string, string]> = [
  ['01', 'Демонтаж', 'Снимаю старое покрытие, плинтус, при необходимости — стяжку и ДСП.'],
  ['02', 'Стяжка', 'Наливной или цементный пол, если основание «гуляет» и держать его нечем.'],
  ['03', 'Фанера и ОСБ', 'По лагам или по старому полу: жёсткая плоскость под тонкое покрытие.'],
  ['04', 'Выравнивание', 'Перепад больше 2 мм на метр — и замок начнёт расходиться.'],
  ['05', 'Влажность', 'Стяжка должна высохнуть. Проверяю перед укладкой, а не «на ощупь».'],
];

export default function Base() {
  return (
    <section className="section" id="osnovanie">
      <div className="wrap">
        <div className="cols shead">
          <div className="shead__num">03</div>
          <div>
            <h2>Основание: половина работы</h2>
            <p className="shead__note">
              Пять вещей, которые делаю до того, как откроется первая коробка с покрытием.
            </p>
          </div>
        </div>
        <div className="base__grid reveal">
          {ITEMS.map(([n, t, d]) => (
            <div className="base__item" key={n}>
              <span>{n}</span>
              <b>{t}</b>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
