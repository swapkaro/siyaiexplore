// sections-film.jsx — Memory Film hero moment
// 3 treatments: cinema / phone / strip — picked via tweak.

const FILM_COPY = {
  cinema: {
    eyebrow: "№ 02 · Memory Film · crafted in 48 hours",
    head: `Everybody wants to see themselves in a <i>movie</i>.`,
    sub: "Write the memory. We weave it into a 1-2 minute film. Real faces, real voices.",
    captions: [
      "Mumbai, 1987.",
      "Papa rolls his bicycle out of the garage.",
      "He teaches me to balance.",
      "We are still laughing.",
    ],
    title: "A film of the day Papa taught me to ride.",
    meta: "MEMORY FILM № 0021 · 1:42 · 4K",
    cta: "Start your film",
  },
  phone: {
    eyebrow: "№ 02 · Memory Film · in your family chat",
    head: `Your story. Real faces. Real <i>film</i>.`,
    sub: "We turn a paragraph of memory into a cinematic short. Sent the way every Indian family sends everything — on WhatsApp.",
    captions: ["Maya · Memory Film", "1m 42s · delivered today", "Tap to play"],
    title: "Maya watched her parents' wedding for the first time.",
    meta: "WHATSAPP DELIVERY · 1:42",
    cta: "Send a film",
  },
  strip: {
    eyebrow: "№ 02 · Memory Film · a four-frame preview",
    head: `Four frames. <i>One whole life.</i>`,
    sub: "Every Memory Film starts as a sequence of stills. Real photographs, real handwriting, real voices. The motion comes last.",
    captions: ["Stills from 'A film for Maa'"],
    title: "Stills from a film our team made for Meera in Pune.",
    meta: "CONTACT SHEET · 4 / 86 FRAMES",
    cta: "Begin your film",
  },
};

// ───────── shared: rolling captions ─────────
function useCycle(items, ms = 3200) {
  const [i, setI] = React.useState(0);
  React.useEffect(() => {
    if (!items || items.length <= 1) return;
    const id = setInterval(() => setI(x => (x + 1) % items.length), ms);
    return () => clearInterval(id);
  }, [items, ms]);
  return items[i];
}

// ───────── Cinema treatment ─────────
function CinemaPlayer({ playing, onPlay, copy }) {
  const caption = useCycle(copy.captions, 2800);
  return (
    <div style={{
      background: "var(--ink)",
      borderRadius: 18, overflow: "hidden",
      boxShadow: "0 30px 80px -40px rgba(14,18,23,0.55), 0 0 0 1px rgba(14,18,23,0.06)",
    }}>
      {/* 16:9 frame */}
      <div style={{ position: "relative", aspectRatio: "16 / 9" }}>
        <PhotoSlot label="" tone="ink" photoKey="memory-film-still" />
        {/* gold key-light */}
        <div aria-hidden style={{
          position: "absolute", inset: "-20% 30% 40% -10%",
          background: "radial-gradient(50% 60% at 40% 40%, color-mix(in oklab, var(--gold), transparent 35%), transparent 70%)",
          filter: "blur(6px)", opacity: 0.55,
        }} />
        {/* scanline grain */}
        <div aria-hidden style={{
          position: "absolute", inset: 0,
          backgroundImage: "repeating-linear-gradient(0deg, rgba(255,253,247,0.025) 0 1px, transparent 1px 3px)",
          mixBlendMode: "screen",
        }} />
        {/* play button */}
        <button onClick={onPlay} aria-label="Play memory film" style={{
          position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)",
          width: 62, height: 62, borderRadius: 99,
          background: playing ? "rgba(255,253,247,0.06)" : "rgba(255,253,247,0.10)",
          border: "1px solid rgba(255,253,247,0.18)",
          backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
          color: "var(--ivory)",
          display: "grid", placeItems: "center", cursor: "pointer",
          transition: "transform .18s ease",
        }}>
          {playing
            ? <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor"><rect x="3" y="2" width="3.5" height="12" rx="1"/><rect x="9.5" y="2" width="3.5" height="12" rx="1"/></svg>
            : <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor" style={{ marginLeft: 3 }}><path d="M3 2v12l11-6L3 2z"/></svg>}
        </button>
        {/* corner tick marks */}
        {[
          { top: 10, left: 10 }, { top: 10, right: 10 },
          { bottom: 10, left: 10 }, { bottom: 10, right: 10 },
        ].map((p, i) => (
          <div key={i} style={{ position: "absolute", ...p, width: 14, height: 14 }}>
            <div style={{ position: "absolute", inset: 0, borderTop: i < 2 ? "1px solid rgba(255,253,247,0.4)" : "0", borderBottom: i >= 2 ? "1px solid rgba(255,253,247,0.4)" : "0", borderLeft: i % 2 === 0 ? "1px solid rgba(255,253,247,0.4)" : "0", borderRight: i % 2 === 1 ? "1px solid rgba(255,253,247,0.4)" : "0" }} />
          </div>
        ))}
      </div>
      {/* caption strip */}
      <div style={{
        padding: "12px 14px 14px",
        display: "flex", flexDirection: "column", gap: 6,
        background: "var(--ink)",
        borderTop: "1px solid rgba(255,253,247,0.08)",
      }}>
        <div className="mono" style={{
          fontSize: 10, letterSpacing: "0.16em", color: "rgba(255,253,247,0.45)",
          textTransform: "uppercase",
        }}>{copy.meta}</div>
        <div style={{
          fontFamily: "var(--font-display)", fontStyle: "italic",
          fontSize: 15.5, lineHeight: 1.35, color: "var(--ivory)",
          minHeight: 22, transition: "opacity .2s ease",
        }}>{caption}</div>
      </div>
    </div>
  );
}

// ───────── Phone treatment ─────────
function PhoneTreatment({ playing, onPlay, copy }) {
  const caption = useCycle(copy.captions, 3000);
  return (
    <div style={{
      background: "linear-gradient(180deg, #EFE9DC, #E7E0CE)",
      borderRadius: 22, padding: 16,
      border: "1px solid var(--ivory-line)",
      boxShadow: "var(--shadow-card)",
    }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 10, paddingBottom: 10,
        borderBottom: "1px solid rgba(14,18,23,0.06)",
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: 99,
          background: "radial-gradient(circle at 30% 30%, #F0D7A0, #B58A48)",
          display: "grid", placeItems: "center",
          fontFamily: "var(--font-display)", color: "#fff", fontSize: 16, fontStyle: "italic",
        }}>M</div>
        <div>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: 14, fontWeight: 600, color: "var(--ink)" }}>Maya</div>
          <div className="mono" style={{ fontSize: 10.5, color: "var(--ink-3)", letterSpacing: "0.06em" }}>SIYAI · DELIVERED TODAY, 11:02</div>
        </div>
        <div style={{ marginLeft: "auto" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#25D366" strokeWidth="1.6"/>
            <path d="M9 8l7 4-7 4V8z" fill="#25D366"/>
          </svg>
        </div>
      </div>
      {/* video bubble */}
      <div style={{ marginTop: 14, display: "flex" }}>
        <div style={{
          background: "#fff", borderRadius: "16px 16px 16px 4px",
          padding: 6, maxWidth: "82%", boxShadow: "0 1px 0 rgba(0,0,0,0.04)",
          display: "flex", flexDirection: "column", gap: 6,
        }}>
          <div style={{ position: "relative", borderRadius: 12, overflow: "hidden", background: "var(--ink)" }}>
            <div style={{ aspectRatio: "16 / 11" }}>
              <PhotoSlot label="" tone="ink" photoKey="memory-film-still" />
              <div aria-hidden style={{
                position: "absolute", inset: 0,
                background: "radial-gradient(60% 70% at 50% 40%, color-mix(in oklab, var(--gold), transparent 50%), transparent 70%)",
                filter: "blur(8px)",
              }} />
            </div>
            <button onClick={onPlay} aria-label="Play film" style={{
              position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)",
              width: 48, height: 48, borderRadius: 99,
              background: "rgba(255,253,247,0.12)", border: "1px solid rgba(255,253,247,0.25)",
              backdropFilter: "blur(8px)", color: "var(--ivory)",
              display: "grid", placeItems: "center", cursor: "pointer",
            }}>
              {playing
                ? <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><rect x="3" y="2" width="3.5" height="12" rx="1"/><rect x="9.5" y="2" width="3.5" height="12" rx="1"/></svg>
                : <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style={{ marginLeft: 2 }}><path d="M3 2v12l11-6L3 2z"/></svg>}
            </button>
          </div>
          <div style={{ padding: "2px 4px 4px", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 13, color: "var(--ink-2)" }}>{caption}</span>
            <span className="mono" style={{ fontSize: 10, color: "var(--ink-3)" }}>1:42</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ───────── Film strip treatment ─────────
function StripTreatment({ copy }) {
  const stills = [
    { l: "01", tone: "ivory" },
    { l: "02", tone: "gold" },
    { l: "03", tone: "sky" },
    { l: "04", tone: "seafoam" },
  ];
  return (
    <div style={{
      background: "var(--ink)", borderRadius: 18, padding: "14px 12px",
      boxShadow: "0 30px 80px -40px rgba(14,18,23,0.55)",
    }}>
      {/* sprocket holes top */}
      <SprocketRow />
      <div style={{
        display: "flex", overflowX: "auto", gap: 6, padding: "8px 0",
        scrollSnapType: "x mandatory",
      }} className="no-scrollbar">
        {stills.map((s, i) => (
          <div key={i} style={{
            flex: "0 0 60%", scrollSnapAlign: "start",
            borderRadius: 4, overflow: "hidden",
            background: "var(--ivory)", border: "1px solid rgba(14,18,23,0.6)",
          }}>
            <div style={{ position: "relative", aspectRatio: "3 / 4" }}>
              <PhotoSlot label={s.l} tone={s.tone} tall />
            </div>
          </div>
        ))}
      </div>
      <SprocketRow />
      <div style={{ padding: "8px 4px 0", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span className="mono" style={{ fontSize: 10, letterSpacing: "0.14em", color: "rgba(255,253,247,0.5)" }}>{copy.meta}</span>
        <span style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 12.5, color: "rgba(255,253,247,0.75)" }}>swipe</span>
      </div>
    </div>
  );
}

function SprocketRow() {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "0 4px" }}>
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} style={{
          width: 16, height: 8, borderRadius: 2,
          background: "color-mix(in oklab, var(--ivory) 20%, var(--ink))",
        }} />
      ))}
    </div>
  );
}

// ───────── Main section ─────────
function MemoryFilmHero({ treatment = "cinema", currency, onCTA }) {
  const copy = FILM_COPY[treatment] || FILM_COPY.cinema;
  const [playing, setPlaying] = React.useState(false);

  return (
    <section style={{ padding: "44px 22px 14px", position: "relative" }}>
      {/* ambient gold halo (lawful: ink + gold pair only) — softened so we stay ivory-dominant */}
      <div aria-hidden style={{
        position: "absolute", inset: "20px -10% auto -10%", height: 280, zIndex: 0,
        background: "radial-gradient(70% 60% at 50% 50%, color-mix(in oklab, var(--gold-soft), transparent 55%), transparent 70%)",
        filter: "blur(14px)", pointerEvents: "none",
      }} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div className="eyebrow" style={{ marginBottom: 14 }}>{copy.eyebrow}</div>
        <h2 className="display" style={{
          margin: 0, fontSize: 38, lineHeight: 0.98, letterSpacing: "-0.025em",
          color: "var(--ink)", fontWeight: 400,
        }} dangerouslySetInnerHTML={{ __html: copy.head }} />
        <p style={{
          marginTop: 14, fontSize: 14.5, lineHeight: 1.45, color: "var(--ink-3)",
          maxWidth: 340,
        }}>{copy.sub}</p>

        {/* the treatment */}
        <div style={{ marginTop: 22 }}>
          {treatment === "cinema" && <CinemaPlayer playing={playing} onPlay={() => setPlaying(p => !p)} copy={copy} />}
          {treatment === "phone"  && <PhoneTreatment playing={playing} onPlay={() => setPlaying(p => !p)} copy={copy} />}
          {treatment === "strip"  && <StripTreatment copy={copy} />}
        </div>

        {/* title underneath the player */}
        <div style={{
          marginTop: 18,
          fontFamily: "var(--font-display)", fontStyle: "italic",
          fontSize: 18, lineHeight: 1.3, letterSpacing: "-0.01em",
          color: "var(--ink-2)",
        }}>"{copy.title}"</div>

        {/* process line, small */}
        <div style={{
          marginTop: 12, paddingTop: 12,
          borderTop: "1px solid var(--ivory-line)",
          display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8,
        }}>
          {[
            { k: "WRITE", v: "tell us" },
            { k: "CRAFT", v: "48 hours" },
            { k: "SEND", v: "WhatsApp" },
          ].map(s => (
            <div key={s.k}>
              <div className="mono" style={{ fontSize: 9.5, letterSpacing: "0.16em", color: "var(--ink-3)" }}>{s.k}</div>
              <div style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 13, color: "var(--ink-2)", marginTop: 2 }}>{s.v}</div>
            </div>
          ))}
        </div>

        {/* the one Emerald CTA */}
        <div style={{ marginTop: 22, display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
          <CTA onClick={onCTA} size="md" style={{ whiteSpace: "nowrap" }}>
            {copy.cta} · {fmtPrice(1999, currency)}
          </CTA>
          <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>
            unlimited revisions
          </span>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, {
  FILM_COPY, MemoryFilmHero, CinemaPlayer, PhoneTreatment, StripTreatment, SprocketRow, useCycle,
});
