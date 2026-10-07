(() => {
  'use strict';

  const BUILT_INS = [
    { id: 'clock', label: 'Clock & greeting' },
    { id: 'search', label: 'Search bar' },
    { id: 'shortcuts', label: 'Quick links' },
    { id: 'focus', label: 'Focus card' },
    { id: 'tasks', label: 'To-do list' },
    { id: 'pomodoro', label: 'Pomodoro timer' },
    { id: 'weather', label: 'Weather' },
    { id: 'quick-notes', label: 'Quick notes' },
    { id: 'rss', label: 'RSS feed' },
    { id: 'stocks', label: 'Stock tracker' },
    { id: 'bookmarks', label: 'Bookmark manager' },
    { id: 'crypto', label: 'Crypto ticker' }
  ];
  const FONT_IDS = ['system', 'clean-sans', 'humanist', 'rounded', 'serif', 'classic-serif', 'book-serif', 'mono', 'typewriter'];
  const LAYOUT_IDS = ['balanced', 'wide', 'focused', 'bento', 'sidebar', 'masonry'];
  const CRYPTO_COINS = {
    BTC: { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin' }, ETH: { id: 'ethereum', symbol: 'ETH', name: 'Ethereum' },
    SOL: { id: 'solana', symbol: 'SOL', name: 'Solana' }, XRP: { id: 'ripple', symbol: 'XRP', name: 'XRP' },
    DOGE: { id: 'dogecoin', symbol: 'DOGE', name: 'Dogecoin' }, ADA: { id: 'cardano', symbol: 'ADA', name: 'Cardano' },
    BNB: { id: 'binancecoin', symbol: 'BNB', name: 'BNB' }, USDC: { id: 'usd-coin', symbol: 'USDC', name: 'USD Coin' },
    LTC: { id: 'litecoin', symbol: 'LTC', name: 'Litecoin' }, DOT: { id: 'polkadot', symbol: 'DOT', name: 'Polkadot' }
  };
  const STARTER_PROFILES = {
    minimal: { name: 'Minimal', description: 'Clock, search, and quick links. Calm and uncluttered.', theme: 'dusk', layout: 'focused', widgets: ['clock', 'search', 'shortcuts'] },
    focus: { name: 'Focus', description: 'A gentle focus card, task list, and Pomodoro timer.', theme: 'slate', layout: 'balanced', widgets: ['clock', 'search', 'focus', 'tasks', 'pomodoro'] },
    'work-study': { name: 'Work & Study', description: 'A practical workspace with tasks, notes, bookmarks, and a timer.', theme: 'nord', layout: 'bento', widgets: ['clock', 'search', 'shortcuts', 'tasks', 'pomodoro', 'quick-notes', 'bookmarks'] }
  };
  const PRIVACY_SERVICE_INFO = {
    search: { title: 'Search', provider: 'the search provider you selected', detail: 'Your submitted query goes directly to the selected search site using normal browser navigation.' },
    weather: { title: 'Weather', provider: 'Open-Meteo', detail: 'The city you enter and your request IP are sent to Open-Meteo only when you refresh.' },
    rss: { title: 'RSS & article reader', provider: 'the HTTPS feed/article site you choose', detail: 'The feed or article URL and your request IP go to that site only when you add, refresh, or read it.' },
    stocks: { title: 'Stock quotes', provider: 'Alpha Vantage', detail: 'Your selected ticker, personal API key, and request IP go to Alpha Vantage when you refresh.' },
    crypto: { title: 'Crypto prices', provider: 'CoinGecko', detail: 'The selected CoinGecko coin ID and your request IP go to CoinGecko only when you refresh.' }
  };
  const SEARCH_ENGINES = [
    { id: 'duckduckgo', name: 'DuckDuckGo', keyword: 'ddg', template: 'https://duckduckgo.com/?q={query}' },
    { id: 'google', name: 'Google', keyword: 'g', template: 'https://www.google.com/search?q={query}' },
    { id: 'bing', name: 'Bing', keyword: 'b', template: 'https://www.bing.com/search?q={query}' },
    { id: 'brave', name: 'Brave Search', keyword: 'br', template: 'https://search.brave.com/search?q={query}' },
    { id: 'startpage', name: 'Startpage', keyword: 'sp', template: 'https://www.startpage.com/sp/search?query={query}' },
    { id: 'ecosia', name: 'Ecosia', keyword: 'eco', template: 'https://www.ecosia.org/search?q={query}' },
    { id: 'yahoo', name: 'Yahoo', keyword: 'y', template: 'https://search.yahoo.com/search?p={query}' },
    { id: 'wikipedia', name: 'Wikipedia', keyword: 'wiki', template: 'https://en.wikipedia.org/w/index.php?search={query}' },
    { id: 'youtube', name: 'YouTube', keyword: 'yt', template: 'https://www.youtube.com/results?search_query={query}' },
    { id: 'github', name: 'GitHub', keyword: 'gh', template: 'https://github.com/search?q={query}' },
    { id: 'stackoverflow', name: 'Stack Overflow', keyword: 'so', template: 'https://stackoverflow.com/search?q={query}' }
  ];
  const MAX_BACKGROUND_DATA_URL_LENGTH = 1_600_000;
  const THEME_PRESETS = {
    dusk: { name: 'Dusk', subtitle: 'violet glass', accent: '#a79bff', background: '#11121a', surface: 'glass', corners: 'soft', font: 'system', density: 'comfortable', layout: 'balanced', gradient: { enabled: false, kind: 'linear', angle: 135, colors: ['#11121a', '#29243b', '#131521'] } },
    paper: { name: 'Paper', subtitle: 'editorial', accent: '#a4563f', background: '#f1eee8', surface: 'solid', corners: 'soft', font: 'classic-serif', density: 'comfortable', layout: 'focused', gradient: { enabled: false, kind: 'linear', angle: 135, colors: ['#f1eee8', '#e7e3dc', '#f8f5ef'] } },
    moss: { name: 'Moss', subtitle: 'quiet green', accent: '#a6c596', background: '#101713', surface: 'glass', corners: 'soft', font: 'rounded', density: 'comfortable', layout: 'bento', gradient: { enabled: true, kind: 'radial', angle: 135, colors: ['#101713', '#17251b', '#101713'] } },
    midnight: { name: 'Midnight', subtitle: 'blue after dark', accent: '#80b4ff', background: '#0b1220', surface: 'gradient', corners: 'square', font: 'mono', density: 'compact', layout: 'wide', gradient: { enabled: true, kind: 'linear', angle: 155, colors: ['#0b1220', '#15233a', '#090f1a'] } },
    ocean: { name: 'Ocean', subtitle: 'deep water', accent: '#65d2dd', background: '#081923', surface: 'glass', corners: 'pill', font: 'clean-sans', density: 'comfortable', layout: 'bento', gradient: { enabled: true, kind: 'radial', angle: 135, colors: ['#081923', '#103348', '#07121b'] } },
    sakura: { name: 'Sakura', subtitle: 'soft blossom', accent: '#ba5e83', background: '#f5e8ee', surface: 'solid', corners: 'pill', font: 'rounded', density: 'comfortable', layout: 'focused', gradient: { enabled: true, kind: 'radial', angle: 135, colors: ['#f5e8ee', '#efdce5', '#f8f1f4'] } },
    ember: { name: 'Ember', subtitle: 'warm charcoal', accent: '#ff9a64', background: '#1c100e', surface: 'gradient', corners: 'soft', font: 'humanist', density: 'comfortable', layout: 'wide', gradient: { enabled: true, kind: 'linear', angle: 125, colors: ['#1c100e', '#332019', '#160e0d'] } },
    nord: { name: 'Nord', subtitle: 'cool minimal', accent: '#88c0d0', background: '#2e3440', surface: 'solid', corners: 'square', font: 'clean-sans', density: 'compact', layout: 'balanced', gradient: { enabled: false, kind: 'linear', angle: 135, colors: ['#2e3440', '#3b4252', '#272d38'] } },
    terminal: { name: 'Terminal', subtitle: 'green phosphor', accent: '#69e07f', background: '#07120b', surface: 'solid', corners: 'square', font: 'typewriter', density: 'compact', layout: 'wide', gradient: { enabled: false, kind: 'linear', angle: 135, colors: ['#07120b', '#102016', '#050d08'] } },
    lavender: { name: 'Lavender', subtitle: 'soft amethyst', accent: '#c3a2ff', background: '#1c1425', surface: 'glass', corners: 'pill', font: 'serif', density: 'comfortable', layout: 'bento', gradient: { enabled: true, kind: 'radial', angle: 135, colors: ['#1c1425', '#30203f', '#17121f'] } },
    sunroom: { name: 'Sunroom', subtitle: 'warm daylight', accent: '#bd762a', background: '#f4eddc', surface: 'solid', corners: 'soft', font: 'book-serif', density: 'comfortable', layout: 'focused', gradient: { enabled: true, kind: 'linear', angle: 115, colors: ['#f4eddc', '#efe0bf', '#faf5e9'] } },
    slate: { name: 'Slate', subtitle: 'quiet blue-grey', accent: '#aab8d4', background: '#18212e', surface: 'glass', corners: 'square', font: 'clean-sans', density: 'compact', layout: 'wide', gradient: { enabled: false, kind: 'linear', angle: 135, colors: ['#18212e', '#252f40', '#131b26'] } }
  };
  const THEME_NAMES = Object.fromEntries(Object.entries(THEME_PRESETS).map(([id, preset]) => [id, preset.name]).concat([['custom', 'Custom']]));
  const MOTIVATIONAL_QUOTES = [
    'Small steps still move you forward.', 'You do not have to do it all today.', 'Begin where you are; build from there.', 'Progress can be quiet and still be real.',
    'Give your attention to the next kind step.', 'You are allowed to learn as you go.', 'A slower pace is still a pace.', 'Make room for what matters most.',
    'You have made it through hard days before.', 'Let done be better than perfect.', 'Your effort counts, even when nobody sees it.', 'Start small. Stay curious.',
    'Rest is part of the work.', 'There is more than one good way forward.', 'Keep going gently.', 'One clear choice can change the whole day.',
    'You can begin again without starting over.', 'Notice how far you have already come.', 'Focus on what is yours to do.', 'You deserve the patience you give others.',
    'A little progress is still progress.', 'You can do hard things one piece at a time.', 'Today is a chance, not a test.', 'Your best can look different from day to day.',
    'Make the next step kind and possible.', 'You are building something by showing up.', 'Take a breath. Then take the next step.', 'Good things grow at their own pace.',
    'Keep your goals close and your self-talk kind.', 'You do not need permission to take up space.', 'A fresh start can be very small.', 'Trust yourself to figure out the next part.'
  ];
  const SHORTCUT_PROFILES = [
    { domains: ['youtube.com', 'youtu.be'], name: 'YouTube', key: 'youtube', mark: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="white" d="M9.4 7.2v9.6l8-4.8z"/></svg>' },
    { domains: ['google.com'], name: 'Google', key: 'google', mark: 'G' },
    { domains: ['github.com'], name: 'GitHub', key: 'github', mark: 'GH' },
    { domains: ['reddit.com'], name: 'Reddit', key: 'reddit', mark: 'r' },
    { domains: ['twitch.tv'], name: 'Twitch', key: 'twitch', mark: 'T' },
    { domains: ['discord.com', 'discord.gg'], name: 'Discord', key: 'discord', mark: 'D' },
    { domains: ['spotify.com'], name: 'Spotify', key: 'spotify', mark: '♫' },
    { domains: ['instagram.com'], name: 'Instagram', key: 'instagram', mark: '◎' },
    { domains: ['gmail.com'], name: 'Gmail', key: 'gmail', mark: 'M' },
    { domains: ['wikipedia.org'], name: 'Wikipedia', key: 'wikipedia', mark: 'W' },
    { domains: ['netflix.com'], name: 'Netflix', key: 'netflix', mark: 'N' }
  ];
  const DEFAULTS = {
    theme: 'dusk', surface: 'glass', corners: 'soft', font: 'system', density: 'comfortable', layout: 'balanced', quoteOffset: 0,
    accent: '#a79bff', background: '#11121a', searchProvider: 'duckduckgo', displayName: '',
    enabled: { clock: true, search: true, shortcuts: true, focus: false, tasks: false, pomodoro: false, weather: false, 'quick-notes': false, rss: false, stocks: false, bookmarks: false, crypto: false },
    order: ['clock', 'search', 'shortcuts', 'focus', 'tasks', 'pomodoro', 'weather', 'quick-notes', 'rss', 'stocks', 'bookmarks', 'crypto'],
    profile: 'minimal', onboardingDone: false,
    settingsCollapsed: { 'look-and-feel': false, 'starter-profiles': false, 'keep-what-you-need': false, 'pomodoro-lengths': true, search: true, 'quick-backups': true, 'stock-quote-provider': true, 'crypto-price-provider': true, 'encrypted-cross-device-sync': true, 'privacy-center': true, 'backups-and-defaults': true },
    externalConsents: { search: false, weather: false, rss: false, stocks: false, crypto: false },
    focusText: 'One thing at a time is enough.',
    shortcuts: [], bookmarks: [], cryptoAssets: [],
    customWidgets: [], savedThemes: [], tasks: [], quickNotes: '', customSearchEngines: [],
    backgroundImage: '', backgroundOverlay: 32,
    pomodoro: { mode: 'focus', running: false, endsAt: null, remaining: 1500, focusMinutes: 25, shortBreakMinutes: 5, longBreakMinutes: 15, sessions: 0, lastCompletedEndsAt: null },
    weatherLocation: { name: '', latitude: null, longitude: null }, weatherCache: null,
    rssUrl: '', rssTitle: '', rssItems: [], stocks: [], syncEnabled: false, customCss: '', customCssEnabled: false,
    gradient: { enabled: false, kind: 'linear', angle: 135, colors: ['#11121a', '#29243b', '#131521'] }
  };
  const IS_FIREFOX = /Firefox\//.test(navigator.userAgent);
  const $ = (selector, parent = document) => parent.querySelector(selector);
  const clone = (value) => JSON.parse(JSON.stringify(value));
  let state = clone(DEFAULTS);
  let toastTimer;
  let dialogAction = null;
  let weatherStatus = '';
  let rssStatus = '';
  let stockStatus = '';
  let cryptoStatus = '';
  let bookmarkFilter = '';
  let pendingConsentService = '';
  let articleStatus = '';
  let syncStatus = 'Off — data stays on this device.';
  let stockApiKey = '';
  let syncSaveTimer;
  let syncPullTimer;
  let syncWriteInProgress = false;
  let lastSyncFingerprint = '';
  let draggedCard = null;
  let noteSaveTimer;
  const SYNC_PREFIX = 'stilltab.sync.';
  const SYNC_META_KEY = `${SYNC_PREFIX}meta`;
  const SYNC_CHUNK_BYTES = 4000;
  const SYNC_MAX_BYTES = 60_000;

  async function readSaved() {
    try {
      if (globalThis.browser?.storage?.local) {
        const result = await browser.storage.local.get('stilltab');
        return result.stilltab;
      }
      const raw = localStorage.getItem('stilltab');
      return raw ? JSON.parse(raw) : null;
    } catch (error) { console.warn('Stilltab could not read local settings.', error); return null; }
  }
  async function save(options = {}) {
    try {
      if (globalThis.browser?.storage?.local) await browser.storage.local.set({ stilltab: state });
      else localStorage.setItem('stilltab', JSON.stringify(state));
      if (!options.skipSync) scheduleSyncUpload();
    } catch (error) { console.warn('Stilltab could not save local settings.', error); toast('Could not save settings.'); }
  }
  function syncableSnapshot() {
    const snapshot = clone(state);
    snapshot.backgroundImage = '';
    snapshot.backgroundOverlay = DEFAULTS.backgroundOverlay;
    snapshot.weatherLocation = clone(DEFAULTS.weatherLocation);
    snapshot.weatherCache = null;
    snapshot.rssUrl = ''; snapshot.rssTitle = ''; snapshot.rssItems = [];
    snapshot.stocks = [];
    snapshot.bookmarks = [];
    snapshot.cryptoAssets = [];
    snapshot.externalConsents = clone(DEFAULTS.externalConsents);
    snapshot.pomodoro = clone(DEFAULTS.pomodoro);
    snapshot.syncEnabled = true;
    return snapshot;
  }
  function syncStatusText(message) {
    syncStatus = message;
    const label = $('#sync-status');
    if (label) label.textContent = message;
  }
  function scheduleSyncUpload() {
    if (!state.syncEnabled || !globalThis.browser?.storage?.sync) return;
    clearTimeout(syncSaveTimer);
    syncSaveTimer = setTimeout(() => writeSyncSnapshot(), 1400);
  }
  function bytesToBase64(bytes) {
    let binary = '';
    for (const byte of bytes) binary += String.fromCharCode(byte);
    return btoa(binary);
  }
  async function readSyncSnapshot() {
    const area = globalThis.browser?.storage?.sync;
    if (!area) return null;
    const all = await area.get(null);
    const meta = all[SYNC_META_KEY];
    if (!meta || meta.version !== 1 || !Number.isInteger(meta.chunks) || meta.chunks < 1 || meta.chunks > 16) return null;
    const keys = Array.from({ length: meta.chunks }, (_, index) => `${SYNC_PREFIX}chunk.${index}`);
    const values = await area.get(keys);
    const parts = [];
    for (const key of keys) {
      const chunk = values[key];
      if (typeof chunk !== 'string' || chunk.length > 5400 || !/^[A-Za-z0-9+/]*={0,2}$/.test(chunk)) return null;
      const binary = atob(chunk);
      parts.push(Uint8Array.from(binary, char => char.charCodeAt(0)));
    }
    const size = parts.reduce((total, part) => total + part.length, 0);
    if (size > SYNC_MAX_BYTES) return null;
    const merged = new Uint8Array(size); let offset = 0;
    for (const part of parts) { merged.set(part, offset); offset += part.length; }
    const text = new TextDecoder('utf-8', { fatal: true }).decode(merged);
    const parsed = JSON.parse(text);
    return parsed && typeof parsed === 'object' ? parsed : null;
  }
  async function writeSyncSnapshot() {
    if (!state.syncEnabled || !globalThis.browser?.storage?.sync) return;
    try {
      if (browser.permissions?.contains && !await browser.permissions.contains({ data_collection: ['personalCommunications', 'personallyIdentifyingInfo'] })) {
        syncStatusText('Sync sharing permission was revoked. Re-enable Sync in Customize to resume.');
        return;
      }
      const json = JSON.stringify(syncableSnapshot());
      const bytes = new TextEncoder().encode(json);
      if (bytes.length > SYNC_MAX_BYTES) {
        syncStatusText('Sync paused: shared settings exceed Firefox’s 100 KB storage limit.');
        return;
      }
      if (json === lastSyncFingerprint) return;
      const chunks = [];
      for (let offset = 0; offset < bytes.length; offset += SYNC_CHUNK_BYTES) chunks.push(bytes.subarray(offset, offset + SYNC_CHUNK_BYTES));
      syncWriteInProgress = true;
      const old = await browser.storage.sync.get(null);
      const payload = { [SYNC_META_KEY]: { version: 1, chunks: chunks.length, updatedAt: new Date().toISOString() } };
      chunks.forEach((chunk, index) => { payload[`${SYNC_PREFIX}chunk.${index}`] = bytesToBase64(chunk); });
      await browser.storage.sync.set(payload);
      const oldKeys = Object.keys(old).filter(key => key.startsWith(SYNC_PREFIX) && !Object.hasOwn(payload, key));
      if (oldKeys.length) await browser.storage.sync.remove(oldKeys);
      lastSyncFingerprint = json;
      syncStatusText('Saved to Firefox Sync storage. Make sure Add-ons is enabled in Firefox Sync settings.');
    } catch (error) {
      console.warn('Stilltab could not update Firefox Sync storage.', error);
      syncStatusText('Sync could not save. Check Firefox Sync and the 100 KB limit.');
    } finally { syncWriteInProgress = false; }
  }
  function mergeSyncSnapshot(remote, local) {
    const preserved = {
      backgroundImage: local.backgroundImage, backgroundOverlay: local.backgroundOverlay,
      weatherLocation: local.weatherLocation, weatherCache: local.weatherCache,
      rssUrl: local.rssUrl, rssTitle: local.rssTitle, rssItems: local.rssItems,
      stocks: local.stocks, bookmarks: local.bookmarks, cryptoAssets: local.cryptoAssets, externalConsents: local.externalConsents, pomodoro: local.pomodoro, syncEnabled: true
    };
    return normalize({ ...remote, ...preserved });
  }
  function closeDialogSmoothly(dialog, returnValue = '') {
    if (!dialog?.open || dialog.classList.contains('is-closing')) return;
    dialog.classList.add('is-closing');
    const finish = () => { dialog.classList.remove('is-closing'); if (dialog.open) dialog.close(returnValue); };
    const timer = setTimeout(finish, 300);
    dialog.addEventListener('transitionend', event => {
      if (event.target === dialog && event.propertyName === 'transform') { clearTimeout(timer); finish(); }
    }, { once: true });
  }
  function requestDataAndOriginPermission(categories, origins = [], service = '') {
    const permissions = globalThis.browser?.permissions;
    if (!permissions?.request) return Promise.resolve(false);
    const requestOrigins = () => origins.length ? permissions.request({ origins }) : Promise.resolve(true);
    if (IS_FIREFOX) {
      try { return Promise.resolve(permissions.request({ ...(origins.length ? { origins } : {}), data_collection: categories })); }
      catch (error) { return Promise.reject(error); }
    }
    if (!service || state.externalConsents?.[service]) {
      try { return Promise.resolve(requestOrigins()); } catch (error) { return Promise.reject(error); }
    }
    const details = PRIVACY_SERVICE_INFO[service];
    if (!details) return Promise.resolve(false);
    const dialog = $('#provider-consent-dialog');
    $('#provider-consent-title').textContent = `Allow ${details.title.toLowerCase()}?`;
    $('#provider-consent-provider').textContent = `Provider: ${details.provider}`;
    $('#provider-consent-detail').textContent = `${details.detail} Stilltab does not send this through a Stilltab server, use cookies for the request, or refresh in the background.`;
    pendingConsentService = service;
    return new Promise(resolve => {
      dialog.addEventListener('close', () => {
        resolve(dialog.returnValue === 'approved');
        pendingConsentService = '';
      }, { once: true });
      $('#provider-consent-allow').onclick = async () => {
        try {
          const permissionPromise = requestOrigins();
          const granted = await permissionPromise;
          if (granted) { state.externalConsents[service] = true; await save(); }
          closeDialogSmoothly(dialog, granted ? 'approved' : 'denied');
        } catch (error) {
          console.warn('Stilltab could not request this provider permission.', error);
          closeDialogSmoothly(dialog, 'denied');
        }
      };
      $('#provider-consent-cancel').onclick = () => closeDialogSmoothly(dialog, 'denied');
      dialog.showModal();
    });
  }
  async function setSyncEnabled(enabled) {
    if (!enabled) {
      clearTimeout(syncSaveTimer); state.syncEnabled = false;
      syncStatusText('Paused on this device. Any existing Firefox Sync copy remains in your account.');
      render(); await save(); return;
    }
    if (!IS_FIREFOX || !globalThis.browser?.storage?.sync) {
      state.syncEnabled = false; syncStatusText('Firefox Sync is available only in Firefox. Use a JSON backup in Edge.'); render(); return;
    }
    const consent = requestDataAndOriginPermission(['personalCommunications', 'personallyIdentifyingInfo']);
    if (!await consent) {
      state.syncEnabled = false; syncStatusText('Sync was not enabled; data remains on this device.'); render(); return;
    }
    try {
      const remote = await readSyncSnapshot();
      if (remote) {
        state = mergeSyncSnapshot(remote, state);
        lastSyncFingerprint = JSON.stringify(syncableSnapshot());
        await save({ skipSync: true });
        syncStatusText('Firefox Sync data restored on this device.');
      } else syncStatusText('Sync enabled. Saving this device’s selected dashboard data…');
      state.syncEnabled = true; render(); await save();
      if (!remote) scheduleSyncUpload();
    } catch (error) {
      console.warn('Stilltab could not read Firefox Sync storage.', error);
      state.syncEnabled = false; syncStatusText('Could not read Firefox Sync storage; nothing was changed.'); render();
    }
  }
  async function deleteSyncCopy() {
    if (!globalThis.browser?.storage?.sync) { toast('Firefox Sync storage is unavailable.'); return; }
    if (!confirm('Delete Stilltab’s synced copy from Firefox Sync? Your local dashboard will stay here, but this remote snapshot will be removed.')) return;
    try {
      clearTimeout(syncSaveTimer);
      const all = await browser.storage.sync.get(null);
      const keys = Object.keys(all).filter(key => key.startsWith(SYNC_PREFIX));
      syncWriteInProgress = true;
      if (keys.length) await browser.storage.sync.remove(keys);
      state.syncEnabled = false; lastSyncFingerprint = '';
      syncStatusText('Synced copy deleted. Local data remains on this device.');
      render(); await save({ skipSync: true }); toast('Synced Stilltab copy deleted.');
    } catch (error) {
      console.warn('Stilltab could not delete its Firefox Sync snapshot.', error);
      syncStatusText('Could not delete the Firefox Sync copy.');
      toast('Could not delete the synced copy.');
    } finally { syncWriteInProgress = false; }
  }
  function safeGradient(candidate) {
    const colors = Array.isArray(candidate?.colors) ? candidate.colors.slice(0, 3) : [];
    const valid = colors.length === 3 && colors.every(color => typeof color === 'string' && /^#[0-9a-f]{6}$/i.test(color));
    return {
      enabled: candidate?.enabled === true,
      kind: candidate?.kind === 'radial' ? 'radial' : 'linear',
      angle: Number.isFinite(Number(candidate?.angle)) ? Math.max(0, Math.min(360, Math.round(Number(candidate.angle)))) : 135,
      colors: valid ? colors : clone(DEFAULTS.gradient.colors)
    };
  }
  function safeBackgroundImage(value) {
    return typeof value === 'string' && value.length <= MAX_BACKGROUND_DATA_URL_LENGTH && /^data:image\/(?:webp|jpeg|png);base64,[a-z0-9+/]+={0,2}$/i.test(value) ? value : '';
  }
  function safeSearchTemplate(value) {
    if (typeof value !== 'string' || value.length > 2048 || (value.match(/\{query\}/g) || []).length !== 1 || /[\r\n]/.test(value)) return null;
    try {
      const url = new URL(value.replace('{query}', 'stilltab-search-query'));
      return url.protocol === 'https:' && !url.username && !url.password && !url.port ? value.trim() : null;
    } catch { return null; }
  }
  function normalizePomodoro(source) {
    const boundedMinutes = (value, fallback, min, max) => Number.isFinite(Number(value)) ? Math.max(min, Math.min(max, Math.round(Number(value)))) : fallback;
    const mode = ['focus', 'shortBreak', 'longBreak'].includes(source?.mode) ? source.mode : 'focus';
    const focusMinutes = boundedMinutes(source?.focusMinutes, 25, 5, 90);
    const shortBreakMinutes = boundedMinutes(source?.shortBreakMinutes, 5, 1, 30);
    const longBreakMinutes = boundedMinutes(source?.longBreakMinutes, 15, 5, 60);
    const duration = (mode === 'focus' ? focusMinutes : mode === 'shortBreak' ? shortBreakMinutes : longBreakMinutes) * 60;
    const endsAt = Number.isFinite(source?.endsAt) && source.endsAt > 0 ? source.endsAt : null;
    const running = source?.running === true && endsAt !== null;
    const remaining = running ? Math.max(0, Math.min(duration, Math.ceil((endsAt - Date.now()) / 1000))) : (Number.isFinite(source?.remaining) ? Math.max(0, Math.min(duration, Math.round(source.remaining))) : duration);
    return {
      mode, running, endsAt: running ? endsAt : null, remaining, focusMinutes, shortBreakMinutes, longBreakMinutes,
      sessions: Number.isInteger(source?.sessions) ? Math.max(0, Math.min(100000, source.sessions)) : 0,
      lastCompletedEndsAt: Number.isFinite(source?.lastCompletedEndsAt) ? source.lastCompletedEndsAt : null
    };
  }
  function normalizeCustomSearchEngine(source) {
    if (!source || typeof source !== 'object') return null;
    const id = typeof source.id === 'string' && /^[a-z0-9_-]{1,64}$/i.test(source.id) ? source.id : '';
    const name = typeof source.name === 'string' ? source.name.trim().slice(0, 32) : '';
    const keyword = typeof source.keyword === 'string' ? source.keyword.trim().toLowerCase() : '';
    const template = safeSearchTemplate(source.template);
    return id && name && /^[a-z0-9][a-z0-9_-]{0,11}$/.test(keyword) && template ? { id, name, keyword, template } : null;
  }
  async function compressBackgroundImage(file) {
    if (!file || !['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 20_000_000) throw new Error('Choose a PNG, JPG, or WebP image under 20 MB.');
    const bitmap = await createImageBitmap(file);
    try {
      if (!bitmap.width || !bitmap.height || bitmap.width > 12000 || bitmap.height > 12000) throw new Error('That image is too large to use as a background.');
      let scale = Math.min(1, 1920 / bitmap.width, 1280 / bitmap.height);
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d', { alpha: false });
      for (let pass = 0; pass < 6; pass++) {
        canvas.width = Math.max(1, Math.round(bitmap.width * scale));
        canvas.height = Math.max(1, Math.round(bitmap.height * scale));
        context.fillStyle = state.background || DEFAULTS.background;
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
        for (const quality of [.84, .74, .64, .54]) {
          const data = canvas.toDataURL('image/webp', quality);
          if (data.length <= MAX_BACKGROUND_DATA_URL_LENGTH && /^data:image\/(?:webp|jpeg|png);base64,/i.test(data)) return data;
        }
        scale *= .78;
      }
      throw new Error('That image could not be compressed enough. Try a smaller image.');
    } finally { bitmap.close?.(); }
  }
  function pomodoroDuration(mode = state.pomodoro.mode) {
    const timer = state.pomodoro;
    return (mode === 'focus' ? timer.focusMinutes : mode === 'shortBreak' ? timer.shortBreakMinutes : timer.longBreakMinutes) * 60;
  }
  function pomodoroRemaining() {
    const timer = state.pomodoro;
    return timer.running && Number.isFinite(timer.endsAt) ? Math.max(0, Math.ceil((timer.endsAt - Date.now()) / 1000)) : Math.max(0, timer.remaining);
  }
  function formatPomodoro(seconds) {
    return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
  }
  function editPomodoroDuration() {
    const timer = state.pomodoro;
    const config = ({
      focus: { label: 'Focus session', key: 'focusMinutes', min: 5, max: 90 },
      shortBreak: { label: 'Short break', key: 'shortBreakMinutes', min: 1, max: 30 },
      longBreak: { label: 'Long break', key: 'longBreakMinutes', min: 5, max: 60 }
    })[timer.mode];
    showDialog(`Change ${config.label.toLowerCase()} length`, 'POMODORO TIMER', `<label class="field-label" for="pomodoro-duration-input">${config.label} · minutes<input class="dialog-input" id="pomodoro-duration-input" type="number" inputmode="numeric" min="${config.min}" max="${config.max}" step="1" value="${timer[config.key]}" required></label><p class="section-hint">Choose a whole number from ${config.min} to ${config.max} minutes. Saving resets this mode's current countdown; Cancel leaves it unchanged.</p>`, () => {
      const input = $('#pomodoro-duration-input');
      const minutes = Number(input.value);
      if (!Number.isInteger(minutes) || minutes < config.min || minutes > config.max) {
        toast(`Choose a whole number from ${config.min} to ${config.max} minutes.`);
        input.focus(); return false;
      }
      timer[config.key] = minutes;
      timer.running = false; timer.endsAt = null; timer.remaining = minutes * 60;
      return true;
    });
    $('#pomodoro-duration-input')?.focus();
    $('#pomodoro-duration-input')?.select();
  }
  function updatePomodoroDisplay() {
    const timerText = $('#pomodoro-countdown');
    if (!timerText) return;
    const timer = state.pomodoro;
    const remaining = pomodoroRemaining();
    timerText.textContent = formatPomodoro(remaining);
    const progress = Math.max(0, Math.min(100, (1 - remaining / Math.max(1, pomodoroDuration())) * 100));
    $('#pomodoro-progress-fill').style.width = `${progress}%`;
    $('#pomodoro-progress').setAttribute('aria-valuenow', String(Math.round(progress)));
    $('#pomodoro-phase').textContent = ({ focus: 'Focus session', shortBreak: 'Short break', longBreak: 'Long break' })[timer.mode];
    timerText.setAttribute('aria-label', `${timerText.textContent}, ${timer.mode === 'focus' ? 'focus session' : timer.mode === 'shortBreak' ? 'short break' : 'long break'}; click to change duration`);
    $('#pomodoro-toggle').textContent = timer.running ? 'Pause' : (remaining === 0 ? 'Start again' : 'Start');
    $('#pomodoro-sessions').textContent = `${timer.sessions} focus ${timer.sessions === 1 ? 'session' : 'sessions'} completed`;
    $('#pomodoro-modes').querySelectorAll('[data-pomodoro-mode]').forEach(button => {
      const selected = button.dataset.pomodoroMode === timer.mode;
      button.classList.toggle('is-selected', selected); button.setAttribute('aria-pressed', String(selected));
    });
  }
  function completePomodoro() {
    const timer = state.pomodoro;
    const completedEnd = timer.endsAt;
    if (!timer.running || !Number.isFinite(completedEnd) || timer.lastCompletedEndsAt === completedEnd) return;
    const wasFocus = timer.mode === 'focus';
    timer.running = false; timer.endsAt = null; timer.remaining = 0; timer.lastCompletedEndsAt = completedEnd;
    if (wasFocus) timer.sessions++;
    render(); save(); toast(wasFocus ? 'Focus session complete. Take a break.' : 'Break complete. Ready when you are.');
  }
  function tickPomodoro() {
    if (state.pomodoro.running && pomodoroRemaining() === 0) { completePomodoro(); return; }
    updatePomodoroDisplay();
  }
  function sanitizeCustomCss(css) {
    if (typeof css !== 'string' || css.length > 12000) return null;
    const decoded = css.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\\([0-9a-f]{1,6})\s?|\\(.)/gi, (_, hex, char) => {
      if (!hex) return char;
      const code = parseInt(hex, 16);
      return String.fromCodePoint(code <= 0x10ffff ? code : 0xfffd);
    }).toLowerCase();
    if (decoded.includes('@') || /(?:url|image|image-set|cross-fade|element|paint|src|expression)\s*\(|javascript\s*:|https?\s*:|data\s*:|-moz-binding|\bbehavior\s*:/.test(decoded)) return null;
    let depth = 0;
    for (const char of decoded) { if (char === '{') depth++; if (char === '}' && --depth < 0) return null; }
    if (depth !== 0) return null;
    return css;
  }
  function normalizeStockSymbol(value) {
    const symbol = typeof value === 'string' ? value.trim().toUpperCase() : '';
    return /^[A-Z0-9^][A-Z0-9.^-]{0,14}$/.test(symbol) ? symbol : '';
  }
  function normalizeCoinId(value) {
    const id = typeof value === 'string' ? value.trim().toLowerCase() : '';
    return /^[a-z0-9]+(?:-[a-z0-9]+){0,5}$/.test(id) ? id.slice(0, 64) : '';
  }
  function coinDescriptor(value) {
    const raw = String(value || '').trim();
    const symbol = raw.toUpperCase();
    if (CRYPTO_COINS[symbol]) return { ...CRYPTO_COINS[symbol] };
    const id = normalizeCoinId(raw);
    if (!id) return null;
    return { id, symbol: /^[A-Z0-9]{1,12}$/.test(symbol) ? symbol : id.replace(/-/g, '').slice(0, 12).toUpperCase(), name: raw.slice(0, 40) };
  }
  function normalizeBookmark(item) {
    if (!item || typeof item !== 'object' || typeof item.title !== 'string' || typeof item.url !== 'string') return null;
    const title = item.title.trim().slice(0, 80);
    const url = normalizeShortcutUrl(item.url);
    if (!title || !url) return null;
    return {
      id: typeof item.id === 'string' && /^[a-z0-9_-]{1,64}$/i.test(item.id) ? item.id : `bookmark-${Math.random().toString(36).slice(2, 10)}`,
      title, url, tag: typeof item.tag === 'string' ? item.tag.trim().slice(0, 24) : ''
    };
  }
  function normalize(input) {
    const value = { ...clone(DEFAULTS), ...(input && typeof input === 'object' ? input : {}) };
    value.enabled = { ...DEFAULTS.enabled };
    for (const key of Object.keys(value.enabled)) if (typeof input?.enabled?.[key] === 'boolean') value.enabled[key] = input.enabled[key];
    if (input && typeof input === 'object' && !input.pomodoro && input.enabled?.tasks === false) value.enabled.tasks = true;
    value.displayName = typeof input?.displayName === 'string' ? input.displayName.slice(0, 30) : '';
    const validColor = candidate => typeof candidate === 'string' && /^#[0-9a-f]{6}$/i.test(candidate);
    value.accent = validColor(input?.accent) ? input.accent : DEFAULTS.accent;
    value.background = validColor(input?.background) ? input.background : DEFAULTS.background;
    value.backgroundImage = safeBackgroundImage(input?.backgroundImage);
    value.backgroundOverlay = Number.isFinite(input?.backgroundOverlay) ? Math.max(0, Math.min(75, Math.round(input.backgroundOverlay))) : DEFAULTS.backgroundOverlay;
    value.shortcuts = Array.isArray(input?.shortcuts) ? input.shortcuts.filter(x => x && typeof x.title === 'string' && typeof x.url === 'string').map(x => ({
      id: typeof x.id === 'string' ? x.id.slice(0, 64) : `link-${Math.random().toString(36).slice(2, 10)}`,
      title: x.title.trim().slice(0, 24), url: normalizeShortcutUrl(x.url), glyph: typeof x.glyph === 'string' ? x.glyph.slice(0, 4) : ''
    })).filter(x => x.title && x.url) : clone(DEFAULTS.shortcuts);
    value.tasks = Array.isArray(input?.tasks) ? input.tasks.filter(x => x && typeof x.title === 'string').slice(0, 200).map(x => ({
      id: typeof x.id === 'string' ? x.id.slice(0, 64) : `task-${Math.random().toString(36).slice(2, 10)}`,
      title: x.title.trim().slice(0, 120), done: x.done === true
    })) : [];
    value.pomodoro = normalizePomodoro(input?.pomodoro);
    value.quickNotes = typeof input?.quickNotes === 'string' ? input.quickNotes.slice(0, 6000) : '';
    value.weatherLocation = input?.weatherLocation && typeof input.weatherLocation.name === 'string' && typeof input.weatherLocation.latitude === 'number' && Number.isFinite(input.weatherLocation.latitude) && typeof input.weatherLocation.longitude === 'number' && Number.isFinite(input.weatherLocation.longitude)
      ? { name: input.weatherLocation.name.slice(0, 100), latitude: Number(input.weatherLocation.latitude), longitude: Number(input.weatherLocation.longitude) }
      : { name: '', latitude: null, longitude: null };
    if (value.weatherLocation.latitude < -90 || value.weatherLocation.latitude > 90 || value.weatherLocation.longitude < -180 || value.weatherLocation.longitude > 180) value.weatherLocation = { name: '', latitude: null, longitude: null };
    value.weatherCache = input?.weatherCache && Number.isFinite(input.weatherCache.temperature) && Number.isFinite(input.weatherCache.apparent) && Number.isFinite(input.weatherCache.code)
      ? { temperature: input.weatherCache.temperature, apparent: input.weatherCache.apparent, code: input.weatherCache.code, updatedAt: typeof input.weatherCache.updatedAt === 'string' ? input.weatherCache.updatedAt.slice(0, 64) : '' }
      : null;
    const rssUrl = typeof input?.rssUrl === 'string' ? safeHttpsUrl(input.rssUrl) : null;
    value.rssUrl = rssUrl || '';
    value.rssTitle = typeof input?.rssTitle === 'string' ? input.rssTitle.slice(0, 120) : '';
    value.rssItems = Array.isArray(input?.rssItems) ? input.rssItems.filter(item => item && typeof item.title === 'string' && typeof item.url === 'string').slice(0, 8).map(item => ({ title: item.title.slice(0, 180), url: safeHttpsUrl(item.url) })).filter(item => item.url) : [];
    value.stocks = Array.isArray(input?.stocks) ? input.stocks.slice(0, 20).map(item => ({
      symbol: normalizeStockSymbol(item?.symbol),
      price: Number.isFinite(item?.price) && item.price > 0 ? item.price : null,
      changePercent: Number.isFinite(item?.changePercent) ? item.changePercent : null,
      updatedAt: typeof item?.updatedAt === 'string' && Number.isFinite(Date.parse(item.updatedAt)) ? item.updatedAt.slice(0, 64) : ''
    })).filter(item => item.symbol) : [];
    value.bookmarks = Array.isArray(input?.bookmarks) ? input.bookmarks.slice(0, 200).map(normalizeBookmark).filter(Boolean) : [];
    value.cryptoAssets = Array.isArray(input?.cryptoAssets) ? input.cryptoAssets.slice(0, 20).map(item => {
      const descriptor = coinDescriptor(item?.id);
      const symbol = typeof item?.symbol === 'string' && /^[A-Z0-9]{1,12}$/.test(item.symbol) ? item.symbol : descriptor?.symbol;
      if (!descriptor || !symbol) return null;
      return {
        id: descriptor.id, symbol, name: typeof item.name === 'string' ? item.name.slice(0, 40) : descriptor.name,
        price: Number.isFinite(item.price) && item.price > 0 ? item.price : null,
        change24h: Number.isFinite(item.change24h) ? item.change24h : null,
        updatedAt: typeof item.updatedAt === 'string' && Number.isFinite(Date.parse(item.updatedAt)) ? item.updatedAt.slice(0, 64) : ''
      };
    }).filter(Boolean) : [];
    value.profile = Object.hasOwn(STARTER_PROFILES, input?.profile) ? input.profile : 'minimal';
    value.onboardingDone = input?.onboardingDone === true;
    value.settingsCollapsed = { ...DEFAULTS.settingsCollapsed };
    for (const key of Object.keys(value.settingsCollapsed)) if (typeof input?.settingsCollapsed?.[key] === 'boolean') value.settingsCollapsed[key] = input.settingsCollapsed[key];
    value.externalConsents = { ...DEFAULTS.externalConsents };
    for (const key of Object.keys(value.externalConsents)) if (typeof input?.externalConsents?.[key] === 'boolean') value.externalConsents[key] = input.externalConsents[key];
    value.syncEnabled = input?.syncEnabled === true;
    const css = sanitizeCustomCss(input?.customCss ?? '');
    value.customCss = css === null ? '' : css;
    value.customCssEnabled = Boolean(value.customCss) && (typeof input?.customCssEnabled === 'boolean' ? input.customCssEnabled : true);
    value.gradient = safeGradient(input?.gradient);
    value.customWidgets = Array.isArray(input?.customWidgets) ? input.customWidgets.filter(x => x && typeof x.id === 'string').map(x => ({
      id: x.id.slice(0, 64), title: typeof x.title === 'string' ? x.title.slice(0, 40) : 'Untitled',
      body: typeof x.body === 'string' ? x.body.slice(0, 500) : '', enabled: typeof x.enabled === 'boolean' ? x.enabled : true
    })) : [];
    value.savedThemes = Array.isArray(input?.savedThemes) ? input.savedThemes.filter(x => x && typeof x.id === 'string' && typeof x.name === 'string').map(x => ({
      id: x.id.slice(0, 64), name: x.name.slice(0, 28),
      accent: validColor(x.accent) ? x.accent : DEFAULTS.accent,
      background: validColor(x.background) ? x.background : DEFAULTS.background,
      surface: ['glass', 'solid', 'gradient'].includes(x.surface) ? x.surface : DEFAULTS.surface,
      corners: ['soft', 'square', 'pill'].includes(x.corners) ? x.corners : DEFAULTS.corners,
      font: FONT_IDS.includes(x.font) ? x.font : DEFAULTS.font,
      density: ['comfortable', 'compact'].includes(x.density) ? x.density : DEFAULTS.density,
      layout: LAYOUT_IDS.includes(x.layout) ? x.layout : DEFAULTS.layout,
      gradient: safeGradient(x.gradient)
    })) : [];
    const usedKeywords = new Set(SEARCH_ENGINES.map(engine => engine.keyword));
    const usedEngineIds = new Set(SEARCH_ENGINES.map(engine => engine.id));
    value.customSearchEngines = [];
    for (const candidate of (Array.isArray(input?.customSearchEngines) ? input.customSearchEngines : []).slice(0, 50)) {
      const engine = normalizeCustomSearchEngine(candidate);
      if (!engine || usedKeywords.has(engine.keyword) || usedEngineIds.has(engine.id)) continue;
      usedKeywords.add(engine.keyword); usedEngineIds.add(engine.id); value.customSearchEngines.push(engine);
    }
    const validIds = new Set([...BUILT_INS.map(x => x.id), ...value.customWidgets.map(x => `custom:${x.id}`)]);
    value.order = Array.isArray(input?.order) ? input.order.filter(x => validIds.has(x)) : [];
    for (const id of validIds) if (!value.order.includes(id)) value.order.push(id);
    if (typeof value.theme !== 'string' || (!Object.hasOwn(THEME_PRESETS, value.theme) && value.theme !== 'custom' && !value.theme.startsWith('saved:'))) value.theme = 'dusk';
    if (value.theme.startsWith('saved:') && !value.savedThemes.some(x => `saved:${x.id}` === value.theme)) value.theme = 'dusk';
    if (!['glass', 'solid', 'gradient'].includes(value.surface)) value.surface = 'glass';
    if (!['soft', 'square', 'pill'].includes(value.corners)) value.corners = 'soft';
    if (!FONT_IDS.includes(value.font)) value.font = 'system';
    if (!['comfortable', 'compact'].includes(value.density)) value.density = 'comfortable';
    if (!LAYOUT_IDS.includes(value.layout)) value.layout = 'balanced';
    value.quoteOffset = Number.isInteger(input?.quoteOffset) ? ((input.quoteOffset % MOTIVATIONAL_QUOTES.length) + MOTIVATIONAL_QUOTES.length) % MOTIVATIONAL_QUOTES.length : 0;
    if (![...SEARCH_ENGINES, ...value.customSearchEngines].some(engine => engine.id === value.searchProvider)) value.searchProvider = 'duckduckgo';
    value.focusText = typeof input?.focusText === 'string' ? input.focusText.slice(0, 220) : DEFAULTS.focusText;
    return value;
  }
  function esc(text) {
    return String(text ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }
  function safeUrl(value) {
    try { const url = new URL(value); return ['https:', 'http:'].includes(url.protocol) ? url.href : null; }
    catch { return null; }
  }
  function normalizeShortcutUrl(value) {
    const raw = String(value || '').trim();
    if (!raw) return null;
    const candidate = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
    const normalized = safeUrl(candidate);
    if (!normalized) return null;
    const url = new URL(normalized);
    return url.username || url.password ? null : url.href;
  }
  function shortcutProfile(url) {
    const hostname = new URL(url).hostname.toLowerCase().replace(/^www\./, '');
    return SHORTCUT_PROFILES.find(profile => profile.domains.some(domain => hostname === domain || hostname.endsWith(`.${domain}`))) || null;
  }
  function genericShortcutMark(url) {
    const host = new URL(url).hostname.toLowerCase().replace(/^www\./, '');
    return (host.split('.')[0].replace(/[^a-z0-9]/g, '').slice(0, 2) || '↗').toUpperCase();
  }
  function genericShortcutColor(url) {
    const host = new URL(url).hostname.toLowerCase();
    let hash = 0;
    for (const char of host) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
    return hash % 8;
  }
  function shortcutName(url) {
    try {
      const hostname = new URL(url).hostname.toLowerCase().replace(/^www\./, '');
      return shortcutProfile(url)?.name || hostname.split('.')[0].replace(/[-_]+/g, ' ').replace(/\b\p{L}/gu, letter => letter.toUpperCase()).slice(0, 24) || 'Shortcut';
    } catch { return 'Shortcut'; }
  }
  function safeHttpsUrl(value) {
    const parsed = safeUrl(value);
    if (!parsed) return null;
    const url = new URL(parsed);
    return url.protocol === 'https:' && !url.port && !url.username && !url.password ? url.href : null;
  }
  function allSearchEngines() { return [...SEARCH_ENGINES, ...state.customSearchEngines]; }
  function searchEngineById(id) { return allSearchEngines().find(engine => engine.id === id) || SEARCH_ENGINES[0]; }
  function renderSearchEngineSettings() {
    // Dynamic engine labels/IDs are normalized and escaped before entering these fixed extension templates.
    $('#search-provider').innerHTML = allSearchEngines().map(engine => `<option value="${esc(engine.id)}">${esc(engine.name)}</option>`).join('');
    $('#search-provider').value = state.searchProvider;
    $('#search-keyword-hint').innerHTML = SEARCH_ENGINES.map(engine => `<span class="keyword-token"><kbd>${esc(engine.keyword)}</kbd> ${esc(engine.name)}</span>`).join('');
    $('#custom-search-engines').innerHTML = state.customSearchEngines.map(engine => `<div class="custom-engine-row"><div><strong>${esc(engine.name)}</strong><span><kbd>${esc(engine.keyword)}</kbd> · ${esc(new URL(engine.template.replace('{query}', 'query')).hostname)}</span></div><div class="custom-engine-actions"><button type="button" data-edit-search-engine="${esc(engine.id)}" aria-label="Edit ${esc(engine.name)}">Edit</button><button type="button" data-remove-search-engine="${esc(engine.id)}" aria-label="Remove ${esc(engine.name)}">×</button></div></div>`).join('') || '<p class="section-hint">No custom engines yet.</p>';
  }
  function applyBackgroundLayer() {
    const root = document.documentElement;
    if (state.backgroundImage) {
      root.dataset.hasBackground = 'true';
      root.style.setProperty('--user-background-image', `url("${state.backgroundImage}")`);
    } else {
      delete root.dataset.hasBackground;
      root.style.removeProperty('--user-background-image');
    }
    root.style.setProperty('--photo-overlay-opacity', state.backgroundImage ? String(state.backgroundOverlay / 100) : '0');
    const preview = $('#background-preview');
    preview.style.backgroundImage = state.backgroundImage ? `url("${state.backgroundImage}")` : 'none';
    preview.classList.toggle('is-empty', !state.backgroundImage);
    preview.textContent = state.backgroundImage ? '' : 'No image selected';
    $('#remove-background').hidden = !state.backgroundImage;
    $('#background-overlay').disabled = !state.backgroundImage;
    $('#background-overlay').value = String(state.backgroundOverlay);
    $('#background-overlay-value').textContent = `${state.backgroundOverlay}%`;
  }
  function applyAppearance() {
    const root = document.documentElement;
    const selectedTheme = state.savedThemes.find(x => `saved:${x.id}` === state.theme);
    const gradient = selectedTheme?.gradient || state.gradient;
    root.dataset.theme = selectedTheme ? 'custom' : state.theme;
    root.dataset.surface = state.surface;
    root.dataset.corners = state.corners;
    root.dataset.font = state.font;
    root.dataset.density = state.density;
    root.dataset.layout = state.layout;
    if (gradient.enabled) {
      const colors = gradient.colors.join(', ');
      const generated = gradient.kind === 'radial' ? `radial-gradient(circle at 24% 18%, ${colors})` : `linear-gradient(${gradient.angle}deg, ${colors})`;
      root.style.setProperty('--background-paint', generated);
    } else root.style.removeProperty('--background-paint');
    if (selectedTheme || state.theme === 'custom') {
      const accent = selectedTheme?.accent || state.accent || DEFAULTS.accent;
      const background = selectedTheme?.background || state.background || DEFAULTS.background;
      const rgb = background.match(/[0-9a-f]{2}/gi).map(value => parseInt(value, 16) / 255).map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4);
      const luminance = .2126 * rgb[0] + .7152 * rgb[1] + .0722 * rgb[2];
      const lightBackground = luminance > .52;
      root.style.colorScheme = lightBackground ? 'light' : 'dark';
      root.style.setProperty('--accent-custom', accent);
      root.style.setProperty('--background-custom', background);
      root.style.setProperty('--ink-custom', lightBackground ? '#292723' : '#f4f2f8');
      root.style.setProperty('--muted-custom', lightBackground ? '#77736d' : '#b5b2c2');
      root.style.setProperty('--faint-custom', lightBackground ? '#99958e' : '#828090');
      root.style.setProperty('--photo-shade', lightBackground ? '255,255,255' : '0,0,0');
    } else {
      root.style.removeProperty('color-scheme');
      root.style.removeProperty('--accent-custom');
      root.style.removeProperty('--background-custom');
      root.style.removeProperty('--ink-custom');
      root.style.removeProperty('--muted-custom');
      root.style.removeProperty('--faint-custom');
      root.style.removeProperty('--photo-shade');
    }
    const select = $('#theme-select');
    const staticOptions = Object.entries(THEME_PRESETS).map(([id, preset]) => `<option value="${id}">${esc(preset.name)} · ${esc(preset.subtitle)}</option>`).join('') + '<option value="custom">Custom colors</option>';
    // Saved preset IDs and names are normalized and escaped before insertion into this select.
    select.innerHTML = staticOptions + state.savedThemes.map(x => `<option value="saved:${esc(x.id)}">${esc(x.name)}</option>`).join('');
    $('#theme-name').textContent = selectedTheme?.name || THEME_NAMES[state.theme] || 'Dusk';
    $('#delete-theme').hidden = !selectedTheme;
    $('#theme-select').value = state.theme;
    $('#accent-color').value = selectedTheme?.accent || state.accent || DEFAULTS.accent;
    $('#background-color').value = selectedTheme?.background || state.background || DEFAULTS.background;
    $('#surface-select').value = selectedTheme?.surface || state.surface;
    $('#corners-select').value = selectedTheme?.corners || state.corners;
    $('#font-select').value = selectedTheme?.font || state.font;
    $('#density-select').value = selectedTheme?.density || state.density;
    $('#layout-select').value = selectedTheme?.layout || state.layout;
    $('#gradient-kind').value = gradient.kind;
    $('#gradient-angle').value = gradient.angle;
    $('#gradient-angle-value').textContent = `${gradient.angle}°`;
    gradient.colors.forEach((color, index) => { $(`#gradient-color-${index + 1}`).value = color; });
    const gradientColors = gradient.colors.join(', ');
    $('#gradient-preview').style.background = gradient.kind === 'radial' ? `radial-gradient(circle at 24% 18%, ${gradientColors})` : `linear-gradient(${gradient.angle}deg, ${gradientColors})`;
    $('#custom-css').value = state.customCss;
    const customCss = sanitizeCustomCss(state.customCss) || '';
    const hasCustomCss = Boolean(customCss.trim());
    $('#user-custom-css').textContent = state.customCssEnabled && hasCustomCss ? customCss : '';
    $('#custom-css-status').textContent = state.customCssEnabled && hasCustomCss
      ? 'Custom CSS is on. Turn it off to restore Stilltab’s default styling; your code will stay saved.'
      : hasCustomCss ? 'Custom CSS is off. Your code is saved locally and can be turned on again.' : 'No custom CSS is saved.';
    const cssToggle = $('#toggle-custom-css');
    cssToggle.disabled = !hasCustomCss;
    cssToggle.setAttribute('aria-pressed', String(state.customCssEnabled && hasCustomCss));
    cssToggle.textContent = !hasCustomCss ? 'No CSS to toggle' : state.customCssEnabled ? 'Turn off custom CSS' : 'Turn on custom CSS';
    $('#clear-custom-css').disabled = !hasCustomCss;
    renderSearchEngineSettings();
    $('#display-name').value = state.displayName || '';
    $('#starter-profile-select').value = state.profile;
    $('#pomodoro-focus-minutes').value = state.pomodoro.focusMinutes;
    $('#pomodoro-short-minutes').value = state.pomodoro.shortBreakMinutes;
    $('#pomodoro-long-minutes').value = state.pomodoro.longBreakMinutes;
    $('#sync-enabled').checked = state.syncEnabled;
    syncStatusText(syncStatus);
    $('#platform-sync-note').textContent = IS_FIREFOX ? 'Optional and off by default. Sync stays separate from your local-only bookmarks and crypto watchlist.' : 'Firefox Sync is not available in Edge. Use the JSON backups below to move settings.';
    const keyStatus = $('#stock-key-status');
    if (keyStatus) keyStatus.textContent = stockApiKey ? 'A key is saved in this browser only.' : 'No API key saved.';
    applyBackgroundLayer();
  }
  function updateClock() {
    if (!$('#clock')) return;
    const now = new Date();
    const time = new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' }).formatToParts(now);
    const hour = time.find(part => part.type === 'hour')?.value || '';
    const minute = time.find(part => part.type === 'minute')?.value || '00';
    const dayPeriod = time.find(part => part.type === 'dayPeriod')?.value || '';
    $('#clock').textContent = `${hour}:${minute}`;
    $('#period').textContent = dayPeriod;
    $('#clock').dateTime = now.toISOString();
    $('#date-line').textContent = new Intl.DateTimeFormat(undefined, { weekday: 'long', month: 'long', day: 'numeric' }).format(now);
  }
  function dailyQuote() {
    const today = new Date();
    const day = Math.floor(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) / 86400000);
    return MOTIVATIONAL_QUOTES[(day + state.quoteOffset) % MOTIVATIONAL_QUOTES.length];
  }
  function renderSearch() {
    const engine = searchEngineById(state.searchProvider);
    return `<article class="widget-card search-card" data-widget="search"><div class="search-icon" aria-hidden="true">⌕</div><form class="search-form" id="search-form"><label class="visually-hidden" for="search-input">Search the web or use a keyword shortcut</label><input id="search-input" name="q" type="search" placeholder="Search or type a keyword…" autocomplete="off"><button type="submit" aria-label="Search">↗</button></form><span class="provider-label">${esc(engine.name.toUpperCase())}</span></article>`;
  }
  function renderClock() {
    return `<section class="welcome clock-widget" data-widget="clock" aria-label="Clock and daily motivation"><p class="eyebrow" id="today-label">YOUR SPACE, YOUR PACE</p><div class="clock-line"><time id="clock" aria-label="Current time">--:--</time><span class="clock-period" id="period"></span></div><div class="quote-line"><h1 class="daily-quote" id="daily-quote" aria-live="polite">${esc(dailyQuote())}</h1><button class="quote-cycle" type="button" data-action="next-quote" aria-label="Show another motivational quote" title="Another quote">↻</button></div><p class="date-line" id="date-line"></p></section>`;
  }
  function renderShortcuts() {
    const links = state.shortcuts.map(item => {
      const url = safeUrl(item.url);
      if (!url) return '';
      const profile = item.glyph ? null : shortcutProfile(url);
      const glyph = item.glyph ? esc(item.glyph) : profile?.mark || esc(genericShortcutMark(url));
      const iconClass = profile ? ` shortcut-glyph--${profile.key}` : (!item.glyph ? ` shortcut-glyph--site-${genericShortcutColor(url)}` : '');
      let host = '';
      try { host = new URL(url).hostname.replace(/^www\./, ''); } catch {}
      return `<div class="shortcut-entry"><a class="shortcut" href="${esc(url)}" title="${esc(item.title)} · ${esc(host)}"><span class="shortcut-glyph${iconClass}" aria-hidden="true">${glyph}</span><span class="shortcut-title">${esc(item.title)}</span><span class="shortcut-arrow" aria-hidden="true">↗</span></a><button class="shortcut-remove" type="button" data-action="remove-shortcut" data-id="${esc(item.id)}" aria-label="Remove ${esc(item.title)}" title="Remove shortcut">×</button></div>`;
    }).join('');
    return `<article class="widget-card links-card" data-widget="shortcuts"><div class="card-heading"><div><p class="card-kicker">YOUR FAVORITES</p><h2>Quick links</h2></div><button class="small-icon-button" type="button" data-action="add-link" aria-label="Add a shortcut" title="Add shortcut">＋</button></div><div class="shortcut-list">${links || '<p class="empty-state">No shortcuts yet. Add one to get started.</p>'}</div></article>`;
  }
  function renderFocus() {
    return `<article class="widget-card focus-card" data-widget="focus"><div class="card-heading"><div><p class="card-kicker">A GENTLE REMINDER</p><h2>For today</h2></div><button class="small-icon-button" type="button" data-action="edit-focus" aria-label="Edit focus note" title="Edit note">✎</button></div><p class="focus-copy">${esc(state.focusText || 'Add a small reminder for yourself.')}</p><span class="focus-mark" aria-hidden="true">“</span></article>`;
  }
  function renderTasks() {
    const rows = state.tasks.map(task => `<li class="task-row ${task.done ? 'is-done' : ''}"><label><input type="checkbox" data-task-toggle="${esc(task.id)}" ${task.done ? 'checked' : ''}><span>${esc(task.title)}</span></label><button class="task-remove" type="button" data-action="remove-task" data-id="${esc(task.id)}" aria-label="Remove ${esc(task.title)}">×</button></li>`).join('');
    return `<article class="widget-card tasks-card" data-widget="tasks"><div class="card-heading"><div><p class="card-kicker">KEEP IT MOVING</p><h2>To-do</h2></div><span class="task-count">${state.tasks.filter(task => !task.done).length} left</span></div><ul class="task-list">${rows || '<li class="task-empty">Nothing on the list. Add a small next step.</li>'}</ul><form id="task-form" class="task-form"><label class="visually-hidden" for="task-input">Add a task</label><input id="task-input" name="task" maxlength="120" placeholder="Add a task…" required><button type="submit" aria-label="Add task">＋</button></form></article>`;
  }
  function renderPomodoro() {
    const modes = [['focus', 'Focus'], ['shortBreak', 'Short break'], ['longBreak', 'Long break']];
    return `<article class="widget-card pomodoro-card" data-widget="pomodoro"><div class="card-heading"><div><p class="card-kicker">MAKE SPACE TO FOCUS</p><h2 id="pomodoro-phase">Focus session</h2></div><span class="pomodoro-mark" aria-hidden="true">◷</span></div><button class="pomodoro-countdown" id="pomodoro-countdown" type="button" data-action="edit-pomodoro-duration" aria-label="${formatPomodoro(pomodoroRemaining())}, click to change timer duration" aria-live="off">${formatPomodoro(pomodoroRemaining())}</button><p class="pomodoro-edit-hint">Click the time to change its length</p><div class="pomodoro-progress" id="pomodoro-progress" role="progressbar" aria-label="Pomodoro progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><span id="pomodoro-progress-fill"></span></div><div class="pomodoro-modes" id="pomodoro-modes">${modes.map(([mode, label]) => `<button type="button" data-pomodoro-mode="${mode}" aria-pressed="${state.pomodoro.mode === mode}">${label}</button>`).join('')}</div><div class="pomodoro-actions"><button class="primary-button" id="pomodoro-toggle" type="button" data-action="toggle-pomodoro">Start</button><button class="secondary-button" type="button" data-action="reset-pomodoro">Reset</button></div><p class="pomodoro-sessions" id="pomodoro-sessions">${state.pomodoro.sessions} focus sessions completed</p></article>`;
  }
  function weatherDescription(code) {
    const labels = { 0:'Clear sky',1:'Mostly clear',2:'Partly cloudy',3:'Overcast',45:'Fog',48:'Rime fog',51:'Light drizzle',53:'Drizzle',55:'Heavy drizzle',56:'Freezing drizzle',57:'Freezing drizzle',61:'Light rain',63:'Rain',65:'Heavy rain',66:'Freezing rain',67:'Heavy freezing rain',71:'Light snow',73:'Snow',75:'Heavy snow',77:'Snow grains',80:'Rain showers',81:'Rain showers',82:'Heavy showers',85:'Snow showers',86:'Heavy snow showers',95:'Thunderstorm',96:'Thunderstorm with hail',99:'Thunderstorm with hail' };
    return labels[code] || 'Current conditions';
  }
  function renderWeather() {
    const weather = state.weatherCache;
    const condition = weather ? weatherDescription(weather.code) : 'Add a city to see current conditions';
    const readings = weather ? `<div class="weather-reading"><span class="weather-temp">${Math.round(weather.temperature)}°</span><div><strong>${esc(condition)}</strong><span>Feels like ${Math.round(weather.apparent)}°C</span></div></div>` : '';
    const lastUpdated = weather?.updatedAt && Number.isFinite(Date.parse(weather.updatedAt)) ? `Last updated ${new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }).format(new Date(weather.updatedAt))}.` : '';
    return `<article class="widget-card weather-card" data-widget="weather"><div class="card-heading"><div><p class="card-kicker">RIGHT NOW</p><h2>Weather</h2></div><button class="small-icon-button" type="button" data-action="refresh-weather" aria-label="Refresh weather" title="Refresh weather">↻</button></div><p class="weather-place">${esc(state.weatherLocation.name || 'Your chosen place')}</p>${readings}<form id="weather-form" class="widget-inline-form"><label class="visually-hidden" for="weather-city">City and optional country</label><input id="weather-city" maxlength="100" placeholder="City, country" value="${esc(state.weatherLocation.name)}"><button type="submit">Set & refresh</button></form><p class="service-note">City and IP are sent to Open-Meteo only when you refresh. No location detection or auto-refresh.</p><p class="widget-status" id="weather-status" role="status">${esc(weatherStatus || lastUpdated)}</p><p class="weather-attribution"><a class="source-link" href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer">Weather data by Open-Meteo</a><span> · </span><a class="source-link" href="https://open-meteo.com/en/licence" target="_blank" rel="noopener noreferrer">CC BY 4.0</a><span> · </span><a class="source-link" href="https://www.geonames.org/" target="_blank" rel="noopener noreferrer">GeoNames</a></p></article>`;
  }
  function renderQuickNotes() {
    return `<article class="widget-card quick-notes-card" data-widget="quick-notes"><div class="card-heading"><div><p class="card-kicker">ONLY FOR YOU</p><h2>Quick notes</h2></div><span class="local-badge">LOCAL</span></div><label class="visually-hidden" for="quick-notes-text">Your private notes</label><textarea id="quick-notes-text" maxlength="6000" placeholder="Jot something down…">${esc(state.quickNotes)}</textarea><p class="service-note">Saved in this browser only.</p></article>`;
  }
  function renderRss() {
    const items = state.rssItems.map(item => `<li class="rss-item"><button class="rss-read-button" type="button" data-action="read-article" data-url="${esc(item.url)}" data-title="${esc(item.title)}">${esc(item.title)}</button><a class="rss-open-original" href="${esc(item.url)}" target="_blank" rel="noopener noreferrer" aria-label="Open ${esc(item.title)} on the original site">↗</a></li>`).join('');
    const entries = items ? `<ul class="rss-items">${items}</ul>` : `<p class="rss-empty">${esc(state.rssUrl ? 'No cached stories yet. Refresh when you want the latest.' : 'Add an HTTPS RSS or Atom feed to get started.')}</p>`;
    return `<article class="widget-card rss-card" data-widget="rss"><div class="card-heading"><div><p class="card-kicker">A LITTLE READING</p><h2>${esc(state.rssTitle || 'RSS feed')}</h2></div>${state.rssUrl ? '<button class="small-icon-button" type="button" data-action="refresh-rss" aria-label="Refresh feed" title="Refresh feed">↻</button>' : ''}</div>${entries}<form id="rss-form" class="rss-form"><label class="visually-hidden" for="rss-url">HTTPS RSS or Atom feed URL</label><input id="rss-url" type="url" maxlength="2048" placeholder="https://example.com/feed.xml" value="${esc(state.rssUrl)}" required><button type="submit">${state.rssUrl ? 'Load feed' : 'Add feed'}</button></form>${state.rssUrl ? '<button class="text-button clear-feed" type="button" data-action="clear-rss">Remove feed</button>' : ''}<p class="service-note">Choose a title to read extracted text here; the article site sees your IP and URL. Nothing runs or loads from the article page.</p><p class="widget-status" id="rss-status" role="status">${esc(rssStatus)}</p></article>`;
  }
  function renderStocks() {
    const rows = state.stocks.map(item => {
      const price = Number.isFinite(item.price) ? new Intl.NumberFormat(undefined, { maximumFractionDigits: 4 }).format(item.price) : '—';
      const change = Number.isFinite(item.changePercent) ? `${item.changePercent > 0 ? '+' : ''}${item.changePercent.toFixed(2)}%` : 'Not refreshed';
      const updated = item.updatedAt && Number.isFinite(Date.parse(item.updatedAt)) ? `Updated ${new Date(item.updatedAt).toLocaleString([], { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}` : 'No quote cached';
      return `<li class="stock-row"><div class="stock-quote"><strong>${esc(item.symbol)}</strong><span>${esc(price)} <small>${esc(change)}</small></span><small class="stock-updated">${esc(updated)}</small></div><div class="stock-actions"><button type="button" data-action="refresh-stock" data-symbol="${esc(item.symbol)}" aria-label="Refresh ${esc(item.symbol)}">↻</button><button type="button" data-action="remove-stock" data-symbol="${esc(item.symbol)}" aria-label="Remove ${esc(item.symbol)}">×</button></div></li>`;
    }).join('');
    return `<article class="widget-card stocks-card" data-widget="stocks"><div class="card-heading"><div><p class="card-kicker">WATCH, NOT TRADE</p><h2>Stocks</h2></div></div><ul class="stock-list">${rows || '<li class="stock-empty">Add a ticker to start a watchlist.</li>'}</ul><form class="stock-form" id="stock-form"><label class="visually-hidden" for="stock-symbol">Ticker symbol</label><input id="stock-symbol" maxlength="15" placeholder="Ticker, e.g. AAPL" autocapitalize="characters" spellcheck="false" required><button type="submit">Add</button></form><p class="service-note">End-of-day quotes from Alpha Vantage; refresh manually. Ticker, API key, and IP go directly to the provider. No trades or financial advice.</p><p class="widget-status" id="stock-status" role="status">${esc(stockStatus || (stockApiKey ? 'API key is stored only on this device.' : 'Set a personal API key in Customize to load quotes.'))}</p></article>`;
  }
  function renderCustom(item) {
    return `<article class="widget-card custom-card" data-widget="custom:${esc(item.id)}"><div class="card-heading"><div><p class="card-kicker">YOUR WIDGET</p><h2>${esc(item.title || 'Untitled')}</h2></div><button class="small-icon-button" type="button" data-action="edit-custom" data-id="${esc(item.id)}" aria-label="Edit ${esc(item.title || 'widget')}" title="Edit widget">✎</button></div><p class="custom-copy">${esc(item.body || '')}</p><button class="text-button remove-widget" data-action="remove-custom" data-id="${esc(item.id)}" type="button">Remove widget</button></article>`;
  }
  function renderBookmarks() {
    const filter = bookmarkFilter.trim().toLowerCase();
    const visible = state.bookmarks.filter(item => !filter || `${item.title} ${item.tag} ${item.url}`.toLowerCase().includes(filter));
    const rows = visible.map(item => {
      const url = safeUrl(item.url);
      if (!url) return '';
      return `<li class="bookmark-row"><a class="bookmark-link" href="${esc(url)}" target="_blank" rel="noopener noreferrer"><span class="bookmark-mark" aria-hidden="true">${esc(genericShortcutMark(url))}</span><span class="bookmark-copy"><strong>${esc(item.title)}</strong><small>${esc(item.tag || new URL(url).hostname.replace(/^www\./, ''))}</small></span><span class="bookmark-arrow" aria-hidden="true">↗</span></a><button class="bookmark-remove" type="button" data-action="remove-bookmark" data-id="${esc(item.id)}" aria-label="Remove ${esc(item.title)}">×</button></li>`;
    }).join('');
    return `<article class="widget-card bookmarks-card" data-widget="bookmarks"><div class="card-heading"><div><p class="card-kicker">SAVED ON THIS DEVICE</p><h2>Bookmarks</h2></div><span class="local-badge">LOCAL</span></div><label class="visually-hidden" for="bookmark-filter">Filter bookmarks</label><input class="bookmark-filter" id="bookmark-filter" type="search" value="${esc(bookmarkFilter)}" placeholder="Filter by title or tag…"><ul class="bookmark-list">${rows || `<li class="bookmark-empty">${state.bookmarks.length ? 'No bookmarks match that filter.' : 'Add a site you want to keep close.'}</li>`}</ul><form class="bookmark-form" id="bookmark-form"><input id="bookmark-title" maxlength="80" placeholder="Name" aria-label="Bookmark name" required><input id="bookmark-url" maxlength="2048" placeholder="website.com" aria-label="Bookmark URL" required><input id="bookmark-tag" maxlength="24" placeholder="Tag (optional)" aria-label="Optional bookmark tag"><button type="submit" aria-label="Add bookmark">＋</button></form><p class="service-note">Saved locally; no favicons or browser bookmark access. Opening a link visits that site normally.</p></article>`;
  }
  function renderCrypto() {
    const rows = state.cryptoAssets.map(item => {
      const price = Number.isFinite(item.price) ? new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD', maximumSignificantDigits: 7 }).format(item.price) : '—';
      const change = Number.isFinite(item.change24h) ? `${item.change24h > 0 ? '+' : ''}${item.change24h.toFixed(2)}%` : 'Not refreshed';
      const updated = item.updatedAt ? `Updated ${new Date(item.updatedAt).toLocaleString([], { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}` : 'No price cached';
      return `<li class="crypto-row"><div class="crypto-quote"><strong>${esc(item.symbol)} <small>${esc(item.name)}</small></strong><span>${esc(price)} <em>${esc(change)}</em></span><small class="crypto-updated">${esc(updated)}</small></div><div class="crypto-actions"><button type="button" data-action="refresh-crypto" data-id="${esc(item.id)}" aria-label="Refresh ${esc(item.symbol)}">↻</button><button type="button" data-action="remove-crypto" data-id="${esc(item.id)}" aria-label="Remove ${esc(item.symbol)}">×</button></div></li>`;
    }).join('');
    return `<article class="widget-card crypto-card" data-widget="crypto"><div class="card-heading"><div><p class="card-kicker">WATCH, NOT TRADE</p><h2>Crypto ticker</h2></div><span class="crypto-mark" aria-hidden="true">◈</span></div><ul class="crypto-list">${rows || '<li class="crypto-empty">Add a coin to start your watchlist.</li>'}</ul><form class="crypto-form" id="crypto-form"><label class="visually-hidden" for="crypto-symbol">Ticker or CoinGecko ID</label><input id="crypto-symbol" maxlength="64" placeholder="BTC or CoinGecko ID" autocapitalize="characters" spellcheck="false" required><button type="submit">Add</button></form><p class="service-note">Informational spot prices from CoinGecko. Refresh manually; coin ID and IP go directly to CoinGecko. Keyless IP rate limits are shared. No trading or advice. <a class="source-link" href="https://www.coingecko.com/en/api" target="_blank" rel="noopener noreferrer">CoinGecko API</a></p><p class="widget-status" id="crypto-status" role="status">${esc(cryptoStatus || 'Prices are not requested until you refresh a coin.')}</p></article>`;
  }
  function renderPrivacyPanel() {
    const root = $('#privacy-service-list');
    if (!root) return;
    root.replaceChildren();
    for (const [key, details] of Object.entries(PRIVACY_SERVICE_INFO)) {
      const row = document.createElement('div'); row.className = 'privacy-service-row';
      const copy = document.createElement('div'); copy.className = 'privacy-service-copy';
      const title = document.createElement('strong'); title.textContent = details.title;
      const description = document.createElement('span'); description.textContent = details.detail;
      const status = document.createElement('span'); status.className = 'privacy-service-state';
      status.textContent = IS_FIREFOX ? 'Firefox prompts when used' : (state.externalConsents[key] ? 'You approved this on this device' : 'Not approved — asks before first use');
      copy.append(title, description, status); row.append(copy); root.append(row);
    }
    const local = document.createElement('p'); local.className = 'privacy-local-summary';
    local.textContent = 'Local-only: themes, layout, wallpaper, tasks, notes, bookmarks, shortcut list, RSS cache, and crypto watchlist. Firefox Sync is optional and only available in Firefox; bookmarks and crypto data stay on this device.';
    root.append(local);
    const reset = $('#reset-provider-consents');
    reset.hidden = IS_FIREFOX;
    reset.disabled = IS_FIREFOX || !Object.values(state.externalConsents).some(Boolean);
  }
  function initCollapsibleSettings() {
    document.querySelectorAll('.setting-section').forEach(section => {
      const heading = section.querySelector(':scope > h3');
      if (!heading || section.dataset.collapsibleReady) return;
      const id = heading.textContent.trim().toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      section.dataset.settingsId = id; section.dataset.collapsibleReady = 'true';
      const button = document.createElement('button'); button.type = 'button'; button.className = 'setting-section-toggle'; button.setAttribute('aria-controls', `settings-content-${id}`);
      const label = document.createElement('span'); label.textContent = heading.textContent.trim();
      const chevron = document.createElement('span'); chevron.className = 'section-chevron'; chevron.setAttribute('aria-hidden', 'true'); chevron.textContent = '⌄';
      button.append(label, chevron); heading.replaceWith(button);
      const content = document.createElement('div'); content.className = 'setting-content'; content.id = `settings-content-${id}`;
      const inner = document.createElement('div'); inner.className = 'setting-content-inner';
      while (button.nextSibling) inner.append(button.nextSibling);
      content.append(inner); section.append(content);
      button.addEventListener('click', () => setSettingsSection(section, section.classList.contains('is-collapsed')));
    });
    applySettingsCollapseState();
  }
  function setSettingsSection(section, expanded, persist = true) {
    const id = section.dataset.settingsId;
    state.settingsCollapsed[id] = !expanded;
    section.classList.toggle('is-collapsed', !expanded);
    const button = section.querySelector(':scope > .setting-section-toggle');
    const content = section.querySelector(':scope > .setting-content');
    button?.setAttribute('aria-expanded', String(expanded));
    if (content) { content.inert = !expanded; content.setAttribute('aria-hidden', String(!expanded)); }
    if (persist) save();
  }
  function applySettingsCollapseState() {
    document.querySelectorAll('.setting-section[data-settings-id]').forEach(section => {
      const id = section.dataset.settingsId;
      const collapsed = typeof state.settingsCollapsed[id] === 'boolean' ? state.settingsCollapsed[id] : true;
      section.classList.toggle('is-collapsed', collapsed);
      const button = section.querySelector(':scope > .setting-section-toggle');
      const content = section.querySelector(':scope > .setting-content');
      button?.setAttribute('aria-expanded', String(!collapsed));
      if (content) { content.inert = collapsed; content.setAttribute('aria-hidden', String(collapsed)); }
    });
  }
  function setAllSettingsGroups(expanded) {
    document.querySelectorAll('.setting-section[data-settings-id]').forEach(section => setSettingsSection(section, expanded, false));
    save();
  }
  function applyStarterProfile(profileId, finishSetup = false) {
    const profile = STARTER_PROFILES[profileId];
    if (!profile) return false;
    state.profile = profileId;
    for (const widget of BUILT_INS) state.enabled[widget.id] = profile.widgets.includes(widget.id);
    state.layout = profile.layout; changeTheme(profile.theme);
    if (finishSetup) state.onboardingDone = true;
    render(); save();
    return true;
  }
  function renderWidgets() {
    const grid = $('#widget-grid');
    const content = state.order.map(id => {
      if (BUILT_INS.some(w => w.id === id)) {
        if (!state.enabled[id]) return '';
        if (id === 'clock') return renderClock();
        if (id === 'search') return renderSearch();
        if (id === 'shortcuts') return renderShortcuts();
        if (id === 'focus') return renderFocus();
        if (id === 'tasks') return renderTasks();
        if (id === 'pomodoro') return renderPomodoro();
        if (id === 'weather') return renderWeather();
        if (id === 'quick-notes') return renderQuickNotes();
        if (id === 'rss') return renderRss();
        if (id === 'stocks') return renderStocks();
        if (id === 'bookmarks') return renderBookmarks();
        if (id === 'crypto') return renderCrypto();
      }
      if (id.startsWith('custom:')) {
        const item = state.customWidgets.find(widget => `custom:${widget.id}` === id);
        if (item && item.enabled !== false) return renderCustom(item);
      }
      return '';
    }).join('');
    // Every widget renderer escapes user text and validates its URLs before returning markup.
    grid.innerHTML = content || '<div class="empty-welcome"><span class="empty-orbit" aria-hidden="true">✦</span><h2>A clean slate.</h2><p>Open Customize to add the pieces you want.</p><button class="primary-button" type="button" data-action="open-settings">Customize</button></div>';
    grid.querySelectorAll('[data-widget]').forEach(card => {
      card.draggable = true; card.tabIndex = 0;
      card.setAttribute('aria-label', `${card.querySelector('h2,h1')?.textContent || 'Widget'}. Drag to rearrange; focus and press Alt plus an arrow key to move.`);
    });
  }
  function renderWidgetControls() {
    const root = $('#widget-controls');
    const rows = state.order.map((id, index) => {
      const custom = id.startsWith('custom:') ? state.customWidgets.find(x => `custom:${x.id}` === id) : null;
      const builtIn = BUILT_INS.find(x => x.id === id);
      if (!custom && !builtIn) return '';
      const label = builtIn ? builtIn.label : custom.title || 'Untitled text widget';
      const on = builtIn ? state.enabled[id] : custom.enabled !== false;
      return `<div class="widget-control-row"><label class="toggle-label"><input type="checkbox" data-toggle-widget="${esc(id)}" ${on ? 'checked' : ''}><span class="toggle-ui" aria-hidden="true"></span><span>${esc(label)}</span></label><div class="order-buttons"><button type="button" data-move="${index}" data-direction="-1" aria-label="Move ${esc(label)} up" ${index === 0 ? 'disabled' : ''}>↑</button><button type="button" data-move="${index}" data-direction="1" aria-label="Move ${esc(label)} down" ${index === state.order.length - 1 ? 'disabled' : ''}>↓</button></div></div>`;
    }).join('');
    // Widget labels and IDs above are escaped/normalized and index values are numeric.
    root.innerHTML = rows || '<p class="section-hint">No widgets to arrange yet.</p>';
  }
  function widgetIsVisible(id) {
    if (BUILT_INS.some(widget => widget.id === id)) return Boolean(state.enabled[id]);
    if (!id.startsWith('custom:')) return false;
    return state.customWidgets.some(widget => `custom:${widget.id}` === id && widget.enabled !== false);
  }
  function visibleWidgetIds() { return state.order.filter(widgetIsVisible); }
  function saveVisibleOrder(ids) {
    let next = 0;
    state.order = state.order.map(id => widgetIsVisible(id) ? ids[next++] : id);
  }
  function reorderByKeyboard(card, direction) {
    const id = card.dataset.widget;
    const visible = visibleWidgetIds();
    const from = visible.indexOf(id); const to = from + direction;
    if (from < 0 || to < 0 || to >= visible.length) return;
    [visible[from], visible[to]] = [visible[to], visible[from]];
    saveVisibleOrder(visible); render(); save();
    const moved = [...$('#widget-grid').querySelectorAll('[data-widget]')].find(item => item.dataset.widget === id);
    moved?.focus(); toast(`Moved widget to position ${to + 1} of ${visible.length}.`);
  }
  function render() {
    applyAppearance();
    renderWidgets();
    const todayLabel = $('#today-label');
    if (todayLabel) todayLabel.textContent = state.displayName.trim() ? `A SPACE FOR YOU, ${state.displayName.trim()}` : 'YOUR SPACE, YOUR PACE';
    updateClock();
    renderWidgetControls();
    renderPrivacyPanel();
    applySettingsCollapseState();
    updatePomodoroDisplay();
  }
  function toast(message) {
    const box = $('#toast'); box.textContent = message; box.classList.add('visible');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => box.classList.remove('visible'), 2400);
  }
  let settingsCloseTimer;
  function openSettings() {
    clearTimeout(settingsCloseTimer);
    const panel = $('#settings-panel'); panel.classList.add('open'); panel.setAttribute('aria-hidden', 'false');
    document.body.classList.add('settings-active');
    $('#open-settings').setAttribute('aria-expanded', 'true'); $('#close-settings').focus();
  }
  function closeSettings() {
    const panel = $('#settings-panel'); panel.classList.remove('open'); panel.setAttribute('aria-hidden', 'true');
    $('#open-settings').setAttribute('aria-expanded', 'false'); $('#open-settings').focus();
    clearTimeout(settingsCloseTimer); settingsCloseTimer = setTimeout(() => document.body.classList.remove('settings-active'), 520);
  }
  function showDialog(title, eyebrow, fields, action) {
    dialogAction = action;
    $('#dialog-title').textContent = title; $('#dialog-eyebrow').textContent = eyebrow;
    // Callers supply only fixed dialog structures and escape any state-derived input values.
    $('#dialog-fields').innerHTML = fields;
    const dialog = $('#custom-dialog'); dialog.showModal();
    $('#dialog-fields input, #dialog-fields textarea')?.focus();
  }
  function addTextWidget(existing) {
    const item = existing || { id: `widget-${Date.now()}`, title: '', body: '', enabled: true };
    showDialog(existing ? 'Edit text widget' : 'Add text widget', 'YOUR OWN SPACE', `<label class="field-label" for="custom-title">Title</label><input class="dialog-input" id="custom-title" maxlength="40" required value="${esc(item.title)}" placeholder="e.g. Reading list"><label class="field-label" for="custom-body">Text</label><textarea class="dialog-input" id="custom-body" rows="5" maxlength="500" placeholder="Write a thought, reminder, or anything you want to keep nearby">${esc(item.body)}</textarea>`, result => {
      const title = $('#custom-title').value.trim() || 'Untitled';
      const body = $('#custom-body').value.trim();
      if (existing) { Object.assign(existing, { title, body }); }
      else { state.customWidgets.push({ ...item, title, body }); state.order.push(`custom:${item.id}`); }
      return true;
    });
  }
  function addShortcut() {
    showDialog('Add a shortcut', 'QUICK ACCESS', '<label class="field-label" for="link-title">Name <span class="optional-label">(optional)</span></label><input class="dialog-input" id="link-title" maxlength="24" placeholder="Leave blank to use the site name"><label class="field-label" for="link-url">Website or domain</label><input class="dialog-input" id="link-url" type="text" inputmode="url" autocomplete="url" autocapitalize="none" spellcheck="false" placeholder="youtube.com"><label class="field-label" for="link-icon">Custom icon <span class="optional-label">(optional)</span></label><input class="dialog-input" id="link-icon" maxlength="4" placeholder="Auto icon or 1–4 characters"><p class="section-hint">Paste a short domain; HTTPS is added automatically. Popular site icons are bundled locally, so there are no favicon requests.</p>', () => {
      const rawUrl = $('#link-url').value.trim();
      const url = normalizeShortcutUrl(rawUrl);
      if (!url) { toast('Enter a domain like youtube.com or a valid http(s) URL.'); $('#link-url').focus(); return false; }
      const title = $('#link-title').value.trim() || shortcutName(url);
      const glyph = $('#link-icon').value.trim().slice(0, 4);
      state.shortcuts.push({ id: `link-${Date.now()}`, title, url, glyph });
      return true;
    });
  }
  function editSearchEngine(existing) {
    const engine = existing || { id: `custom-${Date.now()}`, name: '', keyword: '', template: '' };
    showDialog(existing ? 'Edit search engine' : 'Add a search engine', 'SEARCH SHORTCUTS', `<label class="field-label" for="engine-name">Engine name</label><input class="dialog-input" id="engine-name" maxlength="32" required value="${esc(engine.name)}" placeholder="e.g. My site search"><label class="field-label" for="engine-keyword">Quick keyword</label><input class="dialog-input" id="engine-keyword" maxlength="12" required value="${esc(engine.keyword)}" placeholder="e.g. docs" autocapitalize="none" spellcheck="false"><label class="field-label" for="engine-template">HTTPS search URL template</label><input class="dialog-input" id="engine-template" maxlength="2048" required value="${esc(engine.template)}" placeholder="https://example.com/search?q={query}" autocapitalize="none" spellcheck="false"><p class="section-hint">Include exactly one <code>{query}</code>. Use it from the search bar like <code>docs offline mode</code>. Only HTTPS templates without credentials are accepted.</p>`, () => {
      const name = $('#engine-name').value.trim().slice(0, 32);
      const keyword = $('#engine-keyword').value.trim().toLowerCase();
      const template = safeSearchTemplate($('#engine-template').value.trim());
      if (!name || !/^[a-z0-9][a-z0-9_-]{0,11}$/.test(keyword) || !template) { toast('Check the engine name, keyword, and HTTPS template.'); return false; }
      if (!existing && state.customSearchEngines.length >= 50) { toast('The limit is 50 custom search engines.'); return false; }
      const conflict = allSearchEngines().find(item => item.keyword === keyword && item.id !== engine.id);
      if (conflict) { toast(`“${keyword}” is already used by ${conflict.name}.`); return false; }
      Object.assign(engine, { name, keyword, template });
      if (!existing) state.customSearchEngines.push(engine);
      return true;
    });
  }
  function editFocus() {
    showDialog('Edit focus card', 'A GENTLE REMINDER', `<label class="field-label" for="focus-text">Your reminder</label><textarea class="dialog-input" id="focus-text" rows="4" maxlength="220" placeholder="What do you want to keep in mind?">${esc(state.focusText)}</textarea>`, () => { state.focusText = $('#focus-text').value.trim(); return true; });
  }
  function submitSearch(query) {
    const q = query.trim(); if (!q) return;
    const [first, ...rest] = q.split(/\s+/);
    const keywordEngine = allSearchEngines().find(engine => engine.keyword === first.toLowerCase());
    const engine = keywordEngine || searchEngineById(state.searchProvider);
    const terms = keywordEngine ? rest.join(' ') : q;
    requestDataAndOriginPermission(['searchTerms'], [], 'search').then(granted => {
      if (!granted) { toast('Search was not sent because search-term sharing was not approved.'); return; }
      location.assign(engine.template.replace('{query}', encodeURIComponent(terms)));
    }).catch(error => { console.warn('Stilltab search permission request failed.', error); toast('Search permission could not be requested in this Firefox context.'); });
  }
  const WEATHER_ORIGINS = ['https://api.open-meteo.com/*', 'https://geocoding-api.open-meteo.com/*'];
  function requestWeatherPermission() {
    return requestDataAndOriginPermission(['locationInfo'], WEATHER_ORIGINS, 'weather');
  }
  function requestFeedPermission(url) {
    if (!globalThis.browser?.permissions?.request) return Promise.resolve(false);
    return requestDataAndOriginPermission(['websiteActivity'], [`${new URL(url).origin}/*`], 'rss');
  }
  function requestArticlePermission(url) {
    if (!globalThis.browser?.permissions?.request) return Promise.resolve(false);
    return requestDataAndOriginPermission(['websiteActivity'], [`${new URL(url).origin}/*`], 'rss');
  }
  function requestStockPermission() {
    return requestDataAndOriginPermission(['authenticationInfo', 'financialAndPaymentInfo'], ['https://www.alphavantage.co/*'], 'stocks');
  }
  async function fetchPublicText(url, acceptedTypes) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);
    try {
      const response = await fetch(url, { signal: controller.signal, credentials: 'omit', cache: 'no-store', redirect: 'error', referrerPolicy: 'no-referrer', headers: { Accept: acceptedTypes } });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const text = await response.text();
      if (text.length > 1_000_000) throw new Error('Response too large');
      return text;
    } finally { clearTimeout(timeout); }
  }
  async function refreshWeather(locationChoice, permissionRequest, cityQuery = '') {
    weatherStatus = 'Waiting for weather-site permission…'; render();
    if (cityQuery) $('#weather-city').value = cityQuery;
    try {
      if (!await permissionRequest) { weatherStatus = 'Weather access was not granted.'; render(); if (cityQuery) $('#weather-city').value = cityQuery; return; }
      let location = locationChoice;
      if (cityQuery) {
        weatherStatus = 'Looking up that city…'; render(); $('#weather-city').value = cityQuery;
        const lookup = new URL('https://geocoding-api.open-meteo.com/v1/search');
        lookup.search = new URLSearchParams({ name: cityQuery, count: '1', language: 'en', format: 'json' });
        const data = JSON.parse(await fetchPublicText(lookup, 'application/json'));
        const place = data.results?.[0];
        if (!place) throw new Error('No matching city found. Try adding its country.');
        location = { name: [place.name, place.admin1, place.country].filter(Boolean).filter((name, index, all) => all.indexOf(name) === index).join(', '), latitude: place.latitude, longitude: place.longitude };
      }
      if (!location || !Number.isFinite(location.latitude) || !Number.isFinite(location.longitude)) throw new Error('Enter a city first.');
      weatherStatus = 'Loading current conditions…'; render();
      const url = new URL('https://api.open-meteo.com/v1/forecast');
      url.search = new URLSearchParams({ latitude: String(location.latitude), longitude: String(location.longitude), current: 'temperature_2m,apparent_temperature,weather_code', temperature_unit: 'celsius', timezone: 'auto' });
      const data = JSON.parse(await fetchPublicText(url, 'application/json'));
      const current = data.current;
      if (!current || !Number.isFinite(current.temperature_2m) || !Number.isFinite(current.apparent_temperature) || !Number.isFinite(current.weather_code)) throw new Error('The weather service returned incomplete data.');
      state.weatherLocation = location;
      state.weatherCache = { temperature: current.temperature_2m, apparent: current.apparent_temperature, code: current.weather_code, updatedAt: new Date().toISOString() };
      weatherStatus = `Updated ${new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}.`;
      render(); await save();
    } catch (error) { weatherStatus = error.name === 'AbortError' ? 'Weather request timed out. Try again.' : (error.message || 'Could not load weather.'); render(); if (cityQuery) $('#weather-city').value = cityQuery; }
  }
  async function refreshRss(url, permissionRequest) {
    const parsed = safeHttpsUrl(url);
    if (!parsed) {
      rssStatus = 'Enter a standard-port HTTPS feed URL.'; render(); return;
    }
    rssStatus = 'Waiting for feed-site permission…'; render();
    $('#rss-url').value = parsed;
    try {
      if (!await permissionRequest) { rssStatus = 'Feed-site access was not granted.'; render(); $('#rss-url').value = parsed; return; }
      state.rssUrl = parsed; state.rssTitle = ''; state.rssItems = []; await save();
      rssStatus = 'Loading the feed…'; render();
      const xmlText = await fetchPublicText(parsed, 'application/atom+xml, application/rss+xml, application/xml, text/xml');
      const xml = new DOMParser().parseFromString(xmlText, 'application/xml');
      if (xml.documentElement?.localName === 'parsererror' || xml.getElementsByTagName('parsererror').length) throw new Error('The feed is not valid XML.');
      const entries = [...xml.getElementsByTagNameNS('*', 'item'), ...xml.getElementsByTagNameNS('*', 'entry')].slice(0, 8);
      if (!entries.length) throw new Error('No RSS or Atom stories were found.');
      const feedRoot = xml.getElementsByTagNameNS('*', 'channel')[0] || xml.documentElement;
      const feedTitle = feedRoot?.getElementsByTagNameNS('*', 'title')[0]?.textContent;
      const title = feedTitle?.trim().slice(0, 120) || new URL(parsed).hostname;
      const items = entries.map(entry => {
        const title = entry.getElementsByTagNameNS('*', 'title')[0]?.textContent?.trim().slice(0, 180) || 'Untitled story';
        const links = [...entry.getElementsByTagNameNS('*', 'link')];
        const linkNode = links.find(node => node.getAttribute('rel') === 'alternate' && node.getAttribute('href')) || links.find(node => node.getAttribute('href')) || links[0];
        const link = linkNode?.getAttribute('href') || linkNode?.textContent?.trim() || '';
        const url = safeHttpsUrl(link);
        return url ? { title, url } : null;
      }).filter(Boolean);
      if (!items.length) throw new Error('No secure story links were found.');
      state.rssUrl = parsed; state.rssTitle = title; state.rssItems = items;
      rssStatus = `Loaded ${items.length} stories.`; render(); await save();
    } catch (error) {
      rssStatus = error.name === 'AbortError' ? 'Feed request timed out.' : (error.message || 'Could not read this feed. It may block cross-origin access.');
      render();
    }
  }
  function extractArticleText(markup, fallbackTitle) {
    const doc = new DOMParser().parseFromString(markup, 'text/html');
    doc.querySelectorAll('script,style,nav,header,footer,aside,form,iframe,noscript,svg,canvas,template,button,dialog,[role="navigation"],[role="complementary"]').forEach(node => node.remove());
    const root = doc.querySelector('article') || doc.querySelector('main') || doc.body;
    const title = doc.querySelector('meta[property="og:title"]')?.getAttribute('content')?.trim() || root?.querySelector('h1')?.textContent?.trim() || doc.title?.trim() || fallbackTitle;
    const blocks = [...(root?.querySelectorAll('h1,h2,h3,p,blockquote,li') || [])]
      .map(node => node.textContent.replace(/\s+/g, ' ').trim())
      .filter(text => text.length >= 35)
      .filter((text, index, all) => all.indexOf(text) === index)
      .slice(0, 120);
    let text = blocks.join('\n\n');
    if (text.length < 160) text = (root?.textContent || '').replace(/\s+/g, ' ').trim();
    if (text.length < 100) throw new Error('This page did not expose enough readable article text. Try opening the original site.');
    return { title: String(title || fallbackTitle).slice(0, 180), text: text.slice(0, 20_000) };
  }
  async function openArticle(url, fallbackTitle, permissionRequest) {
    const dialog = $('#article-reader');
    $('#article-title').textContent = fallbackTitle;
    $('#article-source').textContent = new URL(url).hostname;
    $('#article-original').href = url;
    $('#article-body').textContent = 'Waiting for site permission…';
    $('#article-status').textContent = '';
    if (!dialog.open) dialog.showModal();
    try {
      if (!await permissionRequest) throw new Error('Article access was not granted.');
      $('#article-body').textContent = 'Loading article text…';
      const markup = await fetchPublicText(url, 'text/html, application/xhtml+xml');
      const article = extractArticleText(markup, fallbackTitle);
      $('#article-title').textContent = article.title;
      $('#article-body').textContent = article.text;
    } catch (error) {
      $('#article-body').textContent = '';
      $('#article-status').textContent = error.name === 'AbortError' ? 'The article request timed out.' : (error.message || 'Could not read this article.');
    }
  }
  async function readStockApiKey() {
    try {
      if (globalThis.browser?.storage?.local) return (await browser.storage.local.get('stilltabStockApiKey')).stilltabStockApiKey || '';
      return localStorage.getItem('stilltabStockApiKey') || '';
    } catch { return ''; }
  }
  async function storeStockApiKey(key) {
    if (globalThis.browser?.storage?.local) await browser.storage.local.set({ stilltabStockApiKey: key });
    else localStorage.setItem('stilltabStockApiKey', key);
    stockApiKey = key;
  }
  async function forgetStockApiKey() {
    if (globalThis.browser?.storage?.local) await browser.storage.local.remove('stilltabStockApiKey');
    else localStorage.removeItem('stilltabStockApiKey');
    stockApiKey = '';
  }
  async function refreshStock(symbol, permissionRequest) {
    const key = stockApiKey;
    if (!key) { stockStatus = 'Add and save your personal API key in Customize first.'; render(); openSettings(); $('#stock-api-key')?.focus(); return; }
    stockStatus = `Waiting for Alpha Vantage permission for ${symbol}…`; render();
    try {
      if (!await permissionRequest) throw new Error('Stock-data access was not granted.');
      const url = new URL('https://www.alphavantage.co/query');
      url.search = new URLSearchParams({ function: 'GLOBAL_QUOTE', symbol, apikey: key, datatype: 'json' });
      const response = JSON.parse(await fetchPublicText(url, 'application/json'));
      if (response.Note || response.Information || response['Error Message']) throw new Error('The provider rejected the key or rate limit. Check your Alpha Vantage key and try later.');
      const quote = response['Global Quote'];
      const price = Number(quote?.['05. price']);
      const changePercent = Number.parseFloat(String(quote?.['10. change percent'] || ''));
      if (!quote || !Number.isFinite(price) || price <= 0 || !Number.isFinite(changePercent)) throw new Error('No end-of-day quote was returned for that ticker. Check the symbol or provider response.');
      const existing = state.stocks.find(item => item.symbol === symbol);
      if (!existing) return;
      Object.assign(existing, { price, changePercent, updatedAt: new Date().toISOString() });
      stockStatus = `${symbol} updated. These are end-of-day quotes, not live prices.`;
      render(); await save();
    } catch (error) {
      stockStatus = error.name === 'AbortError' ? 'Quote request timed out. Try again later.' : (error.message || 'Could not load this quote.');
      render();
    }
  }
  const COINGECKO_ORIGINS = ['https://api.coingecko.com/*'];
  function requestCryptoPermission() { return requestDataAndOriginPermission(['financialAndPaymentInfo'], COINGECKO_ORIGINS, 'crypto'); }
  async function refreshCrypto(id, permissionRequest) {
    const asset = state.cryptoAssets.find(item => item.id === id);
    if (!asset) return;
    cryptoStatus = `Waiting for CoinGecko permission for ${asset.symbol}…`; render();
    try {
      if (!await permissionRequest) throw new Error('Crypto-data access was not granted.');
      const url = new URL('https://api.coingecko.com/api/v3/simple/price');
      url.search = new URLSearchParams({ ids: asset.id, vs_currencies: 'usd', include_24hr_change: 'true', include_last_updated_at: 'true' });
      const response = JSON.parse(await fetchPublicText(url, 'application/json'));
      const quote = response?.[asset.id];
      const price = Number(quote?.usd); const change24h = Number(quote?.usd_24h_change);
      if (!quote || !Number.isFinite(price) || price <= 0) throw new Error('CoinGecko did not return a price for that coin ID. Check the ID and try again.');
      asset.price = price; asset.change24h = Number.isFinite(change24h) ? change24h : null;
      asset.updatedAt = Number.isFinite(Number(quote.last_updated_at)) ? new Date(Number(quote.last_updated_at) * 1000).toISOString() : new Date().toISOString();
      cryptoStatus = `${asset.symbol} refreshed. Prices may be delayed and are informational only.`;
      render(); await save();
    } catch (error) {
      cryptoStatus = error.name === 'AbortError' ? 'Price request timed out. Try again later.' : (error.message || 'Could not load this price. CoinGecko may be rate-limiting shared IP traffic.');
      render();
    }
  }
  function setWidgetEnabled(id, enabled) {
    if (id.startsWith('custom:')) {
      const item = state.customWidgets.find(x => `custom:${x.id}` === id); if (item) item.enabled = enabled;
    } else state.enabled[id] = enabled;
  }
  function changeTheme(name) {
    state.theme = name;
    const saved = state.savedThemes.find(x => `saved:${x.id}` === name);
    if (saved) {
      state.accent = saved.accent; state.background = saved.background;
      state.surface = saved.surface; state.corners = saved.corners; state.font = saved.font; state.density = saved.density; state.layout = saved.layout;
      state.gradient = safeGradient(saved.gradient);
      return;
    }
    const preset = THEME_PRESETS[name];
    if (preset) {
      state.accent = preset.accent; state.background = preset.background;
      state.surface = preset.surface; state.corners = preset.corners; state.font = preset.font;
      state.density = preset.density; state.layout = preset.layout;
      state.gradient = safeGradient(preset.gradient);
    }
  }
  function leaveSavedTheme() {
    const selected = state.savedThemes.find(x => `saved:${x.id}` === state.theme);
    if (!selected) return;
    state.accent = selected.accent; state.background = selected.background;
    state.surface = selected.surface; state.corners = selected.corners; state.font = selected.font; state.density = selected.density; state.layout = selected.layout;
    state.gradient = safeGradient(selected.gradient);
    state.theme = 'custom';
  }
  function downloadJson(filename, data, message) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob); const link = document.createElement('a'); link.href = url; link.download = filename; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000); toast(message);
  }
  function downloadSettings() {
    const exportable = clone(state); delete exportable.syncEnabled; exportable.externalConsents = clone(DEFAULTS.externalConsents);
    downloadJson('stilltab-settings.json', exportable, 'Settings exported (API keys are never included).');
  }
  function downloadThemes() {
    downloadJson('stilltab-custom-themes.json', { format: 'stilltab-custom-themes', version: 1, themes: state.savedThemes }, `${state.savedThemes.length} custom theme${state.savedThemes.length === 1 ? '' : 's'} exported.`);
  }
  function downloadShortcuts() {
    downloadJson('stilltab-shortcuts.json', { format: 'stilltab-shortcuts', version: 1, shortcuts: state.shortcuts }, `${state.shortcuts.length} shortcut${state.shortcuts.length === 1 ? '' : 's'} exported.`);
  }
  function downloadBookmarks() {
    downloadJson('stilltab-bookmarks.json', { format: 'stilltab-bookmarks', version: 1, bookmarks: state.bookmarks }, `${state.bookmarks.length} bookmark${state.bookmarks.length === 1 ? '' : 's'} exported.`);
  }
  async function readBackupFile(file, maxBytes = 2_000_000) {
    if (!file || file.size > maxBytes) throw new Error('That JSON backup is too large.');
    return JSON.parse(await file.text());
  }
  async function importThemeBackup(file) {
    const data = await readBackupFile(file);
    if (data?.format !== 'stilltab-custom-themes' || data.version !== 1 || !Array.isArray(data.themes)) throw new Error('This is not a Stilltab theme backup.');
    const themes = normalize({ ...clone(DEFAULTS), savedThemes: data.themes.slice(0, 50) }).savedThemes;
    let added = 0;
    for (const theme of themes.slice(0, Math.max(0, 50 - state.savedThemes.length))) {
      const base = theme.name; let name = base; let suffix = 2;
      while (state.savedThemes.some(existing => existing.name.toLowerCase() === name.toLowerCase())) {
        const ending = ` ${suffix++}`; name = `${base.slice(0, 28 - ending.length)}${ending}`;
      }
      state.savedThemes.push({ ...theme, id: `import-${Date.now()}-${added}-${Math.random().toString(36).slice(2, 7)}`, name }); added++;
    }
    render(); await save(); toast(`${added} theme${added === 1 ? '' : 's'} imported; existing presets were kept.`);
  }
  async function importBookmarkBackup(file) {
    const data = await readBackupFile(file);
    if (data?.format !== 'stilltab-bookmarks' || data.version !== 1 || !Array.isArray(data.bookmarks)) throw new Error('This is not a Stilltab bookmark backup.');
    const incoming = data.bookmarks.slice(0, 200).map(normalizeBookmark).filter(Boolean);
    const urls = new Set(state.bookmarks.map(item => item.url)); let added = 0;
    for (const item of incoming) {
      if (state.bookmarks.length >= 200) break;
      if (urls.has(item.url)) continue;
      urls.add(item.url); state.bookmarks.push({ ...item, id: `bookmark-import-${Date.now()}-${added++}` });
    }
    render(); await save(); toast(`${added} bookmark${added === 1 ? '' : 's'} imported.`);
  }
  async function importShortcutBackup(file) {
    const data = await readBackupFile(file);
    if (data?.format !== 'stilltab-shortcuts' || data.version !== 1 || !Array.isArray(data.shortcuts)) throw new Error('This is not a Stilltab shortcut backup.');
    const shortcuts = normalize({ ...clone(DEFAULTS), shortcuts: data.shortcuts.slice(0, 200) }).shortcuts;
    const existingUrls = new Set(state.shortcuts.map(item => normalizeShortcutUrl(item.url)));
    let added = 0; let duplicates = 0;
    for (const item of shortcuts) {
      if (state.shortcuts.length >= 200) break;
      if (existingUrls.has(item.url)) { duplicates++; continue; }
      existingUrls.add(item.url);
      state.shortcuts.push({ ...item, id: `link-import-${Date.now()}-${added}` }); added++;
    }
    render(); await save(); toast(`${added} shortcut${added === 1 ? '' : 's'} imported; ${duplicates} duplicate${duplicates === 1 ? '' : 's'} skipped.`);
  }

  async function init() {
    const saved = await readSaved();
    state = normalize(saved);
    if (saved && typeof saved === 'object' && !Object.hasOwn(saved, 'onboardingDone')) {
      state.onboardingDone = true; await save();
    }
    if (!IS_FIREFOX) {
      $('#firefox-sync-section').hidden = true;
      if (state.syncEnabled) { state.syncEnabled = false; syncStatus = 'Firefox Sync is available only in Firefox. Use a JSON backup in Edge.'; }
    }
    initCollapsibleSettings();
    stockApiKey = await readStockApiKey();
    if (state.syncEnabled && IS_FIREFOX && globalThis.browser?.storage?.sync) {
      syncStatus = 'Checking Firefox Sync for updates…';
      try {
        const remote = await readSyncSnapshot();
        if (remote) {
          state = mergeSyncSnapshot(remote, state);
          lastSyncFingerprint = JSON.stringify(syncableSnapshot());
          await save({ skipSync: true });
          syncStatus = 'Firefox Sync data restored on this device.';
        } else syncStatus = 'Sync enabled. Waiting for Firefox Sync storage.';
      } catch (error) { console.warn('Stilltab could not restore Firefox Sync data.', error); syncStatus = 'Could not read Firefox Sync storage.'; }
    } else if (state.syncEnabled) {
      state.syncEnabled = false;
      syncStatus = IS_FIREFOX ? 'Firefox Sync storage is unavailable in this browser.' : 'Firefox Sync is available only in Firefox. Use a JSON backup in Edge.';
    }
    render(); updateClock(); tickPomodoro(); setInterval(updateClock, 1000); setInterval(tickPomodoro, 1000);
    if (!state.onboardingDone) $('#welcome-dialog').showModal();
    if (state.syncEnabled && !lastSyncFingerprint) scheduleSyncUpload();
    if (globalThis.browser?.storage?.onChanged?.addListener) browser.storage.onChanged.addListener((changes, area) => {
      if (area === 'sync' && state.syncEnabled && !syncWriteInProgress && Object.keys(changes).some(key => key.startsWith(SYNC_PREFIX))) {
        clearTimeout(syncPullTimer);
        syncPullTimer = setTimeout(async () => {
          try {
            const remote = await readSyncSnapshot();
            if (!remote) {
              state.syncEnabled = false; render(); await save({ skipSync: true });
              syncStatusText('The synced copy was removed elsewhere. Sync paused; local data remains.');
              return;
            }
            if (JSON.stringify(remote) === JSON.stringify(syncableSnapshot())) return;
            state = mergeSyncSnapshot(remote, state);
            lastSyncFingerprint = JSON.stringify(syncableSnapshot());
            render(); await save({ skipSync: true });
            syncStatusText('A Firefox Sync update was applied.');
          } catch (error) { console.warn('Stilltab could not apply a Firefox Sync update.', error); }
        }, 180);
      }
      const remoteTimer = area === 'local' ? changes.stilltab?.newValue?.pomodoro : null;
      if (!remoteTimer) return;
      const next = normalizePomodoro(remoteTimer);
      if (next.running !== state.pomodoro.running || next.endsAt !== state.pomodoro.endsAt || next.mode !== state.pomodoro.mode || next.remaining !== state.pomodoro.remaining) {
        state.pomodoro = next; updatePomodoroDisplay();
      }
    });
    $('#open-settings').addEventListener('click', openSettings);
    $('#close-settings').addEventListener('click', closeSettings);
    $('#panel-scrim').addEventListener('click', closeSettings);
    $('#sync-enabled').addEventListener('change', event => setSyncEnabled(event.target.checked));
    $('#delete-sync-copy').addEventListener('click', deleteSyncCopy);
    $('#starter-profile-apply').addEventListener('click', () => {
      if (applyStarterProfile($('#starter-profile-select').value)) toast(`${STARTER_PROFILES[state.profile].name} profile applied. Your saved data was kept.`);
    });
    $('#expand-settings').addEventListener('click', () => setAllSettingsGroups(true));
    $('#collapse-settings').addEventListener('click', () => setAllSettingsGroups(false));
    $('#reset-provider-consents').addEventListener('click', async () => {
      state.externalConsents = clone(DEFAULTS.externalConsents); renderPrivacyPanel(); await save();
      toast('Stilltab will ask again before external providers are used. Browser origin permissions are managed separately.');
    });
    $('#welcome-dialog').addEventListener('click', event => {
      const choice = event.target.closest('[data-profile-choice]');
      if (choice) { applyStarterProfile(choice.dataset.profileChoice, true); closeDialogSmoothly($('#welcome-dialog'), 'chosen'); }
      if (event.target.closest('#skip-onboarding')) { applyStarterProfile('minimal', true); closeDialogSmoothly($('#welcome-dialog'), 'skipped'); }
    });
    $('#welcome-dialog').addEventListener('cancel', event => { event.preventDefault(); applyStarterProfile('minimal', true); closeDialogSmoothly($('#welcome-dialog'), 'skipped'); });
    $('#save-stock-key').addEventListener('click', async () => {
      const key = $('#stock-api-key').value.trim();
      if (!/^[A-Za-z0-9_-]{5,80}$/.test(key)) { toast('Enter a valid-looking Alpha Vantage API key.'); $('#stock-api-key').focus(); return; }
      try { await storeStockApiKey(key); stockStatus = ''; $('#stock-api-key').value = ''; render(); toast('API key saved on this device only.'); }
      catch { toast('Could not save the API key locally.'); }
    });
    $('#export-bookmarks').addEventListener('click', downloadBookmarks);
    $('#import-bookmarks').addEventListener('click', () => $('#import-bookmarks-file').click());
    $('#import-bookmarks-file').addEventListener('change', async event => {
      const file = event.target.files?.[0]; if (!file) return;
      try { await importBookmarkBackup(file); } catch (error) { toast(error.message || 'That bookmark backup could not be read.'); }
      event.target.value = '';
    });
    $('#forget-stock-key').addEventListener('click', async () => {
      try { await forgetStockApiKey(); stockStatus = 'Saved API key forgotten on this device.'; render(); toast('Saved stock API key removed.'); }
      catch { toast('Could not remove the saved API key.'); }
    });
    $('#theme-cycle').addEventListener('click', async () => {
      const themes = Object.keys(THEME_PRESETS);
      changeTheme(themes[(themes.indexOf(state.theme) + 1) % themes.length]); render(); await save();
    });
    $('#theme-select').addEventListener('change', async e => { changeTheme(e.target.value); render(); await save(); });
    $('#accent-color').addEventListener('input', e => { leaveSavedTheme(); state.accent = e.target.value; state.theme = 'custom'; render(); save(); });
    $('#background-color').addEventListener('input', e => { leaveSavedTheme(); state.background = e.target.value; state.gradient.enabled = false; state.theme = 'custom'; render(); save(); });
    const gradientDraft = () => ({
      enabled: true, kind: $('#gradient-kind').value,
      angle: Number($('#gradient-angle').value),
      colors: [$('#gradient-color-1').value, $('#gradient-color-2').value, $('#gradient-color-3').value]
    });
    const updateGradientPreview = () => {
      const gradient = gradientDraft(); const colors = gradient.colors.join(', ');
      $('#gradient-preview').style.background = gradient.kind === 'radial' ? `radial-gradient(circle at 24% 18%, ${colors})` : `linear-gradient(${gradient.angle}deg, ${colors})`;
      $('#gradient-angle-value').textContent = `${gradient.angle}°`;
    };
    for (const selector of ['#gradient-kind', '#gradient-angle', '#gradient-color-1', '#gradient-color-2', '#gradient-color-3']) $(selector).addEventListener('input', updateGradientPreview);
    $('#apply-gradient').addEventListener('click', async () => { leaveSavedTheme(); state.gradient = gradientDraft(); state.theme = 'custom'; render(); await save(); toast('Gradient applied.'); });
    $('#clear-gradient').addEventListener('click', async () => { leaveSavedTheme(); state.gradient.enabled = false; state.theme = 'custom'; render(); await save(); });
    $('#apply-custom-css').addEventListener('click', async () => {
      const css = sanitizeCustomCss($('#custom-css').value);
      if (css === null) { toast('Blocked unsafe CSS. Remove @-rules, URLs, and external-resource functions.'); return; }
      state.customCss = css; state.customCssEnabled = Boolean(css.trim());
      render(); await save(); toast(state.customCssEnabled ? 'Custom CSS applied locally.' : 'Custom CSS cleared and turned off.');
    });
    $('#toggle-custom-css').addEventListener('click', async () => {
      if (!state.customCss.trim()) return;
      state.customCssEnabled = !state.customCssEnabled;
      render(); await save();
      toast(state.customCssEnabled ? 'Custom CSS turned on.' : 'Custom CSS turned off. Your code is still saved locally.');
    });
    $('#clear-custom-css').addEventListener('click', async () => {
      state.customCss = ''; state.customCssEnabled = false;
      render(); await save(); toast('Custom CSS cleared. Stilltab’s default styling is restored.');
    });
    $('#save-theme').addEventListener('click', () => {
      showDialog('Save a theme preset', 'KEEP THIS LOOK', '<label class="field-label" for="saved-theme-name">Preset name</label><input class="dialog-input" id="saved-theme-name" maxlength="28" required placeholder="e.g. Ocean glass">', () => {
        const name = $('#saved-theme-name').value.trim();
        if (!name) return false;
        if (state.savedThemes.length >= 50) { toast('The limit is 50 saved themes.'); return false; }
        const theme = { id: `theme-${Date.now()}`, name, accent: state.accent, background: state.background, surface: state.surface, corners: state.corners, font: state.font, density: state.density, layout: state.layout, gradient: safeGradient(state.gradient) };
        state.savedThemes.push(theme); state.theme = `saved:${theme.id}`; return true;
      });
    });
    $('#delete-theme').addEventListener('click', async () => {
      const selected = state.savedThemes.find(x => `saved:${x.id}` === state.theme);
      if (!selected) return;
      state.savedThemes = state.savedThemes.filter(x => x.id !== selected.id); changeTheme('dusk'); render(); await save(); toast('Theme preset deleted.');
    });
    for (const [selector, key] of [['#surface-select', 'surface'], ['#corners-select', 'corners'], ['#font-select', 'font'], ['#density-select', 'density'], ['#layout-select', 'layout'], ['#search-provider', 'searchProvider']]) {
      $(selector).addEventListener('change', async e => { if (key !== 'searchProvider') leaveSavedTheme(); state[key] = e.target.value; render(); await save(); });
    }
    $('#display-name').addEventListener('input', async e => {
      state.displayName = e.target.value.slice(0, 30);
      const todayLabel = $('#today-label');
      if (todayLabel) todayLabel.textContent = state.displayName.trim() ? `A SPACE FOR YOU, ${state.displayName.trim()}` : 'YOUR SPACE, YOUR PACE';
      await save();
    });
    $('#widget-grid').addEventListener('input', event => {
      if (event.target.id === 'bookmark-filter') {
        bookmarkFilter = event.target.value;
        const filter = bookmarkFilter.trim().toLowerCase();
        event.target.closest('.bookmarks-card').querySelectorAll('.bookmark-row').forEach(row => { row.hidden = !row.textContent.toLowerCase().includes(filter); });
        return;
      }
      if (event.target.id !== 'quick-notes-text') return;
      state.quickNotes = event.target.value.slice(0, 6000);
      clearTimeout(noteSaveTimer); noteSaveTimer = setTimeout(save, 250);
    });
    $('#widget-grid').addEventListener('focusout', event => {
      if (event.target.id !== 'quick-notes-text') return;
      clearTimeout(noteSaveTimer); save();
    });
    $('#add-note').addEventListener('click', () => addTextWidget());
    $('#add-link').addEventListener('click', addShortcut);
    $('#add-search-engine').addEventListener('click', () => editSearchEngine());
    $('#custom-search-engines').addEventListener('click', async event => {
      const edit = event.target.closest('[data-edit-search-engine]');
      if (edit) { const engine = state.customSearchEngines.find(item => item.id === edit.dataset.editSearchEngine); if (engine) editSearchEngine(engine); return; }
      const remove = event.target.closest('[data-remove-search-engine]');
      if (!remove) return;
      const id = remove.dataset.removeSearchEngine;
      state.customSearchEngines = state.customSearchEngines.filter(item => item.id !== id);
      if (state.searchProvider === id) state.searchProvider = 'duckduckgo';
      render(); await save(); toast('Custom search engine removed.');
    });
    $('#choose-background').addEventListener('click', () => $('#background-file').click());
    $('#background-file').addEventListener('change', async event => {
      const file = event.target.files?.[0]; if (!file) return;
      try {
        state.backgroundImage = await compressBackgroundImage(file);
        render(); await save(); toast('Background saved locally in this browser.');
      } catch (error) { toast(error.message || 'Could not use that background image.'); }
      event.target.value = '';
    });
    $('#remove-background').addEventListener('click', async () => { state.backgroundImage = ''; render(); await save(); toast('Device background removed.'); });
    $('#background-overlay').addEventListener('input', event => {
      state.backgroundOverlay = Math.max(0, Math.min(75, Number(event.target.value) || 0)); applyBackgroundLayer();
    });
    $('#background-overlay').addEventListener('change', save);
    for (const [id, key, mode, min, max] of [
      ['pomodoro-focus-minutes', 'focusMinutes', 'focus', 5, 90],
      ['pomodoro-short-minutes', 'shortBreakMinutes', 'shortBreak', 1, 30],
      ['pomodoro-long-minutes', 'longBreakMinutes', 'longBreak', 5, 60]
    ]) $(`#${id}`).addEventListener('change', async event => {
      const timer = state.pomodoro; const oldDuration = pomodoroDuration(mode);
      const minutes = Math.max(min, Math.min(max, Math.round(Number(event.target.value) || min)));
      event.target.value = minutes; timer[key] = minutes;
      if (timer.mode === mode && !timer.running && timer.remaining === oldDuration) timer.remaining = pomodoroDuration(mode);
      updatePomodoroDisplay(); await save();
    });
    $('#widget-controls').addEventListener('change', async event => {
      const id = event.target.dataset.toggleWidget; if (!id) return;
      setWidgetEnabled(id, event.target.checked); render(); await save();
    });
    $('#widget-controls').addEventListener('click', async event => {
      const button = event.target.closest('[data-move]'); if (!button) return;
      const index = Number(button.dataset.move); const target = index + Number(button.dataset.direction);
      if (target < 0 || target >= state.order.length) return;
      [state.order[index], state.order[target]] = [state.order[target], state.order[index]]; render(); await save();
    });
    $('#widget-grid').addEventListener('click', async event => {
      const modeButton = event.target.closest('[data-pomodoro-mode]');
      if (modeButton) {
        const timer = state.pomodoro; timer.mode = modeButton.dataset.pomodoroMode; timer.running = false; timer.endsAt = null; timer.remaining = pomodoroDuration();
        render(); await save(); return;
      }
      const action = event.target.closest('[data-action]')?.dataset.action;
      if (action === 'next-quote') { state.quoteOffset = (state.quoteOffset + 1) % MOTIVATIONAL_QUOTES.length; render(); await save(); toast('Another thought for today.'); }
      if (action === 'add-link') addShortcut();
      if (action === 'edit-focus') editFocus();
      if (action === 'edit-pomodoro-duration') editPomodoroDuration();
      if (action === 'open-settings') openSettings();
      if (action === 'remove-shortcut') {
        const id = event.target.closest('[data-id]')?.dataset.id;
        if (id) { state.shortcuts = state.shortcuts.filter(item => item.id !== id); render(); await save(); toast('Shortcut removed.'); }
      }
      if (action === 'toggle-pomodoro') {
        const timer = state.pomodoro;
        if (timer.running) { timer.remaining = pomodoroRemaining(); timer.running = false; timer.endsAt = null; }
        else { if (timer.remaining <= 0) timer.remaining = pomodoroDuration(); timer.running = true; timer.endsAt = Date.now() + timer.remaining * 1000; }
        updatePomodoroDisplay(); await save();
      }
      if (action === 'reset-pomodoro') {
        const timer = state.pomodoro; timer.running = false; timer.endsAt = null; timer.remaining = pomodoroDuration();
        updatePomodoroDisplay(); await save(); toast('Timer reset.');
      }
      if (action === 'remove-task') {
        const id = event.target.closest('[data-id]').dataset.id;
        state.tasks = state.tasks.filter(task => task.id !== id); render(); await save();
      }
      if (action === 'refresh-weather') {
        if (!Number.isFinite(state.weatherLocation.latitude)) { $('#weather-city')?.focus(); toast('Enter a city first.'); return; }
        refreshWeather(state.weatherLocation, requestWeatherPermission());
      }
      if (action === 'refresh-rss' && state.rssUrl) refreshRss(state.rssUrl, requestFeedPermission(state.rssUrl));
      if (action === 'read-article') {
        const button = event.target.closest('[data-action="read-article"]');
        const url = safeHttpsUrl(button?.dataset.url);
        if (url) openArticle(url, button.dataset.title || 'Article', requestArticlePermission(url));
      }
      if (action === 'refresh-stock') {
        const symbol = normalizeStockSymbol(event.target.closest('[data-action="refresh-stock"]')?.dataset.symbol);
        if (symbol) refreshStock(symbol, requestStockPermission());
      }
      if (action === 'remove-bookmark') {
        const id = event.target.closest('[data-id]')?.dataset.id;
        if (id) { state.bookmarks = state.bookmarks.filter(item => item.id !== id); render(); await save(); toast('Bookmark removed.'); }
      }
      if (action === 'refresh-crypto') {
        const id = normalizeCoinId(event.target.closest('[data-id]')?.dataset.id);
        if (id) refreshCrypto(id, requestCryptoPermission());
      }
      if (action === 'remove-crypto') {
        const id = normalizeCoinId(event.target.closest('[data-id]')?.dataset.id);
        if (id) { state.cryptoAssets = state.cryptoAssets.filter(item => item.id !== id); render(); await save(); toast('Coin removed from the local watchlist.'); }
      }
      if (action === 'remove-stock') {
        const symbol = normalizeStockSymbol(event.target.closest('[data-action="remove-stock"]')?.dataset.symbol);
        if (symbol) { state.stocks = state.stocks.filter(item => item.symbol !== symbol); render(); await save(); toast(`${symbol} removed from your watchlist.`); }
      }
      if (action === 'clear-rss') {
        const oldUrl = state.rssUrl;
        state.rssUrl = ''; state.rssTitle = ''; state.rssItems = []; rssStatus = 'Feed removed.';
        render(); await save();
        if (oldUrl && globalThis.browser?.permissions?.remove) {
          try { await browser.permissions.remove({ origins: [`${new URL(oldUrl).origin}/*`] }); } catch {}
        }
      }
      if (action === 'remove-custom') {
        const id = event.target.closest('[data-id]').dataset.id;
        state.customWidgets = state.customWidgets.filter(x => x.id !== id); state.order = state.order.filter(x => x !== `custom:${id}`); render(); save(); toast('Widget removed.');
      }
      if (action === 'edit-custom') {
        const id = event.target.closest('[data-id]').dataset.id; const item = state.customWidgets.find(x => x.id === id); if (item) addTextWidget(item);
      }
    });
    $('#widget-grid').addEventListener('change', async event => {
      const id = event.target.dataset.taskToggle;
      if (!id) return;
      const task = state.tasks.find(item => item.id === id);
      if (!task) return;
      task.done = event.target.checked; render(); await save();
    });
    $('#widget-grid').addEventListener('dragstart', event => {
      const card = event.target.closest('[data-widget]');
      if (!card || event.target.closest('button,input,textarea,select,a')) { event.preventDefault(); return; }
      draggedCard = card; card.classList.add('is-dragging');
      event.dataTransfer.effectAllowed = 'move'; event.dataTransfer.setData('text/plain', card.dataset.widget);
    });
    $('#widget-grid').addEventListener('dragover', event => {
      const target = event.target.closest('[data-widget]');
      if (!draggedCard || !target || target === draggedCard) return;
      event.preventDefault();
      const bounds = target.getBoundingClientRect();
      const pastVerticalMidpoint = event.clientY > bounds.top + bounds.height / 2;
      const sameRow = event.clientY >= bounds.top && event.clientY <= bounds.bottom;
      const after = pastVerticalMidpoint || (sameRow && event.clientX > bounds.left + bounds.width / 2);
      target.classList.toggle('drop-after', after); target.classList.toggle('drop-before', !after);
      $('#widget-grid').insertBefore(draggedCard, after ? target.nextSibling : target);
    });
    $('#widget-grid').addEventListener('dragleave', event => event.target.closest('[data-widget]')?.classList.remove('drop-before', 'drop-after'));
    $('#widget-grid').addEventListener('drop', async event => {
      if (!draggedCard) return;
      event.preventDefault();
      const nextOrder = [...$('#widget-grid').querySelectorAll('[data-widget]')].map(card => card.dataset.widget);
      saveVisibleOrder(nextOrder); draggedCard.classList.remove('is-dragging'); draggedCard = null;
      render(); await save();
    });
    $('#widget-grid').addEventListener('dragend', () => {
      draggedCard?.classList.remove('is-dragging', 'drop-before', 'drop-after'); draggedCard = null;
      $('#widget-grid').querySelectorAll('.drop-before,.drop-after').forEach(card => card.classList.remove('drop-before', 'drop-after'));
    });
    $('#widget-grid').addEventListener('keydown', event => {
      const card = event.target.closest('[data-widget]');
      if (!card || event.target !== card || !event.altKey || !['ArrowUp', 'ArrowDown'].includes(event.key)) return;
      event.preventDefault(); reorderByKeyboard(card, event.key === 'ArrowUp' ? -1 : 1);
    });
    $('#custom-form').addEventListener('submit', async event => {
      event.preventDefault();
      if (dialogAction && dialogAction()) { closeDialogSmoothly($('#custom-dialog'), 'save'); render(); await save(); toast('Saved on this device.'); }
    });
    $('#custom-dialog').addEventListener('cancel', event => { event.preventDefault(); closeDialogSmoothly($('#custom-dialog'), 'cancel'); });
    $('#article-reader').addEventListener('cancel', event => { event.preventDefault(); closeDialogSmoothly($('#article-reader'), 'cancel'); });
    $('#provider-consent-dialog').addEventListener('cancel', event => { event.preventDefault(); closeDialogSmoothly($('#provider-consent-dialog'), 'denied'); });
    $('#custom-dialog').addEventListener('click', event => {
      const dialog = $('#custom-dialog');
      if (event.target === dialog || event.target.closest('[data-dialog-close]')) closeDialogSmoothly(dialog, 'cancel');
    });
    $('#article-reader').addEventListener('click', event => {
      const dialog = $('#article-reader');
      if (event.target === dialog || event.target.closest('[data-article-close]')) closeDialogSmoothly(dialog, 'cancel');
    });
    $('#custom-dialog').addEventListener('close', () => { dialogAction = null; });
    $('#export-settings').addEventListener('click', downloadSettings);
    $('#import-settings').addEventListener('click', () => $('#import-file').click());
    $('#export-themes').addEventListener('click', downloadThemes);
    $('#import-themes').addEventListener('click', () => $('#import-themes-file').click());
    $('#import-themes-file').addEventListener('change', async event => {
      const file = event.target.files?.[0]; if (!file) return;
      try { await importThemeBackup(file); } catch (error) { toast(error.message || 'That theme backup could not be read.'); }
      event.target.value = '';
    });
    $('#export-shortcuts').addEventListener('click', downloadShortcuts);
    $('#import-shortcuts').addEventListener('click', () => $('#import-shortcuts-file').click());
    $('#import-shortcuts-file').addEventListener('change', async event => {
      const file = event.target.files?.[0]; if (!file) return;
      try { await importShortcutBackup(file); } catch (error) { toast(error.message || 'That shortcut backup could not be read.'); }
      event.target.value = '';
    });
    $('#import-file').addEventListener('change', async event => {
      const file = event.target.files?.[0]; if (!file) return;
      try { const syncEnabled = state.syncEnabled; const externalConsents = clone(state.externalConsents); state = normalize(await readBackupFile(file, 30_000_000)); state.syncEnabled = syncEnabled; state.externalConsents = externalConsents; state.onboardingDone = true; render(); await save(); toast('Settings imported. API keys and provider approvals are not included.'); }
      catch (error) { toast(error.message || 'That settings file could not be read.'); }
      event.target.value = '';
    });
    $('#reset-settings').addEventListener('click', async () => {
      clearTimeout(syncSaveTimer); await forgetStockApiKey(); state = clone(DEFAULTS);
      syncStatusText('Off on this device. Any prior Firefox Sync copy remains in your account.');
      render(); await save(); $('#welcome-dialog').showModal(); toast('Choose a starter profile; prior Sync data was not deleted.');
    });
    document.addEventListener('keydown', event => { if (event.key === 'Escape' && !$('#custom-dialog').open && !$('#article-reader').open && !$('#provider-consent-dialog').open && !$('#welcome-dialog').open && $('#settings-panel').classList.contains('open')) closeSettings(); });
    document.addEventListener('submit', async event => {
      if (event.target.id === 'search-form') { event.preventDefault(); submitSearch($('#search-input').value); }
      if (event.target.id === 'task-form') {
        event.preventDefault();
        const input = $('#task-input'); const title = input.value.trim();
        if (!title) return;
        state.tasks.push({ id: `task-${Date.now()}`, title: title.slice(0, 120), done: false });
        render(); await save();
      }
      if (event.target.id === 'weather-form') {
        event.preventDefault(); const city = $('#weather-city').value.trim(); if (!city) return;
        const permission = requestWeatherPermission(); refreshWeather(state.weatherLocation, permission, city);
      }
      if (event.target.id === 'rss-form') {
        event.preventDefault(); const raw = $('#rss-url').value.trim(); const url = safeHttpsUrl(raw);
        if (!url) {
          rssStatus = 'Enter a standard-port HTTPS feed URL.'; render(); $('#rss-url').value = raw; return;
        }
        const permission = requestFeedPermission(url); refreshRss(url, permission);
      }
      if (event.target.id === 'bookmark-form') {
        event.preventDefault();
        const title = $('#bookmark-title').value.trim(); const rawUrl = $('#bookmark-url').value.trim();
        const url = normalizeShortcutUrl(rawUrl); const tag = $('#bookmark-tag').value.trim().slice(0, 24);
        if (!url) { toast('Enter a site like example.com or a valid http(s) URL.'); $('#bookmark-url').focus(); return; }
        if (!title) { toast('Give the bookmark a short name.'); $('#bookmark-title').focus(); return; }
        if (state.bookmarks.length >= 200) { toast('The local bookmark limit is 200.'); return; }
        if (state.bookmarks.some(item => item.url === url)) { toast('That URL is already saved.'); return; }
        state.bookmarks.push({ id: `bookmark-${Date.now()}`, title: title.slice(0, 80), url, tag });
        render(); await save(); toast('Bookmark saved locally.');
      }
      if (event.target.id === 'crypto-form') {
        event.preventDefault();
        const descriptor = coinDescriptor($('#crypto-symbol').value);
        if (!descriptor) { toast('Use a ticker such as BTC or a CoinGecko ID such as bitcoin.'); return; }
        if (state.cryptoAssets.some(item => item.id === descriptor.id)) { toast(`${descriptor.symbol} is already on your watchlist.`); return; }
        if (state.cryptoAssets.length >= 20) { toast('The crypto watchlist limit is 20 coins.'); return; }
        state.cryptoAssets.push({ ...descriptor, price: null, change24h: null, updatedAt: '' });
        cryptoStatus = `${descriptor.symbol} added. Refresh it to request a price from CoinGecko.`;
        render(); await save();
      }
      if (event.target.id === 'stock-form') {
        event.preventDefault();
        const symbol = normalizeStockSymbol($('#stock-symbol').value);
        if (!symbol) { toast('Enter a valid ticker such as AAPL or BRK.B.'); return; }
        if (state.stocks.some(item => item.symbol === symbol)) { toast(`${symbol} is already on your watchlist.`); return; }
        if (state.stocks.length >= 20) { toast('The watchlist limit is 20 tickers.'); return; }
        state.stocks.push({ symbol, price: null, changePercent: null, updatedAt: '' });
        stockStatus = `${symbol} added. Refresh it to request an end-of-day quote.`;
        render(); await save();
      }
    });
  }
  init();
})();
