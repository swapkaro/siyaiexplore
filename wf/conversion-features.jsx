// conversion-features.jsx — V2 conversion-readiness additions
// PullQuote · LiveActivityTicker · DiwaliCuration · WhatsAppChatWidget
// ExitIntentModal · FAQAccordion · CompactHowItWorks · StaticReviews

// ───────── PullQuote — single review inline under hero social proof ─────────
function PullQuote({ desktop = false }) {
  const QUOTES = [
    { t: "Mummy roi, phir hassi. Phir 5 baar suni.", n: "Priya S.", c: "Mumbai" },
    { t: "Dadi nahi thi par unka ashirwad tha.", n: "Sneha K.", c: "Delhi" },
    { t: "Worth every dollar. Ma's handwriting on real paper. I cried.", n: "Aditi V.", c: "New Jersey" },
  ];
  const [i, setI] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setI(x => (x + 1) % QUOTES.length), 6000);
    return () => clearInterval(id);
  }, []);
  const q = QUOTES[i];
  return (
    <div style={{
      marginTop: desktop ? 28 : 18,
      padding: desktop ? "16px 18px" : "12px 14px",
      background: "color-mix(in oklab, var(--ivory-2) 60%, var(--ivory))",
      border: "1px solid var(--ivory-line)",
      borderRadius: 14,
      display: "flex", alignItems: "center", gap: 14,
      maxWidth: desktop ? 520 : 360,
    }}>
      <Stars value={5} size={desktop ? 12 : 11} />
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{
          fontFamily: "var(--font-display)", fontStyle: "italic",
          fontSize: desktop ? 16 : 14, lineHeight: 1.35,
          color: "var(--ink-2)", letterSpacing: "-0.005em",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>"{q.t}"</div>
        <div className="mono" style={{
          fontSize: desktop ? 10.5 : 9.5, color: "var(--ink-3)",
          letterSpacing: "0.1em", marginTop: 3, textTransform: "uppercase",
        }}>
          {q.n} · {q.c}
        </div>
      </div>
    </div>
  );
}

// ───────── LiveActivityTicker — rotating "X just sent Y" social proof ─────────
function LiveActivityTicker({ desktop = false }) {
  const ACTIVITY = [
    { name: "Aarav", loc: "Pune", verb: "sent a Voice Letter", t: "4 min ago" },
    { name: "Meera", loc: "Bengaluru", verb: "added Dadi to her Vault", t: "8 min ago" },
    { name: "Vikram", loc: "New Jersey", verb: "ordered a Memory Film", t: "12 min ago" },
    { name: "Anjali", loc: "Delhi", verb: "scheduled a Diwali gift", t: "18 min ago" },
    { name: "Rohan", loc: "Mumbai", verb: "sent a Custom Song", t: "26 min ago" },
    { name: "Priya", loc: "Toronto", verb: "ordered a Living Portrait", t: "34 min ago" },
  ];
  const [i, setI] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setI(x => (x + 1) % ACTIVITY.length), 4500);
    return () => clearInterval(id);
  }, []);
  const a = ACTIVITY[i];
  return (
    <div style={{
      marginTop: desktop ? 18 : 14,
      display: "inline-flex", alignItems: "center", gap: 8,
      fontFamily: "var(--font-mono)", fontSize: desktop ? 12 : 11,
      color: "var(--ink-3)", letterSpacing: "0.04em",
    }}>
      <span style={{
        width: 7, height: 7, borderRadius: 99,
        background: "var(--emerald)",
        boxShadow: "0 0 0 3px color-mix(in oklab, var(--mint), transparent 60%)",
        animation: "breathe 2s ease-in-out infinite",
      }} />
      <span style={{ whiteSpace: "nowrap" }}>
        <span style={{ color: "var(--ink-2)" }}>{a.name} in {a.loc}</span> {a.verb} · {a.t}
      </span>
    </div>
  );
}

// ───────── Diwali curation strip (replaces HeroProductTeaser) ─────────
function DiwaliCuration({ currency, desktop = false }) {
  const items = [
    { id: "diwali-voice", title: "Voice Letter", sub: "Papa's Diwali wish in his own voice", price: 299, dur: "60 sec · 4 hrs", label: "diwali wish", tone: "gold", photoKey: "diwali-voice" },
    { id: "diwali-portrait", title: "Living Portrait", sub: "Dadi smiling, lit by a diya", price: 499, dur: "Photo, alive", label: "dadi, diya", tone: "seafoam", badge: "POPULAR", photoKey: "diwali-portrait" },
    { id: "diwali-bundle", title: "Family Bundle", sub: "3 gifts. 3 people. ₹300 less.", price: 999, dur: "Pick 3 · save ₹300", label: "family of 5", tone: "sky", badge: "SAVE ₹300", photoKey: "diwali-bundle" },
  ];
  if (desktop) {
    return (
      <section className="dt-section-tight">
        <div className="dt-container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 24 }}>
            <div>
              <div className="dt-eyebrow" style={{ marginBottom: 14 }}>
                <span style={{ color: "var(--gold)" }}>●</span>
                <span>For Diwali</span>
              </div>
              <h2 className="dt-display" style={{
                margin: 0, fontSize: 36, letterSpacing: "-0.025em",
              }}>
                For Diwali <span style={{ fontStyle: "italic", color: "var(--ink-3)" }}>this year</span>.
              </h2>
            </div>
            <a href="#" className="dt-link">All Diwali <span className="arrow">→</span></a>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {items.map(p => <DiwaliCard key={p.id} p={p} currency={currency} desktop />)}
          </div>
        </div>
      </section>
    );
  }
  return (
    <section style={{ padding: "8px 0 4px" }}>
      <div style={{ padding: "0 22px 12px", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <div className="eyebrow" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: "var(--gold)" }}>●</span>
          <span>For Diwali</span>
        </div>
        <a href="#" style={{
          fontFamily: "var(--font-ui)", fontSize: 12, color: "var(--ink-2)", textDecoration: "none",
        }}>All Diwali →</a>
      </div>
      <div className="no-scrollbar" style={{
        display: "flex", gap: 12, overflowX: "auto",
        padding: "4px 22px 6px", scrollSnapType: "x mandatory",
      }}>
        {items.map(p => (
          <div key={p.id} style={{ flex: "0 0 78%", scrollSnapAlign: "start" }}>
            <DiwaliCard p={p} currency={currency} />
          </div>
        ))}
      </div>
    </section>
  );
}

function DiwaliCard({ p, currency, desktop }) {
  return (
    <a href="#" style={{ textDecoration: "none", color: "inherit", display: "block" }}>
      <div className="pcard">
        <div className="ph" style={{ position: "relative" }}>
          <PhotoSlot label={p.label} tone={p.tone} aspect={desktop ? "4 / 3" : undefined} photoKey={p.photoKey} />
          {p.badge && (
            <span style={{
              position: "absolute", top: 10, left: 10,
              background: "var(--gold)", color: "var(--ink)",
              fontFamily: "var(--font-mono)", fontSize: 9.5, letterSpacing: "0.14em",
              padding: "5px 9px", borderRadius: 100, textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}>{p.badge}</span>
          )}
        </div>
        <div className="body">
          <h3 style={{ fontSize: desktop ? 22 : 19 }}>{p.title}</h3>
          <div className="tag" style={{ fontSize: desktop ? 13.5 : 12.5 }}>"{p.sub}"</div>
          <div style={{
            marginTop: 8, paddingTop: 8,
            borderTop: "1px solid var(--ivory-line)",
            display: "flex", justifyContent: "space-between", alignItems: "baseline",
          }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
              <span className="mono" style={{ fontSize: 10, color: "var(--ink-3)", textTransform: "uppercase", letterSpacing: "0.12em" }}>from</span>
              <span className="mono" style={{ fontSize: 13, color: "var(--ink)" }}>{fmtPrice(p.price, currency)}</span>
            </div>
            <span className="mono" style={{ fontSize: 10, color: "var(--ink-3)", whiteSpace: "nowrap" }}>{p.dur}</span>
          </div>
        </div>
      </div>
    </a>
  );
}

// ───────── WhatsApp chat widget (fixed bottom-right) ─────────
function WhatsAppChatWidget() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <button
        aria-label="Chat on WhatsApp"
        onClick={() => setOpen(o => !o)}
        style={{
          position: "fixed", right: 18, bottom: 18, zIndex: 50,
          width: 54, height: 54, borderRadius: 99, border: 0,
          background: "#25D366",
          boxShadow: "0 14px 40px -8px rgba(37,211,102,0.5), 0 2px 4px rgba(14,18,23,0.15)",
          display: "grid", placeItems: "center", cursor: "pointer",
          transition: "transform .2s ease",
          transform: open ? "scale(0.9)" : "scale(1)",
        }}
      >
        {open
          ? <svg width="20" height="20" viewBox="0 0 16 16" fill="none"><path d="M2 2l12 12M14 2L2 14" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
          : <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff"><path d="M20.5 3.5A11.5 11.5 0 003.4 18.3L2 22l3.8-1.4a11.5 11.5 0 1014.7-17.1zM12 20.3a8.3 8.3 0 01-4.2-1.2l-.3-.2-2.5 1 1-2.5-.2-.3a8.3 8.3 0 1112.5-1.2 8.3 8.3 0 01-6.3 4.4zm4.6-5.9c-.3-.2-1.6-.8-1.8-.9-.3-.1-.5-.1-.7.2-.2.2-.7.9-.9 1-.2.2-.3.2-.6 0-.3-.2-1.2-.5-2.3-1.4-.8-.7-1.4-1.6-1.6-1.9-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.2-.5 0-.2 0-.4-.1-.5-.1-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.3-.3.3-1 1-1 2.4s1.1 2.8 1.2 3c.2.2 2.2 3.4 5.3 4.8 3.1 1.4 3.1.9 3.6.9.6 0 1.8-.7 2-1.5.3-.8.3-1.4.2-1.5l-.5-.4z"/></svg>}
      </button>
      {open && (
        <div style={{
          position: "fixed", right: 18, bottom: 82, zIndex: 50,
          width: 300, maxWidth: "calc(100vw - 36px)",
          background: "var(--ivory)",
          borderRadius: 18, overflow: "hidden",
          boxShadow: "0 30px 60px -20px rgba(14,18,23,0.3), 0 0 0 1px var(--ivory-line)",
          fontFamily: "var(--font-ui)",
        }}>
          <div style={{
            background: "#075E54", color: "#fff",
            padding: "16px 16px 14px",
            display: "flex", alignItems: "center", gap: 12,
          }}>
            <div style={{
              width: 38, height: 38, borderRadius: 99,
              background: "radial-gradient(circle at 30% 30%, #C6F1D0, var(--mint))",
              display: "grid", placeItems: "center",
              fontFamily: "var(--font-display)", color: "#0E1217", fontSize: 18, fontWeight: 500,
            }}>S</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>SiyAI · We're here</div>
              <div style={{ fontSize: 11, opacity: 0.7, marginTop: 2 }}>Typically replies in 5 minutes</div>
            </div>
          </div>
          <div style={{ padding: "16px 14px 14px", background: "#ECE5DD" }}>
            <div style={{
              background: "#fff", borderRadius: "14px 14px 14px 4px",
              padding: "10px 12px", maxWidth: "88%", marginBottom: 8,
              fontSize: 13.5, lineHeight: 1.4, color: "var(--ink)",
            }}>
              <div style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 14 }}>Namaste 🙏</div>
              <div style={{ marginTop: 4 }}>Need help choosing a gift? Tell us who it's for, when you need it, and your budget — we'll suggest the right one.</div>
              <div className="mono" style={{ fontSize: 10, color: "var(--ink-3)", marginTop: 6, textAlign: "right" }}>09:14 ✓✓</div>
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 10 }}>
              {["For Maa", "For Papa", "Quick gift", "Diwali"].map(s => (
                <button key={s} style={{
                  background: "#fff", border: "1px solid rgba(0,0,0,0.08)",
                  fontFamily: "var(--font-ui)", fontSize: 12, fontWeight: 500,
                  padding: "6px 11px", borderRadius: 100, color: "var(--ink-2)",
                  cursor: "pointer",
                }}>{s}</button>
              ))}
            </div>
          </div>
          <a href="#" style={{
            display: "block", textAlign: "center",
            background: "#25D366", color: "#fff",
            padding: 14, fontWeight: 600, fontSize: 13.5,
            textDecoration: "none", letterSpacing: "0.01em",
          }}>
            Continue on WhatsApp →
          </a>
        </div>
      )}
    </>
  );
}

// ───────── Exit-intent first-buyer modal ─────────
function ExitIntentModal() {
  const [shown, setShown] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    if (shown) return;
    const onLeave = (e) => {
      if (e.clientY < 6) {
        setShown(true);
        setOpen(true);
        document.removeEventListener("mouseout", onLeave);
      }
    };
    const t = setTimeout(() => {
      // mobile fallback: show after 28 seconds of scroll inactivity
      if (!shown) {
        setShown(true);
        setOpen(true);
      }
    }, 28000);
    document.addEventListener("mouseout", onLeave);
    return () => {
      document.removeEventListener("mouseout", onLeave);
      clearTimeout(t);
    };
  }, [shown]);
  if (!open) return null;
  return (
    <div
      onClick={() => setOpen(false)}
      style={{
        position: "fixed", inset: 0, zIndex: 60,
        background: "rgba(14,18,23,0.55)",
        backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)",
        display: "grid", placeItems: "center",
        padding: 20,
        animation: "modalFade 0.25s ease-out",
      }}
    >
      <style>{`@keyframes modalFade { from { opacity: 0 } to { opacity: 1 } }
        @keyframes modalPop { from { opacity: 0; transform: scale(.94) translateY(8px) } to { opacity: 1; transform: scale(1) translateY(0) } }
      `}</style>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--ivory)",
          maxWidth: 420, width: "100%",
          borderRadius: 24, padding: 28,
          position: "relative",
          boxShadow: "0 40px 80px -20px rgba(0,0,0,0.4)",
          animation: "modalPop 0.32s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        <button
          aria-label="Close"
          onClick={() => setOpen(false)}
          style={{
            position: "absolute", right: 14, top: 14,
            background: "transparent", border: 0, cursor: "pointer",
            color: "var(--ink-3)", fontSize: 22, lineHeight: 1, padding: 4,
          }}
        >×</button>
        <div className="eyebrow" style={{ marginBottom: 14 }}>
          One-time · first gift
        </div>
        <h3 className="display" style={{
          margin: 0, fontSize: 30, lineHeight: 1, letterSpacing: "-0.025em", fontWeight: 400,
        }}>
          Send your first <span className="italic" style={{ color: "var(--emerald-deep)" }}>memory</span> for ₹199.
        </h3>
        <p style={{
          marginTop: 14, fontSize: 14.5, lineHeight: 1.5, color: "var(--ink-2)",
        }}>
          ₹100 off a Voice Letter, just for trying. Your recipient gets it on WhatsApp in 4 hours.
        </p>
        <div style={{ marginTop: 22 }}>
          <button className="cta-emerald" style={{ width: "100%", justifyContent: "center" }}
            onClick={() => { setOpen(false); console.log("[SiyAI] Exit-intent: claimed ₹199 offer"); }}>
            Claim ₹199 first gift
            <svg width="14" height="14" viewBox="0 0 14 14"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
        <div className="mono" style={{
          marginTop: 12, fontSize: 10, color: "var(--ink-3)",
          letterSpacing: "0.12em", textAlign: "center", textTransform: "uppercase",
        }}>
          Code applied automatically · expires in 24 hrs
        </div>
      </div>
    </div>
  );
}

// ───────── FAQ accordion ─────────
const FAQS = [
  {
    q: "Is the voice actually AI?",
    a: "Yes — the technology is AI voice cloning. But you'll only hear your father. 30 seconds of clean audio is enough. Every clip is watermarked, traceable to you only.",
  },
  {
    q: "What if my recipient doesn't have WhatsApp?",
    a: "Almost everyone in India does. If yours doesn't, we send a link they can open on any phone. Voice Letters also download as MP3.",
  },
  {
    q: "Can I use the voice of someone who has passed away?",
    a: "Yes. One of our most meaningful use cases. We ask for a family declaration and relationship verification — no exceptions. Memorial Mode handles it with care.",
  },
  {
    q: "What if I don't have 30 seconds of clean audio?",
    a: "Old WhatsApp voice notes, phone videos, even a hum from years ago — we work with most things. Stuck? Message us on WhatsApp and we'll figure it out.",
  },
  {
    q: "How fast does it arrive?",
    a: "Voice Letter: 4 hours. Living Portrait: 6 hours. Memory Film: 48 hours (hand-crafted). All on WhatsApp. Schedule for any future date.",
  },
  {
    q: "Can I cancel or get my money back?",
    a: "Unlimited redos included. Still not happy? Full money back, no questions. The gift means nothing if it doesn't make them cry.",
  },
];

function FAQAccordion({ desktop = false }) {
  const [open, setOpen] = React.useState(0);
  return (
    <section style={desktop ? null : { padding: "8px 0 0" }} className={desktop ? "dt-section-tight" : ""}>
      <div className={desktop ? "dt-container" : ""}>
        {desktop ? (
          <div style={{ marginBottom: 32 }}>
            <h2 className="dt-display dt-headline-md" style={{ margin: 0 }}>
              The honest <span style={{ fontStyle: "italic", color: "var(--ink-3)" }}>answers</span>.
            </h2>
          </div>
        ) : (
          <div className="section-head">
            <h2 style={{
              margin: 0, fontFamily: "var(--font-display)", fontWeight: 400,
              fontSize: 32, lineHeight: 0.98, letterSpacing: "-0.025em",
            }}>
              The honest <span style={{ fontStyle: "italic", color: "var(--ink-3)" }}>answers</span>.
            </h2>
          </div>
        )}
        <div style={{
          padding: desktop ? 0 : "4px 22px 8px",
          maxWidth: desktop ? 820 : "none", marginInline: desktop ? "auto" : 0,
        }}>
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} style={{
                borderTop: i === 0 ? "1px solid var(--ink)" : "1px solid var(--ivory-line)",
                borderBottom: i === FAQS.length - 1 ? "1px solid var(--ivory-line)" : "none",
              }}>
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  style={{
                    width: "100%", textAlign: "left",
                    background: "transparent", border: 0,
                    padding: desktop ? "20px 0" : "16px 0",
                    display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16,
                    cursor: "pointer",
                    fontFamily: "var(--font-display)",
                    fontSize: desktop ? 22 : 18, letterSpacing: "-0.02em",
                    color: "var(--ink)", lineHeight: 1.2,
                  }}
                >
                  <span>{f.q}</span>
                  <span style={{
                    width: 26, height: 26, borderRadius: 99, flexShrink: 0,
                    background: isOpen ? "var(--ink)" : "transparent",
                    border: "1px solid " + (isOpen ? "var(--ink)" : "var(--ivory-line)"),
                    color: isOpen ? "var(--ivory)" : "var(--ink-2)",
                    display: "grid", placeItems: "center",
                    transition: "all .18s ease",
                  }}>
                    <svg width="11" height="11" viewBox="0 0 16 16">
                      <path d={isOpen ? "M3 8h10" : "M8 3v10M3 8h10"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                    </svg>
                  </span>
                </button>
                {isOpen && (
                  <div style={{
                    padding: desktop ? "0 0 24px" : "0 0 18px",
                    fontSize: desktop ? 15.5 : 14, lineHeight: 1.55,
                    color: "var(--ink-3)", maxWidth: desktop ? 680 : "none",
                  }}>
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div style={{
          padding: desktop ? "28px 0 0" : "18px 22px 0",
          textAlign: desktop ? "center" : "left",
        }}>
          <a href="#" className={desktop ? "dt-link" : "link-arrow"}>
            Still have a question? Chat with us <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

// ───────── How-it-works compressed strip ─────────
function HowItWorksStrip({ desktop = false }) {
  const steps = [
    { n: "01", t: "Upload" },
    { n: "02", t: "Write" },
    { n: "03", t: "We make it" },
    { n: "04", t: "WhatsApp" },
  ];
  return (
    <section className={desktop ? "dt-section-tight" : ""} style={desktop ? null : { padding: "8px 0 0" }}>
      <div className={desktop ? "dt-container" : ""} style={desktop ? null : { padding: "22px 22px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 18 }}>
          <div>
            <div className={desktop ? "dt-eyebrow" : "eyebrow"} style={{ marginBottom: desktop ? 14 : 10 }}>
              <span>How it works</span>
            </div>
            <h2 style={{
              margin: 0,
              fontFamily: "var(--font-display)", fontWeight: 400,
              fontSize: desktop ? 32 : 24, lineHeight: 1, letterSpacing: "-0.02em",
            }}>
              Four steps. <span style={{ fontStyle: "italic", color: "var(--ink-3)" }}>About four hours.</span>
            </h2>
          </div>
        </div>
        <div style={{
          padding: desktop ? "12px 0 0" : "0",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: desktop ? 24 : 10,
        }}>
          {steps.map(s => (
            <div key={s.n} style={{
              paddingTop: desktop ? 18 : 12,
              borderTop: "1px solid var(--ink)",
            }}>
              <div className="mono" style={{
                fontSize: desktop ? 11.5 : 10, letterSpacing: "0.18em",
                color: "var(--emerald-deep)",
              }}>{s.n}</div>
              <div style={{
                marginTop: desktop ? 10 : 6,
                fontFamily: "var(--font-display)", fontSize: desktop ? 22 : 16,
                letterSpacing: "-0.02em", lineHeight: 1,
              }}>{s.t}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ───────── Static reviews — 3 cards instead of marquee ─────────
function ReviewsStatic({ desktop = false }) {
  const top3 = (window.REVIEWS || []).slice(0, 3);
  if (!top3.length) return null;
  return (
    <section className={desktop ? "dt-section-tight" : ""} style={desktop ? null : { padding: "8px 0 0" }}>
      <div className={desktop ? "dt-container" : ""}>
        {desktop ? (
          <div style={{ marginBottom: 28 }}>
            <h2 className="dt-display dt-headline-md" style={{ margin: 0 }}>
              10,000 families. <span style={{ fontStyle: "italic", color: "var(--ink-3)" }}>Same first reaction.</span>
            </h2>
          </div>
        ) : (
          <div className="section-head">
            <h2 style={{
              margin: 0, fontFamily: "var(--font-display)", fontWeight: 400,
              fontSize: 32, lineHeight: 0.98, letterSpacing: "-0.025em",
            }}>
              10,000 families. <span style={{ fontStyle: "italic", color: "var(--ink-3)" }}>Same first reaction.</span>
            </h2>
          </div>
        )}
        <div style={{
          padding: desktop ? 0 : "10px 22px 8px",
          display: "grid",
          gridTemplateColumns: desktop ? "repeat(3, 1fr)" : "1fr",
          gap: desktop ? 20 : 12,
        }}>
          {top3.map((r, i) => (
            <div key={i} style={{
              background: "var(--ivory)",
              border: "1px solid var(--ivory-line)",
              borderRadius: desktop ? 22 : 18,
              padding: desktop ? 22 : 16,
            }}>
              <Stars value={r.s} size={desktop ? 13 : 11} />
              <div style={{
                fontFamily: "var(--font-display)", fontStyle: "italic",
                fontSize: desktop ? 21 : 17, lineHeight: 1.3,
                marginTop: 12, color: "var(--ink)", letterSpacing: "-0.01em",
              }}>"{r.t}"</div>
              <div style={{ marginTop: 16, display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 600, whiteSpace: "nowrap" }}>{r.n}</div>
                  <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)", whiteSpace: "nowrap" }}>{r.c}</div>
                </div>
                <div className="mono" style={{ fontSize: 10.5, color: "var(--ink-3)", textTransform: "uppercase", letterSpacing: "0.1em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", minWidth: 0 }}>{r.p}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{
          padding: desktop ? "22px 0 0" : "14px 22px 0",
          textAlign: desktop ? "center" : "left",
        }}>
          <a href="#" className={desktop ? "dt-link" : "link-arrow"}>
            Read 2,341 reviews <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

// ───────── Most Loved (season-agnostic curation, replaces Diwali strip) ─────────
function MostLoved({ currency, desktop = false }) {
  const items = [
    { id: "ml-voice", title: "Voice Letter", sub: "1,420 sent this month", price: 299, dur: "60 sec · 4 hrs", label: "papa", tone: "ivory", badge: "LOVED", photoKey: "create-voice-letter" },
    { id: "ml-portrait", title: "Living Portrait", sub: "Dadi smiled, just like she used to", price: 499, dur: "Photo, alive", label: "dadi", tone: "sky", badge: "POPULAR", photoKey: "create-living-portrait" },
    { id: "ml-film", title: "Memory Film", sub: "A whole life, in 90 seconds", price: 1999, dur: "1-2 min", label: "family", tone: "gold", badge: "TRENDING", photoKey: "create-memory-film" },
  ];
  if (desktop) {
    return (
      <section className="dt-section-tight">
        <div className="dt-container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 24 }}>
            <h2 className="dt-display" style={{
              margin: 0, fontSize: 36, letterSpacing: "-0.025em",
            }}>
              Most loved <span style={{ fontStyle: "italic", color: "var(--ink-3)" }}>right now</span>.
            </h2>
            <a href="#" className="dt-link">Browse all <span className="arrow">→</span></a>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {items.map(p => <DiwaliCard key={p.id} p={p} currency={currency} desktop />)}
          </div>
        </div>
      </section>
    );
  }
  return (
    <section style={{ padding: "16px 0 4px" }}>
      <div style={{ padding: "0 22px 12px", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <h2 style={{
          margin: 0,
          fontFamily: "var(--font-display)", fontWeight: 400,
          fontSize: 26, letterSpacing: "-0.025em", lineHeight: 1,
        }}>
          Most loved <span style={{ fontStyle: "italic", color: "var(--ink-3)" }}>right now</span>.
        </h2>
        <a href="#" style={{
          fontFamily: "var(--font-ui)", fontSize: 12, color: "var(--ink-2)", textDecoration: "none",
        }}>Browse all →</a>
      </div>
      <div className="no-scrollbar" style={{
        display: "flex", gap: 12, overflowX: "auto",
        padding: "4px 22px 6px", scrollSnapType: "x mandatory",
      }}>
        {items.map(p => (
          <div key={p.id} style={{ flex: "0 0 78%", scrollSnapAlign: "start" }}>
            <DiwaliCard p={p} currency={currency} />
          </div>
        ))}
      </div>
    </section>
  );
}

// ───────── Bundles (3 curated combos · AOV lever) ─────────
function Bundles({ currency, desktop = false }) {
  const bundles = [
    {
      id: "mini-set", title: "Mini Set", line: "Voice Letter + Time Capsule",
      price: 399, original: 448, includes: ["Voice Letter · 60s", "Time Capsule"],
      badge: null, tone: "ivory",
    },
    {
      id: "send-now", title: "Send-Now Set", line: "Voice Letter + Living Portrait",
      price: 699, original: 798, includes: ["Voice Letter · 60s", "Living Portrait"],
      badge: "POPULAR", tone: "seafoam",
    },
    {
      id: "legacy-set", title: "Legacy Set", line: "Memory Film + 3 Voice Letters",
      price: 2699, original: 2996, includes: ["Memory Film", "3× Voice Letter"],
      badge: "BEST VALUE", tone: "gold",
    },
  ];
  const root = desktop
    ? { wrap: "dt-section-tight", inner: "dt-container", grid: "repeat(3, 1fr)" }
    : { wrap: "", inner: "", grid: "1fr" };
  const headerCss = desktop
    ? { fontSize: 36, marginBottom: 24 }
    : { fontSize: 26, padding: "0 22px 12px" };
  return (
    <section className={root.wrap} style={desktop ? null : { padding: "20px 0 4px" }}>
      <div className={root.inner}>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "baseline",
          ...(desktop ? { marginBottom: 24 } : { padding: "0 22px 12px" }),
        }}>
          <h2 style={{
            margin: 0,
            fontFamily: "var(--font-display)", fontWeight: 400,
            fontSize: desktop ? 36 : 26, letterSpacing: "-0.025em", lineHeight: 1,
          }}>
            Bundles. <span style={{ fontStyle: "italic", color: "var(--emerald-deep)" }}>One gift, more impact.</span>
          </h2>
          {desktop && <a href="#" className="dt-link">All bundles <span className="arrow">→</span></a>}
        </div>
        {desktop ? (
          <div style={{ display: "grid", gridTemplateColumns: root.grid, gap: 20 }}>
            {bundles.map(b => <BundleCard key={b.id} b={b} currency={currency} desktop />)}
          </div>
        ) : (
          <div className="no-scrollbar" style={{
            display: "flex", gap: 12, overflowX: "auto",
            padding: "4px 22px 6px", scrollSnapType: "x mandatory",
          }}>
            {bundles.map(b => (
              <div key={b.id} style={{ flex: "0 0 78%", scrollSnapAlign: "start" }}>
                <BundleCard b={b} currency={currency} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function BundleCard({ b, currency, desktop }) {
  const toneBg = {
    ivory: "var(--ivory-2)",
    seafoam: "color-mix(in oklab, var(--seafoam) 35%, var(--ivory))",
    gold: "color-mix(in oklab, var(--gold-soft) 55%, var(--ivory))",
  }[b.tone];
  const featured = b.badge === "POPULAR";
  return (
    <a href="#" style={{ textDecoration: "none", color: "inherit" }}>
      <div className="pcard" style={{
        background: toneBg, padding: desktop ? 22 : 18,
        minHeight: desktop ? (featured ? 320 : 280) : 220,
        display: "flex", flexDirection: "column", gap: 14,
        position: "relative", overflow: "hidden",
        transform: featured && desktop ? "translateY(-8px)" : "none",
        boxShadow: featured && desktop ? "0 24px 50px -24px rgba(14,18,23,0.18)" : "none",
      }}>
        {b.badge && (
          <span className="mono" style={{
            alignSelf: "flex-start",
            fontSize: 10, letterSpacing: "0.14em",
            background: "var(--ink)", color: "var(--ivory)",
            padding: "4px 10px", borderRadius: 100, textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}>{b.badge}</span>
        )}
        <div>
          <h3 style={{
            margin: 0, fontFamily: "var(--font-display)", fontWeight: 400,
            fontSize: desktop ? 26 : 22, letterSpacing: "-0.02em", lineHeight: 1.05,
          }}>{b.title}</h3>
          <div className="mono" style={{
            fontSize: 11, color: "var(--ink-3)", marginTop: 6, letterSpacing: "0.04em",
          }}>{b.line}</div>
        </div>
        <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
          {b.includes.map((line, i) => (
            <li key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--ink-2)" }}>
              <svg width="14" height="14" viewBox="0 0 16 16"><path d="M3 8.5l3 3 7-7" stroke="var(--emerald-deep)" strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
              {line}
            </li>
          ))}
        </ul>
        <div style={{
          marginTop: "auto", paddingTop: 14, borderTop: "1px solid var(--ivory-line)",
          display: "flex", justifyContent: "space-between", alignItems: "baseline",
        }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span className="mono" style={{ fontSize: desktop ? 17 : 15, fontWeight: 500 }}>{fmtPrice(b.price, currency)}</span>
            <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)", textDecoration: "line-through" }}>{fmtPrice(b.original, currency)}</span>
          </div>
          <span style={{ fontFamily: "var(--font-ui)", fontWeight: 600, fontSize: 14, color: "var(--emerald-deep)", whiteSpace: "nowrap" }}>
            Save {fmtPrice(b.original - b.price, currency)} →
          </span>
        </div>
      </div>
    </a>
  );
}

// ───────── Budget bar (Indian gifters think in tiers) ─────────
function BudgetBar({ desktop = false, currency = "INR" }) {
  const tiers = [
    { label: currency === "USD" ? "Under $5" : "Under ₹500", count: 4 },
    { label: currency === "USD" ? "$5–18" : "₹500–1,500", count: 7 },
    { label: currency === "USD" ? "$18–35" : "₹1,500–3,000", count: 4 },
    { label: currency === "USD" ? "$35+" : "₹3,000+", count: 3 },
  ];
  return (
    <section data-compact="true" className={desktop ? "" : ""} style={desktop ? null : null}>
      <div className={desktop ? "dt-container" : ""}>
        <div style={{
          display: "flex", gap: 10, flexWrap: "wrap",
          padding: desktop ? "0" : "0 22px",
        }}>
          {tiers.map(t => (
            <a key={t.label} href="#" style={{ textDecoration: "none", flex: desktop ? "1 1 0" : "0 0 auto" }}>
              <div className={desktop ? "dt-chip" : "chip"} style={{
                width: desktop ? "100%" : "auto",
                justifyContent: "space-between",
                cursor: "pointer",
              }}>
                <span>{t.label}</span>
                <span style={{
                  fontFamily: "var(--font-mono)", fontSize: desktop ? 12 : 11, color: "var(--ink-3)",
                }}>{String(t.count).padStart(2, "0")}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, {
  PullQuote, LiveActivityTicker,
  DiwaliCuration, DiwaliCard,
  MostLoved, Bundles, BundleCard, BudgetBar,
  WhatsAppChatWidget, ExitIntentModal,
  FAQAccordion, FAQS,
  HowItWorksStrip, ReviewsStatic,
});
