// desktop-top.jsx — top half of the desktop homepage
// nav · hero · hero products row · whatsapp moment · memory film hero

const { useState: useStateD, useEffect: useEffectD } = React;

// ───────── Desktop top nav ─────────
function TopNavD({ currency, onCurrency, onSignIn, onStart }) {
  const navRef = React.useRef(null);
  const [scrolled, setScrolled] = useStateD(false);
  useEffectD(() => {
    if (!navRef.current) return;
    // walk up to find the scrolling ancestor
    let sc = navRef.current.parentElement;
    while (sc) {
      const cs = getComputedStyle(sc);
      if (cs.overflowY === 'auto' || cs.overflowY === 'scroll') break;
      sc = sc.parentElement;
    }
    if (!sc) return;
    const onScroll = () => setScrolled(sc.scrollTop > 8);
    sc.addEventListener('scroll', onScroll);
    onScroll();
    return () => sc.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div ref={navRef} style={{
      position: "sticky", top: 0, zIndex: 30,
      background: scrolled ? "color-mix(in oklab, var(--ivory) 90%, transparent)" : "transparent",
      backdropFilter: scrolled ? "blur(14px) saturate(140%)" : "none",
      WebkitBackdropFilter: scrolled ? "blur(14px) saturate(140%)" : "none",
      borderBottom: scrolled ? "1px solid var(--ivory-line)" : "1px solid transparent",
      transition: "background .25s ease, border-color .25s ease, backdrop-filter .25s ease",
    }}>
      <div className="dt-container-wide" style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "20px 40px",
      }}>
        <Logo />
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <a href="#create" className="dt-link" style={{ fontSize: 14, color: "var(--ink-2)", whiteSpace: "nowrap" }}>Create</a>
          <a href="#preserve" className="dt-link" style={{ fontSize: 14, color: "var(--ink-2)", whiteSpace: "nowrap" }}>Preserve</a>
          <a href="#film" className="dt-link" style={{ fontSize: 14, color: "var(--ink-2)", whiteSpace: "nowrap" }}>Memory Film</a>
          <a href="#plans" className="dt-link" style={{ fontSize: 14, color: "var(--ink-2)", whiteSpace: "nowrap" }}>Pricing</a>
          <span style={{ width: 1, height: 22, background: "var(--ivory-line)" }} />
          <CurrencyPill currency={currency} onCurrency={onCurrency} />
          <button onClick={onSignIn} style={{
            background: "transparent", border: 0,
            fontFamily: "var(--font-ui)", fontSize: 14, fontWeight: 500,
            color: "var(--ink)", padding: "8px 4px", cursor: "pointer",
          }}>Sign in</button>
          <button onClick={onStart} className={scrolled ? "dt-cta" : "dt-ghost"} style={{
            padding: scrolled ? "12px 20px" : "11px 20px",
            fontSize: 14,
          }}>
            Send a memory
            {scrolled && (
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ───────── Hero ─────────
function HeroD({ headline = 0, variant = "cinema", currency, ctaLabel, onCTA }) {
  const h = HEADLINES[headline] || HEADLINES[0];
  const priceOnCta = ctaLabel.includes("₹") || ctaLabel.includes("$")
    ? ctaLabel
    : `${ctaLabel} · ${currency === "USD" ? "$4" : "₹299"}`;
  return (
    <section style={{ position: "relative", padding: "56px 0 48px", overflow: "hidden" }}>
      <div aria-hidden style={{
        position: "absolute", inset: "-80px -10% auto -10%", height: 720, zIndex: 0,
        background: "radial-gradient(55% 60% at 50% 50%, color-mix(in oklab, var(--seafoam) 60%, transparent), transparent 70%), radial-gradient(40% 50% at 80% 70%, color-mix(in oklab, var(--sky) 55%, transparent), transparent 70%), radial-gradient(30% 30% at 20% 30%, color-mix(in oklab, var(--gold-soft) 50%, transparent), transparent 70%)",
        filter: "blur(12px)",
        animation: "breathe 11s ease-in-out infinite",
      }} />
      <div className="dt-container" style={{
        position: "relative", zIndex: 1,
        display: "grid", gridTemplateColumns: "1fr 1.05fr", gap: 56, alignItems: "center",
      }}>
        <div>
          <div className="dt-eyebrow" style={{ marginBottom: 24 }}>
            <span>{h.eyebrow}</span>
          </div>
          <h1 className="dt-display dt-headline-xl" style={{ margin: 0 }}
              dangerouslySetInnerHTML={{ __html: h.head }} />
          <p className="dt-lede" style={{ marginTop: 22, fontSize: 18 }}>{h.sub}</p>
          <div style={{ marginTop: 28, display: "flex", alignItems: "center", gap: 22 }}>
            <button className="dt-cta" onClick={onCTA}>
              {priceOnCta}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <a href="#how" className="dt-link">How it works <span className="arrow">→</span></a>
          </div>
          <DesktopHeroPromise />
          <div style={{
            marginTop: 4,
            fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-mute)",
            letterSpacing: "0.08em", textTransform: "uppercase",
          }}>
            Family consent&nbsp;·&nbsp;Face-verified&nbsp;·&nbsp;Watermarked&nbsp;·&nbsp;DPDPA
          </div>
          <HeroProductPeek currency={currency} desktop />
        </div>
        <div style={{ height: 560 }}>
          <HeroSwitchableDemo aspectRatio="16 / 11" desktop />
        </div>
      </div>
      <div className="dt-container" style={{
        marginTop: 48, paddingTop: 28,
        borderTop: "1px solid var(--ivory-line)",
        display: "flex", gap: 56, flexWrap: "wrap",
      }}>
        {[
          { n: "10,000+", l: "families" },
          { n: "4.9 / 5", l: "rating · 2,341 reviews" },
          { n: "50,000+", l: "gifts created" },
          { n: "Made in", l: "India · DPDPA compliant" },
        ].map((s, i) => (
          <div key={i} style={{ whiteSpace: "nowrap" }}>
            <div className="mono" style={{ fontSize: 18, color: "var(--ink)", fontWeight: 500 }}>{s.n}</div>
            <div style={{ fontSize: 11.5, color: "var(--ink-3)", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "var(--font-mono)", marginTop: 3 }}>{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function DesktopHeroPromise() {
  return (
    <div style={{
      marginTop: 14,
      fontFamily: "var(--font-mono)", fontSize: 11.5, color: "var(--ink-3)",
      letterSpacing: "0.08em", textTransform: "uppercase",
    }}>
      Ready in 4 hours&nbsp;·&nbsp;Unlimited redos&nbsp;·&nbsp;Money back
    </div>
  );
}

function DesktopUrgencyStrip() {
  return (
    <div style={{
      marginTop: 28,
      padding: "12px 18px",
      background: "color-mix(in oklab, var(--gold-soft) 35%, var(--ivory))",
      border: "1px solid color-mix(in oklab, var(--gold) 25%, var(--ivory-line))",
      borderRadius: 14,
      display: "inline-flex", alignItems: "center", gap: 12,
    }}>
      <span style={{
        width: 9, height: 9, borderRadius: 99,
        background: "var(--gold)",
        boxShadow: "0 0 0 5px color-mix(in oklab, var(--gold-soft), transparent 40%)",
      }} />
      <div style={{ fontFamily: "var(--font-ui)", fontSize: 15, color: "var(--ink-2)" }}>
        <span style={{ fontWeight: 600 }}>Diwali in 12 days.</span>{" "}
        <span style={{ color: "var(--ink-3)" }}>Order by Saturday.</span>
      </div>
    </div>
  );
}

// Cinema: huge headline left, ambient halo right, product peek bottom-right
function HeroCinema({ copy, ctaLabel, onCTA }) {
  return (
    <section style={{ position: "relative", padding: "72px 0 56px", overflow: "hidden" }}>
      <div aria-hidden style={{
        position: "absolute", inset: "-80px -10% auto 30%", height: 720, zIndex: 0,
        background: "radial-gradient(55% 60% at 50% 50%, color-mix(in oklab, var(--seafoam) 75%, transparent), transparent 70%), radial-gradient(40% 50% at 80% 70%, color-mix(in oklab, var(--sky) 70%, transparent), transparent 70%), radial-gradient(30% 30% at 20% 30%, color-mix(in oklab, var(--gold-soft) 60%, transparent), transparent 70%)",
        filter: "blur(8px)",
        animation: "breathe 11s ease-in-out infinite",
      }} />
      <div className="dt-container" style={{ position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 60, alignItems: "end", minHeight: 540 }}>
        <div>
          <div className="dt-eyebrow" style={{ marginBottom: 32 }}>
            <span>{copy.eyebrow}</span>
          </div>
          <h1 className="dt-display dt-headline-xxl" style={{ margin: 0, color: "var(--ink)" }}
              dangerouslySetInnerHTML={{ __html: copy.head }} />
          <p className="dt-lede" style={{ marginTop: 28, fontSize: 19 }}>{copy.sub}</p>
          <div style={{ marginTop: 36, display: "flex", alignItems: "center", gap: 24 }}>
            <button className="dt-cta" onClick={onCTA}>
              {ctaLabel}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <a href="#how" className="dt-link">How it works <span className="arrow">→</span></a>
          </div>
          <DesktopHeroPromise />
          <LiveActivityTicker desktop />
          <PullQuote desktop />
          <DesktopUrgencyStrip />
          <div style={{
            marginTop: 56, paddingTop: 24,
            borderTop: "1px solid var(--ivory-line)",
            display: "flex", gap: 56,
          }}>
            {[
              { n: "10,000+", l: "families" },
              { n: "4.9 / 5", l: "rating · 2,341 reviews" },
              { n: "50,000+", l: "gifts created" },
              { n: "made in", l: "India · DPDPA compliant" },
            ].map((s, i) => (
              <div key={i} style={{ whiteSpace: "nowrap" }}>
                <div className="mono" style={{ fontSize: 18, color: "var(--ink)", fontWeight: 500 }}>{s.n}</div>
                <div style={{ fontSize: 11.5, color: "var(--ink-3)", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "var(--font-mono)", marginTop: 3 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        {/* peek product */}
        <div style={{ position: "relative", height: 540 }}>
          <FloatingProductCard />
        </div>
      </div>
    </section>
  );
}

function FloatingProductCard() {
  return (
    <div style={{
      position: "absolute", right: -40, bottom: 60, width: 320,
      transform: "rotate(2deg)",
      borderRadius: 22, overflow: "hidden",
      background: "var(--ivory)",
      border: "1px solid var(--ivory-line)",
      boxShadow: "0 50px 100px -40px rgba(14,18,23,0.25), 0 0 0 1px rgba(14,18,23,0.04)",
    }}>
      <PhotoSlot label="" tone="gold" style={{ aspectRatio: "4 / 5" }} photoKey="hero-floating-card" />
      <div style={{ padding: 18, display: "flex", flexDirection: "column", gap: 4 }}>
        <div className="mono" style={{ fontSize: 10, letterSpacing: "0.16em", color: "var(--ink-3)" }}>VOICE LETTER · 60 SEC</div>
        <div style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 22, letterSpacing: "-0.02em", marginTop: 2 }}>
          "Maa, happy birthday."
        </div>
        <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span className="mono" style={{ fontSize: 13, color: "var(--ink-2)" }}>₹299</span>
          <Stars value={5} size={11} />
        </div>
      </div>
    </div>
  );
}

// Editorial: 2-column, more magazine-like
function HeroEditorial({ copy, ctaLabel, onCTA }) {
  return (
    <section style={{ position: "relative", padding: "72px 0 56px", overflow: "hidden" }}>
      <div className="dt-container" style={{
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center", minHeight: 580,
      }}>
        <div>
          <div className="dt-eyebrow" style={{ marginBottom: 28 }}>
            <span>{copy.eyebrow}</span>
          </div>
          <h1 className="dt-display dt-headline-xl" style={{ margin: 0 }}
              dangerouslySetInnerHTML={{ __html: copy.head }} />
          <p className="dt-lede" style={{ marginTop: 24 }}>{copy.sub}</p>
          <div style={{ marginTop: 32, display: "flex", alignItems: "center", gap: 22 }}>
            <button className="dt-cta" onClick={onCTA}>
              {ctaLabel}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <a href="#how" className="dt-link">How it works <span className="arrow">→</span></a>
          </div>
          <DesktopHeroPromise />
          <LiveActivityTicker desktop />
          <PullQuote desktop />
          <DesktopUrgencyStrip />
          <div style={{ marginTop: 44, display: "flex", gap: 48 }}>
            {[
              { n: "10,000+", l: "families" },
              { n: "4.9 / 5", l: "rating" },
              { n: "50,000+", l: "gifts" },
            ].map((s, i) => (
              <div key={i} style={{ whiteSpace: "nowrap" }}>
                <div className="mono" style={{ fontSize: 17, color: "var(--ink)", fontWeight: 500 }}>{s.n}</div>
                <div style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "var(--font-mono)", marginTop: 2 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position: "relative", height: 560 }}>
          <div aria-hidden style={{
            position: "absolute", inset: 0, borderRadius: 28, overflow: "hidden",
          }}>
            <PhotoSlot label="nani threads jasmine" tone="seafoam" style={{ height: "100%", aspectRatio: "auto" }} photoKey="hero-atmospheric" />
          </div>
          <div aria-hidden style={{
            position: "absolute", left: -40, top: -30,
            width: 240, height: 240, borderRadius: 999,
            background: "radial-gradient(50% 50% at 50% 50%, color-mix(in oklab, var(--gold-soft) 70%, transparent), transparent 70%)",
            filter: "blur(20px)",
          }} />
          {/* caption card overlay */}
          <div style={{
            position: "absolute", left: 24, bottom: 24, right: 24,
            background: "color-mix(in oklab, var(--ivory) 92%, transparent)",
            backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
            border: "1px solid var(--ivory-line)",
            borderRadius: 16, padding: 18,
          }}>
            <div className="mono" style={{ fontSize: 10.5, letterSpacing: "0.16em", color: "var(--ink-3)", textTransform: "uppercase" }}>
              FAMILY № 8421 · LIVING PORTRAIT
            </div>
            <div style={{ marginTop: 6, fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 18, letterSpacing: "-0.01em" }}>
              "Dadi ki photo boli. Sab ro pade."
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ───────── Hero products row · 3 large cards ─────────
function HeroProductsRowD({ currency }) {
  const items = [
    { id: "voice-letter", title: "Voice Letter", price: 299, dur: "60 sec, in their voice", tag: "Har saal Papa ki awaaz", label: "papa, retired" },
    { id: "living-portrait", title: "Living Portrait", price: 499, dur: "Photograph, alive", tag: "Dadi ki photo boli", label: "dadi 1962", tone: "sky" },
    { id: "memory-film", title: "Memory Film", price: 1999, dur: "1-2 min cinematic", tag: "Aapki kahaani, ek film mein", label: "reunion, gulmarg", tone: "gold", badge: "NEW" },
  ];
  return (
    <section className="dt-section-tight">
      <div className="dt-container">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {items.map(p => (
            <div key={p.id} className="dt-pcard">
              <div style={{ position: "relative" }}>
                <PhotoSlot label={p.label} tone={p.tone || "ivory"} style={{ aspectRatio: "4 / 5" }} photoKey={p.photoKey} />
                {p.badge && (
                  <span style={{
                    position: "absolute", top: 14, left: 14,
                    background: "var(--mint)", color: "var(--ink)",
                    fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.16em",
                    padding: "6px 10px", borderRadius: 100, textTransform: "uppercase",
                  }}>{p.badge}</span>
                )}
              </div>
              <div style={{ padding: "22px 22px 24px", display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
                  <h3 style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 400, fontSize: 28, letterSpacing: "-0.02em" }}>{p.title}</h3>
                  <span className="mono" style={{ fontSize: 15, color: "var(--ink-2)" }}>{fmtPrice(p.price, currency)}</span>
                </div>
                <div className="mono" style={{ fontSize: 12, color: "var(--ink-3)", letterSpacing: "0.04em" }}>{p.dur}</div>
                <div style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 16, color: "var(--ink-3)", marginTop: 6 }}>"{p.tag}"</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ───────── WhatsApp moment — desktop ─────────
function WhatsAppMomentD() {
  const [playing, setPlaying] = useStateD(false);
  const [progress, setProgress] = useStateD(0);
  useEffectD(() => {
    if (!playing) return;
    const start = Date.now();
    const dur = 14000;
    const id = setInterval(() => {
      const p = Math.min(1, (Date.now() - start) / dur);
      setProgress(p);
      if (p >= 1) { clearInterval(id); setPlaying(false); }
    }, 80);
    return () => clearInterval(id);
  }, [playing]);

  return (
    <section className="dt-section">
      <div className="dt-container" style={{
        display: "grid", gridTemplateColumns: "1fr 1.15fr", gap: 80, alignItems: "center",
      }}>
        <div>
          <div className="dt-eyebrow" style={{ marginBottom: 28 }}>
            <span>№ 04</span><span>A real moment</span>
          </div>
          <h2 className="dt-display dt-headline-lg" style={{ margin: 0 }}>
            On Diwali, Papa wished us. <span style={{ fontStyle: "italic", color: "var(--ink-3)" }}>He has been gone three years.</span>
          </h2>
          <p style={{
            marginTop: 24, fontFamily: "var(--font-display)", fontStyle: "italic",
            fontSize: 19, lineHeight: 1.5, color: "var(--ink-2)", maxWidth: 460,
          }}>
            Built from a 30-second voice note her son had on his phone, and three old photographs.
          </p>
          <p style={{ marginTop: 8, fontSize: 14, color: "var(--ink-3)", maxWidth: 460 }}>
            The family asked us not to share the audio. They listen alone. This is what the message looked like when it arrived.
          </p>
          <div style={{
            marginTop: 32, paddingTop: 18, borderTop: "1px solid var(--ivory-line)",
            display: "flex", gap: 40,
          }}>
            <Step n="30 sec" l="of voice. Anything." />
            <Step n="3 hours" l="our team works." />
            <Step n="1 tap" l="on WhatsApp." />
          </div>
        </div>
        {/* chat phone */}
        <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
          <div aria-hidden style={{
            position: "absolute", inset: "-10% 10% -10% 10%",
            background: "radial-gradient(60% 70% at 50% 50%, color-mix(in oklab, var(--gold-soft) 65%, transparent), transparent 70%)",
            filter: "blur(20px)",
          }} />
          <WhatsAppCard playing={playing} setPlaying={setPlaying} progress={progress} />
        </div>
      </div>
    </section>
  );
}

function Step({ n, l }) {
  return (
    <div>
      <div className="mono" style={{ fontSize: 15, color: "var(--ink)", fontWeight: 500 }}>{n}</div>
      <div style={{ fontSize: 12.5, color: "var(--ink-3)", letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: "var(--font-mono)", marginTop: 4 }}>{l}</div>
    </div>
  );
}

function WhatsAppCard({ playing, setPlaying, progress }) {
  return (
    <div style={{
      position: "relative", width: 540, maxWidth: "100%",
      background: "linear-gradient(180deg, #EFE9DC, #E7E0CE)",
      borderRadius: 32, padding: 24,
      border: "1px solid var(--ivory-line)",
      boxShadow: "0 60px 100px -40px rgba(14,18,23,0.28), 0 0 0 1px rgba(14,18,23,0.04)",
    }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 12, paddingBottom: 14,
        borderBottom: "1px solid rgba(14,18,23,0.06)",
      }}>
        <div style={{
          width: 46, height: 46, borderRadius: 99,
          background: "radial-gradient(circle at 30% 30%, #D6B98A, #8C6939)",
          display: "grid", placeItems: "center",
          fontFamily: "var(--font-display)", color: "#fff", fontSize: 20, fontStyle: "italic",
        }}>P</div>
        <div>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: 16, fontWeight: 600, color: "var(--ink)" }}>Papa</div>
          <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.06em", marginTop: 2 }}>
            SIYAI · DELIVERED TODAY, 09:14
          </div>
        </div>
        <div style={{ marginLeft: "auto" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#25D366" strokeWidth="1.6"/>
            <path d="M9 8l7 4-7 4V8z" fill="#25D366"/>
          </svg>
        </div>
      </div>
      <div style={{ marginTop: 18, display: "flex" }}>
        <div style={{
          background: "#fff", borderRadius: "18px 18px 18px 4px",
          padding: "12px 14px", display: "flex", alignItems: "center", gap: 12,
          maxWidth: "92%", boxShadow: "0 1px 0 rgba(0,0,0,0.04)",
        }}>
          <button onClick={() => setPlaying(p => !p)} aria-label="Play voice note" style={{
            width: 40, height: 40, borderRadius: 99, border: 0,
            background: "var(--emerald)", color: "var(--ink)",
            display: "grid", placeItems: "center", cursor: "pointer", flexShrink: 0,
          }}>
            {playing
              ? <svg width="14" height="14" viewBox="0 0 16 16"><rect x="3" y="2" width="3.5" height="12" rx="1"/><rect x="9.5" y="2" width="3.5" height="12" rx="1"/></svg>
              : <svg width="14" height="14" viewBox="0 0 16 16"><path d="M3 2v12l11-6L3 2z"/></svg>}
          </button>
          <Waveform playing={playing} progress={progress} />
          <span className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>0:14</span>
        </div>
      </div>
      <div style={{ marginTop: 10, display: "flex", justifyContent: "flex-end" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, color: "var(--ink-3)", letterSpacing: "0.06em" }}>
          HAPPY DIWALI, BETA · 09:14 ✓✓
        </span>
      </div>
    </div>
  );
}

// ───────── Memory Film hero — desktop, full-bleed cinema ─────────
function MemoryFilmHeroD({ currency, onCTA }) {
  const [playing, setPlaying] = useStateD(false);
  const caption = useCycle([
    "Mumbai, 1987.",
    "Papa rolls his bicycle out of the garage.",
    "He teaches me to balance.",
    "We are still laughing.",
  ], 2800);

  return (
    <section id="film" className="dt-section" style={{ position: "relative", overflow: "hidden" }}>
      <div aria-hidden style={{
        position: "absolute", inset: "120px -5% 200px -5%",
        background: "radial-gradient(50% 50% at 30% 50%, color-mix(in oklab, var(--gold-soft) 50%, transparent), transparent 70%)",
        filter: "blur(20px)", pointerEvents: "none",
      }} />
      <div className="dt-container" style={{ position: "relative" }}>
        <div className="dt-eyebrow" style={{ marginBottom: 22 }}>
          <span>№ 02</span><span>Memory Film</span><span>crafted in 48 hours</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 40, alignItems: "end", marginBottom: 40 }}>
          <h2 className="dt-display dt-headline-xl" style={{ margin: 0, maxWidth: 900 }}>
            Everybody wants to see themselves in a <span style={{ fontStyle: "italic", color: "var(--emerald-deep)" }}>movie</span>.
          </h2>
          <p className="dt-lede" style={{ maxWidth: 380, fontSize: 17 }}>
            Write the memory. We weave it into a 1-2 minute cinematic short. Real faces, real voices.
          </p>
        </div>
        {/* full-bleed cinema */}
        <div style={{
          background: "var(--ink)",
          borderRadius: 24, overflow: "hidden",
          boxShadow: "0 60px 120px -50px rgba(14,18,23,0.5), 0 0 0 1px rgba(14,18,23,0.04)",
        }}>
          <div style={{ position: "relative", aspectRatio: "21 / 9" }}>
            <PhotoSlot label="papa, a bicycle, 1987" tone="ink" photoKey="memory-film-still" />
            <div aria-hidden style={{
              position: "absolute", inset: "-20% 30% 40% -10%",
              background: "radial-gradient(50% 60% at 40% 40%, color-mix(in oklab, var(--gold), transparent 30%), transparent 70%)",
              filter: "blur(8px)", opacity: 0.55,
            }} />
            <div aria-hidden style={{
              position: "absolute", inset: 0,
              backgroundImage: "repeating-linear-gradient(0deg, rgba(255,253,247,0.025) 0 1px, transparent 1px 3px)",
              mixBlendMode: "screen",
            }} />
            <button onClick={() => setPlaying(p => !p)} aria-label="Play" style={{
              position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)",
              width: 96, height: 96, borderRadius: 99,
              background: "rgba(255,253,247,0.10)",
              border: "1px solid rgba(255,253,247,0.22)",
              backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
              color: "var(--ivory)",
              display: "grid", placeItems: "center", cursor: "pointer",
            }}>
              {playing
                ? <svg width="28" height="28" viewBox="0 0 16 16" fill="currentColor"><rect x="3" y="2" width="3.5" height="12" rx="1"/><rect x="9.5" y="2" width="3.5" height="12" rx="1"/></svg>
                : <svg width="32" height="32" viewBox="0 0 16 16" fill="currentColor" style={{ marginLeft: 4 }}><path d="M3 2v12l11-6L3 2z"/></svg>}
            </button>
            {[
              { top: 16, left: 16, b: "tl" }, { top: 16, right: 16, b: "tr" },
              { bottom: 16, left: 16, b: "bl" }, { bottom: 16, right: 16, b: "br" },
            ].map((p, i) => {
              const c = "rgba(255,253,247,0.4)";
              return (
                <div key={i} style={{ position: "absolute", ...p, width: 22, height: 22,
                  borderTop: i < 2 ? `1px solid ${c}` : 0,
                  borderBottom: i >= 2 ? `1px solid ${c}` : 0,
                  borderLeft: i % 2 === 0 ? `1px solid ${c}` : 0,
                  borderRight: i % 2 === 1 ? `1px solid ${c}` : 0,
                }} />
              );
            })}
          </div>
          <div style={{
            padding: "20px 28px 22px",
            display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24,
            background: "var(--ink)",
            borderTop: "1px solid rgba(255,253,247,0.08)",
          }}>
            <div className="mono" style={{ fontSize: 11.5, letterSpacing: "0.18em", color: "rgba(255,253,247,0.5)", textTransform: "uppercase", whiteSpace: "nowrap" }}>
              MEMORY FILM No. 0021 · 1:42 · 4K
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 19, color: "var(--ivory)", letterSpacing: "-0.01em" }}>
              {caption}
            </div>
          </div>
        </div>
        <div style={{ marginTop: 32, display: "grid", gridTemplateColumns: "1fr auto", gap: 40, alignItems: "center" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, auto)", gap: 56, justifyContent: "start" }}>
            {[
              { k: "WRITE", v: "tell us the memory" },
              { k: "CRAFT", v: "48 hours, by hand" },
              { k: "SEND", v: "WhatsApp, no app" },
            ].map(s => (
              <div key={s.k} style={{ whiteSpace: "nowrap" }}>
                <div className="mono" style={{ fontSize: 10.5, letterSpacing: "0.18em", color: "var(--ink-3)" }}>{s.k}</div>
                <div style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 15.5, color: "var(--ink-2)", marginTop: 4 }}>{s.v}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <span className="mono" style={{ fontSize: 12, color: "var(--ink-3)", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>unlimited revisions</span>
            <button className="dt-cta" onClick={onCTA}>
              Start your film · {fmtPrice(1999, currency)}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, {
  TopNavD, HeroD, HeroCinema, HeroEditorial, FloatingProductCard,
  DesktopHeroPromise, DesktopUrgencyStrip,
  HeroProductsRowD, WhatsAppMomentD, WhatsAppCard, Step, MemoryFilmHeroD,
});
