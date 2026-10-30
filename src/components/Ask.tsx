import { useState } from 'react';
import { MATERIALS } from '../data';

const PHONE = '+375 44 763-11-74';
const TEL = 'tel:+375447631174';
const WA = 'https://wa.me/375447631174';

export default function Ask() {
  const [err, setErr] = useState('');
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get('name') || '').trim();
    const phone = String(f.get('phone') || '').trim();
    if (name.length < 2) return setErr('Напишите, как к вам обращаться.');
    if (phone.replace(/\D/g, '').length < 9) return setErr('Проверьте номер телефона.');
    setErr('');
    const text = [
      'Заявка на устройство пола',
      `Имя: ${name}`,
      `Телефон: ${phone}`,
      `Адрес: ${f.get('addr') || '—'}`,
      `Метраж: ${f.get('area') || '—'} м²`,
      `Покрытие: ${f.get('mat') || 'не выбрано'}`,
      `Пожелания: ${f.get('note') || '—'}`,
    ].join('\n');
    window.open(`${WA}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    setSent(true);
  };

  return (
    <section className="section ask" id="zayavka">
      <div className="wrap ask__grid">
        <div>
          <h2>Скажите метраж и адрес</h2>
          <p>
            Назову цену за метр и ближайший день. Если сомневаетесь в покрытии — разберёмся
            по телефону, до выезда.
          </p>
          <div className="ask__phones">
            <a className="tel tel--solid" href={TEL}>{PHONE}</a>
            <a className="btn btn--ghost" href={WA} target="_blank" rel="noopener noreferrer">
              Написать в WhatsApp
            </a>
          </div>
        </div>

        <form className="form" onSubmit={submit} noValidate>
          <div className="half">
            <div className="field">
              <label htmlFor="f-name">Имя</label>
              <input id="f-name" name="name" autoComplete="name" placeholder="Как вас зовут" />
            </div>
            <div className="field">
              <label htmlFor="f-phone">Телефон</label>
              <input id="f-phone" name="phone" inputMode="tel" autoComplete="tel" placeholder="+375" />
            </div>
          </div>
          <div className="half">
            <div className="field">
              <label htmlFor="f-addr">Адрес или район</label>
              <input id="f-addr" name="addr" placeholder="Где делать пол" />
            </div>
            <div className="field">
              <label htmlFor="f-area">Метраж, м²</label>
              <input id="f-area" name="area" inputMode="numeric" placeholder="Например, 42" />
            </div>
          </div>
          <div className="field">
            <label htmlFor="f-mat">Покрытие</label>
            <select id="f-mat" name="mat" defaultValue="">
              <option value="">Пока не выбрал</option>
              {MATERIALS.map((m) => (
                <option key={m.n} value={m.name}>{m.name}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="f-note">Что важно знать</label>
            <textarea id="f-note" name="note" placeholder="Старый пол, стяжка, тёплый пол, сроки" />
          </div>
          {err && <p className="form__err" role="alert">{err}</p>}
          <button className="btn" type="submit">
            {sent ? 'Откройте WhatsApp и отправьте' : 'Отправить в WhatsApp'}
          </button>
          <p className="form__fine">
            Заявка откроется в WhatsApp с готовым текстом — отправляете вы, я отвечаю в тот же день.
            Форма ничего не сохраняет на сайте.
          </p>
        </form>
      </div>
    </section>
  );
}
