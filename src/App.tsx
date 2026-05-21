import { useEffect, useRef, useState } from "react";
import { DEMANDS } from "./demands.ts";
import "./App.css";

import type { Demand } from "./demands";


function useFadeIn() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    obs.observe(el);

    return () => obs.disconnect();
  }, []);

  return ref;
}

const ROACH_CONFIGS = [
  { cls: "r1", size: 26, anim: "roach-lr", dur: "18s", delay: "-3s", opacity: 0.65, style: { bottom: "8%", left: 0 } },
  { cls: "r2", size: 18, anim: "roach-lr", dur: "28s", delay: "-14s", opacity: 0.35, style: { bottom: "28%", left: 0 } },
  { cls: "r3", size: 24, anim: "roach-rl", dur: "22s", delay: "-7s", opacity: 0.6, style: { top: "18%", right: 0 } },
  { cls: "r4", size: 20, anim: "roach-rl", dur: "33s", delay: "-18s", opacity: 0.4, style: { top: "58%", right: 0 } },
  { cls: "r5", size: 22, anim: "roach-bt", dur: "24s", delay: "-10s", opacity: 0.55, style: { right: "6%", top: 0 } },
  { cls: "r6", size: 28, anim: "roach-tb", dur: "30s", delay: "-22s", opacity: 0.5, style: { left: "14%", top: 0 } },
  { cls: "r7", size: 16, anim: "roach-lr", dur: "14s", delay: "-8s", opacity: 0.3, style: { top: "72%", left: 0 } },
  { cls: "r8", size: 20, anim: "roach-bt", dur: "19s", delay: "-5s", opacity: 0.45, style: { left: "42%", top: 0 } },
];

function CockroachLayer() {
  return (
    <div className="roach-layer" aria-hidden="true">
      {ROACH_CONFIGS.map((r) => (
        <span
          key={r.cls}
          style={{
            ...r.style,
            fontSize: r.size,
            opacity: r.opacity,
            animation: `${r.anim} ${r.dur} linear infinite`,
            animationDelay: r.delay,
          }}
          className="roach"
        >
          🪳
        </span>
      ))}
    </div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar${scrolled ? " navbar--scrolled" : ""}`}>
      <a href="#hero" className="navbar__brand">
        <span className="navbar__brand-roach">🪳</span>
        Bharatiya Cockroach
      </a>
      <button
        className={`navbar__hamburger${menuOpen ? " is-open" : ""}`}
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="Toggle menu"
      >
        <span /><span /><span />
      </button>
      <ul className={`navbar__links${menuOpen ? " open" : ""}`}>
        {["demands", "about", "join"].map((s) => (
          <li key={s}>
            <a href={`#${s}`} onClick={() => setMenuOpen(false)}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Ticker() {
  const items = ["Slipper-Free Zones", "Equal Drain Rights", "No More Light Attacks", "Kitchen Sovereignty", "Anti-Lizard Laws", "Midnight Snack Safety"];
  const repeated = [...items, ...items, ...items];
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker__track">
        {repeated.map((item, i) => (
          <span key={i} className="ticker__item">
            🪳 {item} <span className="ticker__sep">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero__grid" aria-hidden="true" />
      <div className="hero__content">
        <p className="hero__eyebrow">Ek Insect · Ek Awaaz · Ek Andolan</p>
        <h1 className="hero__heading">
          <span className="line line--plain">The Most</span>
          <span className="line line--filled">Ignored</span>
          <span className="line line--outline">Voters.</span>
        </h1>
        <p className="hero__sub">Ab bolenge. Aur baar baar bolenge.</p>
        <div className="hero__actions">
          <a href="#demands" className="btn btn--primary">Our Demands 🪳</a>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSe2qJYrMUrGsIptz7oB2kqMOIXApQJxgHkD0MSaO5NZ6SS1ew/viewform"
            target="_blank"
            rel="noreferrer"
            className="btn btn--ghost"
          >
            Join The Movement →
          </a>
        </div>
      </div>
      <div className="hero__bg-roach" aria-hidden="true">🪳</div>
      <div className="hero__scroll-cue" aria-hidden="true">
        <span />
      </div>
    </section>
  );
}
type DemandCardProps = {
  demand: Demand;
  index: number;
};
function DemandCard({ demand, index }: DemandCardProps) {
  return (
    <article className="dcard">
      <span className="dcard__num">{"0" + (index + 1)}</span>
      <div className="dcard__body">
        <h3 className="dcard__title">{demand.title}</h3>
        <p className="dcard__desc">{demand.description}</p>
      </div>
      <span className="dcard__roach" aria-hidden="true">🪳</span>
    </article>
  );
}

function Demands() {
  const ref = useFadeIn();
  
  return (
    <section id="demands" className="section section--surface">
      <div className="container fade-in" ref={ref}>
        <header className="section-header">
          <span className="section-label">What We Want</span>
          <h2 className="section-title">Our Demands</h2>
          <div className="section-title-line" />
        </header>
        
        <div className="demands-grid">
          {DEMANDS.map((d, i) => (
            <DemandCard key={d.id} demand={d} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  const ref = useFadeIn();
  return (
    <section id="about" className="section">
      <div className="container fade-in" ref={ref}>
        <header className="section-header">
          <span className="section-label">Who We Are</span>
          <h2 className="section-title">About The Movement</h2>
          <div className="section-title-line" />
        </header>
        <div className="about-grid">
          <div className="about-block about-block--a">
            <h3 className="about-block__q">Why "Cockroach"?</h3>
            <p className="about-block__a">
              Because no matter how many slippers, sprays, or screams come our way — we always return.
              Survival is our ideology.
            </p>
          </div>
          <div className="about-block about-block--b">
            <h3 className="about-block__q">Who We Are</h3>
            <p className="about-block__a">
              Hostel students, midnight snackers, overworked citizens, and people who run faster after
              switching on the kitchen light.
            </p>
          </div>
          <div className="about-block about-block--c">
            <h3 className="about-block__q">Why We Exist</h3>
            <p className="about-block__a">
              To fight against slipper violence, lizard dictatorship, and the unfair targeting of innocent
              kitchen residents.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Join() {
  const ref = useFadeIn();
  return (
    <section id="join" className="section section--saffron">
      <div className="container fade-in" ref={ref}>
        <div className="join__row" aria-hidden="true">
          {"🪳 ".repeat(16)}
        </div>
        <p className="join__q">Are you a cockroach too?</p>
        <p className="join__sub">Ignored. Resilient. Everywhere. Ready to be counted.</p>
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSe2qJYrMUrGsIptz7oB2kqMOIXApQJxgHkD0MSaO5NZ6SS1ew/viewform"
          target="_blank"
          rel="noreferrer"
          className="btn btn--dark"
        >
          Join The Movement →
        </a>
        <div className="join__row join__row--bot" aria-hidden="true">
          {"🪳 ".repeat(16)}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p className="footer__brand">🪳 Bharatiya Cockroach Dal</p>
        <p className="footer__tagline">Light on karo aur democracy khatam.</p>
        <p className="footer__note">An independent cockroach movement. Not affiliated with any other animal.</p>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <CockroachLayer />
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <Demands />
        <About />
        <Join />
      </main>
      <Footer />
    </>
  );
}