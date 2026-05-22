// photos.js — central photo registry for SiyAI homepage
// All photo slots have a key. The registry resolves to:
//   1. localStorage user upload (if any)
//   2. default stock photo URL (Unsplash CDN)
//   3. nothing (PhotoSlot falls back to stripe pattern)
//
// User uploads happen on /photos.html admin page. Both pages share
// the same localStorage namespace.

(function (global) {
  const LS_KEY = "siyai_photos_v1";

  // ─────────────────────────────────────────────────────────────
  // PHOTO MANIFEST — every photo slot on the homepage
  // Organized top-to-bottom to match the current page architecture
  // ─────────────────────────────────────────────────────────────
  const PHOTOS = [
    // ── Hero · live demos (right side of hero) ─────────────────
    {
      key: "create-living-portrait",
      group: "Hero · Live demos",
      label: "Living Portrait — hero demo + Recipient strip (Dadi)",
      brief: "B&W or sepia portrait of an Indian elder, 1960s feel. Used as the hero portrait demo AND as Dadi's avatar.",
      w: 800, h: 1000,
      default: "https://picsum.photos/seed/siyai-create-living-portrait/800/1000",
    },
    {
      key: "memory-film-still",
      group: "Hero · Live demos",
      label: "Memory Film — hero demo (still 1 of 3)",
      brief: "Cinematic Indian-family memory. Dramatic light, documentary mood.",
      w: 1600, h: 1000,
      default: "https://picsum.photos/seed/siyai-memory-film-still/1600/1000",
    },
    {
      key: "create-memory-film",
      group: "Hero · Live demos",
      label: "Memory Film — hero demo (still 2 of 3) + Create grid",
      brief: "Cinematic still — Indian family on a verandah or doorway, golden hour.",
      w: 800, h: 600,
      default: "https://picsum.photos/seed/siyai-create-memory-film/800/600",
    },
    {
      key: "memorial-dadi-portrait",
      group: "Hero · Live demos",
      label: "Memory Film — hero demo (still 3 of 3) + Recipient strip Dadi",
      brief: "Indian grandmother portrait, ideally B&W or sepia 1960s-70s.",
      w: 600, h: 800,
      default: "https://picsum.photos/seed/siyai-memorial-dadi-portrait/600/800",
    },

    // ── Recipient strip · 7 round avatars ──────────────────────
    {
      key: "diwali-bundle",
      group: "Recipient avatars",
      label: "Maa avatar (also Diwali Family Bundle card)",
      brief: "Indian middle-aged mother, warm soft portrait. Round-cropped well.",
      w: 600, h: 600,
      default: "https://picsum.photos/seed/siyai-diwali-bundle/600/600",
    },
    {
      key: "create-voice-letter",
      group: "Recipient avatars",
      label: "Papa avatar (also Voice Letter Create card)",
      brief: "Older Indian father, candid, warm tone. Round-cropped well.",
      w: 600, h: 600,
      default: "https://picsum.photos/seed/siyai-create-voice-letter/600/600",
    },
    {
      key: "dt-vault-papa",
      group: "Recipient avatars",
      label: "Nana avatar (also Papa Vault card · memorial)",
      brief: "Indian elder father, slightly sepia. Round-cropped well.",
      w: 300, h: 360,
      default: "https://picsum.photos/seed/siyai-dt-vault-papa/300/360",
    },
    {
      key: "dt-hero-product-voice",
      group: "Recipient avatars",
      label: "Bhai avatar",
      brief: "Young Indian man, candid 4:5. Round-cropped well.",
      w: 600, h: 600,
      default: "https://picsum.photos/seed/siyai-dt-hero-product-voice/600/600",
    },
    {
      key: "hero-floating-card",
      group: "Recipient avatars",
      label: "Beti avatar",
      brief: "Young Indian woman or daughter, warm tones. Round-cropped well.",
      w: 640, h: 640,
      default: "https://picsum.photos/seed/siyai-hero-floating-card/640/640",
    },
    {
      key: "diwali-portrait",
      group: "Recipient avatars",
      label: "Yourself avatar (also Diwali Living Portrait card)",
      brief: "A photographer self-portrait or anonymous figure. Square crop.",
      w: 640, h: 480,
      default: "https://picsum.photos/seed/siyai-diwali-portrait/640/480",
    },

    // ── Diwali curation strip · 3 cards ────────────────────────
    {
      key: "diwali-voice",
      group: "Diwali curation",
      label: "Voice Letter — Diwali wish",
      brief: "Indian father at a phone or recording something, warm Diwali tones.",
      w: 640, h: 480,
      default: "https://picsum.photos/seed/siyai-diwali-voice/640/480",
    },

    // ── Create grid · 6 product cards + bento ──────────────────
    {
      key: "create-custom-song",
      group: "Create grid",
      label: "Custom Song card",
      brief: "Indian sangeet or wedding music scene; dholak or guitar.",
      w: 640, h: 480,
      default: "https://picsum.photos/seed/siyai-create-custom-song/640/480",
    },
    {
      key: "create-handwritten",
      group: "Create grid",
      label: "Handwritten Letter card",
      brief: "Close-up of a handwritten letter, fountain pen, old paper.",
      w: 640, h: 480,
      default: "https://picsum.photos/seed/siyai-create-handwritten/640/480",
    },
    {
      key: "create-time-capsule",
      group: "Create grid",
      label: "Time Capsule card",
      brief: "A sealed envelope or wax-sealed letter, dated.",
      w: 640, h: 480,
      default: "https://picsum.photos/seed/siyai-create-time-capsule/640/480",
    },
    {
      key: "dt-bento-voice",
      group: "Create grid",
      label: "Desktop bento — Voice Letter hero (2×2)",
      brief: "Indian father in his late 60s, candid in a home setting. Tall portrait crop.",
      w: 1200, h: 1500,
      default: "https://picsum.photos/seed/siyai-dt-bento-voice/1200/1500",
    },

    // ── WhatsApp moment chat avatar ────────────────────────────
    {
      key: "whatsapp-papa-avatar",
      group: "WhatsApp moment",
      label: "Papa chat avatar (the voice note sender)",
      brief: "Older Indian man's face, warm tone. Tight square crop.",
      w: 200, h: 200,
      default: "https://picsum.photos/seed/siyai-whatsapp-papa-avatar/200/200",
    },

    // ── Legacy Vault dashboard · 4 person cards ────────────────
    {
      key: "dt-vault-maa",
      group: "Legacy Vault",
      label: "Vault — Maa (active)",
      brief: "Indian mother portrait. Square crop. Warm tones.",
      w: 300, h: 360,
      default: "https://picsum.photos/seed/siyai-dt-vault-maa/300/360",
    },
    {
      key: "dt-vault-dadi",
      group: "Legacy Vault",
      label: "Vault — Dadi (memorial)",
      brief: "Indian grandmother portrait, B&W. Square crop.",
      w: 300, h: 360,
      default: "https://picsum.photos/seed/siyai-dt-vault-dadi/300/360",
    },
    {
      key: "memorial-vault-avatar",
      group: "Legacy Vault",
      label: "Vault — Nana (memorial)",
      brief: "Indian elder man, sepia. Square crop.",
      w: 200, h: 200,
      default: "https://picsum.photos/seed/siyai-memorial-vault-avatar/200/200",
    },
    // ── Why families choose SiyAI — 3 lifestyle photos ────────
    {
      key: "why-voice-replay",
      group: "Why families",
      label: "Why 1 — daughter listening to a voice note",
      brief: "Indian daughter (20s-30s) holding a phone close to her ear, soft golden light, intimate moment.",
      w: 800, h: 1000,
      default: "https://picsum.photos/seed/siyai-why-voice-replay/800/1000",
    },
    {
      key: "why-anniversary",
      group: "Why families",
      label: "Why 2 — calendar / anniversary moment",
      brief: "Indian couple looking at each other, ~40s-50s, anniversary feel. Or a calendar with a ringed date.",
      w: 800, h: 1000,
      default: "https://picsum.photos/seed/siyai-why-anniversary/800/1000",
    },
    {
      key: "why-storytelling",
      group: "Why families",
      label: "Why 3 — grandfather telling a story",
      brief: "Indian grandfather with grandchild listening, warm domestic interior. Generational storytelling.",
      w: 800, h: 1000,
      default: "https://picsum.photos/seed/siyai-why-storytelling/800/1000",
    },

  ];

  // ─────────────────────────────────────────────────────────────
  // localStorage helpers
  // ─────────────────────────────────────────────────────────────
  function loadStore() {
    try {
      const raw = localStorage.getItem(LS_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }
  function saveStore(store) {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(store));
    } catch (e) {
      console.warn("[SiyAI photos] localStorage write failed:", e);
    }
  }

  function getPhoto(key) {
    const store = loadStore();
    if (store[key]) return store[key];
    const item = PHOTOS.find(p => p.key === key);
    return item ? item.default : null;
  }
  // Returns the local repo path for a baked-in photo. PhotoSlot tries this
  // first via an <img> onerror fallback to the URL returned by getPhoto().
  function getRepoPath(key) {
    return `photos/${key}.jpg`;
  }

  function setPhoto(key, dataURL) {
    const store = loadStore();
    if (dataURL) store[key] = dataURL;
    else delete store[key];
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(store));
    } catch (e) {
      // QuotaExceededError — propagate so caller can show feedback
      throw new Error("STORAGE_FULL");
    }
    // notify listeners (same tab + cross-tab via storage event)
    window.dispatchEvent(new CustomEvent("siyai-photo-change", { detail: { key } }));
  }

  function clearAllPhotos() {
    try { localStorage.removeItem(LS_KEY); } catch (e) {}
    window.dispatchEvent(new CustomEvent("siyai-photo-change", { detail: { all: true } }));
  }

  function getPhotoMeta(key) {
    return PHOTOS.find(p => p.key === key);
  }

  function getAllPhotoKeys() {
    return PHOTOS.map(p => p.key);
  }

  function getPhotosByGroup() {
    const groups = {};
    for (const p of PHOTOS) {
      if (!groups[p.group]) groups[p.group] = [];
      groups[p.group].push(p);
    }
    return groups;
  }

  function hasUploaded(key) {
    const store = loadStore();
    return !!store[key];
  }

  // Cross-tab sync
  window.addEventListener("storage", (e) => {
    if (e.key === LS_KEY) {
      window.dispatchEvent(new CustomEvent("siyai-photo-change", { detail: { all: true } }));
    }
  });

  global.SiyAIPhotos = {
    getPhoto,
    setPhoto,
    clearAllPhotos,
    getPhotoMeta,
    getAllPhotoKeys,
    getPhotosByGroup,
    hasUploaded,
    PHOTOS,
  };
})(window);
