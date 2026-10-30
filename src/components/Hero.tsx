const PHONE = '+375 44 763-11-74';
const TEL = 'tel:+375447631174';

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap">
        <div className="hero__grid">
          <div>
            <h1>Устройство пола: от основания до плинтуса</h1>
            <p className="hero__lead">
              Ламинат, кварц-винил, линолеум, дерево и ОСБ. Сначала разбираюсь с основанием:
              перепад, влажность, скрип. Только потом стелю покрытие.
            </p>
            <div className="hero__cta">
              <a className="btn" href={TEL}>Позвонить: {PHONE}</a>
              <a className="btn btn--ghost" href="#pokrytiya">Какое покрытие выбрать</a>
            </div>
            <p className="hero__hint">
              Скажите адрес и метраж — назову цену за метр и ближайшую дату. Работаю с материалом
              заказчика и со своим.
            </p>
          </div>

          <div className="legend" aria-label="Коротко о работе">
            <div className="legend__row">
              <span className="legend__k">Покрытия</span>
              <span className="legend__v"><b>5</b><small>ламинат · кварц-винил · линолеум · дерево · ОСБ</small></span>
            </div>
            <div className="legend__row">
              <span className="legend__k">Основание</span>
              <span className="legend__v">стяжка · фанера · ОСБ по лагам</span>
            </div>
            <div className="legend__row">
              <span className="legend__k">Перепад</span>
              <span className="legend__v">не больше 2 мм на 1 м</span>
            </div>
            <div className="legend__row">
              <span className="legend__k">Зазор у стен</span>
              <span className="legend__v">8–10 мм под плинтус</span>
            </div>
            <div className="legend__row">
              <span className="legend__k">Кто работает</span>
              <span className="legend__v">Волков Владимир, сам</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
