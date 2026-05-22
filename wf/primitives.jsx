// primitives.jsx — shared building blocks for SiyAI homepage
// Registered on window for cross-file use.

const { useState, useEffect, useRef, Fragment } = React;

// ───────── usePhoto · shared subscription hook ─────────
// Reads from window.SiyAIPhotos and reactively updates when:
//   - the photo changes in the same tab (siyai-photo-change event)
//   - the photo changes in another tab (storage event, dispatched by photos.js)
function usePhoto(key) {
  const [src, setSrc] = useState(() => key && window.SiyAIPhotos ? window.SiyAIPhotos.getPhoto(key) : null);
  useEffect(() => {
    if (!key || !window.SiyAIPhotos) return;
    const handler = (e) => {
      if (!e.detail || e.detail.all || e.detail.key === key) {
        setSrc(window.SiyAIPhotos.getPhoto(key));
      }
    };
    window.addEventListener("siyai-photo-change", handler);
    return () => window.removeEventListener("siyai-photo-change", handler);
  }, [key]);
  return src;
}

// ───────── Photo placeholder ─────────
// Subtle ivory placeholder with stripes + a Geist Mono caption tag.
// `tone` shifts the wash; `tall` is for portraits.
function PhotoSlot({ label, tone = "ivory", tall = false, children, style = {}, photoKey, alt, archival = true, dateStamp }) {
  const tones = {
    ivory:   { base: "var(--ivory-2)", stripe: "rgba(14,18,23,0.045)" },
    seafoam: { base: "color-mix(in oklab, var(--seafoam) 60%, var(--ivory))", stripe: "rgba(14,18,23,0.04)" },
    sky:     { base: "color-mix(in oklab, var(--sky) 65%, var(--ivory))", stripe: "rgba(14,18,23,0.04)" },
    gold:    { base: "color-mix(in oklab, var(--gold-soft) 70%, var(--ivory))", stripe: "rgba(14,18,23,0.05)" },
    ink:     { base: "var(--ink)", stripe: "rgba(255,253,247,0.06)" },
  };
  const t = tones[tone] || tones.ivory;
  const aspect = style.aspectRatio !== undefined ? style.aspectRatio : (tall ? "3 / 4" : "4 / 3");

  // Photo resolution: localStorage upload → default URL → null
  const [src, setSrc] = React.useState(() => photoKey && window.SiyAIPhotos ? window.SiyAIPhotos.getPhoto(photoKey) : null);
  const [loaded, setLoaded] = React.useState(false);
  const [errored, setErrored] = React.useState(false);

  React.useEffect(() => {
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
    <div className={archival && showImage ? "photo-archival" : ""} style={{
      position: "relative",
      width: "100%",
      height: style.height,
      aspectRatio: aspect,
      background: t.base,
      overflow: "hidden",
      ...style,
      aspectRatio: aspect, // win override
    }}>
      {/* stripe pattern — visible while loading or as fallback */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `repeating-linear-gradient(135deg, ${t.stripe} 0 1px, transparent 1px 11px)`,
        opacity: showImage && loaded ? 0 : 1,
        transition: "opacity .4s ease",
      }} />
      {showImage && (
        <img
          src={src}
          alt={alt || label || ""}
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover",
            opacity: loaded ? 1 : 0,
            transition: "opacity .5s ease",
          }}
        />
      )}
      {children}
      {dateStamp && showImage && loaded && (
        <div className="date-stamp">{dateStamp}</div>
      )}
      {label && (
        <div style={{
          position: "absolute", left: 10, bottom: 10,
          maxWidth: "calc(100% - 20px)",
          fontFamily: "var(--font-mono)", fontSize: 9.5, letterSpacing: "0.14em",
          color: showImage && loaded
            ? "rgba(14,18,23,0.85)"
            : (tone === "ink" ? "rgba(255,253,247,0.7)" : "var(--ink-3)"),
          textTransform: "uppercase",
          background: showImage && loaded
            ? "color-mix(in oklab, var(--ivory) 88%, transparent)"
            : (tone === "ink" ? "rgba(255,253,247,0.06)" : "var(--ivory)"),
          padding: "4px 7px", borderRadius: 4,
          border: showImage && loaded
            ? "1px solid color-mix(in oklab, var(--ivory) 40%, transparent)"
            : (tone === "ink" ? "1px solid rgba(255,253,247,0.12)" : "1px solid var(--ivory-line)"),
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          backdropFilter: showImage && loaded ? "blur(8px)" : "none",
          WebkitBackdropFilter: showImage && loaded ? "blur(8px)" : "none",
        }}>{label}</div>
      )}
    </div>
  );
}

// ───────── Currency helpers ─────────
const FX = { INR: { sym: "₹", rate: 1 }, USD: { sym: "$", rate: 1 / 83 } };
function fmtPrice(inr, currency) {
  const c = FX[currency] || FX.INR;
  const v = inr * c.rate;
  if (currency === "USD") return `${c.sym}${(Math.round(v))}`;
  // INR: keep clean integers, comma-grouped
  return `${c.sym}${Math.round(v).toLocaleString("en-IN")}`;
}

// ───────── Top nav (sticky inside the iPhone) ─────────
function TopNav({ currency, onCurrency, onSignIn }) {
  return (
    <div style={{
      position: "sticky", top: 50, zIndex: 5,
      background: "color-mix(in oklab, var(--ivory) 88%, transparent)",
      backdropFilter: "blur(14px) saturate(140%)",
      WebkitBackdropFilter: "blur(14px) saturate(140%)",
      borderBottom: "1px solid var(--ivory-line)",
    }}>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "10px 16px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Logo />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <CurrencyPill currency={currency} onCurrency={onCurrency} />
          <button onClick={onSignIn} style={{
            background: "transparent", border: 0,
            fontFamily: "var(--font-ui)", fontSize: 13.5, fontWeight: 500,
            color: "var(--ink)", padding: "8px 4px", cursor: "pointer",
          }}>Sign in</button>
        </div>
      </div>
    </div>
  );
}

function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
      <span style={{
        width: 9, height: 9, borderRadius: 99,
        background: "radial-gradient(circle at 30% 30%, #C6F1D0, var(--mint))",
        boxShadow: "0 0 0 4px color-mix(in oklab, var(--mint), transparent 70%)",
      }} />
      <span style={{
        fontFamily: "var(--font-display)", fontSize: 19,
        letterSpacing: "-0.02em", color: "var(--ink)", fontWeight: 500,
      }}>
        Siy<span style={{ fontStyle: "italic", color: "var(--emerald-deep)" }}>AI</span>
      </span>
    </div>
  );
}

function CurrencyPill({ currency, onCurrency }) {
  return (
    <div style={{
      display: "flex", padding: 3, borderRadius: 999,
      background: "var(--ivory-2)", border: "1px solid var(--ivory-line)",
      fontFamily: "var(--font-mono)", fontSize: 10.5,
    }}>
      {["INR", "USD"].map(c => (
        <button key={c} onClick={() => onCurrency(c)} style={{
          border: 0,
          background: currency === c ? "var(--ink)" : "transparent",
          color: currency === c ? "var(--ivory)" : "var(--ink-3)",
          padding: "5px 9px", borderRadius: 999,
          cursor: "pointer", letterSpacing: "0.08em",
          fontWeight: 500,
        }}>{c === "INR" ? "₹ IN" : "$ US"}</button>
      ))}
    </div>
  );
}

// ───────── Emerald CTA — only ONE per view ─────────
function CTA({ children, onClick, size = "md", style = {} }) {
  const sizes = {
    sm: { p: "12px 20px", fs: 14 },
    md: { p: "16px 26px", fs: 16 },
    lg: { p: "18px 28px", fs: 17 },
  }[size];
  return (
    <button onClick={onClick} className="cta-emerald" style={{
      padding: sizes.p, fontSize: sizes.fs, ...style,
    }}>
      <span style={{ whiteSpace: "nowrap" }}>{children}</span>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}

// ───────── Section header ─────────
function SectionHead({ num, label, title, lede, align = "left" }) {
  const showEyebrow = num || label;
  return (
    <div className="section-head" style={{ textAlign: align }}>
      {showEyebrow && (
        <div className="num" style={{ justifyContent: align === "center" ? "center" : "flex-start" }}>
          {num && <span>№ {num}</span>}
          {label && <span>{label}</span>}
        </div>
      )}
      <h2 dangerouslySetInnerHTML={{ __html: title }} />
      {lede && <p className="lede" style={{ marginLeft: align === "center" ? "auto" : 0, marginRight: align === "center" ? "auto" : 0 }}>{lede}</p>}
    </div>
  );
}

// ───────── Star rating ─────────
function Stars({ value = 5, size = 11 }) {
  return (
    <div style={{ display: "inline-flex", gap: 2, color: "var(--emerald-deep)" }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 16 16" fill={i < value ? "currentColor" : "rgba(0,0,0,0.12)"}>
          <path d="M8 1l2.2 4.5 5 .7-3.6 3.5.85 4.95L8 12.3 3.55 14.65 4.4 9.7.8 6.2l5-.7L8 1z"/>
        </svg>
      ))}
    </div>
  );
}

Object.assign(window, {
  PhotoSlot, fmtPrice, FX, TopNav, Logo, CurrencyPill, CTA, SectionHead, Stars, usePhoto,
});
