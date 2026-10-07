(() => {
  'use strict';

  const isFirefox = /Firefox\//i.test(globalThis.navigator?.userAgent ?? '');
  const MAX_ICON_BYTES = 4_096;
  const SAFE_IMAGE_TYPES = new Set(['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/x-icon', 'image/vnd.microsoft.icon']);

  function normalizePageUrl(pageUrl) {
    try {
      const url = new URL(pageUrl);
      return ['https:', 'http:'].includes(url.protocol) && url.hostname && !url.username && !url.password ? url.href : '';
    } catch {
      return '';
    }
  }

  function safeStoredIcon(value) {
    return typeof value === 'string' && value.length <= 6_000 &&
      /^data:image\/(?:png|jpeg|webp|gif|x-icon);base64,[A-Za-z0-9+/]+={0,2}$/i.test(value) ? value : '';
  }

  function safeRemoteIcon(value) {
    if (typeof value !== 'string' || value.length > 2_048) return '';
    try {
      const url = new URL(value);
      return url.protocol === 'https:' && !url.username && !url.password ? url.href : '';
    } catch {
      return '';
    }
  }

  function getFaviconUrl(pageUrl, options = {}) {
    const normalizedPageUrl = normalizePageUrl(pageUrl);
    if (!normalizedPageUrl) return '';

    if (!isFirefox) {
      const runtime = globalThis.chrome?.runtime ?? globalThis.browser?.runtime;
      if (runtime?.getURL) {
        const endpoint = new URL(runtime.getURL('/_favicon/'));
        endpoint.searchParams.set('pageUrl', normalizedPageUrl);
        endpoint.searchParams.set('size', String(Math.max(16, Math.min(128, Number(options.size) || 64))));
        return endpoint.href;
      }
    }

    // Firefox has no equivalent local favicon endpoint. Prefer the small icon
    // captured from the active tab when the user explicitly saves that shortcut.
    const cached = safeStoredIcon(options.faviconDataUrl);
    if (cached) return cached;

    // Optional and OFF by default: this discloses the shortcut host to Google.
    if (options.allowPublicFallback === true) {
      const url = new URL('https://www.google.com/s2/favicons');
      url.searchParams.set('domain_url', new URL(normalizedPageUrl).origin);
      url.searchParams.set('sz', String(Math.max(16, Math.min(128, Number(options.size) || 64))));
      return url.href;
    }
    return '';
  }

  function readBlobAsDataUrl(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(reader.error || new Error('Could not read favicon data.'));
      reader.onload = () => resolve(typeof reader.result === 'string' ? reader.result : '');
      reader.readAsDataURL(blob);
    });
  }

  async function captureActiveTabFavicon(tab) {
    if (!isFirefox || !tab || typeof tab.url !== 'string' || typeof tab.favIconUrl !== 'string') return '';
    const pageUrl = normalizePageUrl(tab.url);
    if (!pageUrl) return '';

    let iconAddress = tab.favIconUrl.trim();
    const inlineIcon = safeStoredIcon(iconAddress);
    if (inlineIcon) return inlineIcon;
    // Firefox may expose its internal annotation scheme around a regular site URL.
    if (iconAddress.startsWith('moz-anno:favicon:')) iconAddress = iconAddress.slice('moz-anno:favicon:'.length);
    const iconUrl = safeRemoteIcon(iconAddress);
    if (!iconUrl) return '';

    try {
      const pageOrigin = new URL(pageUrl).origin;
      const iconOrigin = new URL(iconUrl).origin;
      // Only cache same-origin HTTPS favicons. Cross-origin icons use the
      // monogram fallback rather than expanding permissions or calling a service.
      if (pageOrigin !== iconOrigin || !pageUrl.startsWith('https:')) return '';
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 2_500);
      let response;
      try {
        response = await fetch(iconUrl, {
          method: 'GET',
          credentials: 'omit',
          cache: 'force-cache',
          redirect: 'error',
          referrerPolicy: 'no-referrer',
          signal: controller.signal
        });
      } finally { clearTimeout(timeout); }
      if (!response.ok) return '';
      const type = (response.headers.get('content-type') || '').split(';', 1)[0].trim().toLowerCase();
      if (!SAFE_IMAGE_TYPES.has(type)) return '';
      const blob = await response.blob();
      if (!blob.size || blob.size > MAX_ICON_BYTES) return '';
      return safeStoredIcon(await readBlobAsDataUrl(blob));
    } catch {
      return '';
    }
  }

  globalThis.StilltabShortcutFavicon = Object.freeze({
    getFaviconUrl,
    captureActiveTabFavicon,
    isFirefox
  });
})();
