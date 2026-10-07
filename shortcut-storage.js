(() => {
  'use strict';

  const STORAGE_KEY = 'stilltab';
  const MAX_SHORTCUTS = 200;
  const MAX_ICON_DATA_URL_CHARS = 6_000;
  const api = globalThis.browser ?? globalThis.chrome;

  function normalizeShortcutUrl(value) {
    const raw = String(value ?? '').trim();
    if (!raw) return null;
    const candidate = /^[a-z][a-z\d+.-]*:/i.test(raw) ? raw : `https://${raw}`;
    try {
      const url = new URL(candidate);
      if (!['https:', 'http:'].includes(url.protocol) || !url.hostname || url.username || url.password) return null;
      return url.href;
    } catch {
      return null;
    }
  }

  function safeIconDataUrl(value) {
    if (typeof value !== 'string' || value.length > MAX_ICON_DATA_URL_CHARS) return '';
    return /^data:image\/(?:png|jpeg|webp|gif|x-icon);base64,[A-Za-z0-9+/]+={0,2}$/i.test(value) ? value : '';
  }

  function normalizeShortcutRecord(value) {
    if (!value || typeof value !== 'object') return null;
    const url = normalizeShortcutUrl(value.url);
    if (!url) return null;
    let title = typeof value.title === 'string' ? value.title.trim().slice(0, 24) : '';
    if (!title) {
      try { title = new URL(url).hostname.replace(/^www\./i, '').split('.')[0].replace(/[-_]+/g, ' ').slice(0, 24); }
      catch { title = 'Shortcut'; }
    }
    return {
      id: typeof value.id === 'string' && /^[\w-]{1,64}$/.test(value.id) ? value.id : `link-${crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`}`,
      title,
      url,
      glyph: typeof value.glyph === 'string' ? value.glyph.trim().slice(0, 4) : '',
      faviconDataUrl: safeIconDataUrl(value.faviconDataUrl)
    };
  }

  async function readState() {
    if (!api?.storage?.local) throw new Error('Local extension storage is unavailable.');
    const result = await api.storage.local.get(STORAGE_KEY);
    return result?.[STORAGE_KEY] && typeof result[STORAGE_KEY] === 'object' ? result[STORAGE_KEY] : {};
  }

  async function getShortcuts() {
    const state = await readState();
    return (Array.isArray(state.shortcuts) ? state.shortcuts : [])
      .map(normalizeShortcutRecord).filter(Boolean).slice(0, MAX_SHORTCUTS);
  }

  async function addShortcut(record) {
    const state = await readState();
    const shortcuts = (Array.isArray(state.shortcuts) ? state.shortcuts : [])
      .map(normalizeShortcutRecord).filter(Boolean).slice(0, MAX_SHORTCUTS);
    const incoming = normalizeShortcutRecord(record);
    if (!incoming) return { ok: false, reason: 'invalid-url' };

    const existing = shortcuts.find(item => item.url === incoming.url);
    if (existing) {
      if (!existing.faviconDataUrl && incoming.faviconDataUrl) existing.faviconDataUrl = incoming.faviconDataUrl;
      await api.storage.local.set({ [STORAGE_KEY]: { ...state, shortcuts } });
      return { ok: true, duplicate: true, shortcut: existing };
    }
    if (shortcuts.length >= MAX_SHORTCUTS) return { ok: false, reason: 'limit' };

    shortcuts.push(incoming);
    await api.storage.local.set({ [STORAGE_KEY]: { ...state, shortcuts } });
    return { ok: true, duplicate: false, shortcut: incoming };
  }

  globalThis.StilltabShortcutStorage = Object.freeze({
    MAX_SHORTCUTS,
    normalizeShortcutUrl,
    normalizeShortcutRecord,
    getShortcuts,
    addShortcut
  });
})();
