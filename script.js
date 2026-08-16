/**
 * ============================================================================
 * Emoji Alchemist - Core Game & PWA Engine
 * ============================================================================
 * 
 * Features:
 * - 100% Offline Progressive Web App (PWA) with Service Worker registration
 * - Strict Zero-Scroll Viewport Lockdown & Anti-Frustration Mobile UX
 * - Completionist Mastery Tiers & Milestone celebration system
 * - Psychological Engagement micro-copy & speed grind challenges
 * - Anonymous In-App Player Feedback streaming to Google Sheet webhook
 * - Procedural Web Audio API sound synthesizer
 */

// Google Apps Script / Webhook Endpoint for Anonymous Player Feedback
const FEEDBACK_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbw7LnqgziY533U9Qtp5h4w6p7Zcb0kNQk9BX82dX44a-P9dJcABcO-KCtcPHlnVkXyt/exec";

const DEFAULT_BASE_ELEMENTS = [
  { id: "fire", emoji: "🔥", name: "Fire", category: "Elements" },
  { id: "water", emoji: "💧", name: "Water", category: "Elements" },
  { id: "earth", emoji: "🌍", name: "Earth", category: "Elements" },
  { id: "air", emoji: "💨", name: "Air", category: "Elements" }
];

const DEFAULT_COMBINATIONS = [
  { elements: ["🔥", "💧"], result: { emoji: "☁️", name: "Steam", category: "Nature" } },
  { elements: ["💧", "🌍"], result: { emoji: "🌱", name: "Plant", category: "Flora" } },
  { elements: ["🌍", "🔥"], result: { emoji: "🌋", name: "Lava", category: "Nature" } },
  { elements: ["💨", "💧"], result: { emoji: "🌧️", name: "Rain", category: "Nature" } },
  { elements: ["💨", "🌍"], result: { emoji: "🌪️", name: "Tornado", category: "Nature" } },
  { elements: ["🔥", "💨"], result: { emoji: "⚡", name: "Energy", category: "Science" } },
  { elements: ["💧", "💧"], result: { emoji: "🌊", name: "Ocean", category: "Nature" } },
  { elements: ["🔥", "🔥"], result: { emoji: "☀️", name: "Sun", category: "Cosmos" } },
  { elements: ["🌍", "🌍"], result: { emoji: "🏔️", name: "Mountain", category: "Nature" } },
  { elements: ["💨", "💨"], result: { emoji: "🌬️", name: "Wind", category: "Nature" } },
  { elements: ["🌋", "💨"], result: { emoji: "🪨", name: "Stone", category: "Minerals" } },
  { elements: ["🪨", "🔥"], result: { emoji: "🪙", name: "Metal", category: "Minerals" } },
  { elements: ["🪨", "💨"], result: { emoji: "🏖️", name: "Sand", category: "Nature" } },
  { elements: ["🏖️", "🔥"], result: { emoji: "🪟", name: "Glass", category: "Items" } },
  { elements: ["🌱", "💧"], result: { emoji: "🌿", name: "Herb", category: "Flora" } },
  { elements: ["🌱", "🌍"], result: { emoji: "🌳", name: "Tree", category: "Flora" } },
  { elements: ["🌱", "☀️"], result: { emoji: "🌻", name: "Sunflower", category: "Flora" } },
  { elements: ["🌱", "🔥"], result: { emoji: "🪵", name: "Wood", category: "Items" } },
  { elements: ["🪵", "🔥"], result: { emoji: "⛺", name: "Campfire", category: "Items" } },
  { elements: ["🌧️", "☀️"], result: { emoji: "🌈", name: "Rainbow", category: "Cosmos" } },
  { elements: ["🌧️", "🌍"], result: { emoji: "🍄", name: "Mushroom", category: "Flora" } },
  { elements: ["🌧️", "💨"], result: { emoji: "❄️", name: "Snow", category: "Nature" } },
  { elements: ["❄️", "🌍"], result: { emoji: "⛄", name: "Snowman", category: "Items" } },
  { elements: ["🌱", "🌱"], result: { emoji: "💐", name: "Garden", category: "Flora" } },
  { elements: ["⚡", "💧"], result: { emoji: "🧬", name: "Life", category: "Science" } },
  { elements: ["🧬", "🌍"], result: { emoji: "🧑", name: "Human", category: "Living" } },
  { elements: ["🧬", "💧"], result: { emoji: "🐟", name: "Fish", category: "Animals" } },
  { elements: ["🧬", "💨"], result: { emoji: "🦅", name: "Bird", category: "Animals" } },
  { elements: ["🧬", "🔥"], result: { emoji: "🐉", name: "Dragon", category: "Mythic" } },
  { elements: ["🧑", "🔥"], result: { emoji: "🍳", "name": "Chef", category: "Professions" } },
  { elements: ["🧑", "🌱"], result: { emoji: "🌾", "name": "Farmer", category: "Professions" } },
  { elements: ["🧑", "🪙"], result: { emoji: "⚔️", "name": "Warrior", category: "Professions" } },
  { elements: ["🧑", "⚡"], result: { emoji: "💡", "name": "Idea", category: "Mind" } },
  { elements: ["💡", "⚡"], result: { emoji: "🤖", "name": "Robot", category: "Technology" } },
  { elements: ["🪙", "🔥"], result: { emoji: "🗡️", "name": "Sword", category: "Items" } },
  { elements: ["🪟", "🏖️"], result: { emoji: "⏳", "name": "Hourglass", category: "Items" } },
  { elements: ["🪟", "💧"], result: { emoji: "🧪", "name": "Potion", category: "Science" } },
  { elements: ["🏖️", "🌱"], result: { emoji: "🌵", "name": "Cactus", category: "Flora" } },
  { elements: ["🏖️", "💧"], result: { emoji: "🧱", "name": "Mud", category: "Nature" } },
  { elements: ["🧱", "🔥"], result: { emoji: "🏠", "name": "House", category: "Structures" } },
  { elements: ["🏠", "🏠"], result: { emoji: "🏙️", "name": "City", category: "Structures" } },
  { elements: ["🌳", "🌳"], result: { emoji: "🌲", "name": "Forest", category: "Flora" } },
  { elements: ["🐟", "🌊"], result: { emoji: "🦈", "name": "Shark", category: "Animals" } },
  { elements: ["🦅", "🔥"], result: { emoji: "🐦‍🔥", "name": "Phoenix", category: "Mythic" } },
  { elements: ["☀️", "🌍"], result: { emoji: "🌙", "name": "Moon", category: "Cosmos" } },
  { elements: ["🌙", "☀️"], result: { emoji: "✨", "name": "Star", category: "Cosmos" } },
  { elements: ["✨", "✨"], result: { emoji: "🌌", "name": "Galaxy", category: "Cosmos" } },
  { elements: ["🧪", "✨"], result: { emoji: "🧙", "name": "Wizard", category: "Mythic" } },
  { elements: ["🧙", "✨"], result: { emoji: "🔮", "name": "Crystal Ball", category: "Mythic" } },
  { elements: ["🪵", "🪙"], result: { emoji: "🪓", "name": "Axe", category: "Items" } },
  { elements: ["🌊", "💨"], result: { emoji: "🏄", "name": "Surfer", category: "Activities" } },
  { elements: ["🌾", "🔥"], result: { emoji: "🍞", "name": "Bread", category: "Food" } },
  { elements: ["🍞", "🔥"], result: { emoji: "🥪", "name": "Sandwich", category: "Food" } },
  { elements: ["🧑", "🌾"], result: { emoji: "🚜", "name": "Tractor", category: "Technology" } },
  { elements: ["⚡", "🪙"], result: { emoji: "🔋", "name": "Battery", category: "Technology" } },
  { elements: ["🔋", "🤖"], result: { emoji: "💻", "name": "Computer", category: "Technology" } },
  { elements: ["💻", "✨"], result: { emoji: "🕹️", "name": "Video Game", category: "Entertainment" } },
  { elements: ["🧑", "❤️"], result: { emoji: "👨‍👩‍👧", "name": "Family", category: "Living" } },
  { elements: ["🧑", "🧑"], result: { emoji: "❤️", "name": "Love", category: "Mind" } },
  { elements: ["❤️", "🌱"], result: { emoji: "🌹", "name": "Rose", category: "Flora" } },
  { elements: ["🌹", "💧"], result: { emoji: "🧴", "name": "Perfume", category: "Items" } },
  { elements: ["🌋", "💧"], result: { emoji: "💎", "name": "Diamond", category: "Minerals" } },
  { elements: ["💎", "🪙"], result: { emoji: "👑", "name": "Crown", category: "Items" } },
  { elements: ["👑", "🧑"], result: { emoji: "🤴", "name": "King", category: "Living" } },
  { elements: ["🧪", "🌿"], result: { emoji: "🍵", "name": "Tea", category: "Food" } },
  { elements: ["⚡", "💨"], result: { emoji: "🛸", "name": "UFO", "category": "Cosmos" } },
  { elements: ["🌊", "🐟"], result: { emoji: "🐬", "name": "Dolphin", "category": "Animals" } },
  { elements: ["🔥", "🍳"], result: { emoji: "🥞", "name": "Pancake", "category": "Food" } }
];

const MASTERY_TIERS = [
  { id: 1, min: 0, max: 10, icon: "🌱", title: "Apprentice Alchemist", desc: "Awaken basic element combinations." },
  { id: 2, min: 11, max: 25, icon: "⚗️", title: "Adept Transmuter", desc: "Synthesize complex flora and basic minerals." },
  { id: 3, min: 26, max: 45, icon: "🔮", title: "Master Elementalist", desc: "Uncover life, technology, and civilization." },
  { id: 4, min: 46, max: 60, icon: "👑", title: "Grand Magus", desc: "Harness mythical creatures and celestial bodies." },
  { id: 5, min: 61, max: 100, icon: "🌌", title: "Universal Creator", desc: "Conquer the entire alchemical realm!" }
];

class EmojiAlchemistGame {
  constructor() {
    this.baseElements = [];
    this.combinations = [];
    this.combinationMap = new Map();
    this.unlockedInventory = new Map();
    this.discoveredRecipes = new Set();
    this.totalPossibleDiscoveries = 0;
    this.currentTierId = 1;

    // DOM Elements
    this.inventoryListEl = document.getElementById("inventory-list");
    this.inventoryBadgeEl = document.getElementById("inventory-badge");
    this.sidebarEl = document.getElementById("sidebar");
    this.drawerHandleBarEl = document.getElementById("drawer-handle-bar");
    this.drawerToggleIconEl = document.getElementById("drawer-toggle-icon");
    this.drawerHandleHintEl = document.getElementById("drawer-handle-hint");
    this.drawerBackdropEl = document.getElementById("drawer-backdrop");
    this.drawerItemCountEl = document.getElementById("drawer-item-count");
    this.isDrawerExpanded = false;

    this.searchInputEl = document.getElementById("search-input");
    this.clearSearchBtn = document.getElementById("clear-search-btn");
    this.canvasEl = document.getElementById("crafting-canvas");
    this.canvasContainerEl = document.getElementById("canvas-container");
    this.discoveredCountEl = document.getElementById("discovered-count");
    this.totalCountEl = document.getElementById("total-count");
    this.progressBarEl = document.getElementById("progress-bar");
    this.tierSubtitleEl = document.getElementById("tier-rank-subtitle");
    this.tierBadgeIconEl = document.getElementById("tier-badge-icon");
    this.toastContainerEl = document.getElementById("toast-container");
    
    // Modals
    this.grimoireModalEl = document.getElementById("grimoire-modal");
    this.recipeListEl = document.getElementById("recipe-list");
    this.milestonesModalEl = document.getElementById("milestones-modal");
    this.tiersListEl = document.getElementById("tiers-list");
    this.feedbackModalEl = document.getElementById("feedback-modal");
    this.feedbackFormEl = document.getElementById("feedback-form");
    this.feedbackHistoryListEl = document.getElementById("feedback-history-list");
    this.feedbackStatSummaryEl = document.getElementById("feedback-stat-summary");
    this.exitModalEl = document.getElementById("modal-exit");
    this.btnKeepPlaying = document.getElementById("btn-keep-playing");
    this.btnConfirmExit = document.getElementById("btn-confirm-exit");
    this.btnCloseExitModal = document.getElementById("btn-close-exit-modal");

    // Settings Modal
    this.settingsModalEl = document.getElementById("settings-modal");
    this.btnOpenSettings = document.getElementById("btn-open-settings");
    this.btnCloseSettings = document.getElementById("btn-close-settings");
    this.btnCheckUpdatesSettings = document.getElementById("btn-check-updates-settings");
    this.settingsNetworkBadgeEl = document.getElementById("settings-network-badge");
    this.settingsNetworkTextEl = document.getElementById("settings-network-text");
    this.btnSettingsAudioToggle = document.getElementById("btn-settings-audio-toggle");
    this.settingsAudioStateTextEl = document.getElementById("settings-audio-state-text");
    this.btnSettingsReset = document.getElementById("btn-settings-reset");

    // Banner & Controls
    this.engagementBannerEl = document.getElementById("pwa-engagement-banner");
    this.btnInstallPWA = document.getElementById("btn-install-pwa");
    this.btnDismissBanner = document.getElementById("btn-dismiss-banner");
    this.audioBtn = document.getElementById("btn-toggle-audio");

    // Floating PWA Update Toast Banner
    this.pwaUpdateBannerEl = document.getElementById("pwa-update-banner");
    this.btnUpdateNow = document.getElementById("btn-update-now");
    this.btnDismissUpdate = document.getElementById("btn-dismiss-update");
    this.waitingWorker = null;
    this.swRegistration = null;

    // Audio Engine
    this.audioEnabled = localStorage.getItem("emoji_alchemist_audio") !== "false";
    this.audioCtx = null;

    // Hint timer
    this.hintTimer = null;
    this.deferredInstallPrompt = null;

    this.init();
  }

  getCombinationKey(emoji1, emoji2) {
    return [emoji1, emoji2].sort().join("+");
  }

  async init() {
    // Initialize base history state for clean mobile back-button handling
    try {
      if (!history.state || history.state.modal) {
        history.replaceState({ modal: null, page: "game" }, "");
      }
    } catch (e) {
      console.warn("History API initialization:", e);
    }

    this.setupPWAAndOffline();
    await this.loadRecipeData();
    this.loadSavedProgress();
    this.updateAudioButtonUI();
    this.renderInventory();
    this.updateStats();
    this.renderMasteryTiers();
    this.renderFeedbackHistory();
    this.setupEventListeners();
    this.setupAntiFrustrationGuards();
  }

  /**
   * PWA Service Worker & Install Prompt Setup with In-App Updates & Offline Handling
   */
  setupPWAAndOffline() {
    // 1. Register Service Worker & Listen for Controller Change for Seamless In-App Updates
    if ("serviceWorker" in navigator) {
      let refreshing = false;
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        if (!refreshing) {
          refreshing = true;
          console.log("[PWA] Controller changed, seamlessly reloading to apply latest update...");
          window.location.reload();
        }
      });

      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js")
          .then((reg) => {
            this.swRegistration = reg;
            console.log("[PWA] Service Worker registered successfully:", reg.scope);

            // Register 24-hour Periodic Background Sync for background updates on Android/Chrome
            this.registerPeriodicBackgroundSync(reg);

            // Check if an update is already waiting
            if (reg.waiting) {
              this.waitingWorker = reg.waiting;
              this.showUpdateBanner();
            }

            // Listen for new service worker installation
            reg.addEventListener("updatefound", () => {
              const newWorker = reg.installing;
              if (newWorker) {
                newWorker.addEventListener("statechange", () => {
                  if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                    console.log("[PWA] New update is installed & waiting. Showing in-app banner...");
                    this.waitingWorker = newWorker;
                    this.showUpdateBanner();
                  }
                });
              }
            });
          })
          .catch((err) => console.warn("[PWA] Service Worker registration failed:", err));
      });
    }

    // 2. Offline Reconnection & Silent Update Check
    window.addEventListener("online", () => {
      console.log("[Network] Reconnected online. Silently checking for service worker updates...");
      this.updateNetworkStatusUI();
      this.showSimpleToast("🌐", "Back Online", "Internet reconnected. Checking for new elements...");
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.ready.then((reg) => {
          reg.update().catch((err) => console.warn("[PWA] Silent update check error:", err));
        });
      }
    });

    window.addEventListener("offline", () => {
      console.log("[Network] Connection offline. All recipes remain safely accessible.");
      this.updateNetworkStatusUI();
      this.showSimpleToast("📴", "Offline Mode", "Playing 100% offline. Progress is safely saved locally!");
    });

    // 3. Banner Dismissed State
    if (localStorage.getItem("emoji_alchemist_banner_dismissed") === "true") {
      if (this.engagementBannerEl) this.engagementBannerEl.classList.add("hidden");
    }

    // 4. Capture PWA Install Prompt
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      this.deferredInstallPrompt = e;
      if (this.btnInstallPWA) {
        this.btnInstallPWA.style.display = "inline-flex";
      }
    });

    window.addEventListener("appinstalled", () => {
      console.log("[PWA] Application installed on home screen!");
      if (this.engagementBannerEl) this.engagementBannerEl.classList.add("hidden");
      this.deferredInstallPrompt = null;
      this.showSimpleToast("🎉", "App Installed", "Emoji Alchemist is now installed and ready to play 100% offline!");
    });
  }

  /**
   * Request 24-hour Periodic Background Sync for automatic background cache checks
   */
  async registerPeriodicBackgroundSync(registration = null) {
    if ("serviceWorker" in navigator) {
      try {
        const reg = registration || this.swRegistration || (await navigator.serviceWorker.ready);
        if ("periodicSync" in reg) {
          const tags = await reg.periodicSync.getTags();
          if (!tags.includes("check-game-updates")) {
            await reg.periodicSync.register("check-game-updates", {
              minInterval: 24 * 60 * 60 * 1000, // 24 hours
            });
            console.log("[PWA] Periodic Background Sync registered for 'check-game-updates' (24h interval)");
          } else {
            console.log("[PWA] Periodic Background Sync already active for 'check-game-updates'");
          }
        }
      } catch (err) {
        console.log("[PWA] Periodic Background Sync registration info:", err.message || err);
      }
    }
  }

  showUpdateBanner() {
    if (this.pwaUpdateBannerEl) {
      this.pwaUpdateBannerEl.style.display = "block";
      this.playSound("pop");
    }
  }

  hideUpdateBanner() {
    if (this.pwaUpdateBannerEl) {
      this.pwaUpdateBannerEl.style.display = "none";
    }
  }

  applyAppUpdate() {
    if (this.waitingWorker) {
      console.log("[PWA] User triggered update, sending SKIP_WAITING to waiting worker...");
      this.waitingWorker.postMessage({ type: "SKIP_WAITING" });
    }
    this.hideUpdateBanner();
    setTimeout(() => {
      window.location.reload();
    }, 250);
  }

  async checkForManualUpdates() {
    if (!navigator.onLine) {
      this.showSimpleToast("📴", "Offline", "You are offline. Connect to the internet to check for new elements!");
      return;
    }

    this.showSimpleToast("🔍", "Checking Updates", "Checking for latest element discoveries & updates...");

    if ("serviceWorker" in navigator) {
      try {
        const reg = this.swRegistration || await navigator.serviceWorker.ready;
        await reg.update();
        if (this.waitingWorker || reg.waiting) {
          this.waitingWorker = this.waitingWorker || reg.waiting;
          this.showUpdateBanner();
          this.showSimpleToast("🧪", "New Update Found!", "A new update is available. Tap 'Update Now' to apply.");
        } else {
          setTimeout(() => {
            this.showSimpleToast("✨", "Up to Date", "You are playing on the latest version! (v1.0.2)");
          }, 450);
        }
      } catch (err) {
        console.warn("[PWA] Manual update check error:", err);
        this.showSimpleToast("✨", "Up to Date", "You are playing on the latest version! (v1.0.2)");
      }
    } else {
      this.showSimpleToast("✨", "Up to Date", "You are playing on the latest version! (v1.0.2)");
    }
  }

  updateNetworkStatusUI() {
    const isOnline = navigator.onLine;
    if (this.settingsNetworkBadgeEl) {
      this.settingsNetworkBadgeEl.className = `network-badge ${isOnline ? "online" : "offline"}`;
    }
    if (this.settingsNetworkTextEl) {
      this.settingsNetworkTextEl.textContent = isOnline ? "Online" : "Offline";
    }
  }

  /**
   * Anti-Frustration Native UI Guards
   * - Prevents context menu / search popup on long presses
   * - Prevents rubber-banding / browser pull-to-refresh
   */
  setupAntiFrustrationGuards() {
    // Disable right-click & long-press Google search menu except inside text inputs
    window.addEventListener("contextmenu", (e) => {
      const tag = e.target.tagName;
      if (tag !== "INPUT" && tag !== "TEXTAREA") {
        e.preventDefault();
      }
    });

    // Prevent default bounce on iOS Safari
    document.addEventListener("touchmove", (e) => {
      if (e.target.closest(".inventory-scroll, .modal-body, .form-textarea, .form-input, .feedback-history-list")) {
        // Allowed scrolling areas
        return;
      }
      e.preventDefault();
    }, { passive: false });
  }

  async loadRecipeData() {
    try {
      const response = await fetch("/combinations.json");
      if (response.ok) {
        const data = await response.json();
        this.baseElements = data.baseElements || DEFAULT_BASE_ELEMENTS;
        this.combinations = data.combinations || DEFAULT_COMBINATIONS;
      } else {
        throw new Error("HTTP fetch error");
      }
    } catch (e) {
      console.warn("Using embedded fallback recipes:", e);
      this.baseElements = DEFAULT_BASE_ELEMENTS;
      this.combinations = DEFAULT_COMBINATIONS;
    }

    this.combinationMap.clear();
    const allUniqueEmojis = new Set(this.baseElements.map(e => e.emoji));

    this.combinations.forEach(combo => {
      const key = this.getCombinationKey(combo.elements[0], combo.elements[1]);
      this.combinationMap.set(key, combo.result);
      allUniqueEmojis.add(combo.result.emoji);
    });

    this.totalPossibleDiscoveries = allUniqueEmojis.size;
    if (this.totalCountEl) {
      this.totalCountEl.textContent = this.totalPossibleDiscoveries;
    }
  }

  loadSavedProgress() {
    this.baseElements.forEach(base => {
      this.unlockedInventory.set(base.emoji, {
        emoji: base.emoji,
        name: base.name,
        category: base.category || "Elements",
        isBase: true
      });
    });

    try {
      const savedItems = localStorage.getItem("emoji_alchemist_unlocked");
      if (savedItems) {
        const parsed = JSON.parse(savedItems);
        parsed.forEach(item => {
          this.unlockedInventory.set(item.emoji, item);
        });
      }

      const savedRecipes = localStorage.getItem("emoji_alchemist_recipes");
      if (savedRecipes) {
        const parsed = JSON.parse(savedRecipes);
        parsed.forEach(r => this.discoveredRecipes.add(r));
      }
    } catch (err) {
      console.error("Failed to load progress from localStorage:", err);
    }
  }

  saveProgress() {
    try {
      const items = Array.from(this.unlockedInventory.values());
      localStorage.setItem("emoji_alchemist_unlocked", JSON.stringify(items));
      localStorage.setItem("emoji_alchemist_recipes", JSON.stringify(Array.from(this.discoveredRecipes)));
    } catch (err) {
      console.error("Failed to save progress to localStorage:", err);
    }
  }

  getCurrentTier(count) {
    for (let i = MASTERY_TIERS.length - 1; i >= 0; i--) {
      if (count >= MASTERY_TIERS[i].min) {
        return MASTERY_TIERS[i];
      }
    }
    return MASTERY_TIERS[0];
  }

  toggleMobileDrawer(forceState = null, fromPopState = false) {
    if (!this.sidebarEl) return;
    const shouldExpand = forceState !== null ? forceState : !this.isDrawerExpanded;
    if (shouldExpand === this.isDrawerExpanded) return;
    this.isDrawerExpanded = shouldExpand;

    if (shouldExpand) {
      this.sidebarEl.classList.add("expanded");
      if (this.drawerBackdropEl) this.drawerBackdropEl.classList.add("active");
      if (this.drawerToggleIconEl) this.drawerToggleIconEl.textContent = "▼";
      if (this.drawerHandleHintEl) this.drawerHandleHintEl.textContent = "Tap to collapse";
      if (this.drawerHandleBarEl) this.drawerHandleBarEl.title = "Tap to collapse inventory grid";

      if (!fromPopState) {
        try {
          history.pushState({ modal: "inventory" }, "");
        } catch (e) {
          console.warn("History pushState error:", e);
        }
      }
    } else {
      this.sidebarEl.classList.remove("expanded");
      if (this.drawerBackdropEl) this.drawerBackdropEl.classList.remove("active");
      if (this.drawerToggleIconEl) this.drawerToggleIconEl.textContent = "▲";
      if (this.drawerHandleHintEl) this.drawerHandleHintEl.textContent = "Tap to expand";
      if (this.drawerHandleBarEl) this.drawerHandleBarEl.title = "Tap to expand inventory grid";

      if (!fromPopState && history.state?.modal === "inventory") {
        try {
          history.back();
        } catch (e) {
          console.warn("History back error:", e);
        }
      }
    }
  }

  closeMobileDrawer(fromPopState = false) {
    if (this.isDrawerExpanded) {
      this.toggleMobileDrawer(false, fromPopState);
    }
  }

  renderInventory() {
    if (!this.inventoryListEl) return;
    this.inventoryListEl.innerHTML = "";

    const query = (this.searchInputEl?.value || "").toLowerCase().trim();
    const items = Array.from(this.unlockedInventory.values());

    const filtered = items.filter(item => {
      if (!query) return true;
      return item.name.toLowerCase().includes(query) || item.emoji.includes(query);
    });

    if (this.inventoryBadgeEl) {
      this.inventoryBadgeEl.textContent = `${items.length} items`;
    }
    if (this.drawerItemCountEl) {
      this.drawerItemCountEl.textContent = `${items.length} items`;
    }

    if (filtered.length === 0) {
      const emptyMsg = document.createElement("div");
      emptyMsg.className = "empty-inventory-msg";
      emptyMsg.textContent = "No matching elements.";
      this.inventoryListEl.appendChild(emptyMsg);
      return;
    }

    filtered.forEach(item => {
      const card = document.createElement("div");
      card.className = `inventory-item ${item.isBase ? "base-element" : ""}`;
      card.title = `${item.name} (${item.category || "Element"}) - Tap to spawn or drag`;
      card.dataset.emoji = item.emoji;
      card.dataset.name = item.name;

      card.innerHTML = `
        <span class="item-emoji">${item.emoji}</span>
        <span class="item-name">${item.name}</span>
      `;

      card.addEventListener("click", () => {
        this.spawnElementOnCanvas(item.emoji, item.name, null, null, true);
        this.playSound("pop");
      });

      this.attachInventoryDragEvents(card, item);
      this.inventoryListEl.appendChild(card);
    });
  }

  updateStats() {
    const current = this.unlockedInventory.size;
    const total = this.totalPossibleDiscoveries || 68;
    if (this.discoveredCountEl) this.discoveredCountEl.textContent = current;
    if (this.totalCountEl) this.totalCountEl.textContent = total;
    if (this.drawerItemCountEl) this.drawerItemCountEl.textContent = `${current} items`;

    if (this.progressBarEl) {
      const percent = Math.min(100, Math.round((current / total) * 100));
      this.progressBarEl.style.width = `${percent}%`;
    }

    const tier = this.getCurrentTier(current);
    if (this.tierSubtitleEl) {
      this.tierSubtitleEl.textContent = `${tier.icon} ${tier.title.split(" ")[0]} (${current}/${total})`;
    }
    if (this.tierBadgeIconEl) {
      this.tierBadgeIconEl.textContent = tier.icon;
    }

    if (this.feedbackStatSummaryEl) {
      this.feedbackStatSummaryEl.textContent = `${current}/${total} Discoveries (${tier.title})`;
    }

    // Check for Tier Up celebration
    if (tier.id > this.currentTierId && this.currentTierId > 0) {
      this.currentTierId = tier.id;
      this.celebrateTierUp(tier);
    } else {
      this.currentTierId = tier.id;
    }
  }

  celebrateTierUp(tier) {
    this.playSound("discovery");
    this.showSimpleToast(
      tier.icon,
      "Mastery Tier Unlocked!",
      `Congratulations! You achieved "${tier.title}" (${this.unlockedInventory.size}/${this.totalPossibleDiscoveries})! Keep grinding towards Universal Creator!`,
      false,
      true
    );
  }

  spawnElementOnCanvas(emoji, name, x = null, y = null, isPop = false) {
    const canvasRect = this.canvasEl.getBoundingClientRect();
    const elemSize = window.innerWidth <= 768 ? 68 : 76;

    let posX = x;
    let posY = y;

    if (posX === null || posY === null) {
      const centerX = (canvasRect.width / 2) - (elemSize / 2);
      const centerY = (canvasRect.height / 2) - (elemSize / 2);
      const jitterX = (Math.random() - 0.5) * Math.min(120, canvasRect.width * 0.4);
      const jitterY = (Math.random() - 0.5) * Math.min(120, canvasRect.height * 0.4);
      posX = Math.max(10, Math.min(canvasRect.width - elemSize - 10, centerX + jitterX));
      posY = Math.max(10, Math.min(canvasRect.height - elemSize - 10, centerY + jitterY));
    } else {
      posX = Math.max(0, Math.min(canvasRect.width - elemSize, posX));
      posY = Math.max(0, Math.min(canvasRect.height - elemSize, posY));
    }

    const elem = document.createElement("div");
    elem.className = `canvas-element ${isPop ? "pop-animation" : ""}`;
    elem.dataset.emoji = emoji;
    elem.dataset.name = name;
    elem.style.left = `${posX}px`;
    elem.style.top = `${posY}px`;

    elem.innerHTML = `
      <span class="elem-emoji">${emoji}</span>
      <span class="elem-name">${name}</span>
    `;

    // Double tap/click to duplicate
    let lastTap = 0;
    elem.addEventListener("pointerdown", () => {
      const now = Date.now();
      if (now - lastTap < 300) {
        this.spawnElementOnCanvas(emoji, name, posX + 20, posY + 20, true);
        this.playSound("pop");
      }
      lastTap = now;
    });

    this.attachCanvasDragEvents(elem);
    this.canvasEl.appendChild(elem);

    if (isPop) {
      setTimeout(() => elem.classList.remove("pop-animation"), 450);
    }

    return elem;
  }

  attachInventoryDragEvents(card, item) {
    let startX = 0;
    let startY = 0;
    let ghost = null;
    let isDragging = false;

    const onStart = (e) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      startX = clientX;
      startY = clientY;
      isDragging = false;

      const onMove = (moveEvt) => {
        const curX = moveEvt.touches ? moveEvt.touches[0].clientX : moveEvt.clientX;
        const curY = moveEvt.touches ? moveEvt.touches[0].clientY : moveEvt.clientY;
        const dist = Math.hypot(curX - startX, curY - startY);

        if (!isDragging && dist > 8) {
          isDragging = true;
          ghost = document.createElement("div");
          ghost.className = "canvas-element dragging";
          ghost.style.position = "fixed";
          ghost.style.pointerEvents = "none";
          ghost.style.zIndex = "9999";
          ghost.style.left = `${curX - 34}px`;
          ghost.style.top = `${curY - 34}px`;
          ghost.innerHTML = `
            <span class="elem-emoji">${item.emoji}</span>
            <span class="elem-name">${item.name}</span>
          `;
          document.body.appendChild(ghost);
          if (moveEvt.cancelable) moveEvt.preventDefault();
        }

        if (ghost) {
          ghost.style.left = `${curX - 34}px`;
          ghost.style.top = `${curY - 34}px`;
          this.highlightPotentialCombineTarget(curX, curY, null);
          if (moveEvt.cancelable) moveEvt.preventDefault();
        }
      };

      const onEnd = (endEvt) => {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onEnd);
        window.removeEventListener("touchmove", onMove);
        window.removeEventListener("touchend", onEnd);
        window.removeEventListener("touchcancel", onEnd);

        this.clearAllCombineHighlights();

        if (ghost) {
          ghost.remove();
          ghost = null;

          const lastTouch = endEvt.changedTouches ? endEvt.changedTouches[0] : endEvt;
          const dropX = lastTouch.clientX;
          const dropY = lastTouch.clientY;
          const canvasRect = this.canvasEl.getBoundingClientRect();

          if (
            dropX >= canvasRect.left &&
            dropX <= canvasRect.right &&
            dropY >= canvasRect.top &&
            dropY <= canvasRect.bottom
          ) {
            const relX = dropX - canvasRect.left - 34;
            const relY = dropY - canvasRect.top - 34;

            const newElem = this.spawnElementOnCanvas(item.emoji, item.name, relX, relY, true);
            this.playSound("pop");

            const targetElem = this.findElementUnderPoint(dropX, dropY, newElem);
            if (targetElem) {
              this.attemptCombination(newElem, targetElem);
            }
          }
        }
      };

      window.addEventListener("pointermove", onMove, { passive: false });
      window.addEventListener("pointerup", onEnd);
      window.addEventListener("touchmove", onMove, { passive: false });
      window.addEventListener("touchend", onEnd);
      window.addEventListener("touchcancel", onEnd);
    };

    card.addEventListener("pointerdown", onStart);
    card.addEventListener("touchstart", onStart, { passive: true });
  }

  attachCanvasDragEvents(elem) {
    const onStart = (e) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      if (e.cancelable && e.type !== "touchstart") e.preventDefault();

      const canvasRect = this.canvasEl.getBoundingClientRect();
      const elemRect = elem.getBoundingClientRect();
      const elemSize = elemRect.width || 68;

      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      const offsetX = clientX - elemRect.left;
      const offsetY = clientY - elemRect.top;

      elem.classList.add("dragging");
      this.canvasEl.appendChild(elem);

      const onMove = (moveEvt) => {
        const curX = moveEvt.touches ? moveEvt.touches[0].clientX : moveEvt.clientX;
        const curY = moveEvt.touches ? moveEvt.touches[0].clientY : moveEvt.clientY;

        const rawX = curX - canvasRect.left - offsetX;
        const rawY = curY - canvasRect.top - offsetY;

        const boundedX = Math.max(0, Math.min(canvasRect.width - elemSize, rawX));
        const boundedY = Math.max(0, Math.min(canvasRect.height - elemSize, rawY));

        elem.style.left = `${boundedX}px`;
        elem.style.top = `${boundedY}px`;

        this.highlightPotentialCombineTarget(curX, curY, elem);

        if (moveEvt.cancelable) moveEvt.preventDefault();
      };

      const onEnd = (endEvt) => {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onEnd);
        window.removeEventListener("touchmove", onMove);
        window.removeEventListener("touchend", onEnd);
        window.removeEventListener("touchcancel", onEnd);

        elem.classList.remove("dragging");
        this.clearAllCombineHighlights();

        const lastTouch = endEvt.changedTouches ? endEvt.changedTouches[0] : endEvt;
        const targetElem = this.findElementUnderPoint(lastTouch.clientX, lastTouch.clientY, elem);

        if (targetElem) {
          this.attemptCombination(elem, targetElem);
        } else {
          this.playSound("pop");
        }
      };

      window.addEventListener("pointermove", onMove, { passive: false });
      window.addEventListener("pointerup", onEnd);
      window.addEventListener("touchmove", onMove, { passive: false });
      window.addEventListener("touchend", onEnd);
      window.addEventListener("touchcancel", onEnd);
    };

    elem.addEventListener("pointerdown", onStart);
    elem.addEventListener("touchstart", onStart, { passive: true });
  }

  findElementUnderPoint(clientX, clientY, currentElem) {
    const elements = Array.from(this.canvasEl.querySelectorAll(".canvas-element"));
    const padding = 20;
    for (let el of elements) {
      if (el === currentElem) continue;
      const rect = el.getBoundingClientRect();
      if (
        clientX >= rect.left - padding &&
        clientX <= rect.right + padding &&
        clientY >= rect.top - padding &&
        clientY <= rect.bottom + padding
      ) {
        return el;
      }
    }
    return null;
  }

  highlightPotentialCombineTarget(clientX, clientY, currentElem) {
    const target = this.findElementUnderPoint(clientX, clientY, currentElem);
    this.clearAllCombineHighlights();
    if (target) {
      target.classList.add("hover-combine-target");
    }
  }

  clearAllCombineHighlights() {
    this.canvasEl.querySelectorAll(".hover-combine-target").forEach(el => {
      el.classList.remove("hover-combine-target");
    });
  }

  attemptCombination(elemA, elemB) {
    const emojiA = elemA.dataset.emoji;
    const emojiB = elemB.dataset.emoji;

    const key = this.getCombinationKey(emojiA, emojiB);
    const result = this.combinationMap.get(key);

    const rectA = elemA.getBoundingClientRect();
    const rectB = elemB.getBoundingClientRect();
    const canvasRect = this.canvasEl.getBoundingClientRect();

    const midScreenX = (rectA.left + rectB.left) / 2 + 34;
    const midScreenY = (rectA.top + rectB.top) / 2 + 34;
    const spawnX = midScreenX - canvasRect.left - 34;
    const spawnY = midScreenY - canvasRect.top - 34;

    if (result) {
      elemA.remove();
      elemB.remove();

      this.createSparkleBurst(midScreenX - canvasRect.left, midScreenY - canvasRect.top);
      this.spawnElementOnCanvas(result.emoji, result.name, spawnX, spawnY, true);

      const formulaStr = `${emojiA} + ${emojiB} = ${result.emoji} (${result.name})`;
      this.discoveredRecipes.add(formulaStr);

      const isNewDiscovery = !this.unlockedInventory.has(result.emoji);

      if (isNewDiscovery) {
        this.playSound("discovery");
        this.unlockedInventory.set(result.emoji, {
          emoji: result.emoji,
          name: result.name,
          category: result.category || "Created",
          isBase: false
        });
        this.saveProgress();
        this.renderInventory();
        this.updateStats();
        this.showDiscoveryToast(result, `${emojiA} + ${emojiB}`);
      } else {
        this.playSound("combine");
        this.saveProgress();
      }

      this.clearHintPulses();
    } else {
      elemA.classList.add("wiggle-fail");
      elemB.classList.add("wiggle-fail");
      this.playSound("fail");

      setTimeout(() => {
        elemA.classList.remove("wiggle-fail");
        elemB.classList.remove("wiggle-fail");
      }, 400);

      const currentLeftA = parseFloat(elemA.style.left) || 0;
      const currentTopA = parseFloat(elemA.style.top) || 0;
      elemA.style.left = `${Math.max(10, currentLeftA - 16)}px`;
      elemA.style.top = `${Math.max(10, currentTopA - 16)}px`;
    }
  }

  provideHint() {
    this.clearHintPulses();
    const unlockedList = Array.from(this.unlockedInventory.values());

    let foundHint = null;

    for (let i = 0; i < unlockedList.length; i++) {
      for (let j = i; j < unlockedList.length; j++) {
        const item1 = unlockedList[i];
        const item2 = unlockedList[j];
        const key = this.getCombinationKey(item1.emoji, item2.emoji);
        const result = this.combinationMap.get(key);

        if (result && !this.unlockedInventory.has(result.emoji)) {
          foundHint = { item1, item2, result };
          break;
        }
      }
      if (foundHint) break;
    }

    if (foundHint) {
      this.playSound("hint");

      const invCards = this.inventoryListEl.querySelectorAll(".inventory-item");
      let scrolled = false;
      invCards.forEach(card => {
        if (
          card.dataset.emoji === foundHint.item1.emoji ||
          card.dataset.emoji === foundHint.item2.emoji
        ) {
          card.classList.add("hint-pulse");
          if (!scrolled) {
            card.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
            scrolled = true;
          }
        }
      });

      this.canvasEl.querySelectorAll(".canvas-element").forEach(card => {
        if (
          card.dataset.emoji === foundHint.item1.emoji ||
          card.dataset.emoji === foundHint.item2.emoji
        ) {
          card.classList.add("hint-pulse");
        }
      });

      this.showSimpleToast(
        "💡",
        "Alchemical Hint",
        `Try combining ${foundHint.item1.emoji} ${foundHint.item1.name} with ${foundHint.item2.emoji} ${foundHint.item2.name}!`,
        true
      );

      if (this.hintTimer) clearTimeout(this.hintTimer);
      this.hintTimer = setTimeout(() => this.clearHintPulses(), 5000);
    } else {
      this.playSound("fail");
      this.showSimpleToast("🌟", "Master Alchemist", "You have discovered every possible recipe with your current inventory!");
    }
  }

  clearHintPulses() {
    document.querySelectorAll(".hint-pulse").forEach(el => el.classList.remove("hint-pulse"));
  }

  showDiscoveryToast(result, formula) {
    if (!this.toastContainerEl) return;

    const toast = document.createElement("div");
    toast.className = "toast";

    const shareText = `✨ I discovered ${result.emoji} ${result.name} (${formula}) in Emoji Alchemist! Unlocked: ${this.unlockedInventory.size}/${this.totalPossibleDiscoveries} ⚗️ Play offline!`;

    toast.innerHTML = `
      <span class="toast-emoji">${result.emoji}</span>
      <div class="toast-content">
        <span class="toast-tag">✨ New Discovery!</span>
        <span class="toast-title">${result.name}</span>
        <span class="toast-formula">${formula}</span>
      </div>
      <div class="toast-actions">
        <button class="toast-share-btn" title="Copy discovery to clipboard">
          <span>📋</span>
          <span class="share-label">Copy</span>
        </button>
      </div>
    `;

    const copyBtn = toast.querySelector(".toast-share-btn");
    const shareLabel = toast.querySelector(".share-label");

    copyBtn.addEventListener("click", async (e) => {
      e.stopPropagation();
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(shareText);
        } else {
          const tempInput = document.createElement("textarea");
          tempInput.value = shareText;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand("copy");
          tempInput.remove();
        }
        copyBtn.classList.add("copied");
        shareLabel.textContent = "Copied! ✅";
        this.playSound("pop");
        setTimeout(() => {
          copyBtn.classList.remove("copied");
          shareLabel.textContent = "Copy";
        }, 2200);
      } catch (err) {
        console.warn("Clipboard copy failed:", err);
      }
    });

    this.toastContainerEl.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("removing");
      setTimeout(() => toast.remove(), 350);
    }, 4500);
  }

  showSimpleToast(emoji, title, text, isHint = false, isMilestone = false) {
    if (!this.toastContainerEl) return;

    const toast = document.createElement("div");
    let extraClass = "";
    if (isHint) extraClass = "toast-hint";
    if (isMilestone) extraClass = "toast-milestone";

    toast.className = `toast ${extraClass}`;
    toast.innerHTML = `
      <span class="toast-emoji">${emoji}</span>
      <div class="toast-content">
        <span class="toast-tag">${title}</span>
        <span class="toast-formula" style="color: var(--text-primary); font-size: 0.82rem;">${text}</span>
      </div>
    `;

    this.toastContainerEl.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("removing");
      setTimeout(() => toast.remove(), 350);
    }, 4500);
  }

  createSparkleBurst(x, y) {
    const burst = document.createElement("div");
    burst.className = "sparkle-burst";
    burst.style.left = `${x}px`;
    burst.style.top = `${y}px`;

    const particleCount = 12;
    const colors = ["#f1e05a", "#8957e5", "#388bfd", "#3fb950", "#ffffff"];

    for (let i = 0; i < particleCount; i++) {
      const p = document.createElement("div");
      p.className = "sparkle-particle";
      const angle = (i / particleCount) * Math.PI * 2;
      const distance = 35 + Math.random() * 30;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;

      p.style.setProperty("--dx", `${dx}px`);
      p.style.setProperty("--dy", `${dy}px`);
      p.style.backgroundColor = colors[i % colors.length];
      p.style.boxShadow = `0 0 8px ${colors[i % colors.length]}`;

      burst.appendChild(p);
    }

    this.canvasEl.appendChild(burst);
    setTimeout(() => burst.remove(), 650);
  }

  initAudio() {
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }
  }

  playSound(type) {
    if (!this.audioEnabled) return;
    try {
      this.initAudio();
      if (!this.audioCtx) return;

      const now = this.audioCtx.currentTime;

      if (type === "pop") {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(450, now);
        osc.frequency.exponentialRampToValueAtTime(820, now + 0.07);

        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.07);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.07);
      } else if (type === "combine") {
        [523.25, 659.25, 783.99].forEach((freq, idx) => {
          const osc = this.audioCtx.createOscillator();
          const gain = this.audioCtx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(freq, now + idx * 0.025);

          gain.gain.setValueAtTime(0.12, now + idx * 0.025);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35 + idx * 0.025);

          osc.connect(gain);
          gain.connect(this.audioCtx.destination);
          osc.start(now + idx * 0.025);
          osc.stop(now + 0.38);
        });
      } else if (type === "discovery") {
        [523.25, 659.25, 783.99, 1046.50, 1318.51].forEach((freq, idx) => {
          const osc = this.audioCtx.createOscillator();
          const gain = this.audioCtx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, now + idx * 0.055);

          gain.gain.setValueAtTime(0.18, now + idx * 0.055);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.65 + idx * 0.055);

          osc.connect(gain);
          gain.connect(this.audioCtx.destination);
          osc.start(now + idx * 0.055);
          osc.stop(now + 0.75);
        });
      } else if (type === "hint") {
        [587.33, 880, 1174.66].forEach((freq, idx) => {
          const osc = this.audioCtx.createOscillator();
          const gain = this.audioCtx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, now + idx * 0.08);

          gain.gain.setValueAtTime(0.15, now + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4 + idx * 0.08);

          osc.connect(gain);
          gain.connect(this.audioCtx.destination);
          osc.start(now + idx * 0.08);
          osc.stop(now + 0.5);
        });
      } else if (type === "fail") {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(160, now);
        osc.frequency.exponentialRampToValueAtTime(90, now + 0.14);

        gain.gain.setValueAtTime(0.16, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.14);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.14);
      }
    } catch (e) {
      console.warn("Audio synthesis error:", e);
    }
  }

  updateAudioButtonUI() {
    if (this.audioBtn) {
      this.audioBtn.textContent = this.audioEnabled ? "🔊" : "🔇";
      this.audioBtn.title = this.audioEnabled ? "Sound Effects Enabled" : "Sound Effects Muted";
    }
    if (this.settingsAudioStateTextEl) {
      this.settingsAudioStateTextEl.textContent = this.audioEnabled ? "🔊 Sound Enabled" : "🔇 Sound Muted";
    }
  }

  openSettings(fromPopState = false) {
    this.updateNetworkStatusUI();
    this.updateAudioButtonUI();
    if (this.settingsModalEl) this.settingsModalEl.classList.add("open");
    if (!fromPopState) {
      try {
        history.pushState({ modal: "settings" }, "");
      } catch (e) {
        console.warn("History pushState error:", e);
      }
    }
  }

  closeSettings(fromPopState = false) {
    if (this.settingsModalEl) this.settingsModalEl.classList.remove("open");
    if (!fromPopState && history.state?.modal === "settings") {
      try {
        history.back();
      } catch (e) {
        console.warn("History back error:", e);
      }
    }
  }

  openGrimoire() {
    if (!this.grimoireModalEl || !this.recipeListEl) return;
    this.recipeListEl.innerHTML = "";

    this.combinations.forEach(combo => {
      const result = combo.result;
      const isDiscovered = this.unlockedInventory.has(result.emoji);

      const card = document.createElement("div");
      card.className = `recipe-card ${isDiscovered ? "" : "undiscovered"}`;

      if (isDiscovered) {
        card.innerHTML = `
          <div class="recipe-formula">
            <span>${combo.elements[0]}</span>
            <span class="recipe-arrow">+</span>
            <span>${combo.elements[1]}</span>
            <span class="recipe-arrow">➔</span>
            <span>${result.emoji}</span>
          </div>
          <div class="recipe-result-tag">
            <span>${result.name}</span>
          </div>
        `;
      } else {
        card.innerHTML = `
          <div class="recipe-formula">
            <span>❓</span>
            <span class="recipe-arrow">+</span>
            <span>❓</span>
            <span class="recipe-arrow">➔</span>
            <span>❓</span>
          </div>
          <div class="recipe-result-tag" style="color: var(--text-muted);">
            <span>Undiscovered</span>
          </div>
        `;
      }

      this.recipeListEl.appendChild(card);
    });

    this.grimoireModalEl.classList.add("open");
    if (!fromPopState) {
      try {
        history.pushState({ modal: "grimoire" }, "");
      } catch (e) {
        console.warn("History pushState error:", e);
      }
    }
  }

  closeGrimoire(fromPopState = false) {
    if (this.grimoireModalEl) this.grimoireModalEl.classList.remove("open");
    if (!fromPopState && history.state?.modal === "grimoire") {
      try {
        history.back();
      } catch (e) {
        console.warn("History back error:", e);
      }
    }
  }

  /**
   * Mastery Tiers Modal
   */
  renderMasteryTiers() {
    if (!this.tiersListEl) return;
    this.tiersListEl.innerHTML = "";

    const currentCount = this.unlockedInventory.size;
    const currentTier = this.getCurrentTier(currentCount);

    MASTERY_TIERS.forEach(tier => {
      const isUnlocked = currentCount >= tier.min;
      const isCurrent = currentTier.id === tier.id;

      const card = document.createElement("div");
      card.className = `tier-card ${isUnlocked ? "unlocked" : ""} ${isCurrent ? "current" : ""}`;

      card.innerHTML = `
        <div class="tier-info">
          <span class="tier-icon">${tier.icon}</span>
          <div>
            <div class="tier-title">${tier.title} ${isCurrent ? "⭐ (Current)" : ""}</div>
            <div class="tier-requirement">Requires: ${tier.min} discoveries • ${tier.desc}</div>
          </div>
        </div>
        <span class="tier-status-pill">
          ${isCurrent ? "Active Rank" : (isUnlocked ? "Unlocked ✅" : "Locked 🔒")}
        </span>
      `;

      this.tiersListEl.appendChild(card);
    });
  }

  openMilestones(fromPopState = false) {
    this.renderMasteryTiers();
    if (this.milestonesModalEl) this.milestonesModalEl.classList.add("open");
    if (!fromPopState) {
      try {
        history.pushState({ modal: "milestones" }, "");
      } catch (e) {
        console.warn("History pushState error:", e);
      }
    }
  }

  closeMilestones(fromPopState = false) {
    if (this.milestonesModalEl) this.milestonesModalEl.classList.remove("open");
    if (!fromPopState && history.state?.modal === "milestones") {
      try {
        history.back();
      } catch (e) {
        console.warn("History back error:", e);
      }
    }
  }

  /**
   * Feedback & Bug Reporting System
   */
  openFeedbackModal(fromPopState = false) {
    if (!this.feedbackModalEl) return;
    this.renderFeedbackHistory();
    this.feedbackModalEl.classList.add("open");
    if (!fromPopState) {
      try {
        history.pushState({ modal: "feedback" }, "");
      } catch (e) {
        console.warn("History pushState error:", e);
      }
    }
  }

  closeFeedbackModal(fromPopState = false) {
    if (this.feedbackModalEl) this.feedbackModalEl.classList.remove("open");
    if (!fromPopState && history.state?.modal === "feedback") {
      try {
        history.back();
      } catch (e) {
        console.warn("History back error:", e);
      }
    }
  }

  /**
   * Exit Confirmation Modal
   */
  openExitModal(fromPopState = false) {
    if (this.exitModalEl) {
      this.exitModalEl.classList.add("open");
      this.playSound("pop");
    }
    if (!fromPopState) {
      try {
        history.pushState({ modal: "exit" }, "");
      } catch (e) {
        console.warn("History pushState error:", e);
      }
    }
  }

  closeExitModal(fromPopState = false) {
    if (this.exitModalEl) this.exitModalEl.classList.remove("open");
    if (!fromPopState && history.state?.modal === "exit") {
      try {
        history.back();
      } catch (e) {
        console.warn("History back error:", e);
      }
    }
  }

  handleConfirmExit() {
    this.playSound("pop");
    try {
      window.close();
    } catch (e) {
      console.warn("window.close() restricted:", e);
    }
    setTimeout(() => {
      window.location.href = "about:blank";
    }, 120);
  }

  renderFeedbackHistory() {
    if (!this.feedbackHistoryListEl) return;
    this.feedbackHistoryListEl.innerHTML = "";

    try {
      const history = JSON.parse(localStorage.getItem("emoji_alchemist_feedback_history") || "[]");
      if (history.length === 0) {
        this.feedbackHistoryListEl.innerHTML = `
          <div style="color: var(--text-muted); font-size: 0.75rem; text-align: center; padding: 10px;">
            No past feedback submitted yet.
          </div>
        `;
        return;
      }

      history.slice(0, 5).forEach(entry => {
        const card = document.createElement("div");
        card.className = "history-card";
        card.innerHTML = `
          <div class="history-card-header">
            <span>${entry.type}</span>
            <span>${entry.timestamp}</span>
          </div>
          <div style="color: var(--text-primary); font-size: 0.78rem;">${entry.message}</div>
        `;
        this.feedbackHistoryListEl.appendChild(card);
      });
    } catch (e) {
      console.warn("Feedback history render error:", e);
    }
  }

  async submitFeedback(e) {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    const typeInput = this.feedbackFormEl ? this.feedbackFormEl.querySelector("input[name='feedback_type']:checked") : null;
    const messageInput = document.getElementById("feedback-message");

    const type = typeInput ? typeInput.value : "💡 Idea";
    const text = messageInput ? messageInput.value.trim() : (typeof e === "string" ? e.trim() : "");

    // Check that feedback isn't empty
    if (!text) return;

    // 1. Check if the user is offline
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      const offlineMsg = "You are currently offline! Please connect to the internet to send feedback.";
      this.playSound("fail");
      this.showSimpleToast("⚠️", "Offline Mode", offlineMsg);
      try {
        alert(offlineMsg);
      } catch (err) {
        // Fallback for iframe restrictions
      }
      return;
    }

    const progressString = `${this.unlockedInventory.size}/${this.totalPossibleDiscoveries}`;
    const timestampStr = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const payload = {
      feedback: text,
      text: text,
      message: text,
      category: type,
      progress: progressString,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent || "Unknown"
    };

    const targetUrl = typeof FEEDBACK_WEB_APP_URL !== "undefined" ? FEEDBACK_WEB_APP_URL : "";

    // 2. Send the feedback if online
    if (targetUrl && targetUrl !== "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE") {
      try {
        await fetch(targetUrl, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        })
        .then(() => {
          this.handleFeedbackSuccess(text, type, progressString, timestampStr, messageInput);
        })
        .catch(err => {
          console.error("Error sending feedback:", err);
          const errorMsg = "Oops! Something went wrong. Please check your connection and try again.";
          this.showSimpleToast("❌", "Delivery Error", errorMsg);
          try {
            alert(errorMsg);
          } catch (e) {}
        });
      } catch (networkErr) {
        console.error("Error sending feedback:", networkErr);
        const errorMsg = "Oops! Something went wrong. Please check your connection and try again.";
        this.showSimpleToast("❌", "Delivery Error", errorMsg);
        try {
          alert(errorMsg);
        } catch (e) {}
      }
    } else {
      console.info("[Feedback] Mock dispatch - replace FEEDBACK_WEB_APP_URL with your live Google Apps Script deployment URL.", payload);
      this.handleFeedbackSuccess(text, type, progressString, timestampStr, messageInput);
    }
  }

  handleFeedbackSuccess(text, type, progressString, timestampStr, messageInput) {
    // Save locally to display under Recent Submissions
    const localEntry = {
      id: Date.now(),
      type,
      message: text,
      progress: progressString,
      timestamp: timestampStr
    };

    try {
      const history = JSON.parse(localStorage.getItem("emoji_alchemist_feedback_history") || "[]");
      history.unshift(localEntry);
      localStorage.setItem("emoji_alchemist_feedback_history", JSON.stringify(history.slice(0, 20)));
    } catch (err) {
      console.warn("[Feedback] Error saving local entry:", err);
    }

    // Clear input box and reset form
    if (messageInput) messageInput.value = "";
    if (this.feedbackFormEl) this.feedbackFormEl.reset();

    // Close modal and play sound
    this.closeFeedbackModal();
    this.playSound("pop");

    // Display friendly confirmation message
    this.showSimpleToast("🚀", "Thanks for your feedback! 🚀", "Your comment has been submitted anonymously.");
    try {
      alert("Thanks for your feedback! 🚀");
    } catch (e) {}
  }

  tidyCanvas() {
    const elements = Array.from(this.canvasEl.querySelectorAll(".canvas-element"));
    if (elements.length === 0) return;

    const canvasRect = this.canvasEl.getBoundingClientRect();
    const itemSize = window.innerWidth <= 768 ? 68 : 76;
    const gap = 12;
    const cols = Math.max(1, Math.floor((canvasRect.width - 24) / (itemSize + gap)));
    const padding = 16;

    elements.forEach((elem, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      const targetX = padding + col * (itemSize + gap);
      const targetY = padding + row * (itemSize + gap);

      elem.style.transition = "left 0.3s ease, top 0.3s ease";
      elem.style.left = `${targetX}px`;
      elem.style.top = `${targetY}px`;

      setTimeout(() => {
        elem.style.transition = "";
      }, 350);
    });

    this.playSound("pop");
  }

  clearCanvas() {
    const elements = this.canvasEl.querySelectorAll(".canvas-element");
    elements.forEach(el => el.remove());
  }

  resetGame() {
    if (confirm("Reset all unlocked emojis and start fresh with the 4 base elements?")) {
      localStorage.removeItem("emoji_alchemist_unlocked");
      localStorage.removeItem("emoji_alchemist_recipes");
      this.unlockedInventory.clear();
      this.discoveredRecipes.clear();
      this.clearCanvas();
      this.loadSavedProgress();
      this.renderInventory();
      this.updateStats();
      this.playSound("fail");
    }
  }

  setupEventListeners() {
    // 1. Mobile Back-Button Integration (History API popstate handler)
    window.addEventListener("popstate", (e) => {
      // If inventory drawer is open, close it cleanly without leaving the page
      if (this.isDrawerExpanded) {
        this.closeMobileDrawer(true);
        return;
      }

      // If any modal is open, close it cleanly
      if (this.exitModalEl?.classList.contains("open")) {
        this.closeExitModal(true);
        return;
      }
      if (this.settingsModalEl?.classList.contains("open")) {
        this.closeSettings(true);
        return;
      }
      if (this.grimoireModalEl?.classList.contains("open")) {
        this.closeGrimoire(true);
        return;
      }
      if (this.milestonesModalEl?.classList.contains("open")) {
        this.closeMilestones(true);
        return;
      }
      if (this.feedbackModalEl?.classList.contains("open")) {
        this.closeFeedbackModal(true);
        return;
      }

      // If no modals or drawers are open, trigger the Exit Confirmation Modal
      this.openExitModal(false);
    });

    // 2. Mobile Drawer Toggle Handle & Tap Outside to Close
    if (this.drawerHandleBarEl) {
      this.drawerHandleBarEl.addEventListener("click", () => this.toggleMobileDrawer());
      this.drawerHandleBarEl.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.toggleMobileDrawer();
        }
      });
    }

    // Tap outside to close: Dark overlay backdrop
    if (this.drawerBackdropEl) {
      this.drawerBackdropEl.addEventListener("click", () => this.closeMobileDrawer());
      this.drawerBackdropEl.addEventListener("pointerdown", () => this.closeMobileDrawer());
    }

    // Tap outside to close: Auto-close mobile drawer when tapping on workspace/canvas
    if (this.canvasContainerEl) {
      this.canvasContainerEl.addEventListener("pointerdown", (e) => {
        if (this.isDrawerExpanded && window.innerWidth <= 768) {
          // If not interacting with the drawer itself
          const sidebar = document.getElementById("sidebar");
          if (!sidebar || !sidebar.contains(e.target)) {
            this.closeMobileDrawer();
          }
        }
      });
    }

    if (this.canvasEl) {
      this.canvasEl.addEventListener("pointerdown", (e) => {
        if (this.isDrawerExpanded && window.innerWidth <= 768) {
          this.closeMobileDrawer();
        }
      });
    }

    // Global tap outside drawer fallback
    document.addEventListener("pointerdown", (e) => {
      if (this.isDrawerExpanded && window.innerWidth <= 768) {
        const sidebar = document.getElementById("sidebar");
        const backdrop = document.getElementById("drawer-backdrop");
        if (sidebar && !sidebar.contains(e.target) && backdrop && !backdrop.contains(e.target)) {
          this.closeMobileDrawer();
        }
      }
    });

    // Search input
    if (this.searchInputEl) {
      this.searchInputEl.addEventListener("input", () => this.renderInventory());
    }

    if (this.clearSearchBtn) {
      this.clearSearchBtn.addEventListener("click", () => {
        this.searchInputEl.value = "";
        this.renderInventory();
        this.searchInputEl.focus();
      });
    }

    // Hint buttons
    const hintBtn = document.getElementById("btn-hint");
    if (hintBtn) hintBtn.addEventListener("click", () => this.provideHint());

    const hintMobileBtn = document.getElementById("btn-hint-canvas");
    if (hintMobileBtn) hintMobileBtn.addEventListener("click", () => this.provideHint());

    // Canvas Toolbar Buttons
    const clearBtn = document.getElementById("btn-clear-canvas");
    if (clearBtn) clearBtn.addEventListener("click", () => this.clearCanvas());

    const tidyBtn = document.getElementById("btn-tidy-canvas");
    if (tidyBtn) tidyBtn.addEventListener("click", () => this.tidyCanvas());

    // Grimoire Modal
    const grimoireBtn = document.getElementById("btn-open-grimoire");
    if (grimoireBtn) grimoireBtn.addEventListener("click", () => this.openGrimoire());

    const closeGrimoireBtn = document.getElementById("btn-close-grimoire");
    if (closeGrimoireBtn) closeGrimoireBtn.addEventListener("click", () => this.closeGrimoire());

    if (this.grimoireModalEl) {
      this.grimoireModalEl.addEventListener("click", (e) => {
        if (e.target === this.grimoireModalEl) this.closeGrimoire();
      });
    }

    // Milestones Modal
    const milestonesBtn = document.getElementById("btn-milestones");
    if (milestonesBtn) milestonesBtn.addEventListener("click", () => this.openMilestones());

    const closeMilestonesBtn = document.getElementById("btn-close-milestones");
    if (closeMilestonesBtn) closeMilestonesBtn.addEventListener("click", () => this.closeMilestones());

    if (this.milestonesModalEl) {
      this.milestonesModalEl.addEventListener("click", (e) => {
        if (e.target === this.milestonesModalEl) this.closeMilestones();
      });
    }

    // Feedback Modal
    const feedbackBtn = document.getElementById("btn-open-feedback");
    if (feedbackBtn) feedbackBtn.addEventListener("click", () => this.openFeedbackModal());

    const closeFeedbackBtn = document.getElementById("btn-close-feedback");
    if (closeFeedbackBtn) closeFeedbackBtn.addEventListener("click", () => this.closeFeedbackModal());

    const cancelFeedbackBtn = document.getElementById("btn-cancel-feedback");
    if (cancelFeedbackBtn) cancelFeedbackBtn.addEventListener("click", () => this.closeFeedbackModal());

    if (this.feedbackModalEl) {
      this.feedbackModalEl.addEventListener("click", (e) => {
        if (e.target === this.feedbackModalEl) this.closeFeedbackModal();
      });
    }

    if (this.feedbackFormEl) {
      this.feedbackFormEl.addEventListener("submit", (e) => this.submitFeedback(e));
    }

    // Exit Confirmation Modal Event Listeners
    if (this.btnKeepPlaying) {
      this.btnKeepPlaying.addEventListener("click", () => this.closeExitModal());
    }

    if (this.btnCloseExitModal) {
      this.btnCloseExitModal.addEventListener("click", () => this.closeExitModal());
    }

    if (this.btnConfirmExit) {
      this.btnConfirmExit.addEventListener("click", () => this.handleConfirmExit());
    }

    if (this.exitModalEl) {
      this.exitModalEl.addEventListener("click", (e) => {
        if (e.target === this.exitModalEl) this.closeExitModal();
      });
    }

    // In-App Floating PWA Update Toast Banner Event Listeners
    if (this.btnUpdateNow) {
      this.btnUpdateNow.addEventListener("click", () => this.applyAppUpdate());
    }

    if (this.btnDismissUpdate) {
      this.btnDismissUpdate.addEventListener("click", () => this.hideUpdateBanner());
    }

    // Alchemy Settings & Updates Modal
    if (this.btnOpenSettings) {
      this.btnOpenSettings.addEventListener("click", () => this.openSettings());
    }

    if (this.btnCloseSettings) {
      this.btnCloseSettings.addEventListener("click", () => this.closeSettings());
    }

    if (this.settingsModalEl) {
      this.settingsModalEl.addEventListener("click", (e) => {
        if (e.target === this.settingsModalEl) this.closeSettings();
      });
    }

    if (this.btnCheckUpdatesSettings) {
      this.btnCheckUpdatesSettings.addEventListener("click", () => this.checkForManualUpdates());
    }

    if (this.btnSettingsAudioToggle) {
      this.btnSettingsAudioToggle.addEventListener("click", () => {
        this.audioEnabled = !this.audioEnabled;
        localStorage.setItem("emoji_alchemist_audio", this.audioEnabled ? "true" : "false");
        this.updateAudioButtonUI();
        if (this.audioEnabled) {
          this.playSound("pop");
        }
      });
    }

    if (this.btnSettingsReset) {
      this.btnSettingsReset.addEventListener("click", () => {
        this.closeSettings();
        this.resetGame();
      });
    }

    // Reset Progress
    const resetBtn = document.getElementById("btn-reset-game");
    if (resetBtn) resetBtn.addEventListener("click", () => this.resetGame());

    // Audio Mute Toggle
    if (this.audioBtn) {
      this.audioBtn.addEventListener("click", () => {
        this.audioEnabled = !this.audioEnabled;
        localStorage.setItem("emoji_alchemist_audio", this.audioEnabled ? "true" : "false");
        this.updateAudioButtonUI();
        if (this.audioEnabled) {
          this.playSound("pop");
        }
      });
    }

    // Engagement Banner Dismiss
    if (this.btnDismissBanner) {
      this.btnDismissBanner.addEventListener("click", () => {
        if (this.engagementBannerEl) this.engagementBannerEl.classList.add("hidden");
        localStorage.setItem("emoji_alchemist_banner_dismissed", "true");
      });
    }

    // PWA Install Button Handler
    if (this.btnInstallPWA) {
      this.btnInstallPWA.addEventListener("click", async () => {
        if (this.deferredInstallPrompt) {
          this.deferredInstallPrompt.prompt();
          const { outcome } = await this.deferredInstallPrompt.userChoice;
          if (outcome === "accepted") {
            console.log("[PWA] User accepted install prompt");
          }
          this.deferredInstallPrompt = null;
        } else {
          this.showSimpleToast(
            "📲",
            "Install / Add to Home Screen",
            "On iOS: Tap Share -> 'Add to Home Screen'. On Android/Chrome: Tap browser menu -> 'Install App'."
          );
        }
      });
    }

    // Initial base elements spawn on canvas
    setTimeout(() => {
      if (this.canvasEl.children.length === 0) {
        const canvasRect = this.canvasEl.getBoundingClientRect();
        const startY = Math.max(30, canvasRect.height / 2 - 40);
        const itemSize = window.innerWidth <= 768 ? 68 : 76;
        const spacing = itemSize + 16;
        const totalW = this.baseElements.length * spacing;
        const startX = Math.max(20, (canvasRect.width - totalW) / 2);

        this.baseElements.forEach((base, idx) => {
          this.spawnElementOnCanvas(base.emoji, base.name, startX + idx * spacing, startY, true);
        });
      }
    }, 150);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  window.emojiGame = new EmojiAlchemistGame();
});
