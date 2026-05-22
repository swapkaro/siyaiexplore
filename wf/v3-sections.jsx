// v3-sections.jsx — Recipient strip + Koval-style demo tab section

// ───────── RecipientStrip · "For Whom" round avatars ─────────
const RECIPIENTS = [
  { name: "Maa", photoKey: "diwali-bundle", count: 18 },
  { name: "Papa", photoKey: "create-voice-letter", count: 22 },
  { name: "Dadi", photoKey: "memorial-dadi-portrait", count: 14 },
  { name: "Nana", photoKey: "dt-vault-papa", count: 11 },
  { name: "Bhai", photoKey: "dt-hero-product-voice", count: 9 },
  { name: "Beti", photoKey: "hero-floating-card", count: 12 },
  { name: "Yourself", photoKey: "diwali-portrait", count: 6 },
];

function RecipientStrip({ desktop = false }) {
  return (
    <section className={desktop ? "dt-section-tight" : ""} style={desktop ? null : { padding: "20px 0 6px" }}>
      <div className={desktop ? "dt-container" : ""}>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "baseline",
          padding: desktop ? "0 0 22px" : "0 22px 14px",
        }}>
          <div className={desktop ? "dt-eyebrow" : "eyebrow"}>
            <span>For whom</span>
          </div>
          <a href="#" style={{
            fontFamily: "var(--font-ui)", fontSize: desktop ? 14 : 12,
            color: "var(--ink-2)", textDecoration: "none",
          }}>Browse all →</a>
        </div>
        <div className="no-scrollbar" style={{
          display: "flex", gap: desktop ? 24 : 14,
          padding: desktop ? "0 4px" : "0 22px",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
        }}>
          {RECIPIENTS.map(r => (
            <Avatar key={r.name} r={r} desktop={desktop} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Avatar({ r, desktop }) {
  const src = usePhoto(r.photoKey);
  const size = desktop ? 132 : 104;
  return (
    <a href="#" style={{
      flex: "0 0 auto", textDecoration: "none", color: "inherit",
      display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
      scrollSnapAlign: "start",
    }}>
      <div style={{
        position: "relative",
        width: size, height: size, borderRadius: 999,
        overflow: "hidden",
        background: "var(--ivory-2)",
        border: "1px solid var(--ivory-line)",
      }} className="photo-archival">
        {src && <img src={src} alt={r.name} style={{
          width: "100%", height: "100%", objectFit: "cover",
        }} />}
      </div>
      <div style={{
        fontFamily: "var(--font-display)", fontSize: desktop ? 19 : 17,
        letterSpacing: "-0.015em",
        textAlign: "center",
      }}>{r.name}</div>
      <div className="mono" style={{
        fontSize: 10, color: "var(--ink-3)",
        letterSpacing: "0.08em", marginTop: -6,
      }}>{r.count}</div>
    </a>
  );
}

// ───────── EndlessWays · Koval-style tab demo ─────────
const WAY_TABS = [
  {
    id: "voice",
    label: "Voice Letter",
    price: 299,
    tagline: "Their voice. Anything you want them to say.",
    caption: "Mummy, happy birthday. I am proud to be your daughter.",
    Demo: () => <VoiceDemo name="Mummy" caption="Happy birthday, beta." />,
    thumbs: ["create-voice-letter", "dt-vault-maa", "diwali-voice", "dt-hero-product-voice", "dt-vault-papa", "memorial-vault-avatar"],
    accent: "seafoam",
  },
  {
    id: "portrait",
    label: "Living Portrait",
    price: 499,
    tagline: "A photograph, alive again. Eyes blink. Expressions return.",
    caption: "Dadi smiled, just like she used to.",
    Demo: () => <PortraitDemo photoKey="create-living-portrait" label="Dadi · 1962" />,
    thumbs: ["create-living-portrait", "dt-vault-dadi", "diwali-portrait", "memorial-dadi-portrait", "dt-vault-maa", "memorial-vault-avatar"],
    accent: "sky",
  },
  {
    id: "film",
    label: "Memory Film",
    price: 1999,
    tagline: "Write the memory. We make the film.",
    caption: "The day Papa taught me to ride.",
    Demo: () => <FilmDemo />,
    thumbs: ["memory-film-still", "create-memory-film", "dt-hero-product-film", "diwali-bundle", "hero-atmospheric", "dt-bento-voice"],
    accent: "gold",
  },
  {
    id: "song",
    label: "Custom Song",
    price: 999,
    tagline: "An original song, written from their story.",
    caption: "Sangeet sab ne pucha — ye gaana kahaan se liya?",
    Demo: () => <VoiceDemo name="Sangeet" caption="हो जाए, हो जाए, ye shaadi hai…" />,
    thumbs: ["create-custom-song", "create-handwritten", "diwali-bundle", "diwali-portrait", "create-time-capsule", "hero-floating-card"],
    accent: "ivory",
  },
];

function EndlessWays({ desktop = false, currency = "INR" }) {
  const [active, setActive] = React.useState(0);
  const [thumbIdx, setThumbIdx] = React.useState(0);
  // reset thumb when tab changes
  React.useEffect(() => { setThumbIdx(0); }, [active]);
  const tab = WAY_TABS[active];

  return (
    <section className={desktop ? "dt-section" : ""} style={desktop ? null : { padding: "28px 0 0" }}>
      <div className={desktop ? "dt-container" : ""}>
        <div style={{ padding: desktop ? "0 0 28px" : "0 22px 16px" }}>
          <h2 style={{
            margin: 0,
            fontFamily: "var(--font-display)", fontWeight: 400,
            fontSize: desktop ? 48 : 32,
            letterSpacing: "-0.025em",
            lineHeight: 1,
          }}>
            Send a <span style={{ fontStyle: "italic", color: "var(--emerald-deep)" }}>memory</span>.
          </h2>
        </div>

        {/* tabs */}
        <div className="no-scrollbar" style={{
          display: "flex", gap: 8,
          padding: desktop ? "0 0 18px" : "0 22px 12px",
          overflowX: "auto",
        }}>
          {WAY_TABS.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setActive(i)}
              style={{
                flex: "0 0 auto",
                border: "1px solid " + (i === active ? "var(--ink)" : "var(--ivory-line)"),
                background: i === active ? "var(--ink)" : "var(--ivory)",
                color: i === active ? "var(--ivory)" : "var(--ink)",
                fontFamily: "var(--font-ui)", fontWeight: 500,
                fontSize: desktop ? 14 : 13,
                padding: desktop ? "10px 18px" : "9px 15px",
                borderRadius: 999,
                cursor: "pointer",
                display: "inline-flex", alignItems: "center", gap: 8,
                whiteSpace: "nowrap",
                transition: "background .15s ease, color .15s ease, border-color .15s ease",
              }}
            >
              {t.label}
              <span className="mono" style={{
                fontSize: 10.5,
                color: i === active ? "rgba(255,253,247,0.55)" : "var(--ink-3)",
                letterSpacing: "0.04em",
              }}>{fmtPrice(t.price, currency)}</span>
            </button>
          ))}
        </div>

        {/* big player */}
        <div style={{
          padding: desktop ? "0" : "0 22px",
          display: "grid",
          gridTemplateColumns: desktop ? "1.4fr 1fr" : "1fr",
          gap: desktop ? 28 : 14,
          alignItems: "stretch",
        }}>
          <div style={{
            borderRadius: 20, overflow: "hidden",
            border: "1px solid var(--ivory-line)",
            background: "var(--ivory)",
            aspectRatio: desktop ? "16 / 10" : "4 / 3",
            position: "relative",
          }}>
            <BigDemo tab={tab} thumbIdx={thumbIdx} desktop={desktop} />
          </div>

          {/* right column · caption + thumbs + CTA */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14, justifyContent: "space-between" }}>
            <div>
              <div className="mono" style={{
                fontSize: 10.5, color: "var(--ink-3)", letterSpacing: "0.16em",
                textTransform: "uppercase", marginBottom: 8,
              }}>{tab.label} · {fmtPrice(tab.price, currency)}</div>
              <div style={{
                fontFamily: "var(--font-display)", fontStyle: "italic",
                fontSize: desktop ? 22 : 18, lineHeight: 1.3,
                color: "var(--ink-2)", letterSpacing: "-0.01em",
              }}>"{tab.caption}"</div>
              <div style={{
                marginTop: 8, fontSize: 13, color: "var(--ink-3)", lineHeight: 1.5,
              }}>{tab.tagline}</div>
            </div>

            {/* thumbnail strip */}
            <div className="no-scrollbar" style={{
              display: "grid",
              gridTemplateColumns: "repeat(6, 1fr)",
              gap: 6,
            }}>
              {tab.thumbs.map((k, i) => (
                <Thumb key={k + i} photoKey={k} active={i === thumbIdx} onClick={() => setThumbIdx(i)} />
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
              <CTA size="md" style={{ whiteSpace: "nowrap" }}>
                Send a {tab.label.toLowerCase()} · {fmtPrice(tab.price, currency)}
              </CTA>
              <span className="mono" style={{
                fontSize: 10.5, color: "var(--ink-3)", letterSpacing: "0.08em",
              }}>ready in 4 hours</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BigDemo({ tab, thumbIdx, desktop }) {
  // For Voice/Song: render VoiceDemo; for Portrait/Film render the right thing
  // Add a metadata corner + paging dots
  return (
    <div style={{ position: "relative", height: "100%" }} className="photo-archival">
      {tab.id === "portrait" ? (
        <PortraitDemoFromKey photoKey={tab.thumbs[thumbIdx]} />
      ) : tab.id === "film" ? (
        <FilmDemo />
      ) : tab.id === "voice" ? (
        <VoiceDemo />
      ) : (
        <VoiceDemo name="Sangeet" caption="हो जाए, hum saath rahein…" />
      )}
      <div style={{
        position: "absolute", left: 14, bottom: 14, zIndex: 3,
        display: "inline-flex", alignItems: "center", gap: 8,
        background: "rgba(14,18,23,0.55)", backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        padding: "5px 10px", borderRadius: 100,
        fontFamily: "var(--font-mono)", fontSize: 9.5, letterSpacing: "0.14em",
        color: "rgba(255,253,247,0.95)", textTransform: "uppercase",
      }}>
        <span style={{ width: 6, height: 6, borderRadius: 99, background: "var(--emerald)" }} />
        Auto preview
      </div>
    </div>
  );
}

function PortraitDemoFromKey({ photoKey }) {
  // remount on photo change so blink restarts
  return <PortraitDemo key={photoKey} photoKey={photoKey} label="Dadi · 1962" />;
}

function Thumb({ photoKey, active, onClick }) {
  const src = usePhoto(photoKey);
  return (
    <button
      onClick={onClick}
      style={{
        position: "relative",
        border: "2px solid " + (active ? "var(--ink)" : "transparent"),
        borderRadius: 8, overflow: "hidden",
        aspectRatio: "1 / 1",
        background: "var(--ivory-2)",
        cursor: "pointer",
        padding: 0,
        transition: "border-color .15s ease",
      }}
    >
      {src && <img src={src} alt="" style={{
        width: "100%", height: "100%", objectFit: "cover",
      }} />}
    </button>
  );
}

Object.assign(window, {
  RECIPIENTS, RecipientStrip, Avatar, WAY_TABS, EndlessWays, BigDemo, Thumb, PortraitDemoFromKey,
  WhyFamilies, WhyCard,
  WhatsAppProofTile,
});

// ───────── WhatsAppProofTile · compact replacement for the full WhatsApp moment ─────────
function WhatsAppProofTile({ desktop = false }) {
  return (
    <section>
      <div className={desktop ? "dt-container" : ""} style={desktop ? null : { padding: "0 22px" }}>
        <div style={{
          background: "linear-gradient(135deg, color-mix(in oklab, var(--seafoam) 30%, var(--ivory)), var(--ivory-2))",
          border: "1px solid var(--ivory-line)",
          borderRadius: desktop ? 22 : 18,
          padding: desktop ? "28px 32px" : "20px 18px",
          display: "grid",
          gridTemplateColumns: desktop ? "1.6fr auto" : "1fr",
          gap: desktop ? 32 : 16,
          alignItems: "center",
        }}>
          <div>
            <div className="mono" style={{
              fontSize: 11, letterSpacing: "0.16em", color: "var(--ink-3)",
              textTransform: "uppercase", marginBottom: 10,
              display: "inline-flex", alignItems: "center", gap: 8,
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#25D366" strokeWidth="1.6"/>
                <path d="M9 8l7 4-7 4V8z" fill="#25D366"/>
              </svg>
              Delivered on WhatsApp · no app needed
            </div>
            <div style={{
              fontFamily: "var(--font-display)", fontSize: desktop ? 26 : 21,
              letterSpacing: "-0.02em", lineHeight: 1.2,
            }}>
              The recipient gets a tap-to-open message. <span style={{ fontStyle: "italic", color: "var(--ink-3)" }}>They keep it forever.</span>
            </div>
          </div>
          <div style={{
            background: "#fff", borderRadius: 14,
            padding: "10px 12px", display: "flex", alignItems: "center", gap: 10,
            boxShadow: "0 8px 24px -10px rgba(14,18,23,0.18)",
            minWidth: desktop ? 280 : "100%",
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 99,
              background: "radial-gradient(circle at 30% 30%, #D6B98A, #8C6939)",
              display: "grid", placeItems: "center",
              fontFamily: "var(--font-display)", color: "#fff", fontSize: 16, fontStyle: "italic",
              flexShrink: 0,
            }}>P</div>
            <button aria-label="Play" style={{
              width: 32, height: 32, borderRadius: 99, border: 0,
              background: "var(--emerald)", color: "var(--ink)",
              display: "grid", placeItems: "center", cursor: "pointer", flexShrink: 0,
            }}>
              <svg width="11" height="11" viewBox="0 0 16 16" fill="currentColor"><path d="M3 2v12l11-6L3 2z"/></svg>
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: 1.5, height: 18, flex: 1 }}>
              {[0.4,0.7,0.5,0.9,0.6,0.8,0.45,0.95,0.7,0.55,0.85,0.5,0.7,0.6,0.9].map((h, i) => (
                <span key={i} style={{
                  width: 2, height: `${h * 100}%`,
                  background: "var(--ink-3)", borderRadius: 2,
                }} />
              ))}
            </div>
            <span className="mono" style={{ fontSize: 10, color: "var(--ink-3)" }}>0:14</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ───────── WhyFamilies · 3 lifestyle reasons with photo + caption ─────────
const WHY_ITEMS = [
  { id: "why-1", cap: "Because the gift you sent last year, they still play.", photoKey: "why-voice-replay" },
  { id: "why-2", cap: "Because Maa's anniversary is in three weeks.", photoKey: "why-anniversary" },
  { id: "why-3", cap: "Because your father is still telling you stories.", photoKey: "why-storytelling" },
];

function WhyFamilies({ desktop = false }) {
  return (
    <section className={desktop ? "" : ""}>
      <div className={desktop ? "dt-container" : ""}>
        <div style={{ padding: desktop ? "0 0 28px" : "0 22px 16px" }}>
          <h2 style={{
            margin: 0,
            fontFamily: "var(--font-display)", fontWeight: 400,
            fontSize: desktop ? 44 : 30,
            letterSpacing: "-0.025em", lineHeight: 1,
            maxWidth: desktop ? 720 : "100%",
          }}>
            Families choose SiyAI <span style={{ fontStyle: "italic", color: "var(--ink-3)" }}>for one reason at a time</span>.
          </h2>
        </div>
        {desktop ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {WHY_ITEMS.map(w => <WhyCard key={w.id} w={w} desktop />)}
          </div>
        ) : (
          <div className="no-scrollbar" style={{
            display: "flex", gap: 12, overflowX: "auto",
            padding: "0 22px 6px", scrollSnapType: "x mandatory",
          }}>
            {WHY_ITEMS.map(w => (
              <div key={w.id} style={{ flex: "0 0 78%", scrollSnapAlign: "start" }}>
                <WhyCard w={w} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function WhyCard({ w, desktop }) {
  const src = usePhoto(w.photoKey);
  return (
    <div style={{
      position: "relative",
      borderRadius: desktop ? 22 : 18,
      overflow: "hidden",
      background: "var(--ivory-2)",
      aspectRatio: "4 / 5",
    }} className="photo-archival">
      {src && <img src={src} alt="" style={{
        width: "100%", height: "100%", objectFit: "cover",
      }} />}
      {/* gradient overlay for caption legibility */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, zIndex: 3,
        background: "linear-gradient(180deg, transparent 40%, rgba(14,18,23,0.7) 100%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", left: desktop ? 20 : 16, right: desktop ? 20 : 16, bottom: desktop ? 20 : 16,
        fontFamily: "var(--font-display)", fontStyle: "italic",
        fontSize: desktop ? 22 : 18, lineHeight: 1.25,
        color: "var(--ivory)", letterSpacing: "-0.01em",
        zIndex: 4,
        textShadow: "0 2px 8px rgba(14,18,23,0.4)",
      }}>
        "{w.cap}"
      </div>
    </div>
  );
}
