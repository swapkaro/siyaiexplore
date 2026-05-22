// desktop-bot.jsx — bottom half of the desktop homepage
// occasions · create grid (bento) · preserve · how it works
// memorial · reviews · plans · trust · closer · footer

// ───────── Shop by occasion ─────────
function ShopByOccasionD({ onPick }) {
  const items = [
    { k: "Birthday", n: 12 }, { k: "Anniversary", n: 10 }, { k: "Wedding", n: 8 },
    { k: "Sangeet", n: 6 }, { k: "Graduation", n: 7 }, { k: "Just because", n: 9 },
    { k: "Apology", n: 4 }, { k: "Memorial", n: 6 },
  ];
  return (
    <section className="dt-section-tight" id="occasions">
      <div className="dt-container">
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 60, alignItems: "center" }}>
          <div>
            <h2 className="dt-display dt-headline-md" style={{ margin: 0, maxWidth: 320 }}>
              Pick the day. <span style={{ fontStyle: "italic", color: "var(--ink-3)" }}>We do the feeling.</span>
            </h2>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "flex-end" }}>
            {items.map(it => (
              <button key={it.k} className="dt-chip" onClick={() => onPick?.(it.k)}>
                {it.k}
                <span className="ct">{String(it.n).padStart(2, "0")}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ───────── Create grid · BENTO ─────────
function CreateGridD({ currency }) {
  // Bento layout: Voice Letter is 2x2 hero, others are 1x1
  // Grid: 4 cols x 3 rows
  return (
    <section className="dt-section" id="create">
      <div className="dt-container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 36 }}>
          <div>
            <h2 className="dt-display dt-headline-lg" style={{ margin: 0 }}>
              Six ways. <span style={{ fontStyle: "italic", color: "var(--emerald-deep)" }}>Pick one.</span>
            </h2>
          </div>
          <div style={{ maxWidth: 360 }}>
            <p style={{ fontSize: 15, color: "var(--ink-3)", margin: 0, lineHeight: 1.5 }}>
              Six ways to put feeling in someone's pocket. All delivered on WhatsApp. All ready in a few hours.
            </p>
            <a href="#" className="dt-link" style={{ marginTop: 14 }}>Browse all gifts <span className="arrow">→</span></a>
          </div>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridTemplateRows: "320px 320px",
          gap: 16,
        }}>
          {/* HERO 2x2 — Voice Letter */}
          <BentoCard
            span={{ col: "span 2", row: "span 2" }}
            tone="seafoam"
            title="Voice Letter"
            tag="Har saal Papa ki awaaz mein"
            badge="BESTSELLER"
            price={299}
            currency={currency}
            label="papa, 1996"
            photoKey="dt-bento-voice"
            sub="60 seconds of their voice. Anything you want them to say. Ready in 4 hours."
            big
          />
          {/* row 1 */}
          <BentoCard tone="sky" title="Living Portrait" tag="Dadi ki photo boli" badge="TRENDING" price={499} currency={currency} label="dadi 1962" photoKey="create-living-portrait" />
          <BentoCard tone="gold" title="Memory Film" tag="Aapki kahaani, ek film" badge="NEW" price={1999} currency={currency} label="childhood home" photoKey="create-memory-film" />
          {/* row 2 */}
          <BentoCard tone="ivory" title="Custom Song" tag="Sangeet ka favourite" price={999} currency={currency} label="sangeet stage" photoKey="create-custom-song" />
          <BentoCard tone="ivory" title="Handwritten Letter" tag="Papa likhte the aise hi" price={499} currency={currency} label="old letter" photoKey="create-handwritten" />
        </div>

        {/* Time capsule strip — softened from heavy ink to warm gold wash */}
        <div style={{
          marginTop: 16,
          background: "linear-gradient(135deg, color-mix(in oklab, var(--gold-soft) 60%, var(--ivory)), var(--ivory-2))",
          color: "var(--ink)",
          border: "1px solid color-mix(in oklab, var(--gold) 20%, var(--ivory-line))",
          borderRadius: 22,
          padding: "28px 32px",
          display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center", gap: 24,
          position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "relative" }}>
            <div className="mono" style={{ fontSize: 11, letterSpacing: "0.16em", color: "var(--ink-3)", marginBottom: 8 }}>
              + ADD A TIME CAPSULE · +{fmtPrice(99, currency)}
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 30, letterSpacing: "-0.02em", maxWidth: 700, color: "var(--ink)" }}>
              Lock any gift for the future. <span style={{ fontStyle: "italic", color: "var(--emerald-deep)" }}>"Open on your 18th birthday."</span>
            </div>
          </div>
          <a href="#" className="dt-link">
            How a Capsule works <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function BentoCard({ span, tone, title, tag, badge, price, currency, label, sub, big, photoKey }) {
  return (
    <div className="dt-pcard" style={{
      gridColumn: span?.col, gridRow: span?.row,
      display: "flex", flexDirection: "column",
    }}>
      <div style={{ position: "relative", flex: 1 }}>
        <PhotoSlot label={label} tone={tone} style={{ height: "100%", aspectRatio: "auto" }} photoKey={photoKey} />
        {badge && (
          <span style={{
            position: "absolute", top: 14, left: 14,
            background: badge === "NEW" || badge === "TRENDING" ? "var(--mint)" : "var(--ink)",
            color: badge === "NEW" || badge === "TRENDING" ? "var(--ink)" : "var(--ivory)",
            fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.16em",
            padding: "6px 10px", borderRadius: 100, textTransform: "uppercase",
          }}>{badge}</span>
        )}
      </div>
      <div style={{
        padding: big ? "26px 26px 26px" : "18px 18px 20px",
        display: "flex", flexDirection: "column", gap: 6,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8 }}>
          <h3 style={{
            margin: 0,
            fontFamily: "var(--font-display)", fontWeight: 400,
            fontSize: big ? 32 : 22,
            letterSpacing: "-0.02em",
          }}>{title}</h3>
          <span className="mono" style={{ fontSize: big ? 15 : 13, color: "var(--ink-2)" }}>{fmtPrice(price, currency)}</span>
        </div>
        {sub && <div style={{ fontSize: 13.5, color: "var(--ink-3)", lineHeight: 1.45 }}>{sub}</div>}
        <div style={{
          fontFamily: "var(--font-display)", fontStyle: "italic",
          fontSize: big ? 16 : 14, color: "var(--ink-3)",
          marginTop: 4,
        }}>"{tag}"</div>
      </div>
    </div>
  );
}

// ───────── Preserve · vault ─────────
function PreserveBlockD({ currency, onCTA }) {
  return (
    <section className="dt-section" id="preserve">
      <div className="dt-container">
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 60, alignItems: "center",
        }}>
          <div>
            <div className="dt-eyebrow" style={{ marginBottom: 22 }}>
              <span>№ 05</span><span>Preserve a memory</span><span>Phase II preview</span>
            </div>
            <h2 className="dt-display dt-headline-lg" style={{ margin: 0 }}>
              Hold onto voices, faces and moments before they <span style={{ fontStyle: "italic", color: "var(--emerald-deep)" }}>slip away</span>.
            </h2>
            <p className="dt-lede" style={{ marginTop: 22 }}>
              Add a loved one to your Legacy Vault. Their voice and face stay yours, forever. Every future gift takes seconds, not days.
            </p>
            <ul style={{ margin: "24px 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                "One-time consent. Surprises forever.",
                "Memorial Mode for loved ones who have passed away.",
                "Face-match verification on every upload.",
              ].map((b, i) => (
                <li key={i} style={{ display: "flex", gap: 12, fontSize: 15, color: "var(--ink-2)" }}>
                  <svg width="18" height="18" viewBox="0 0 16 16" style={{ marginTop: 3, flexShrink: 0 }}>
                    <path d="M3 8.5l3 3 7-7" stroke="var(--emerald-deep)" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {b}
                </li>
              ))}
            </ul>
            <div style={{ marginTop: 32, display: "flex", alignItems: "center", gap: 18 }}>
              <button className="dt-cta" onClick={onCTA}>
                Start your Vault · free
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <span className="mono" style={{ fontSize: 12, color: "var(--ink-3)", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>no card needed</span>
            </div>
          </div>
          <VaultVisual />
        </div>
      </div>
    </section>
  );
}

function VaultVisual() {
  return (
    <div style={{
      position: "relative",
      background: "var(--ivory)",
      border: "1px solid var(--ivory-line)",
      borderRadius: 28, padding: 24,
      boxShadow: "0 40px 80px -40px rgba(14,18,23,0.15)",
    }}>
      <div className="mono" style={{ fontSize: 10.5, letterSpacing: "0.16em", color: "var(--ink-3)", marginBottom: 12 }}>
        LEGACY VAULT · RAHUL · 3 / 5 PEOPLE
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <VaultPerson name="Maa" year="b. 1957" tone="gold" memorial={false} photoKey="dt-vault-maa" />
        <VaultPerson name="Papa" year="b. 1952 · late" tone="ivory" memorial photoKey="dt-vault-papa" />
        <VaultPerson name="Dadi" year="b. 1934 · late" tone="sky" memorial photoKey="dt-vault-dadi" />
        <VaultPerson name="+ Add" empty />
      </div>
      <div className="dt-hr" style={{ margin: "18px 0" }} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <VaultStat label="Scheduled" value="4" sub="auto-deliveries" />
        <VaultStat label="Last gift" value="2 days" sub="ago, on Diwali" />
      </div>
    </div>
  );
}

function VaultPerson({ name, year, tone = "ivory", memorial, empty, photoKey }) {
  if (empty) return (
    <div style={{
      border: "1px dashed var(--ivory-line)", borderRadius: 14,
      aspectRatio: "1 / 1.1",
      display: "grid", placeItems: "center",
      color: "var(--ink-3)",
      fontFamily: "var(--font-display)", fontSize: 17, fontStyle: "italic",
    }}>{name}</div>
  );
  return (
    <div style={{
      borderRadius: 14, overflow: "hidden",
      border: "1px solid var(--ivory-line)",
      position: "relative",
    }}>
      <PhotoSlot label="" tone={tone} style={{ aspectRatio: "1 / 1.1" }} photoKey={photoKey} />
      {memorial && (
        <div style={{
          position: "absolute", top: 8, right: 8,
          background: "var(--ivory)", border: "1px solid var(--ivory-line)",
          padding: "2px 6px", borderRadius: 100,
          fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.14em",
          color: "var(--ink-3)", textTransform: "uppercase",
        }}>LATE</div>
      )}
      <div style={{
        position: "absolute", left: 10, bottom: 10, right: 10,
        background: "color-mix(in oklab, var(--ivory) 90%, transparent)",
        backdropFilter: "blur(6px)",
        borderRadius: 8, padding: "6px 8px",
      }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 14, letterSpacing: "-0.01em" }}>{name}</div>
        <div className="mono" style={{ fontSize: 9.5, color: "var(--ink-3)", letterSpacing: "0.06em", marginTop: 1 }}>{year}</div>
      </div>
    </div>
  );
}

// ───────── How it works ─────────
function HowItWorksD() {
  const steps = [
    { n: "01", t: "Send us a voice note", d: "30 seconds. WhatsApp voice notes, old videos, anything you have." },
    { n: "02", t: "Tell us what to say", d: "Write the message. We will translate, edit, and read it for you." },
    { n: "03", t: "We make it, in hours", d: "AI does the work. Our writers and editors check every line." },
    { n: "04", t: "They get it on WhatsApp", d: "No app to download. They tap once. They keep it forever." },
  ];
  return (
    <section className="dt-section-tight" id="how">
      <div className="dt-container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 32 }}>
          <div>
            <div className="dt-eyebrow" style={{ marginBottom: 18 }}>
              <span>№ 05</span><span>How it works</span>
            </div>
            <h2 className="dt-display dt-headline-md" style={{ margin: 0 }}>
              Four steps. <span style={{ fontStyle: "italic", color: "var(--ink-3)" }}>Roughly four hours.</span>
            </h2>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
          {steps.map(s => (
            <div key={s.n} style={{
              paddingTop: 22,
              borderTop: "1px solid var(--ink)",
            }}>
              <div className="mono" style={{ fontSize: 11.5, letterSpacing: "0.18em", color: "var(--emerald-deep)" }}>{s.n}</div>
              <div style={{ marginTop: 12, fontFamily: "var(--font-display)", fontSize: 24, letterSpacing: "-0.02em", lineHeight: 1.1 }}>{s.t}</div>
              <div style={{ marginTop: 8, fontSize: 14, color: "var(--ink-3)", lineHeight: 1.5 }}>{s.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ───────── Memorial moment · Ink + Gold ─────────
function MemorialMomentD({ onCTA }) {
  return (
    <section data-compact="true">
      <div className="dt-container">
        <div style={{
          position: "relative",
          background: "var(--ink)",
          color: "var(--ivory)",
          borderRadius: 32, overflow: "hidden",
          padding: "80px 56px",
          boxShadow: "0 60px 120px -50px rgba(14,18,23,0.6)",
        }}>
          <div aria-hidden style={{
            position: "absolute", inset: "auto -10% -50% -10%", height: 380,
            background: "radial-gradient(40% 80% at 50% 100%, color-mix(in oklab, var(--gold), transparent 25%), transparent 70%)",
            filter: "blur(20px)",
          }} />
          <div aria-hidden style={{
            position: "absolute", top: -120, right: -120, width: 320, height: 320, borderRadius: 999,
            background: "radial-gradient(50% 50% at 50% 50%, color-mix(in oklab, var(--gold-soft) 60%, transparent), transparent 70%)",
            filter: "blur(20px)",
          }} />
          <div style={{ position: "relative", display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 60, alignItems: "center" }}>
            <div>
              <div className="dt-eyebrow" style={{ color: "rgba(255,253,247,0.55)", marginBottom: 24 }}>
                <span>Legacy Vault</span>
              </div>
              <h2 className="dt-display dt-headline-xl" style={{ margin: 0, color: "var(--ivory)", maxWidth: 760 }}>
                Some voices should never <span style={{ fontStyle: "italic", color: "var(--gold)" }}>fade</span>.
              </h2>
              <p style={{
                marginTop: 24, fontFamily: "var(--font-display)", fontStyle: "italic",
                fontSize: 22, lineHeight: 1.45, color: "rgba(255,253,247,0.82)", maxWidth: 640,
              }}>
                Dadi left us three years ago. Her voice still lives in our Vault. Every year, on Bhai's birthday, she still wishes him.
              </p>
              <p style={{
                marginTop: 14, fontSize: 14.5, lineHeight: 1.55,
                color: "rgba(255,253,247,0.55)", maxWidth: 540,
              }}>
                With explicit family consent, face-match verification, and an invisible watermark on every clip. Trust, treated like family.
              </p>
              <div style={{ marginTop: 32 }}>
                <button onClick={onCTA} className="dt-cta" style={{
                  background: "var(--gold)", color: "var(--ink)",
                }}>
                  Start preserving voices
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
            <div>
              <VaultDashboard desktop />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ───────── Reviews ─────────
function ReviewsD() {
  const row = [...REVIEWS, ...REVIEWS];
  return (
    <section className="dt-section-tight">
      <div className="dt-container" style={{ marginBottom: 28 }}>
        <div className="dt-eyebrow" style={{ marginBottom: 18 }}>
          <span>№ 07</span><span>From our families</span>
        </div>
        <h2 className="dt-display dt-headline-md" style={{ margin: 0, maxWidth: 700 }}>
          10,000 families. <span style={{ fontStyle: "italic", color: "var(--ink-3)" }}>Same first reaction.</span>
        </h2>
      </div>
      <div style={{ overflow: "hidden", padding: "8px 0 22px", WebkitMaskImage: "linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent)" }}>
        <div className="marquee">
          {row.map((r, i) => (
            <div key={i} style={{
              flex: "0 0 360px",
              background: "var(--ivory)",
              border: "1px solid var(--ivory-line)",
              borderRadius: 22, padding: 22,
            }}>
              <Stars value={r.s} size={13} />
              <div style={{
                fontFamily: "var(--font-display)", fontStyle: "italic",
                fontSize: 22, lineHeight: 1.3, marginTop: 12, color: "var(--ink)",
                letterSpacing: "-0.01em",
              }}>"{r.t}"</div>
              <div style={{ marginTop: 18, display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16 }}>
                <div style={{ flexShrink: 0 }}>
                  <div style={{ fontFamily: "var(--font-ui)", fontSize: 14, fontWeight: 600, whiteSpace: "nowrap" }}>{r.n}</div>
                  <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)", whiteSpace: "nowrap" }}>{r.c}</div>
                </div>
                <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)", textTransform: "uppercase", letterSpacing: "0.1em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", minWidth: 0 }}>{r.p}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ───────── Plans ─────────
function PlansD({ currency, onCTA }) {
  const conv = (v) => fmtPrice(v, currency);
  return (
    <section className="dt-section" id="plans">
      <div className="dt-container">
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div className="dt-eyebrow" style={{ justifyContent: "center", marginBottom: 18 }}>
            <span>№ 09</span><span>Plans</span>
          </div>
          <h2 className="dt-display dt-headline-lg" style={{ margin: 0 }}>
            Two ways to <span style={{ fontStyle: "italic", color: "var(--emerald-deep)" }}>stay</span>.
          </h2>
          <p className="dt-lede" style={{ marginTop: 14, marginInline: "auto" }}>
            Start free. Upgrade only when you have a person worth preserving.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          <PlanCardD
            name="Family Plan"
            price={conv(1999)}
            per="/ year"
            tag="POPULAR"
            desc="Active families. Birthdays, anniversaries, festivals, on auto-pilot."
            bullets={["15 vault slots", "12 auto-deliveries / year", "7-day preview & approve", "Priority WhatsApp support", "Group gift access"]}
            highlight
            onCTA={onCTA}
          />
          <PlanCardD
            name="Legacy Forever"
            price={conv(14999)}
            per="one-time"
            desc="For the family that wants to preserve, not subscribe."
            bullets={["Unlimited voices & faces", "Unlimited auto-deliveries", "Lifetime storage guarantee", "Every future feature included", "Dedicated family manager"]}
          />
        </div>
      </div>
    </section>
  );
}

function PlanCardD({ name, price, per, tag, desc, bullets, highlight, onCTA }) {
  return (
    <div style={{
      background: highlight ? "var(--ink)" : "var(--ivory)",
      color: highlight ? "var(--ivory)" : "var(--ink)",
      border: highlight ? "1px solid var(--ink)" : "1px solid var(--ivory-line)",
      borderRadius: 28, padding: 36,
      position: "relative", overflow: "hidden",
    }}>
      {highlight && (
        <div aria-hidden style={{
          position: "absolute", inset: "auto -10% -60% -10%", height: 280,
          background: "radial-gradient(40% 80% at 50% 100%, color-mix(in oklab, var(--emerald), transparent 60%), transparent 70%)",
          filter: "blur(20px)",
        }} />
      )}
      <div style={{ position: "relative" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 30, letterSpacing: "-0.02em" }}>{name}</div>
          {tag && <span style={{
            fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.16em",
            background: highlight ? "var(--emerald)" : "var(--ivory-2)",
            color: highlight ? "var(--ink)" : "var(--ink-3)",
            padding: "5px 10px", borderRadius: 100, textTransform: "uppercase",
            border: highlight ? "0" : "1px solid var(--ivory-line)",
          }}>{tag}</span>}
        </div>
        <div style={{ marginTop: 16, display: "flex", alignItems: "baseline", gap: 8 }}>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 62, letterSpacing: "-0.03em", lineHeight: 1 }}>{price}</span>
          <span className="mono" style={{ fontSize: 14, color: highlight ? "rgba(255,253,247,0.6)" : "var(--ink-3)" }}>{per}</span>
        </div>
        <div style={{
          marginTop: 8, fontFamily: "var(--font-display)", fontStyle: "italic",
          fontSize: 17, color: highlight ? "rgba(255,253,247,0.78)" : "var(--ink-3)",
        }}>{desc}</div>
        <div className="dt-hr" style={{
          margin: "26px 0", background: highlight ? "rgba(255,253,247,0.12)" : "var(--ivory-line)",
        }} />
        <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
          {bullets.map((b, i) => (
            <li key={i} style={{
              display: "flex", gap: 12, alignItems: "flex-start",
              fontFamily: "var(--font-ui)", fontSize: 15,
              color: highlight ? "rgba(255,253,247,0.92)" : "var(--ink-2)",
            }}>
              <svg width="16" height="16" viewBox="0 0 16 16" style={{ marginTop: 3, flexShrink: 0 }}>
                <path d="M3 8.5l3 3 7-7" stroke={highlight ? "var(--emerald)" : "var(--emerald-deep)"} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {b}
            </li>
          ))}
        </ul>
        {highlight ? (
          <div style={{ marginTop: 30 }}>
            <button className="dt-cta" onClick={onCTA}>
              Start the Family Plan
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        ) : (
          <div style={{ marginTop: 30 }}>
            <a href="#" className="dt-link">Talk to a family manager <span className="arrow">→</span></a>
          </div>
        )}
      </div>
    </div>
  );
}

// ───────── Trust strip · 4 col ─────────
function TrustStripD() {
  const items = [
    { t: "Consent-first", d: "Family gives consent once. Surprises happen forever." },
    { t: "Face-verified", d: "Every photo matches a signup selfie. No exceptions." },
    { t: "Watermarked", d: "Every clip is traceable. Misuse is actionable." },
    { t: "DPDPA compliant", d: "Indian law. Indian servers. Indian families." },
  ];
  return (
    <section className="dt-section-tight">
      <div className="dt-container">
        <div className="dt-eyebrow" style={{ marginBottom: 18 }}>
          <span>№ 08</span><span>Trust</span>
        </div>
        <h2 className="dt-display dt-headline-md" style={{ margin: "0 0 36px" }}>
          Treated like <span style={{ fontStyle: "italic", color: "var(--ink-3)" }}>family</span>, not like a bank.
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {items.map(it => (
            <div key={it.t} style={{
              background: "var(--ivory)", border: "1px solid var(--ivory-line)",
              borderRadius: 22, padding: 24,
            }}>
              <div style={{
                width: 30, height: 30, borderRadius: 99,
                background: "color-mix(in oklab, var(--mint) 60%, var(--ivory))",
                border: "1px solid color-mix(in oklab, var(--emerald) 30%, var(--ivory-line))",
                display: "grid", placeItems: "center", marginBottom: 14,
              }}>
                <svg width="14" height="14" viewBox="0 0 16 16">
                  <path d="M3 8.5l3 3 7-7" stroke="var(--ink)" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 22, letterSpacing: "-0.02em" }}>{it.t}</div>
              <div style={{ marginTop: 6, fontSize: 14, lineHeight: 1.5, color: "var(--ink-3)" }}>{it.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ───────── Closer ─────────
function CloserD({ onCTA, ctaLabel = "Send a memory", currency = "INR" }) {
  const priceOnCta = ctaLabel.includes("₹") || ctaLabel.includes("$")
    ? ctaLabel
    : `${ctaLabel} · ${currency === "USD" ? "$4" : "₹299"}`;
  return (
    <section className="dt-section" style={{ paddingBottom: 40, position: "relative", overflow: "hidden" }}>
      <div aria-hidden style={{
        position: "absolute", inset: "-20% 0% 10% 0%", zIndex: 0,
        background: "radial-gradient(40% 60% at 50% 50%, color-mix(in oklab, var(--seafoam) 60%, transparent), transparent 70%), radial-gradient(40% 60% at 80% 60%, color-mix(in oklab, var(--gold-soft) 50%, transparent), transparent 70%)",
        filter: "blur(20px)",
      }} />
      <div className="dt-container" style={{ position: "relative", textAlign: "center" }}>
        <h2 className="dt-display dt-headline-xxl" style={{ margin: 0 }}>
          Leave the <span style={{ fontStyle: "italic", color: "var(--emerald-deep)" }}>memories</span> to us.
        </h2>
        <p style={{
          marginTop: 22, fontFamily: "var(--font-display)", fontStyle: "italic",
          fontSize: 24, lineHeight: 1.4, color: "var(--ink-3)", maxWidth: 720, marginInline: "auto",
        }}>
          You get busy making them. We will keep them safe, ready to give.
        </p>
        <div style={{ marginTop: 36 }}>
          <button className="dt-cta" onClick={onCTA} style={{ padding: "22px 36px", fontSize: 18 }}>
            {priceOnCta}
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

// ───────── Footer ─────────
function FooterD() {
  return (
    <footer style={{
      background: "var(--ink)", color: "var(--ivory)",
      padding: "72px 0 36px", marginTop: 40,
    }}>
      <div className="dt-container">
        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr 1fr", gap: 40 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 10, height: 10, borderRadius: 99, background: "var(--mint)" }} />
              <span style={{ fontFamily: "var(--font-display)", fontSize: 26, letterSpacing: "-0.02em" }}>
                Siy<span style={{ fontStyle: "italic", color: "var(--emerald)" }}>AI</span>
              </span>
            </div>
            <p style={{
              marginTop: 18, fontFamily: "var(--font-display)", fontStyle: "italic",
              fontSize: 18, lineHeight: 1.45, color: "rgba(255,253,247,0.7)", maxWidth: 360,
            }}>
              Made in India. For every family that does not have time, but has everything to say.
            </p>
            {/* Trust pills (replaces the standalone Trust section above the fold) */}
            <div style={{ marginTop: 18, display: "flex", flexWrap: "wrap", gap: 6 }}>
              {["Consent-first", "Face-verified", "Watermarked", "DPDPA compliant"].map(t => (
                <span key={t} style={{
                  fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.14em",
                  color: "rgba(255,253,247,0.65)", textTransform: "uppercase",
                  padding: "5px 10px", borderRadius: 100,
                  border: "1px solid rgba(255,253,247,0.15)",
                  whiteSpace: "nowrap",
                }}>{t}</span>
              ))}
            </div>
            <div style={{ marginTop: 22, display: "flex", gap: 10 }}>
              {["Instagram", "YouTube", "WhatsApp"].map(s => (
                <a key={s} href="#" className="mono" style={{
                  fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase",
                  color: "rgba(255,253,247,0.7)", textDecoration: "none",
                  padding: "8px 12px", borderRadius: 100, border: "1px solid rgba(255,253,247,0.15)",
                }}>{s}</a>
              ))}
            </div>
          </div>
          {[
            { h: "Create", l: ["Voice Letter", "Living Portrait", "Custom Song", "Handwritten Letter", "Time Capsule"] },
            { h: "Preserve", l: ["Legacy Vault · soon", "Memory Film", "Memorial Mode", "Family Plan", "Legacy Forever"] },
            { h: "Company", l: ["About", "Blog", "Careers", "Pitch deck", "Contact"] },
            { h: "Legal", l: ["Privacy", "Consent model", "DPDPA", "Terms", "Report misuse"] },
          ].map(c => (
            <div key={c.h}>
              <div className="mono" style={{ fontSize: 10.5, letterSpacing: "0.16em", color: "rgba(255,253,247,0.5)", textTransform: "uppercase" }}>{c.h}</div>
              <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 9 }}>
                {c.l.map(x => <a key={x} href="#" style={{ color: "rgba(255,253,247,0.85)", textDecoration: "none", fontSize: 14 }}>{x}</a>)}
              </div>
            </div>
          ))}
        </div>
        <div style={{
          marginTop: 56, paddingTop: 22, borderTop: "1px solid rgba(255,253,247,0.1)",
          display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24,
        }}>
          <div className="mono" style={{ fontSize: 11, color: "rgba(255,253,247,0.4)", letterSpacing: "0.12em", whiteSpace: "nowrap" }}>
            © 2026 SIYAI · DPDPA COMPLIANT · MADE IN INDIA
          </div>
          <div className="mono" style={{ fontSize: 11, color: "rgba(255,253,247,0.4)", letterSpacing: "0.12em", whiteSpace: "nowrap" }}>
            V1 · PRE-SEED · BENGALURU
          </div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, {
  ShopByOccasionD, CreateGridD, BentoCard,
  PreserveBlockD, VaultVisual, VaultPerson,
  HowItWorksD, MemorialMomentD, ReviewsD, PlansD, PlanCardD,
  TrustStripD, CloserD, FooterD,
});
