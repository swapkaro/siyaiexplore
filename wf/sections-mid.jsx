// sections-mid.jsx — middle of the homepage

// ───────── Create a Memory · product grid ─────────
const CREATE_PRODUCTS = [
  { id: "voice-letter", title: "Voice Letter", price: 299, base: "60 sec, in their voice", tag: "Har saal Papa ki awaaz", badge: "BESTSELLER", label: "papa", photoKey: "create-voice-letter", demo: "voice" },
  { id: "living-portrait", title: "Living Portrait", price: 499, base: "Photo, alive", tag: "Dadi ki photo boli", badge: "TRENDING", label: "dadi · 1962", tone: "sky", photoKey: "create-living-portrait", demo: "portrait" },
  { id: "custom-song", title: "Custom Song", price: 999, base: "2 min, lyrics included", tag: "Sangeet ka new favourite", label: "sangeet", tone: "seafoam", photoKey: "create-custom-song", demo: "song" },
  { id: "handwritten-letter", title: "Handwritten Letter", price: 499, base: "PDF, their handwriting", tag: "Papa likhte the aise hi", label: "letter", photoKey: "create-handwritten", demo: "letter" },
  { id: "memory-film", title: "Memory Film", price: 1999, base: "1-2 min cinematic", tag: "Aapki kahaani, ek film", badge: "NEW", label: "1987", tone: "gold", photoKey: "create-memory-film", demo: "film" },
  { id: "time-capsule", title: "Time Capsule", price: 99, base: "+ any gift, future-dated", tag: "Beti ke 18th par kholna", label: "future", tone: "ivory", photoKey: "create-time-capsule", demo: "capsule" },
];

// ───────── Per-card mini demo renderer ─────────
function CardDemo({ kind, photoKey }) {
  if (kind === "voice" || kind === "song") {
    return <MiniWaveform />;
  }
  if (kind === "portrait") {
    return <PortraitDemo photoKey={photoKey} label="" />;
  }
  if (kind === "film") {
    return <FilmDemo />;
  }
  if (kind === "letter") {
    return <MiniHandwriting />;
  }
  if (kind === "capsule") {
    return <CapsuleCountdown />;
  }
  return null;
}

function MiniWaveform() {
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    const start = Date.now();
    const dur = 5500;
    const id = setInterval(() => {
      setProgress(((Date.now() - start) % dur) / dur);
    }, 60);
    return () => clearInterval(id);
  }, []);
  const bars = 22;
  return (
    <div style={{
      height: "100%",
      background: "linear-gradient(160deg, #EFE9DC 0%, #E7E0CE 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "0 14px",
    }}>
      <button aria-label="Play" style={{
        width: 30, height: 30, borderRadius: 99, border: 0, flexShrink: 0,
        background: "var(--emerald)", color: "var(--ink)",
        display: "grid", placeItems: "center", cursor: "pointer", marginRight: 10,
      }}>
        <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor"><path d="M3 2v12l11-6L3 2z"/></svg>
      </button>
      <div style={{ display: "flex", alignItems: "center", gap: 1.5, height: 28, flex: 1 }}>
        {Array.from({ length: bars }).map((_, i) => {
          const h = 0.3 + 0.7 * Math.abs(Math.sin(i * 0.7) * Math.cos(i * 0.3));
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
  );
}

function MiniHandwriting() {
  const [k, setK] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setK(x => x + 1), 5500);
    return () => clearInterval(id);
  }, []);
  return (
    <div style={{
      height: "100%",
      background: "linear-gradient(165deg, #F6F1E4 0%, #ECE3CC 100%)",
      display: "grid", placeItems: "center", padding: "14px 18px",
      position: "relative",
    }}>
      <div aria-hidden style={{
        position: "absolute", inset: 0,
        background: "repeating-linear-gradient(0deg, transparent 0 18px, rgba(14,18,23,0.04) 18px 19px)",
      }} />
      <svg key={k} viewBox="0 0 220 50" style={{ width: "100%", maxWidth: 220, position: "relative" }}>
        <path
          d="M8 30 C 18 8, 28 14, 36 30 C 44 46, 54 40, 60 22 C 66 8, 74 8, 80 28 M 100 14 C 108 8, 120 10, 122 28 C 124 44, 112 44, 108 32 M 140 8 L 140 38 M 152 18 C 160 10, 174 14, 174 30 C 174 44, 162 44, 156 36 M 188 12 C 196 8, 208 12, 208 28"
          stroke="#2A2F38" strokeWidth="1.6" fill="none"
          strokeLinecap="round" strokeDasharray="600"
          style={{ "--len": 600, animation: "handwrite 5.5s ease-in-out infinite" }}
        />
      </svg>
    </div>
  );
}

function CapsuleCountdown() {
  const [t, setT] = React.useState({ y: 13, m: 4, d: 22, h: 14 });
  React.useEffect(() => {
    const id = setInterval(() => {
      setT(prev => ({ ...prev, h: (prev.h - 1 + 24) % 24, d: prev.h === 0 ? prev.d - 1 : prev.d }));
    }, 1400);
    return () => clearInterval(id);
  }, []);
  return (
    <div style={{
      height: "100%",
      background: "var(--ink)",
      color: "var(--ivory)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      gap: 6, padding: "10px",
      position: "relative", overflow: "hidden",
    }}>
      <div aria-hidden style={{
        position: "absolute", inset: "auto -20% -50% -20%", height: 120,
        background: "radial-gradient(50% 80% at 50% 100%, color-mix(in oklab, var(--gold), transparent 60%), transparent 70%)",
        filter: "blur(10px)",
      }} />
      <div className="mono" style={{ fontSize: 9, letterSpacing: "0.16em", color: "rgba(255,253,247,0.5)", position: "relative" }}>
        OPENS IN
      </div>
      <div style={{
        fontFamily: "var(--font-display)", fontStyle: "italic",
        fontSize: 22, lineHeight: 1, color: "var(--gold)", position: "relative",
      }}>
        {t.y}y {t.m}m {t.d}d
      </div>
      <div className="mono" style={{ fontSize: 9, letterSpacing: "0.16em", color: "rgba(255,253,247,0.45)", position: "relative" }}>
        BETI'S 18TH BIRTHDAY
      </div>
    </div>
  );
}

function CreateGrid({ density = "six", currency }) {
  return (
    <section style={{ padding: "8px 0 0" }}>
      <SectionHead
        title={`Six ways. <i>Pick one.</i>`}
        lede="Send it tonight."
      />
      {density === "carousel" ? (
        <CarouselRow items={CREATE_PRODUCTS} currency={currency} />
      ) : density === "three" ? (
        <GridRow items={CREATE_PRODUCTS.slice(0, 3)} currency={currency} />
      ) : (
        <FeaturedGridRow items={CREATE_PRODUCTS} currency={currency} />
      )}
      <div style={{ padding: "12px 22px 18px" }}>
        <a className="link-arrow" href="#">Browse all gifts <span className="arrow">→</span></a>
      </div>
    </section>
  );
}

// Featured grid: first product is full-width hero card, rest are 2-col
function FeaturedGridRow({ items, currency }) {
  const [hero, ...rest] = items;
  return (
    <div style={{ padding: "4px 22px 4px", display: "flex", flexDirection: "column", gap: 12 }}>
      {/* HERO featured card — full-width with live demo */}
      <a href="#" style={{ textDecoration: "none", color: "inherit" }}>
        <div className="pcard" style={{ position: "relative", overflow: "hidden" }}>
          <div style={{ position: "relative", aspectRatio: "16 / 10", background: "var(--ivory-2)", overflow: "hidden" }}>
            <PhotoSlot label="" tone={hero.tone || "seafoam"} style={{ height: "100%", aspectRatio: "auto" }} photoKey={hero.photoKey} />
            {hero.badge && (
              <span className="badge">{hero.badge}</span>
            )}
            <div style={{
              position: "absolute", right: 14, top: 14,
              padding: "6px 10px",
              background: "color-mix(in oklab, var(--ivory) 88%, transparent)",
              backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)",
              borderRadius: 100,
              fontFamily: "var(--font-display)", fontStyle: "italic",
              fontSize: 13, color: "var(--ink-2)",
              letterSpacing: "-0.01em",
              border: "1px solid var(--ivory-line)",
            }}>"{hero.tag}"</div>
          </div>
          <div style={{ padding: "16px 16px 18px" }}>
            <div style={{
              fontFamily: "var(--font-display)", fontSize: 26,
              letterSpacing: "-0.025em", lineHeight: 1.05,
            }}>{hero.title}</div>
            <div className="mono" style={{
              fontSize: 11, color: "var(--ink-3)", marginTop: 6, letterSpacing: "0.04em",
            }}>{hero.base} · theirs forever</div>
            <div style={{
              marginTop: 14,
              display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12,
            }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                <span className="mono" style={{
                  fontSize: 10.5, color: "var(--ink-3)",
                  textTransform: "uppercase", letterSpacing: "0.14em",
                }}>from</span>
                <span className="mono" style={{
                  fontSize: 17, color: "var(--ink)", fontWeight: 500,
                }}>{fmtPrice(hero.price, currency)}</span>
              </div>
              <span className="link-arrow" style={{ fontSize: 13 }}>
                <span style={{ fontFamily: "var(--font-ui)", fontWeight: 500 }}>Send one</span>
                <span className="arrow">→</span>
              </span>
            </div>
          </div>
        </div>
      </a>
      {/* Rest of the grid — 2-col, each with live demo */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {rest.map(p => (
          <div key={p.id} className="pcard">
            <div className="ph" style={{ position: "relative", aspectRatio: "4 / 3", background: "var(--ivory-2)", overflow: "hidden" }}>
              <PhotoSlot label="" tone={p.tone || "ivory"} style={{ height: "100%", aspectRatio: "auto" }} photoKey={p.photoKey} />
              {p.badge && (
                <span className={`badge ${p.badge === "NEW" || p.badge === "TRENDING" ? "mint" : ""}`}>{p.badge}</span>
              )}
            </div>
            <div className="body">
              <h3>{p.title}</h3>
              <div className="mono" style={{ fontSize: 10.5, color: "var(--ink-3)", letterSpacing: "0.04em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.base}</div>
              <div className="tag" style={{
                fontSize: 12.5,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}>"{p.tag}"</div>
              <div style={{
                marginTop: 6,
                paddingTop: 8,
                borderTop: "1px solid var(--ivory-line)",
                display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 6,
              }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                  <span className="mono" style={{ fontSize: 10, color: "var(--ink-3)", textTransform: "uppercase", letterSpacing: "0.12em" }}>from</span>
                  <span className="mono" style={{ fontSize: 13, color: "var(--ink)" }}>{fmtPrice(p.price, currency)}</span>
                </div>
                <span style={{ fontSize: 12, color: "var(--emerald-deep)", fontFamily: "var(--font-ui)", fontWeight: 500 }}>Send →</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GridRow({ items, currency }) {
  return (
    <div style={{
      padding: "4px 22px 4px",
      display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12,
    }}>
      {items.map(p => (
        <div key={p.id} className="pcard">
          <div className="ph">
            <PhotoSlot label={p.label} tone={p.tone || "ivory"} photoKey={p.photoKey} />
            {p.badge && (
              <span className={`badge ${p.badge === "NEW" || p.badge === "TRENDING" ? "mint" : ""}`}>{p.badge}</span>
            )}
          </div>
          <div className="body">
            <h3>{p.title}</h3>
            <div className="mono" style={{ fontSize: 10.5, color: "var(--ink-3)", letterSpacing: "0.04em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.base}</div>
            <div className="tag" style={{
              fontSize: 12.5,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}>"{p.tag}"</div>
            <div style={{
              marginTop: 6,
              paddingTop: 8,
              borderTop: "1px solid var(--ivory-line)",
              display: "flex", alignItems: "baseline", gap: 6,
            }}>
              <span className="mono" style={{ fontSize: 10, color: "var(--ink-3)", textTransform: "uppercase", letterSpacing: "0.12em" }}>from</span>
              <span className="mono" style={{ fontSize: 13, color: "var(--ink)" }}>{fmtPrice(p.price, currency)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function CarouselRow({ items, currency }) {
  return (
    <div style={{
      display: "flex", overflowX: "auto", gap: 12, paddingBottom: 12,
      paddingInline: 22,
    }} className="no-scrollbar">
      {items.map(p => (
        <div key={p.id} className="pcard" style={{ flex: "0 0 220px" }}>
          <div className="ph">
            <PhotoSlot label={p.label} tone={p.tone || "ivory"} photoKey={p.photoKey} />
            {p.badge && <span className={`badge ${p.badge === "NEW" || p.badge === "TRENDING" ? "mint" : ""}`}>{p.badge}</span>}
          </div>
          <div className="body">
            <h3>{p.title}</h3>
            <div className="mono" style={{ fontSize: 10.5, color: "var(--ink-3)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.base}</div>
            <div className="tag" style={{ fontSize: 12.5 }}>"{p.tag}"</div>
            <div style={{
              marginTop: 6, paddingTop: 8,
              borderTop: "1px solid var(--ivory-line)",
              display: "flex", alignItems: "baseline", gap: 6,
            }}>
              <span className="mono" style={{ fontSize: 10, color: "var(--ink-3)", textTransform: "uppercase", letterSpacing: "0.12em" }}>from</span>
              <span className="mono" style={{ fontSize: 13, color: "var(--ink)" }}>{fmtPrice(p.price, currency)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ───────── Preserve · Legacy Vault block ─────────
function PreserveBlock({ currency, onCTA }) {
  return (
    <section style={{ padding: "8px 0 0" }}>
      <SectionHead
        num="05"
        label="Preserve a memory · Phase II preview"
        title={`Hold onto voices, faces and moments before they <i>slip away</i>.`}
        lede="Add a loved one to your Legacy Vault. Their voice and face stay yours, forever. Every future gift takes seconds."
      />
      <div style={{ padding: "4px 22px 0" }}>
        <div style={{
          background: "var(--ivory)",
          border: "1px solid var(--ivory-line)",
          borderRadius: 22, overflow: "hidden",
        }}>
          {/* hero photo of vault person */}
          <div style={{ position: "relative" }}>
            <PhotoSlot label="" tone="sky" style={{ aspectRatio: "16/10" }} />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(180deg, transparent 50%, rgba(255,253,247,0.92) 100%)",
            }} />
            <div style={{
              position: "absolute", left: 14, bottom: 14, right: 14,
              display: "flex", justifyContent: "space-between", alignItems: "flex-end",
            }}>
              <div>
                <div className="mono" style={{ fontSize: 10, letterSpacing: "0.14em", color: "var(--ink-3)" }}>IN YOUR VAULT</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 24, letterSpacing: "-0.02em" }}>
                  Maa <span style={{ fontStyle: "italic", color: "var(--ink-3)" }}>· 1957</span>
                </div>
              </div>
              <Stars value={5} size={11} />
            </div>
          </div>
          <div style={{ padding: 14 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <VaultStat label="Voice quality" value="High" sub="2m 30s clip" />
              <VaultStat label="Face quality" value="High" sub="4 photos" />
            </div>
            <div className="hairline" style={{ margin: "14px 0" }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 17, letterSpacing: "-0.02em" }}>
                  Free to start <span style={{ fontStyle: "italic", color: "var(--ink-3)" }}>· no card needed</span>
                </div>
                <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 4 }}>One-time consent. Surprises forever.</div>
              </div>
            </div>
            <div style={{ marginTop: 14 }}>
              <CTA onClick={onCTA} size="sm">Start your Vault</CTA>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function VaultStat({ label, value, sub }) {
  return (
    <div style={{
      background: "var(--ivory-2)",
      border: "1px solid var(--ivory-line)",
      borderRadius: 14, padding: "10px 12px",
    }}>
      <div className="mono" style={{ fontSize: 10, letterSpacing: "0.12em", color: "var(--ink-3)", textTransform: "uppercase" }}>{label}</div>
      <div style={{ fontFamily: "var(--font-display)", fontSize: 18, letterSpacing: "-0.02em", marginTop: 2 }}>{value}</div>
      <div className="mono" style={{ fontSize: 10.5, color: "var(--ink-3)", marginTop: 2 }}>{sub}</div>
    </div>
  );
}

// ───────── How it works ─────────
function HowItWorks() {
  const steps = [
    { n: "01", t: "Send us a voice note", d: "30 seconds. WhatsApp voice notes, old videos, anything you have." },
    { n: "02", t: "Tell us what to say", d: "Write the message. We will translate, edit, and read it for you." },
    { n: "03", t: "We make it, in hours", d: "AI does the work. Our writers and editors check every line." },
    { n: "04", t: "They get it on WhatsApp", d: "No app to download. They tap once. They keep it forever." },
  ];
  return (
    <section id="how" style={{ padding: "8px 0 0" }}>
      <SectionHead
        num="05"
        label="How it works"
        title={`Four steps. <i>Roughly four hours.</i>`}
      />
      <div style={{ padding: "4px 22px 8px", display: "flex", flexDirection: "column", gap: 0 }}>
        {steps.map((s, i) => (
          <div key={s.n} style={{
            display: "grid", gridTemplateColumns: "44px 1fr", gap: 14,
            padding: "16px 0",
            borderTop: i === 0 ? "1px solid var(--ink)" : "1px solid var(--ivory-line)",
          }}>
            <div className="mono" style={{ fontSize: 11, letterSpacing: "0.12em", color: "var(--emerald-deep)", paddingTop: 3 }}>{s.n}</div>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 21, lineHeight: 1.05, letterSpacing: "-0.02em" }}>{s.t}</div>
              <div style={{ marginTop: 4, fontSize: 13.5, lineHeight: 1.4, color: "var(--ink-3)" }}>{s.d}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ───────── VaultDashboard · Phase II as a working interface ─────────
function VaultDashboard({ desktop = false }) {
  const people = [
    { name: "Maa", year: "b. 1957", status: "active", waveform: [0.4,0.7,0.9,0.5,0.8,0.6,0.95,0.55,0.7,0.5,0.85,0.6,0.4,0.75], next: "Anniversary · 47 days", photoKey: "dt-vault-maa" },
    { name: "Papa", year: "b. 1952 — 2022", status: "late", waveform: [0.3,0.6,0.5,0.9,0.5,0.7,0.45,0.85,0.5,0.6,0.4,0.8,0.55,0.65], next: "Bhai's birthday · 12 days", photoKey: "dt-vault-papa" },
    { name: "Dadi", year: "b. 1934 — 2022", status: "late", waveform: [0.5,0.8,0.6,0.4,0.85,0.5,0.7,0.95,0.55,0.7,0.45,0.6,0.8,0.5], next: "Diwali wish · 12 days", photoKey: "dt-vault-dadi" },
    { name: "Nana", year: "b. 1930 — 2019", status: "late", waveform: [0.4,0.55,0.85,0.6,0.4,0.75,0.55,0.65,0.9,0.5,0.7,0.45,0.85,0.6], next: "Yearly remembrance", photoKey: "memorial-vault-avatar" },
  ];
  return (
    <div style={{
      background: "rgba(255,253,247,0.05)",
      border: "1px solid rgba(255,253,247,0.12)",
      borderRadius: desktop ? 18 : 14,
      padding: desktop ? 16 : 12,
      position: "relative",
    }}>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        paddingBottom: 12, borderBottom: "1px solid rgba(255,253,247,0.1)",
        marginBottom: 12,
      }}>
        <div className="mono" style={{
          fontSize: desktop ? 10.5 : 9.5, letterSpacing: "0.16em",
          color: "rgba(255,253,247,0.55)", textTransform: "uppercase",
        }}>
          Legacy Vault · 4 people
        </div>
        <div className="mono" style={{
          fontSize: desktop ? 10.5 : 9.5, letterSpacing: "0.16em",
          color: "var(--gold)", textTransform: "uppercase",
        }}>● Auto-scheduled</div>
      </div>
      <div style={{
        display: "grid",
        gridTemplateColumns: desktop ? "repeat(2, 1fr)" : "1fr",
        gap: desktop ? 12 : 10,
      }}>
        {people.map(p => <VaultPersonCard key={p.name} p={p} desktop={desktop} />)}
      </div>
      <div style={{
        marginTop: 14, paddingTop: 12,
        borderTop: "1px solid rgba(255,253,247,0.1)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        fontFamily: "var(--font-mono)", fontSize: desktop ? 10.5 : 9.5,
        letterSpacing: "0.12em", color: "rgba(255,253,247,0.55)",
        textTransform: "uppercase",
      }}>
        <span>4 of 5 slots used</span>
        <span style={{ color: "var(--gold)" }}>+ Add a loved one</span>
      </div>
    </div>
  );
}

function VaultPersonCard({ p, desktop }) {
  const src = usePhoto(p.photoKey);
  return (
    <div style={{
      background: "rgba(255,253,247,0.04)",
      border: "1px solid rgba(255,253,247,0.10)",
      borderRadius: 12,
      padding: desktop ? "10px 12px" : "10px",
      display: "grid",
      gridTemplateColumns: "42px 1fr",
      gap: 12, alignItems: "center",
    }}>
      <div style={{
        width: 42, height: 42, borderRadius: 99,
        overflow: "hidden", position: "relative", flexShrink: 0,
        background: "linear-gradient(135deg, #C9B998, #8E7A57)",
      }} className="photo-archival">
        {src && <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
        {p.status === "late" && (
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(180deg, transparent 50%, rgba(14,18,23,0.5))",
          }} />
        )}
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 6 }}>
          <div style={{
            fontFamily: "var(--font-display)", fontSize: desktop ? 16 : 14,
            letterSpacing: "-0.01em", color: "var(--ivory)",
          }}>{p.name}</div>
          {p.status === "late" && (
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: 8.5, letterSpacing: "0.14em",
              color: "var(--gold)", textTransform: "uppercase",
              padding: "2px 5px", borderRadius: 4,
              border: "1px solid color-mix(in oklab, var(--gold) 30%, transparent)",
              whiteSpace: "nowrap", flexShrink: 0,
            }}>Memorial</span>
          )}
        </div>
        <div className="mono" style={{
          fontSize: 9, letterSpacing: "0.1em",
          color: "rgba(255,253,247,0.4)", marginTop: 2,
        }}>{p.year}</div>
        {/* mini waveform */}
        <div style={{ marginTop: 6, display: "flex", alignItems: "center", gap: 1, height: 14 }}>
          {p.waveform.map((h, i) => (
            <span key={i} style={{
              width: 2, height: `${h * 100}%`,
              background: p.status === "late"
                ? "color-mix(in oklab, var(--gold) 70%, transparent)"
                : "color-mix(in oklab, var(--emerald) 70%, transparent)",
              borderRadius: 2,
            }} />
          ))}
        </div>
        {/* next delivery */}
        <div style={{
          marginTop: 6, fontFamily: "var(--font-mono)", fontSize: 9.5,
          letterSpacing: "0.08em", color: "rgba(255,253,247,0.55)",
          textTransform: "uppercase", whiteSpace: "nowrap",
          overflow: "hidden", textOverflow: "ellipsis",
        }}>
          → {p.next}
        </div>
      </div>
    </div>
  );
}

// ───────── Memorial + Preserve · Ink + Gold (Phase II preview + emotional climax) ─────────
function MemorialMoment({ onCTA }) {
  return (
    <section style={{ padding: "28px 12px 8px" }}>
      <div style={{
        position: "relative",
        background: "var(--ink)",
        borderRadius: 26, overflow: "hidden",
        padding: "36px 22px 28px",
        color: "var(--ivory)",
        boxShadow: "0 30px 80px -40px rgba(14,18,23,0.6)",
      }}>
        {/* gold halo */}
        <div aria-hidden style={{
          position: "absolute", inset: "auto -20% -40% -20%", height: 240,
          background: "radial-gradient(50% 80% at 50% 100%, color-mix(in oklab, var(--gold), transparent 30%), transparent 70%)",
          filter: "blur(10px)",
        }} />
        <div aria-hidden style={{
          position: "absolute", left: -90, top: -80, width: 240, height: 240,
          background: "radial-gradient(closest-side, color-mix(in oklab, var(--mint), transparent 75%), transparent 70%)",
          filter: "blur(20px)",
        }} />
        <div style={{ position: "relative" }}>
          <div className="eyebrow" style={{ color: "color-mix(in oklab, var(--gold), white 25%)", marginBottom: 18 }}>
            Legacy Vault
          </div>
          <h2 className="display" style={{
            fontSize: 38, lineHeight: 0.98, letterSpacing: "-0.025em",
            color: "var(--ivory)", fontWeight: 400, margin: 0,
          }}>
            Some voices should never <span className="italic" style={{ color: "var(--gold)" }}>fade</span>.
          </h2>
          <p style={{
            marginTop: 18, fontFamily: "var(--font-display)",
            fontStyle: "italic", fontSize: 16, lineHeight: 1.45,
            color: "rgba(255,253,247,0.82)",
          }}>
            Dadi left us three years ago. Her voice still lives in our Vault. Every year, on Bhai's birthday, she still wishes him.
          </p>

          {/* Vault dashboard — full mock interface */}
          <div style={{ marginTop: 22 }}>
            <VaultDashboard />
          </div>

          <p style={{
            marginTop: 14, fontSize: 12.5, color: "rgba(255,253,247,0.55)", lineHeight: 1.5, fontFamily: "var(--font-ui)",
          }}>
            Vault starts free. No card needed.
          </p>

          <div style={{ marginTop: 20 }}>
            <button onClick={onCTA} className="cta-emerald" style={{
              background: "var(--gold)", boxShadow: "none", color: "var(--ink)",
            }}>
              <span style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 17 }}>Start your Legacy Vault</span>
              <svg width="14" height="14" viewBox="0 0 14 14"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, {
  CREATE_PRODUCTS, CreateGrid, FeaturedGridRow, GridRow, CarouselRow,
  PreserveBlock, VaultStat, HowItWorks, MemorialMoment,
  CardDemo, MiniWaveform, MiniHandwriting, CapsuleCountdown,
  VaultDashboard, VaultPersonCard,
});
