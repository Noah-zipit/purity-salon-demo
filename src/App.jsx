import { useEffect, useMemo, useRef, useState } from 'react';
import Iridescence from './components/Iridescence/Iridescence.jsx';

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
  const reduced = typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const heroRef = useRef(null);
  const heroBgRef = useRef(null);
  const heroInnerRef = useRef(null);

  // Reel-style: the scroll drives the 3D hero — parallax + intensifying flow
  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const hero = heroRef.current;
        if (!hero) return;
        const h = hero.offsetHeight || 1;
        const p = Math.max(0, Math.min(1, window.scrollY / h));
        window.dispatchEvent(new CustomEvent('purity-scroll', { detail: p }));
        if (heroBgRef.current) {
          heroBgRef.current.style.transform =
            `translateY(${window.scrollY * 0.22}px) scale(${1 + p * 0.1})`;
        }
        if (heroInnerRef.current) {
          heroInnerRef.current.style.transform = `translateY(${-window.scrollY * 0.12}px)`;
          heroInnerRef.current.style.opacity = String(1 - p * 0.85);
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, [reduced]);

  const bookingText = `Assalamualaikum! I would like to book a session at Purity Massage Salon.\nService: ${service}\nDay: ${day}\nTime: ${time}`;

  return (
    <>
      {/* HERO */}
      <header className="hero" ref={heroRef}>
        <div className="hero-bg" ref={heroBgRef}>
          {reduced
            ? <div className="hero-static" />
            : <Iridescence color={[1.0, 0.88, 0.7]} speed={0.7} amplitude={0.12} mouseReact={true} />}
        </div>
        <div className="hero-shade" />
        <div className="wrap hero-inner" ref={heroInnerRef}>
          <p className="eyebrow">F-11 Markaz · Islamabad</p>
          <h1>Purity <em>Massage</em> Salon</h1>
          <p className="lead">A perfect blend of care for your body and mind.</p>
          <div className="cta-row">
            <a className="btn btn-gold" href={waLink('Assalamualaikum! I want to book a session at Purity Massage Salon.')}>
              Book on WhatsApp
            </a>
            <a className="btn btn-ghost" href="#services">View services</a>
          </div>
        </div>
        <p className="scroll-hint">Scroll</p>
      </header>

      {/* SERVICES */}
      <section className="block" id="services">
        <div className="wrap">
          <p className="kicker">Treatments</p>
          <h2 className="title">Choose how you unwind</h2>
          <p className="sub">Professional massage services at honest rates, in a calm and private setting.</p>
          <div className="svc-grid">
            {SERVICES.map((s, i) => (
              <div className="svc" key={s.name}>
                <div className="dot">{['✦', '❋', '✧', '❀', '✶', '✺'][i]}</div>
                <div>
                  <h3>{s.name}</h3>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="block exp" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <p className="kicker">The experience</p>
          <h2 className="title">Your sanctuary in F-11</h2>
          <figure style={{ marginTop: 22 }}>
            <img src="/spa.jpg" alt="Therapist giving a relaxing back massage at Purity Massage Salon" loading="lazy" />
          </figure>
          <blockquote>
            “Massage therapies that relieve pain, improve circulation, melt away stress
            and restore your sense of wellness.”
          </blockquote>
          <cite>— Purity Massage Salon</cite>
        </div>
      </section>

      {/* BOOKING */}
      <section className="block" id="book" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <p className="kicker">Reserve your session</p>
          <h2 className="title">Book in under a minute</h2>
          <p className="sub">Pick a treatment, day and time — we will confirm on WhatsApp.</p>
          <div className="book-card">
            <label>1 · Treatment</label>
            <div className="chips">
              {SERVICES.map((s) => (
                <button key={s.name} className={'chip' + (service === s.name ? ' on' : '')}
                  onClick={() => setService(s.name)}>{s.name}</button>
              ))}
            </div>
            <label>2 · Day</label>
            <div className="chips">
              {days.map((d) => (
                <button key={d.full} className={'chip' + (day === d.full ? ' on' : '')}
                  onClick={() => setDay(d.full)}>{d.label}</button>
              ))}
            </div>
            <label>3 · Time</label>
            <div className="chips">
              {TIMES.map((t) => (
                <button key={t} className={'chip' + (time === t ? ' on' : '')}
                  onClick={() => setTime(t)}>{t}</button>
              ))}
            </div>
            <a className="btn btn-gold book-cta" href={waLink(bookingText)} target="_blank" rel="noreferrer">
              Confirm on WhatsApp
            </a>
            <p className="book-note">No account needed — your booking opens straight in WhatsApp.</p>
          </div>
        </div>
      </section>

      {/* VISIT */}
      <section className="block" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <p className="kicker">Visit us</p>
          <h2 className="title">Find your calm</h2>
          <div className="visit-rows">
            <a className="visit-row" href={waLink('Assalamualaikum! I want to book a session at Purity Massage Salon.')}>
              <span className="k">WhatsApp</span>
              <span className="v">{WA_DISPLAY}<small>Tap to chat & book</small></span>
            </a>
            <div className="visit-row">
              <span className="k">Location</span>
              <span className="v">F-11 Markaz<small>Islamabad</small></span>
            </div>
            <a className="visit-row" href={IG_URL} target="_blank" rel="noreferrer">
              <span className="k">Instagram</span>
              <span className="v">@puritymassagecenterislamabad<small>See our work</small></span>
            </a>
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <p className="fbrand">Purity Massage Salon</p>
          <p>F-11 Markaz, Islamabad · <a href={waLink('Assalamualaikum!')}>{WA_DISPLAY}</a></p>
          <p style={{ marginTop: 10 }}>Design concept · Elevate Mavens</p>
        </div>
      </footer>

      {/* sticky mobile CTA */}
      <div className="sticky-bar">
        <a className="btn btn-gold" href={waLink('Assalamualaikum! I want to book a session at Purity Massage Salon.')}>Book on WhatsApp</a>
        <a className="btn btn-ghost" href="#book">Pick a slot</a>
      </div>
    </>
  );
}
