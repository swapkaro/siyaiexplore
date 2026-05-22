// sections-top.jsx — Hero + above-the-fold sections

const HEADLINES = [
  // 0 — emotional, brand voice
  { eyebrow: "Phase I · Gifting",
    head: `Leave your <i>memories</i> to us.`,
    sub: "Their voice. In a letter. A song. A film. Delivered on WhatsApp." },
  // 1 — direct
  { eyebrow: "AI memory gifting · India",
    head: `The gift they will <i>replay</i> forever.`,
    sub: "30 seconds of their voice. We turn it into a letter, a song, a film." },
  // 2 — preservation tilt
  { eyebrow: "From a family in Bengaluru",
    head: `Some voices should never <i>fade</i>.`,
    sub: "Keep their laughter alive for your daughter to hear. SiyAI preserves voice, face and story." },
];

// ───────── Hero ─────────
function Hero({ headline = 0, ctaLabel, onCTA, currency }) {
  const h = HEADLINES[headline] || HEADLINES[0];
  const priceOnCta = ctaLabel.includes("₹") || ctaLabel.includes("$")
    ? ctaLabel
    : `${ctaLabel} · ${currency === "USD" ? "$4" : "₹299"}`;
  return (
    <section style={{ position: "relative", padding: "20px 22px 16px" }}>
      <div aria-hidden style={{
        position: "absolute", inset: "-40px -10% auto -10%", height: 320, zIndex: 0,
        background: "radial-gradient(60% 70% at 60% 40%, color-mix(in oklab, var(--seafoam) 70%, transparent), transparent 70%), radial-gradient(40% 50% at 20% 60%, color-mix(in oklab, var(--sky) 70%, transparent), transparent 70%)",
        filter: "blur(14px)",
        animation: "breathe 9s ease-in-out infinite",
      }} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div className="eyebrow" style={{ marginBottom: 14 }}>{h.eyebrow}</div>
        <h1 className="display" style={{
          margin: 0,
          fontSize: 42, lineHeight: 0.96, letterSpacing: "-0.03em",
          color: "var(--ink)", fontWeight: 400,
        }}>
          <span dangerouslySetInnerHTML={{ __html: h.head }} />
        </h1>
        <p style={{
          marginTop: 14, marginBottom: 16,
          fontSize: 15, lineHeight: 1.45, color: "var(--ink-2)",
          fontFamily: "var(--font-ui)", maxWidth: 340,
        }}>{h.sub}</p>

        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <CTA onClick={onCTA} size="md" style={{ whiteSpace: "nowrap" }}>{priceOnCta}</CTA>
          <a href="#how" className="link-arrow" style={{ whiteSpace: "nowrap" }}>
            How it works <span className="arrow">→</span>
          </a>
        </div>
        <div style={{
          marginTop: 12,
          fontFamily: "var(--font-mono)", fontSize: 10.5, color: "var(--ink-3)",
          letterSpacing: "0.06em", textTransform: "uppercase",
          lineHeight: 1.6,
        }}>
          Ready in 4 hours&nbsp;·&nbsp;Unlimited redos&nbsp;·&nbsp;Money back
        </div>
        <div style={{
          marginTop: 8,
          fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--ink-mute)",
          letterSpacing: "0.08em", textTransform: "uppercase",
          lineHeight: 1.6,
        }}>
          Family consent&nbsp;·&nbsp;Face-verified&nbsp;·&nbsp;Watermarked&nbsp;·&nbsp;DPDPA
        </div>

        {/* THE switchable demo — one dominant + 4 thumbnails */}
        <div style={{ marginTop: 22, height: 380 }}>
          <HeroSwitchableDemo aspectRatio="4 / 3" />
        </div>

        {/* 3 product thumbs visible under demo — catalog peek */}
        <HeroProductPeek currency={currency} />

        <SocialStrip />
      </div>
    </section>
  );
}

function UrgencyStrip() {
  // Single rotating urgency line — calm, not alarmist.
  return (
    <div style={{
      marginTop: 18, marginInline: -2,
      padding: "10px 12px",
      background: "color-mix(in oklab, var(--gold-soft) 35%, var(--ivory))",
      border: "1px solid color-mix(in oklab, var(--gold) 25%, var(--ivory-line))",
      borderRadius: 12,
      display: "flex", alignItems: "center", gap: 10,
    }}>
      <span style={{
        width: 8, height: 8, borderRadius: 99,
        background: "var(--gold)",
        boxShadow: "0 0 0 4px color-mix(in oklab, var(--gold-soft), transparent 40%)",
      }} />
      <div style={{ fontFamily: "var(--font-ui)", fontSize: 13.5, color: "var(--ink-2)", lineHeight: 1.35 }}>
        <span style={{ fontWeight: 600 }}>Diwali in 12 days.</span>{" "}
        <span style={{ color: "var(--ink-3)" }}>Order by Saturday.</span>
      </div>
    </div>
  );
}

function SocialStrip() {
  return (
    <div style={{
      marginTop: 26, paddingTop: 16,
      borderTop: "1px solid var(--ivory-line)",
      display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10,
    }}>
      {[
        { n: "10,000+", l: "families" },
        { n: "4.9/5", l: "rating" },
        { n: "50,000+", l: "gifts" },
      ].map((s, i) => (
        <div key={i} style={{ textAlign: "left" }}>
          <div className="mono" style={{ fontSize: 14, color: "var(--ink)", fontWeight: 500 }}>{s.n}</div>
          <div style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>{s.l}</div>
        </div>
      ))}
    </div>
  );
}

// ───────── Hero Product Teaser (3 hero products) ─────────
function HeroProductTeaser({ currency, onProduct }) {
  const items = [
    { id: "voice-letter", title: "Voice Letter", price: 299, dur: "60 sec", tag: "Har saal Papa ki awaaz", label: "papa on phone" },
    { id: "living-portrait", title: "Living Portrait", price: 499, dur: "Photo, alive", tag: "Dadi ki photo boli", label: "dadi 1987", tone: "sky" },
    { id: "memory-film", title: "Memory Film", price: 1999, dur: "1-2 min film", tag: "Aapki kahaani, ek film mein", label: "family reunion", tone: "gold", badge: "NEW" },
  ];
  return (
    <section style={{ padding: "8px 22px 0" }}>
      <div style={{
        display: "flex", overflowX: "auto", gap: 12, paddingBottom: 12, marginInline: -22, paddingInline: 22,
      }} className="no-scrollbar">
        {items.map(p => (
          <button key={p.id} onClick={() => onProduct?.(p.id)} className="pcard" style={{
            flex: "0 0 188px", padding: 0, textAlign: "left", cursor: "pointer", background: "var(--ivory)",
          }}>
            <div className="ph">
              <PhotoSlot label={p.label} tone={p.tone || "ivory"} />
              {p.badge && <span className="badge mint" style={{ position: "absolute", top: 10, left: 10 }}>{p.badge}</span>}
            </div>
            <div className="body">
              <h3>{p.title}</h3>
              <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)", whiteSpace: "nowrap" }}>{p.dur}</div>
              <div className="tag" style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}>"{p.tag}"</div>
              <div style={{
                marginTop: 6, paddingTop: 8,
                borderTop: "1px solid var(--ivory-line)",
                display: "flex", alignItems: "baseline", gap: 6,
              }}>
                <span className="mono" style={{ fontSize: 10, color: "var(--ink-3)", textTransform: "uppercase", letterSpacing: "0.12em" }}>from</span>
                <span className="mono" style={{ fontSize: 13, color: "var(--ink)" }}>{fmtPrice(p.price, currency)}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

// ───────── Stop-the-scroll · WhatsApp voice-note moment ─────────
function ChatAvatar({ photoKey, initial }) {
  const [src, setSrc] = useState(() => photoKey && window.SiyAIPhotos ? window.SiyAIPhotos.getPhoto(photoKey) : null);
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  useEffect(() => {
    if (!photoKey || !window.SiyAIPhotos) return;
    const handler = (e) => {
      if (!e.detail || e.detail.all || e.detail.key === photoKey) {
        setSrc(window.SiyAIPhotos.getPhoto(photoKey));
        setLoaded(false);
        setErrored(false);
      }
    };
    window.addEventListener("siyai-photo-change", handler);
    return () => window.removeEventListener("siyai-photo-change", handler);
  }, [photoKey]);
  const showImage = src && !errored;
  return (
    <>
      {showImage && (
        <img src={src} alt="" onLoad={() => setLoaded(true)} onError={() => setErrored(true)}
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover", opacity: loaded ? 1 : 0, transition: "opacity .4s ease",
          }} />
      )}
      {(!showImage || !loaded) && initial}
    </>
  );
}

function WhatsAppMoment() {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
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
    <section style={{ padding: "44px 22px 14px", position: "relative" }}>
      <SectionHead
        num="04"
        label="A real moment"
        title={`On Diwali, Papa wished us. <i>He has been gone three years.</i>`}
      />
      {/* WhatsApp-style chat surface */}
      <div style={{
        marginTop: 8,
        background: "linear-gradient(180deg, #EFE9DC, #E7E0CE)",
        borderRadius: 22,
        padding: 14,
        border: "1px solid var(--ivory-line)",
        boxShadow: "var(--shadow-card)",
      }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 10, paddingBottom: 10,
          borderBottom: "1px solid rgba(14,18,23,0.06)",
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 99,
            background: "radial-gradient(circle at 30% 30%, #D6B98A, #8C6939)",
            display: "grid", placeItems: "center",
            fontFamily: "var(--font-display)", color: "#fff", fontSize: 16, fontStyle: "italic",
            overflow: "hidden", position: "relative",
          }}>
            <ChatAvatar photoKey="whatsapp-papa-avatar" initial="P" />
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-ui)", fontSize: 14, fontWeight: 600, color: "var(--ink)" }}>Papa</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, color: "var(--ink-3)", letterSpacing: "0.06em" }}>
              SiyAI · delivered today, 09:14
            </div>
          </div>
          <div style={{ marginLeft: "auto" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#25D366" strokeWidth="1.6"/>
              <path d="M9 8l7 4-7 4V8z" fill="#25D366"/>
            </svg>
          </div>
        </div>
        {/* Voice-note bubble */}
        <div style={{ marginTop: 14, display: "flex" }}>
          <div style={{
            background: "#fff", borderRadius: "16px 16px 16px 4px",
            padding: "10px 12px", display: "flex", alignItems: "center", gap: 10,
            maxWidth: "82%", boxShadow: "0 1px 0 rgba(0,0,0,0.04)",
          }}>
            <button onClick={() => setPlaying(p => !p)} aria-label="Play voice note" style={{
              width: 34, height: 34, borderRadius: 99, border: 0,
              background: "var(--emerald)", color: "var(--ink)",
              display: "grid", placeItems: "center", cursor: "pointer", flexShrink: 0,
            }}>
              {playing
                ? <svg width="12" height="12" viewBox="0 0 16 16"><rect x="3" y="2" width="3.5" height="12" rx="1"/><rect x="9.5" y="2" width="3.5" height="12" rx="1"/></svg>
                : <svg width="12" height="12" viewBox="0 0 16 16"><path d="M3 2v12l11-6L3 2z"/></svg>}
            </button>
            <Waveform playing={playing} progress={progress} />
            <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>0:14</span>
          </div>
        </div>
        <div style={{ marginTop: 8, paddingLeft: 4, display: "flex", justifyContent: "flex-end" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--ink-3)", letterSpacing: "0.06em" }}>
            HAPPY DIWALI, BETA · 09:14 ✓✓
          </span>
        </div>
      </div>
      <p style={{
        marginTop: 16, fontFamily: "var(--font-display)", fontStyle: "italic",
        fontSize: 16, lineHeight: 1.45, color: "var(--ink-2)",
      }}>
        Built from a 30-second voice note her son had on his phone, and three old photographs. <span style={{ color: "var(--ink-3)" }}>The family asked us not to share the audio. They listen alone.</span>
      </p>
    </section>
  );
}

function Waveform({ playing, progress }) {
  const bars = 28;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 2, height: 22, flex: 1 }}>
      {Array.from({ length: bars }).map((_, i) => {
        const heights = [0.4, 0.7, 0.5, 0.9, 0.6, 0.8, 0.45, 0.95, 0.7, 0.55, 0.85, 0.5, 0.4, 0.7, 0.6, 0.9, 0.55, 0.8, 0.45, 0.7, 0.5, 0.95, 0.6, 0.4, 0.75, 0.55, 0.85, 0.5];
        const pct = i / bars;
        const active = pct <= progress;
        return (
          <div key={i} style={{
            width: 2.5,
            height: `${heights[i] * 100}%`,
            background: active ? "var(--emerald-deep)" : "var(--ink-mute)",
            borderRadius: 2,
            transformOrigin: "center",
            animation: playing && !active ? `wpulse ${0.9 + (i % 5) * 0.12}s ease-in-out infinite` : "none",
            opacity: active ? 1 : 0.5,
          }} />
        );
      })}
    </div>
  );
}

// ───────── Shop by Occasion ─────────
function ShopByOccasion({ onPick }) {
  const items = [
    { k: "Birthday", n: 12 },
    { k: "Anniversary", n: 10 },
    { k: "Wedding", n: 8 },
    { k: "Sangeet", n: 6 },
    { k: "Graduation", n: 7 },
    { k: "Just because", n: 9 },
    { k: "Apology", n: 4 },
    { k: "Memorial", n: 6 },
  ];
  return (
    <section style={{ padding: "8px 0 0" }}>
      <SectionHead
        title={`Pick the day. <i>We do the feeling.</i>`}
      />
      <div style={{
        padding: "4px 22px 18px",
        display: "flex", flexWrap: "wrap", gap: 8,
      }}>
        {items.map(it => (
          <button key={it.k} onClick={() => onPick?.(it.k)} className="chip" style={{ cursor: "pointer" }}>
            <span>{it.k}</span>
            <span className="ct">{String(it.n).padStart(2, "0")}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

Object.assign(window, {
  HEADLINES, Hero, HeroProductTeaser, WhatsAppMoment, Waveform, ShopByOccasion, SocialStrip,
});
