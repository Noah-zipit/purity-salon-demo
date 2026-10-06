import { useEffect, useMemo, useRef, useState } from 'react';
import Silk from './components/Silk/Silk.jsx';

const WA_NUMBER = '923360177734';
const WA_DISPLAY = '0336 0177734';
const IG_URL = 'https://www.instagram.com/puritymassagecenterislamabad';

const SIGNATURE = [
  { name: 'Full-Body Massage', desc: 'Slow, deep strokes that unwind every muscle from shoulders to feet.', img: './p1.jpg', alt: 'Woman receiving a relaxing back massage with an orchid nearby' },
  { name: 'Aroma Massage', desc: 'Warm essential oils and gentle pressure for total calm.', img: './p2.jpg', alt: 'Therapist giving a soothing face and neck massage by candlelight' },
  { name: 'Facial & Skin Rituals', desc: 'Cleansing, gentle exfoliation and glow-restoring care.', img: './p3.jpg', alt: 'Woman enjoying a facial massage in a candlelit spa room' },
];

const MORE = [
  { name: 'Stress-Relief Therapy', desc: 'Targeted work on the neck, back and shoulders where tension lives.' },
  { name: 'Swedish Massage', desc: 'The classic flowing massage — improves circulation and eases stiffness.' },
  { name: 'Foot Massage', desc: 'A focused reset for tired feet after long days on the move.' },
];

const ALL_SERVICES = [...SIGNATURE.map(s => s.name), ...MORE.map(s => s.name)];
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

function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (en.isIntersecting) { el.classList.add('in'); io.disconnect(); }
      }),
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`rv ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

export default function App() {
  const days = useMemo(() => nextDays(7), []);
  const [service, setService] = useState(ALL_SERVICES[0]);
  const [day, setDay] = useState(days[0].full);
  const [time, setTime] = useState(TIMES[2]);

  const heroRef = useRef(null);
  const heroBgRef = useRef(null);
  const heroInnerRef = useRef(null);
  const reduced = typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
        window.dispatchEvent(new CustomEvent('silk-scroll', { detail: p }));
        if (heroBgRef.current) {
          heroBgRef.current.style.transform = `translateY(${window.scrollY * 0.22}px) scale(${1 + p * 0.08})`;
        }
        if (heroInnerRef.current) {
          heroInnerRef.current.style.transform = `translateY(${-window.scrollY * 0.1}px)`;
          heroInnerRef.current.style.opacity = String(1 - p * 0.9);
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, [reduced]);

  const bookingText = `Assalamualaikum! I would like to book a session at Purity Massage Salon.\nService: ${service}\nDay: ${day}\nTime: ${time}`;

  return (
    <>
      {/* HERO — 3D silk, scroll-driven */}
      <header className="hero" ref={heroRef}>
        <div className="hero-bg" ref={heroBgRef}>
          {reduced ? <div className="hero-static" /> : (
            <Silk color="#d3ac72" speed={2.6} scale={1.05} noiseIntensity={1.1} rotation={0} lightMode={true} />
          )}
        </div>
        <div className="hero-shade" />
        <div className="wrap hero-inner" ref={heroInnerRef}>
          <p className="eyebrow">F-11 Markaz · Islamabad</p>
          <h1>Care for your body <em>and</em> mind.</h1>
          <p className="lead">
            Purity Massage Salon — professional massage & spa therapies that relieve
            pain, melt stress and restore your glow.
          </p>
          <div className="cta-row">
            <a className="btn btn-solid" href={waLink('Assalamualaikum! I want to book a session at Purity Massage Salon.')}>
              Book on WhatsApp
            </a>
            <a className="btn btn-ghost" href="#signature">Explore treatments</a>
          </div>
        </div>
        <p className="scroll-hint">Scroll</p>
      </header>

      {/* MARQUEE */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((k) => (
            <span key={k}>
              {ALL_SERVICES.map((s) => <span className="mq-item" key={k + s}>{s} <i>✦</i></span>)}
            </span>
          ))}
        </div>
      </div>

      {/* SIGNATURE TREATMENTS */}
      <section className="block" id="signature">
        <div className="wrap">
          <Reveal><p className="kicker">Signature</p></Reveal>
          <Reveal><h2>Treatments we're known for</h2></Reveal>
          <Reveal><p className="sub">The sessions our clients in F-11 book again and again.</p></Reveal>
          <div className="sig-grid">
            {SIGNATURE.map((s, i) => (
              <Reveal key={s.name} delay={i * 90}>
                <article className="sig-card">
                  <div className="sig-img"><img src={s.img} alt={s.alt} loading="lazy" /></div>
                  <div className="sig-body">
                    <h3>{s.name}</h3>
                    <p>{s.desc}</p>
                    <a href="#book">Book this →</a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MORE THERAPIES */}
      <section className="block alt">
        <div className="wrap">
          <Reveal><p className="kicker">Also available</p></Reveal>
          <Reveal><h2>More ways to unwind</h2></Reveal>
          <div className="mini-list">
            {MORE.map((s, i) => (
              <Reveal key={s.name} delay={i * 70}>
                <div className="mini-row">
                  <span className="num">{String(i + 1).padStart(2, '0')}</span>
                  <div><h3>{s.name}</h3><p>{s.desc}</p></div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="block quote">
        <div className="wrap">
          <Reveal>
            <blockquote>
              “A perfect blend of care for your body and mind.”
            </blockquote>
            <cite>— Purity Massage Salon</cite>
          </Reveal>
        </div>
      </section>

      {/* BOOKING */}
      <section className="block" id="book">
        <div className="wrap">
          <Reveal><p className="kicker">Reserve your session</p></Reveal>
          <Reveal><h2>Book in under a minute</h2></Reveal>
          <Reveal><p className="sub">Pick a treatment, day and time — we confirm on WhatsApp.</p></Reveal>
          <Reveal>
            <div className="book-card">
              <p className="flabel">Treatment</p>
              <div className="chips">
                {ALL_SERVICES.map((s) => (
                  <button key={s} className={'chip' + (service === s ? ' on' : '')}
                    onClick={() => setService(s)}>{s}</button>
                ))}
              </div>
              <p className="flabel">Day</p>
              <div className="chips">
                {days.map((d) => (
                  <button key={d.full} className={'chip' + (day === d.full ? ' on' : '')}
                    onClick={() => setDay(d.full)}>{d.label}</button>
                ))}
              </div>
              <p className="flabel">Time</p>
              <div className="chips">
                {TIMES.map((t) => (
                  <button key={t} className={'chip' + (time === t ? ' on' : '')}
                    onClick={() => setTime(t)}>{t}</button>
                ))}
              </div>
              <a className="btn btn-solid btn-wide" href={waLink(bookingText)} target="_blank" rel="noreferrer">
                Confirm on WhatsApp
              </a>
              <p className="fine">No account needed — your booking opens straight in WhatsApp.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* VISIT */}
      <section className="block alt">
        <div className="wrap">
          <Reveal><p className="kicker">Visit us</p></Reveal>
          <Reveal><h2>Find your calm</h2></Reveal>
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

      <div className="sticky-bar">
        <a className="btn btn-solid" href={waLink('Assalamualaikum! I want to book a session at Purity Massage Salon.')}>Book on WhatsApp</a>
        <a className="btn btn-ghost" href="#book">Pick a slot</a>
      </div>
    </>
  );
}
