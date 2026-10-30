const PHONE = '+375 44 763-11-74';
const TEL = 'tel:+375447631174';

export default function Footer() {
  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="ftr__grid">
          <div>
            <b>Волков Владимир Сергеевич</b>
            <p>Устройство пола: ламинат, кварц-винил, линолеум, дерево, ОСБ</p>
          </div>
          <div>
            <p>Телефон</p>
            <a href={TEL}>{PHONE}</a>
          </div>
          <div>
            <p>Разделы</p>
            <p><a href="#pokrytiya">Покрытия</a></p>
            <p><a href="#pirog">Пирог пола</a></p>
            <p><a href="#osnovanie">Основание</a></p>
            <p><a href="#voprosy">Вопросы</a></p>
          </div>
        </div>
        <p className="ftr__legal">
          Сайт носит информационный характер и не является публичной офертой. Цена и сроки
          называются после уточнения метража, адреса и состояния основания. Толщины слоёв
          в разрезе — типовые диапазоны, а не проект конкретного пола.
        </p>
      </div>
    </footer>
  );
}
