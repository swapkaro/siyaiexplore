// app.jsx — SiyAI homepage composition + Tweaks
// Single file. Two views (Mobile / Desktop) toggled via Tweaks.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "currency": "INR"
}/*EDITMODE-END*/;

// Locked production values
const LOCKED = {
  view: "Mobile",
  headline: "The gift they replay",
  tone: "Ivory",
  density: "Six cards",
  ctaCopy: "Send a memory",
  film: "Cinema",
  desktopHero: "Editorial",
};

const VIEW_OPTIONS = ["Mobile", "Desktop"];

const HEADLINE_OPTIONS = [
  "Leave your memories",
  "The gift they replay",
  "Voices that never fade",
];
const HEADLINE_INDEX = { "Leave your memories": 0, "The gift they replay": 1, "Voices that never fade": 2 };

const TONE_OPTIONS = ["Ivory", "Seafoam", "Gold"];
const TONE_KEY = { Ivory: "ivory", Seafoam: "seafoam", Gold: "gold" };

const DENSITY_OPTIONS = ["Three", "Six cards", "Scroll"];
const DENSITY_KEY = { Three: "three", "Six cards": "six", Scroll: "carousel" };

const CTA_OPTIONS = ["Begin a story", "Start with ₹299", "Send a memory"];

const FILM_OPTIONS = ["Cinema", "Phone", "Film strip"];
const FILM_KEY = { Cinema: "cinema", Phone: "phone", "Film strip": "strip" };

const DESKTOP_HERO_OPTIONS = ["Cinema", "Editorial"];

function App() {
  const [persisted, setPersistedTweak] = useTweaks(TWEAK_DEFAULTS);

  // auto-detect currency from timezone on first load (only if user hasn't set it)
  const initialCcy = React.useMemo(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
      const isIndia = tz.startsWith("Asia/Kolkata") || tz.startsWith("Asia/Calcutta");
      return isIndia ? "INR" : "USD";
    } catch {
      return "INR";
    }
  }, []);
  const [autoCcySet, setAutoCcySet] = React.useState(false);
  React.useEffect(() => {
    if (autoCcySet) return;
    if (persisted.currency !== initialCcy) {
      setPersistedTweak("currency", initialCcy);
    }
    setAutoCcySet(true);
    // eslint-disable-next-line
  }, []);

  // Merge: locked values + user-controllable currency
  const t = { ...LOCKED, ...persisted };
  const setTweak = (k, v) => {
    // currency is live in production; view is internal preview only
    if (k === "currency" || k === "view") setPersistedTweak(k, v);
  };

  const fitCurrencyCTA = (label) => {
    if (label === "Start with ₹299") return t.currency === "USD" ? "Start with $4" : "Start with ₹299";
    return label;
  };
  const ctaLabel = fitCurrencyCTA(t.ctaCopy);
  const headlineIdx = HEADLINE_INDEX[t.headline] ?? 0;
  const toneKey = TONE_KEY[t.tone] || "ivory";
  const log = (where) => () => console.log(`[SiyAI] CTA tapped from: ${where}`);

  const isDesktop = t.view === "Desktop";

  // Scale desktop chrome to fit the viewport so 1280-wide design stays correct
  const [scale, setScale] = React.useState(1);
  React.useEffect(() => {
    if (!isDesktop) { setScale(1); return; }
    const fit = () => {
      const avail = Math.min(window.innerWidth - 40, 1320);
      const s = Math.min(1, avail / 1280);
      setScale(s);
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [isDesktop]);

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: isDesktop ? "12px" : "24px 12px",
      background: "radial-gradient(70% 50% at 50% 30%, #1c2128, #0c0f13)",
    }}>
      {isDesktop
        ? (
          <div style={{
            transform: `scale(${scale})`,
            transformOrigin: "top center",
            width: 1280,
            // reserve the scaled-down vertical footprint so the parent doesn't overflow
            margin: `0 0 ${(1 - scale) * -200}px`,
          }}>
            <DesktopShell t={t} setTweak={setTweak} ctaLabel={ctaLabel} headlineIdx={headlineIdx} toneKey={toneKey} log={log} />
          </div>
        )
        : <MobileShell  t={t} setTweak={setTweak} ctaLabel={ctaLabel} headlineIdx={headlineIdx} toneKey={toneKey} log={log} />}

      <WhatsAppChatWidget />
      <ExitIntentModal />

      <TweaksPanel title="SiyAI · Region">
        <TweakSection label="Currency" />
        <TweakRadio label="Pricing in" value={t.currency} options={["INR", "USD"]} onChange={(v) => setTweak("currency", v)} />
        <div style={{ padding: "10px 14px", color: "var(--ink-3)", fontSize: 11, fontFamily: "var(--font-mono)", letterSpacing: "0.06em", lineHeight: 1.5 }}>
          AUTO-DETECTED FROM TIMEZONE.<br/>
          ALL OTHER AXES LOCKED FOR LAUNCH.
        </div>

        <TweakSection label="Stakeholder preview" />
        <TweakRadio label="Device frame" value={t.view} options={VIEW_OPTIONS} onChange={(v) => setTweak("view", v)} />
        <div style={{ padding: "8px 14px 12px", color: "var(--ink-3)", fontSize: 10.5, fontFamily: "var(--font-mono)", letterSpacing: "0.06em", lineHeight: 1.5 }}>
          NOT A USER-FACING CONTROL.<br/>
          PRODUCTION SITE IS RESPONSIVE.
        </div>
      </TweaksPanel>
    </div>
  );
}

// ───────── Mobile shell ─────────
function MobileShell({ t, setTweak, ctaLabel, headlineIdx, toneKey, log }) {
  return (
    <IOSDevice width={390} height={844}>
      <div className={`siyai-screen tone-${toneKey}`}>
        <div aria-hidden style={{ height: 50 }} />
        <TopNav
          currency={t.currency}
          onCurrency={(c) => setTweak("currency", c)}
          onSignIn={log("nav-signin")}
        />
        <Hero headline={headlineIdx} ctaLabel={ctaLabel} onCTA={log("hero")} currency={t.currency} />
        <RecipientStrip />
        <BudgetBar currency={t.currency} />
        <MostLoved currency={t.currency} />
        <Bundles currency={t.currency} />
        <CreateGrid density={DENSITY_KEY[t.density] || "six"} currency={t.currency} />
        <ShopByOccasion onPick={(k) => console.log("Occasion:", k)} />
        <WhatsAppProofTile />
        <ReviewsStatic />
        <HowItWorksStrip />
        <FAQAccordion />
        <Closer onCTA={log("closer")} ctaLabel={ctaLabel} currency={t.currency} />
        <Footer />
      </div>
    </IOSDevice>
  );
}

// ───────── Desktop shell ─────────
function DesktopShell({ t, setTweak, ctaLabel, headlineIdx, toneKey, log }) {
  return (
    <ChromeWindow width={1280} height={820} url="siyai.com" tabs={[{ title: "SiyAI — Gift Memories That Last Forever" }]}>
      <div className={`siyai-desktop tone-${toneKey}`}>
        <TopNavD
          currency={t.currency}
          onCurrency={(c) => setTweak("currency", c)}
          onSignIn={log("nav-signin")}
          onStart={log("nav-start")}
        />
        <HeroD
          headline={headlineIdx}
          variant={t.desktopHero === "Editorial" ? "editorial" : "cinema"}
          ctaLabel={ctaLabel}
          onCTA={log("hero")}
          currency={t.currency}
        />
        <RecipientStrip desktop />
        <BudgetBar currency={t.currency} desktop />
        <MostLoved currency={t.currency} desktop />
        <Bundles currency={t.currency} desktop />
        <CreateGridD currency={t.currency} />
        <ShopByOccasionD onPick={(k) => console.log("Occasion:", k)} />
        <WhatsAppProofTile desktop />
        <ReviewsStatic desktop />
        <HowItWorksStrip desktop />
        <FAQAccordion desktop />
        <CloserD onCTA={log("closer")} ctaLabel={ctaLabel} currency={t.currency} />
        <FooterD />
      </div>
    </ChromeWindow>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
