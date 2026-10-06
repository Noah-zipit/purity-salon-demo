import { useMemo, useState } from 'react';

const WA_NUMBER = '923360177734';
const WA_DISPLAY = '0336 0177734';
const IG_URL = 'https://www.instagram.com/puritymassagecenterislamabad';

const SERVICES = [
  { name: 'Full-Body Massage', desc: 'Slow, deep strokes that unwind every muscle from shoulders to feet.' },
  { name: 'Aroma Massage', desc: 'Warm essential oils and gentle pressure for total calm.' },
  { name: 'Stress-Relief Therapy', desc: 'Targeted work on the neck, back and shoulders where tension lives.' },
  { name: 'Swedish Massage', desc: 'The classic flowing massage — improves circulation and eases stiffness.' },
  { name: 'Foot Massage', desc: 'A focused reset for tired feet after long days on the move.' },
  { name: 'Facial & Skin Rituals', desc: 'Cleansing, gentle exfoliation and glow-restoring care.' },
];

const TIMES = ['11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM', '7:00 PM'];

function nextDays(n) {
  const out = [];
  const fmt = new Intl.DateTimeFormat('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
  for (let i = 0; i < n; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    out.push({ label: i === 0 ? 'Today' : fmt.format(d), full: fmt.format(d) });
  }
  return out;
}

const waLink = (text) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

export default function App() {
  const days = useMemo(() => nextDays(7), []);
  const [service, setService] = useState(SERVICES[0].name);
  const [day, setDay] = useState(days[0].full);
  const [time, setTime] = useState(TIMES[2]);

  const bookingText = `Assalamualaikum! I would like to book a session at Purity Massage Salon.\nService: ${service}\nDay: ${day}\nTime: ${time}`;

  return (
    <>
      <header className="topbar">
        <div className="wrap topbar-inner">
          <span className="brand">Purity Massage Salon</span>
          <span className="locale">F-11 · Islamabad</span>
        </div>
      </header>

      <section className="hero">
        <div className="wrap">
          <p className="eyebrow">Massage & Spa · F-11 Markaz</p>
          <h1>Care for your body <em>and</em> mind.</h1>
          <p className="lead">
            Professional massage therapies in the heart of Islamabad —
            relief for pain, stress and tired muscles, in a calm private setting.
          </p>
          <div className="cta-row">
            <a className="btn btn-solid" href={waLink('Assalamualaikum! I want to book a session at Purity Massage Salon.')}>
              Book on WhatsApp
            </a>
            <a className="btn btn-link" href="#services">View treatments</a>
          </div>
        </div>
      </section>

      <section className="block" id="services">
        <div className="wrap">
          <p className="kicker">Treatments</p>
          <h2>Therapies we offer</h2>
          <div className="svc-list">
            {SERVICES.map((s, i) => (
              <div className="svc-row" key={s.name}>
                <span className="num">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{s.name}</h3>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="block" id="book">
        <div className="wrap">
          <p className="kicker">Reserve your session</p>
          <h2>Book in under a minute</h2>
          <p className="sub">Pick a treatment, day and time — we confirm on WhatsApp.</p>

          <p className="flabel">Treatment</p>
          <div className="chips">
            {SERVICES.map((s) => (
              <button key={s.name}
                className={'chip' + (service === s.name ? ' on' : '')}
                onClick={() => setService(s.name)}>{s.name}</button>
            ))}
          </div>

          <p className="flabel">Day</p>
          <div className="chips">
            {days.map((d) => (
              <button key={d.full}
                className={'chip' + (day === d.full ? ' on' : '')}
                onClick={() => setDay(d.full)}>{d.label}</button>
            ))}
          </div>

          <p className="flabel">Time</p>
          <div className="chips">
            {TIMES.map((t) => (
              <button key={t}
                className={'chip' + (time === t ? ' on' : '')}
                onClick={() => setTime(t)}>{t}</button>
            ))}
          </div>

          <a className="btn btn-solid btn-wide" href={waLink(bookingText)} target="_blank" rel="noreferrer">
            Confirm on WhatsApp
          </a>
          <p className="fine">No account needed — your booking opens straight in WhatsApp.</p>
        </div>
      </section>

      <section className="block">
        <div className="wrap">
          <p className="kicker">Visit us</p>
          <h2>Find us</h2>
          <div className="visit">
            <a className="visit-row" href={waLink('Assalamualaikum! I want to book a session at Purity Massage Salon.')}>
              <span>WhatsApp</span><strong>{WA_DISPLAY}</strong>
            </a>
            <div className="visit-row">
              <span>Location</span><strong>F-11 Markaz, Islamabad</strong>
            </div>
            <a className="visit-row" href={IG_URL} target="_blank" rel="noreferrer">
              <span>Instagram</span><strong>@puritymassagecenterislamabad</strong>
            </a>
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <p className="fbrand">Purity Massage Salon</p>
          <p>F-11 Markaz, Islamabad · {WA_DISPLAY}</p>
        </div>
      </footer>
    </>
  );
}
