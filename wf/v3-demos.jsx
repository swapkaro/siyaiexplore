// v3-demos.jsx — the four "running demo" tiles (Voice / Portrait / Film / Handwriting)
// Each is silent demonstration. No words. The product proving itself.

// ───────── VoiceDemo · waveform plays on loop ─────────
function VoiceDemo({ name = "Papa", caption = "Happy Diwali, beta." }) {
  const [playing, setPlaying] = React.useState(true);
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    if (!playing) return;
    const start = Date.now();
    const dur = 6500;
    const id = setInterval(() => {
      const p = ((Date.now() - start) % dur) / dur;
      setProgress(p);
    }, 60);
    return () => clearInterval(id);
  }, [playing]);
  const bars = 32;
  return (
    <div style={{
      position: "relative", height: "100%",
      background: "linear-gradient(160deg, #EFE9DC 0%, #E7E0CE 100%)",
      padding: "16px 14px 14px",
      display: "flex", flexDirection: "column", justifyContent: "space-between",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 30, height: 30, borderRadius: 99,
          background: "radial-gradient(circle at 30% 30%, #D6B98A, #8C6939)",
          display: "grid", placeItems: "center",
          fontFamily: "var(--font-display)", color: "#fff", fontSize: 14, fontStyle: "italic",
        }}>{name[0]}</div>
        <div>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: 12, fontWeight: 600, color: "var(--ink)" }}>{name}</div>
          <div className="mono" style={{ fontSize: 9, color: "var(--ink-3)", letterSpacing: "0.06em" }}>0:14</div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button onClick={() => setPlaying(p => !p)} aria-label="Play voice note" style={{
          width: 30, height: 30, borderRadius: 99, border: 0,
          background: "var(--emerald)", color: "var(--ink)",
          display: "grid", placeItems: "center", cursor: "pointer", flexShrink: 0,
        }}>
          {playing
            ? <svg width="10" height="10" viewBox="0 0 16 16"><rect x="3" y="2" width="3.5" height="12" rx="1"/><rect x="9.5" y="2" width="3.5" height="12" rx="1"/></svg>
            : <svg width="10" height="10" viewBox="0 0 16 16"><path d="M3 2v12l11-6L3 2z"/></svg>}
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 1.5, height: 22, flex: 1 }}>
          {Array.from({ length: bars }).map((_, i) => {
            const h = 0.3 + 0.7 * Math.abs(Math.sin(i * 0.6) * Math.cos(i * 0.27));
            const active = i / bars <= progress;
            return (
              <span key={i} style={{
                width: 2, height: `${h * 100}%`,
                background: active ? "var(--emerald-deep)" : "rgba(14,18,23,0.28)",
                borderRadius: 2,
              }} />
            );
          })}
        </div>
      </div>
      <div style={{
        fontFamily: "var(--font-display)", fontStyle: "italic",
        fontSize: 12, color: "var(--ink-2)", lineHeight: 1.3, marginTop: 4,
      }}>"{caption}"</div>
    </div>
  );
}

// ───────── PortraitDemo · still photo with subtle breathing blink ─────────
function PortraitDemo({ photoKey = "create-living-portrait", label = "Dadi · 1962" }) {
  const src = usePhoto(photoKey);
  return (
    <div className="photo-archival photo-blink" style={{
      position: "relative", height: "100%", overflow: "hidden",
      background: "var(--ivory-2)",
    }}>
      {src && <img src={src} alt="" style={{
        position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
      }} />}
      <div className="date-stamp">{label}</div>
      {/* "living" pulse dot */}
      <div style={{
        position: "absolute", left: 10, top: 10,
        display: "flex", alignItems: "center", gap: 6,
        background: "rgba(255,253,247,0.86)",
        backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)",
        padding: "4px 8px 4px 6px", borderRadius: 100,
        fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.14em",
        color: "var(--ink-2)", textTransform: "uppercase",
        border: "1px solid var(--ivory-line)",
      }}>
        <span style={{
          width: 6, height: 6, borderRadius: 99, background: "var(--emerald)",
          boxShadow: "0 0 0 3px color-mix(in oklab, var(--mint), transparent 60%)",
          animation: "breathe 2s ease-in-out infinite",
        }} />
        Living
      </div>
    </div>
  );
}

// ───────── FilmDemo · 3 stills crossfade ─────────
function FilmDemo() {
  const stills = ["memory-film-still", "create-memory-film", "memorial-dadi-portrait"];
  const [i, setI] = React.useState(0);
  const srcs = [usePhoto(stills[0]), usePhoto(stills[1]), usePhoto(stills[2])];
  React.useEffect(() => {
    const id = setInterval(() => setI(x => (x + 1) % stills.length), 1800);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="photo-archival" style={{
      position: "relative", height: "100%", overflow: "hidden",
      background: "var(--ink)",
    }}>
      {stills.map((k, idx) => {
        const s = srcs[idx];
        return s ? (
          <img key={k} src={s} alt="" style={{
            position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
            opacity: idx === i ? 1 : 0,
            transition: "opacity .6s ease",
          }} />
        ) : null;
      })}
      {/* corner tick marks */}
      {[
        { top: 8, left: 8 }, { top: 8, right: 8 },
        { bottom: 8, left: 8 }, { bottom: 8, right: 8 },
      ].map((p, idx) => {
        const c = "rgba(255,253,247,0.5)";
        return (
          <div key={idx} style={{ position: "absolute", ...p, width: 10, height: 10, pointerEvents: "none",
            borderTop: idx < 2 ? `1px solid ${c}` : 0,
            borderBottom: idx >= 2 ? `1px solid ${c}` : 0,
            borderLeft: idx % 2 === 0 ? `1px solid ${c}` : 0,
            borderRight: idx % 2 === 1 ? `1px solid ${c}` : 0,
          }} />
        );
      })}
      <div style={{
        position: "absolute", left: 10, top: 10,
        fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.16em",
        color: "rgba(255,253,247,0.85)", textTransform: "uppercase",
        background: "rgba(14,18,23,0.45)", backdropFilter: "blur(4px)",
        padding: "4px 8px", borderRadius: 100,
      }}>● REC · 1:42</div>
      <div style={{
        position: "absolute", right: 10, bottom: 8,
        display: "flex", gap: 3,
      }}>
        {stills.map((_, idx) => (
          <span key={idx} style={{
            width: 14, height: 2, borderRadius: 2,
            background: idx === i ? "var(--gold)" : "rgba(255,253,247,0.35)",
          }} />
        ))}
      </div>
    </div>
  );
}

// ───────── HandwritingDemo · SVG path writes itself ─────────
function HandwritingDemo() {
  // animation key forces React to re-mount the path so we can loop indefinitely
  const [k, setK] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setK(x => x + 1), 6500);
    return () => clearInterval(id);
  }, []);
  return (
    <div style={{
      position: "relative", height: "100%", overflow: "hidden",
      background: "linear-gradient(165deg, #F6F1E4 0%, #ECE3CC 100%)",
      padding: "14px 18px",
      display: "flex", flexDirection: "column", justifyContent: "space-between",
    }}>
      {/* faint paper grain */}
      <div aria-hidden style={{
        position: "absolute", inset: 0,
        background: "repeating-linear-gradient(0deg, transparent 0 23px, rgba(14,18,23,0.05) 23px 24px)",
        pointerEvents: "none",
      }} />
      <div style={{ position: "relative" }}>
        <div className="mono" style={{ fontSize: 9, letterSpacing: "0.16em", color: "var(--ink-3)", textTransform: "uppercase", marginBottom: 8 }}>
          PAPA · HIS HANDWRITING
        </div>
        <svg key={k} viewBox="0 0 240 80" style={{ width: "100%", height: 80 }}>
          <path
            d="M8 50 C 18 22, 28 28, 36 48 C 44 68, 54 60, 60 38 C 66 22, 74 22, 80 44 C 86 60, 94 56, 98 38 M 110 30 C 118 22, 130 24, 132 44 C 134 64, 122 64, 118 50 M 144 24 L 144 56 M 156 36 C 164 28, 178 32, 178 50 C 178 66, 164 68, 158 56 M 192 28 C 200 22, 214 26, 214 44 C 214 60, 202 64, 196 54"
            stroke="#2A2F38"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="800"
            style={{
              "--len": 800,
              animation: "handwrite 6.5s ease-in-out infinite",
            }}
          />
        </svg>
      </div>
      <div style={{
        position: "relative",
        fontFamily: "var(--font-display)", fontStyle: "italic",
        fontSize: 12, color: "var(--ink-3)", letterSpacing: "-0.01em",
      }}>"my dearest beta…"</div>
    </div>
  );
}

// ───────── The 2×2 bento right column ─────────
function HeroDemoBento({ minHeight = 360 }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gridTemplateRows: "1fr 1fr",
      gap: 8,
      borderRadius: 20,
      overflow: "hidden",
      minHeight,
      height: "100%",
      border: "1px solid var(--ivory-line)",
      background: "var(--ivory-line)",
    }}>
      <div style={{ position: "relative", overflow: "hidden", background: "var(--ivory)" }}>
        <VoiceDemo />
      </div>
      <div style={{ position: "relative", overflow: "hidden", background: "var(--ivory)" }}>
        <PortraitDemo />
      </div>
      <div style={{ position: "relative", overflow: "hidden", background: "var(--ivory)" }}>
        <HandwritingDemo />
      </div>
      <div style={{ position: "relative", overflow: "hidden", background: "var(--ivory)" }}>
        <FilmDemo />
      </div>
    </div>
  );
}

// ───────── HeroSwitchableDemo · one dominant + 3 thumbnail chips ─────────
function HeroSwitchableDemo({ aspectRatio = "16 / 10", desktop = false }) {
  const tiles = [
    { id: "voice", label: "Voice", Demo: () => <VoiceDemo /> },
    { id: "portrait", label: "Portrait", Demo: () => <PortraitDemo /> },
    { id: "film", label: "Film", Demo: () => <FilmDemo /> },
    { id: "letter", label: "Letter", Demo: () => <HandwritingDemo /> },
  ];
  const [i, setI] = React.useState(0);
  // auto-rotate every 5s, paused on hover
  const [paused, setPaused] = React.useState(false);
  React.useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setI(x => (x + 1) % tiles.length), 5500);
    return () => clearInterval(id);
  }, [paused]);
  const ActiveDemo = tiles[i].Demo;
  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{ display: "flex", flexDirection: "column", gap: desktop ? 14 : 10, height: "100%" }}
    >
      {/* the dominant tile */}
      <div style={{
        position: "relative",
        flex: 1,
        borderRadius: desktop ? 22 : 18,
        overflow: "hidden",
        border: "1px solid var(--ivory-line)",
        background: "var(--ivory)",
        aspectRatio: aspectRatio,
        boxShadow: "0 30px 60px -30px rgba(14,18,23,0.15)",
      }} className="photo-archival">
        <div key={tiles[i].id} style={{ position: "absolute", inset: 0 }}>
          <ActiveDemo />
        </div>
        {/* "live preview" pill in the corner */}
        <div style={{
          position: "absolute", right: 12, top: 12,
          display: "inline-flex", alignItems: "center", gap: 7,
          background: "rgba(14,18,23,0.5)",
          backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
          padding: "4px 9px", borderRadius: 100,
          fontFamily: "var(--font-mono)", fontSize: 9.5,
          color: "rgba(255,253,247,0.95)",
          letterSpacing: "0.14em", textTransform: "uppercase",
          zIndex: 4,
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: 99, background: "var(--emerald)",
            animation: "breathe 1.8s ease-in-out infinite",
          }} />
          Live preview
        </div>
      </div>

      {/* thumbnail chips */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: desktop ? 8 : 6,
      }}>
        {tiles.map((t, idx) => (
          <button
            key={t.id}
            onClick={() => { setI(idx); setPaused(true); }}
            style={{
              position: "relative",
              padding: desktop ? "10px 8px" : "8px 6px",
              border: "1px solid " + (idx === i ? "var(--ink)" : "var(--ivory-line)"),
              background: idx === i ? "var(--ink)" : "var(--ivory)",
              color: idx === i ? "var(--ivory)" : "var(--ink-2)",
              borderRadius: 12,
              fontFamily: "var(--font-ui)", fontWeight: 500,
              fontSize: desktop ? 13 : 12,
              cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              transition: "background .2s ease, color .2s ease, border-color .2s ease",
              overflow: "hidden",
            }}
          >
            <span style={{
              width: 6, height: 6, borderRadius: 99,
              background: idx === i ? "var(--emerald)" : "var(--ink-mute)",
              opacity: idx === i ? 1 : 0.5,
            }} />
            {t.label}
            {idx === i && !paused && (
              <span style={{
                position: "absolute", left: 0, bottom: 0,
                height: 2, background: "var(--emerald)",
                animation: "thumbFill 5.5s linear infinite",
              }} />
            )}
          </button>
        ))}
      </div>
      <style>{`@keyframes thumbFill { from { width: 0% } to { width: 100% } }`}</style>
    </div>
  );
}

// ───────── Hero product peek · 3 thumbs visible above-the-fold ─────────
function HeroProductPeek({ currency, desktop = false }) {
  const items = [
    { id: "vl", title: "Voice Letter", price: 299, photoKey: "create-voice-letter" },
    { id: "lp", title: "Living Portrait", price: 499, photoKey: "create-living-portrait" },
    { id: "mf", title: "Memory Film", price: 1999, photoKey: "create-memory-film" },
  ];
  return (
    <div style={{
      marginTop: desktop ? 28 : 18,
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: desktop ? 14 : 8,
    }}>
      {items.map(p => <HeroPeekCard key={p.id} p={p} currency={currency} desktop={desktop} />)}
    </div>
  );
}
function HeroPeekCard({ p, currency, desktop }) {
  const src = usePhoto(p.photoKey);
  return (
    <a href="#" style={{
      textDecoration: "none", color: "inherit",
      border: "1px solid var(--ivory-line)",
      borderRadius: 14, overflow: "hidden",
      background: "var(--ivory)",
      display: "flex", flexDirection: "column",
    }}>
      <div className="photo-archival" style={{
        position: "relative", aspectRatio: desktop ? "4 / 5" : "5 / 4",
        background: "var(--ivory-2)", overflow: "hidden",
      }}>
        {src && <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
      </div>
      <div style={{ padding: desktop ? "12px 14px 14px" : "6px 8px 8px" }}>
        <div style={{
          fontFamily: "var(--font-display)", fontSize: desktop ? 17 : 12.5,
          letterSpacing: "-0.01em", lineHeight: 1.1,
        }}>{p.title}</div>
        <div className="mono" style={{ fontSize: desktop ? 12.5 : 10, color: "var(--ink-2)", marginTop: 4 }}>
          {fmtPrice(p.price, currency)}
        </div>
      </div>
    </a>
  );
}

Object.assign(window, {
  VoiceDemo, PortraitDemo, FilmDemo, HandwritingDemo, HeroDemoBento, HeroSwitchableDemo,
  HeroProductPeek, HeroPeekCard,
});
