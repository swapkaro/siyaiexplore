// sections-end.jsx — reviews, plans, trust, footer

// ───────── Reviews ─────────
const REVIEWS = [
  { n: "Priya S.", c: "Mumbai", t: "Mummy roi, phir hassi. Phir 5 baar suni.", p: "Voice Letter · 60s", s: 5 },
  { n: "Rahul M.", c: "Bengaluru", t: "Sangeet par sab ne pucha — ye gaana kahaan se liya?", p: "Custom Song · Sangeet", s: 5 },
  { n: "Sneha K.", c: "Delhi", t: "Dadi nahi thi par unka ashirwad tha. Mera mann bhar aaya.", p: "Living Portrait", s: 5 },
  { n: "Arjun D.", c: "Toronto", t: "I live abroad. This is the closest I have been to my Nana in years.", p: "Voice Letter · 90s", s: 5 },
  { n: "Meera J.", c: "Pune", t: "Papa ko gift kiya retirement par. Office ke saamne ro pade.", p: "Memory Film", s: 5 },
  { n: "Aditi V.", c: "New Jersey", t: "Worth every dollar. Ma's handwriting on real paper. I cried.", p: "Handwritten Letter", s: 5 },
];

function Reviews() {
  // duplicate the row so the marquee can loop seamlessly
  const row = [...REVIEWS, ...REVIEWS];
  return (
    <section style={{ padding: "8px 0 0" }}>
      <SectionHead
        title={`10,000 families. <i>Same first reaction.</i>`}
        lede="They cry. Then they share it with the rest of the family."
      />
      <div style={{ overflow: "hidden", padding: "4px 0 18px", WebkitMaskImage: "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)" }}>
        <div className="marquee">
          {row.map((r, i) => (
            <div key={i} style={{
              flex: "0 0 260px",
              background: "var(--ivory)",
              border: "1px solid var(--ivory-line)",
              borderRadius: 18, padding: 14,
            }}>
              <Stars value={r.s} />
              <div style={{
                fontFamily: "var(--font-display)", fontStyle: "italic",
                fontSize: 18, lineHeight: 1.3, marginTop: 8, color: "var(--ink)",
                letterSpacing: "-0.01em",
              }}>"{r.t}"</div>
              <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
                <div style={{ flexShrink: 0 }}>
                  <div style={{ fontFamily: "var(--font-ui)", fontSize: 13, fontWeight: 600, whiteSpace: "nowrap" }}>{r.n}</div>
                  <div className="mono" style={{ fontSize: 10.5, color: "var(--ink-3)", whiteSpace: "nowrap" }}>{r.c}</div>
                </div>
                <div className="mono" style={{ fontSize: 10.5, color: "var(--ink-3)", textTransform: "uppercase", letterSpacing: "0.1em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", minWidth: 0 }}>{r.p}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ───────── Plans ─────────
function Plans({ currency, onCTA }) {
  const conv = (v) => fmtPrice(v, currency);
  return (
    <section style={{ padding: "8px 0 0" }}>
      <SectionHead
        num="09"
        label="Plans"
        title={`Two ways to <i>stay</i>.`}
        lede="Start free. Upgrade only when you have a person worth preserving."
      />
      <div style={{ padding: "4px 22px 0", display: "flex", flexDirection: "column", gap: 12 }}>
        <PlanCard
          name="Family Plan"
          price={conv(1999)}
          per="/ year"
          tag="POPULAR"
          desc="Active families. Birthdays, anniversaries, festivals, on auto-pilot."
          bullets={["15 vault slots", "12 auto-deliveries / year", "7-day preview & approve", "Priority WhatsApp support", "Group gift access"]}
          highlight
          onCTA={onCTA}
        />
        <PlanCard
          name="Legacy Forever"
          price={conv(14999)}
          per="one-time"
          desc="For the family that wants to preserve, not subscribe."
          bullets={["Unlimited voices & faces", "Unlimited auto-deliveries", "Lifetime storage guarantee", "Every future feature included", "Dedicated family manager"]}
        />
      </div>
    </section>
  );
}

function PlanCard({ name, price, per, tag, desc, bullets, highlight, onCTA }) {
  return (
    <div style={{
      background: highlight ? "var(--ink)" : "var(--ivory)",
      color: highlight ? "var(--ivory)" : "var(--ink)",
      border: highlight ? "1px solid var(--ink)" : "1px solid var(--ivory-line)",
      borderRadius: 22, padding: 20,
      position: "relative", overflow: "hidden",
    }}>
      {highlight && (
        <div aria-hidden style={{
          position: "absolute", inset: "auto -20% -50% -20%", height: 200,
          background: "radial-gradient(50% 80% at 50% 100%, color-mix(in oklab, var(--emerald), transparent 60%), transparent 70%)",
          filter: "blur(8px)",
        }} />
      )}
      <div style={{ position: "relative" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 22, letterSpacing: "-0.02em" }}>{name}</div>
          {tag && <span style={{
            fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em",
            background: highlight ? "var(--emerald)" : "var(--ivory-2)",
            color: highlight ? "var(--ink)" : "var(--ink-3)",
            padding: "4px 8px", borderRadius: 100, textTransform: "uppercase",
            border: highlight ? "0" : "1px solid var(--ivory-line)",
          }}>{tag}</span>}
        </div>
        <div style={{ marginTop: 10, display: "flex", alignItems: "baseline", gap: 6, flexWrap: "wrap" }}>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 38, letterSpacing: "-0.025em", whiteSpace: "nowrap" }}>{price}</span>
          <span className="mono" style={{ fontSize: 12, color: highlight ? "rgba(255,253,247,0.6)" : "var(--ink-3)", whiteSpace: "nowrap" }}>{per}</span>
        </div>
        <div style={{
          marginTop: 6, fontFamily: "var(--font-display)", fontStyle: "italic",
          fontSize: 14, color: highlight ? "rgba(255,253,247,0.78)" : "var(--ink-3)",
        }}>{desc}</div>
        <div className="hairline" style={{
          margin: "16px 0", background: highlight ? "rgba(255,253,247,0.12)" : "var(--ivory-line)",
        }} />
        <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
          {bullets.map((b, i) => (
            <li key={i} style={{
              display: "flex", gap: 10, alignItems: "flex-start",
              fontFamily: "var(--font-ui)", fontSize: 13.5,
              color: highlight ? "rgba(255,253,247,0.92)" : "var(--ink-2)",
            }}>
              <svg width="14" height="14" viewBox="0 0 16 16" style={{ marginTop: 3, flexShrink: 0 }}>
                <path d="M3 8.5l3 3 7-7" stroke={highlight ? "var(--emerald)" : "var(--emerald-deep)"} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {b}
            </li>
          ))}
        </ul>
        {highlight && (
          <div style={{ marginTop: 18 }}>
            <CTA onClick={onCTA} size="md">Start the Family Plan</CTA>
          </div>
        )}
        {!highlight && (
          <div style={{ marginTop: 18 }}>
            <a href="#" className="link-arrow">Talk to a family manager <span className="arrow">→</span></a>
          </div>
        )}
      </div>
    </div>
  );
}

// ───────── Trust strip ─────────
function TrustStrip() {
  const items = [
    { t: "Consent-first", d: "Family gives consent once. Surprises happen forever." },
    { t: "Face-verified", d: "Every photo matches a signup selfie. No exceptions." },
    { t: "Watermarked", d: "Every clip is traceable. Misuse is actionable." },
    { t: "DPDPA compliant", d: "Indian law. Indian servers. Indian families." },
  ];
  return (
    <section style={{ padding: "8px 0 0" }}>
      <SectionHead
        num="08"
        label="Trust"
        title={`Treated like <i>family</i>, not like a bank.`}
        lede="You are handing us your father's voice. We will not let you down."
      />
      <div style={{ padding: "4px 22px 8px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {items.map(it => (
          <div key={it.t} style={{
            background: "var(--ivory)", border: "1px solid var(--ivory-line)",
            borderRadius: 16, padding: 14,
          }}>
            <div style={{
              width: 24, height: 24, borderRadius: 99,
              background: "color-mix(in oklab, var(--mint) 60%, var(--ivory))",
              border: "1px solid color-mix(in oklab, var(--emerald) 30%, var(--ivory-line))",
              display: "grid", placeItems: "center", marginBottom: 10,
            }}>
              <svg width="11" height="11" viewBox="0 0 16 16">
                <path d="M3 8.5l3 3 7-7" stroke="var(--ink)" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 17, letterSpacing: "-0.02em" }}>{it.t}</div>
            <div style={{ marginTop: 4, fontSize: 12.5, lineHeight: 1.4, color: "var(--ink-3)" }}>{it.d}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ───────── Big closer ─────────
function Closer({ onCTA, ctaLabel = "Send a memory", currency = "INR" }) {
  const priceOnCta = ctaLabel.includes("₹") || ctaLabel.includes("$")
    ? ctaLabel
    : `${ctaLabel} · ${currency === "USD" ? "$4" : "₹299"}`;
  return (
    <section style={{ padding: "32px 22px 16px" }}>
      <h2 className="display" style={{
        margin: 0, fontSize: 44, lineHeight: 0.96, letterSpacing: "-0.03em",
      }}>
        Leave the <span className="italic" style={{ color: "var(--emerald-deep)" }}>memories</span> to us.
      </h2>
      <p style={{
        marginTop: 14, fontFamily: "var(--font-display)", fontStyle: "italic",
        fontSize: 17, lineHeight: 1.4, color: "var(--ink-3)",
      }}>
        You get busy making them. We keep them safe. Ready when you are.
      </p>
      <div style={{ marginTop: 20 }}>
        <CTA onClick={onCTA} size="lg">{priceOnCta}</CTA>
      </div>
    </section>
  );
}

// ───────── Footer ─────────
function Footer() {
  return (
    <footer style={{
      background: "var(--ink)", color: "var(--ivory)",
      padding: "30px 22px 28px", marginTop: 24,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{
          width: 9, height: 9, borderRadius: 99,
          background: "var(--mint)",
        }} />
        <span style={{ fontFamily: "var(--font-display)", fontSize: 20, letterSpacing: "-0.02em" }}>
          Siy<span style={{ fontStyle: "italic", color: "var(--emerald)" }}>AI</span>
        </span>
      </div>
      <p style={{
        marginTop: 14, fontFamily: "var(--font-display)", fontStyle: "italic",
        fontSize: 16, lineHeight: 1.4, color: "rgba(255,253,247,0.7)", maxWidth: 300,
      }}>
        Made in India. For families with no time but everything to say.
      </p>

      {/* Trust pills (was full section, now compressed) */}
      <div style={{
        marginTop: 22, display: "flex", flexWrap: "wrap", gap: 6,
      }}>
        {[
          "Consent-first",
          "Face-verified",
          "Watermarked",
          "DPDPA compliant",
        ].map(t => (
          <span key={t} style={{
            fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em",
            color: "rgba(255,253,247,0.65)", textTransform: "uppercase",
            padding: "5px 10px", borderRadius: 100,
            border: "1px solid rgba(255,253,247,0.15)",
            whiteSpace: "nowrap",
          }}>{t}</span>
        ))}
      </div>

      {/* Legacy Vault notify line — compressed from full section to footer pill */}
      <a href="#" style={{
        marginTop: 14, display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "rgba(255,253,247,0.04)",
        border: "1px solid color-mix(in oklab, var(--gold) 20%, rgba(255,253,247,0.12))",
        borderRadius: 14, padding: "12px 14px",
        textDecoration: "none", color: "var(--ivory)",
      }}>
        <span>
          <span style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 16, color: "var(--gold)", letterSpacing: "-0.01em" }}>
            Legacy Vault
          </span>
          <span className="mono" style={{ fontSize: 10.5, color: "rgba(255,253,247,0.55)", marginLeft: 8, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Coming soon
          </span>
        </span>
        <span style={{ color: "var(--gold)", fontSize: 14 }}>Notify me →</span>
      </a>

      {/* Plans link — demoted from full section */}
      <a href="#" style={{
        marginTop: 10, display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "rgba(255,253,247,0.05)",
        border: "1px solid rgba(255,253,247,0.12)",
        borderRadius: 14, padding: "12px 14px",
        textDecoration: "none", color: "var(--ivory)",
      }}>
        <span>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 16, letterSpacing: "-0.01em" }}>
            Family Plan
          </span>
          <span className="mono" style={{ fontSize: 11, color: "rgba(255,253,247,0.5)", marginLeft: 8 }}>
            ₹1,999 / yr
          </span>
        </span>
        <span style={{ color: "var(--mint)", fontSize: 14 }}>→</span>
      </a>
      <div style={{
        marginTop: 22, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22,
      }}>
        {[
          { h: "Products", l: ["Voice Letter", "Living Portrait", "Custom Song", "Memory Film", "Time Capsule"] },
          { h: "Company", l: ["About", "Blog", "Careers", "Contact", "Pitch deck"] },
        ].map(c => (
          <div key={c.h}>
            <div className="mono" style={{ fontSize: 10.5, letterSpacing: "0.16em", color: "rgba(255,253,247,0.5)", textTransform: "uppercase" }}>{c.h}</div>
            <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 6 }}>
              {c.l.map(x => <a key={x} href="#" style={{ color: "var(--ivory)", textDecoration: "none", fontSize: 13.5 }}>{x}</a>)}
            </div>
          </div>
        ))}
      </div>
      <div style={{
        marginTop: 26, paddingTop: 16, borderTop: "1px solid rgba(255,253,247,0.1)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <div className="mono" style={{ fontSize: 10, color: "rgba(255,253,247,0.4)", letterSpacing: "0.1em", whiteSpace: "nowrap" }}>
          © 2026 · DPDPA
        </div>
        <div className="mono" style={{ fontSize: 10, color: "rgba(255,253,247,0.4)", letterSpacing: "0.1em", whiteSpace: "nowrap" }}>
          V1 · PRE-SEED
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, {
  REVIEWS, Reviews, Plans, PlanCard, TrustStrip, Closer, Footer,
});
