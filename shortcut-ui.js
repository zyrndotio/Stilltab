(() => {
  'use strict';

  function monogram(url) {
    try {
      const label = new URL(url).hostname.replace(/^www\./i, '').split('.')[0].replace(/[^\p{L}\p{N}]/gu, '');
      return Array.from(label || '↗').slice(0, 2).join('').toUpperCase();
    } catch {
      return '↗';
    }
  }

  function colorIndex(url) {
    let hash = 0;
    for (const char of new URL(url).hostname.toLowerCase()) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
    return hash % 8;
  }

  function renderShortcuts(container, shortcuts, options = {}) {
    if (!container) return;
    container.replaceChildren();
    const items = Array.isArray(shortcuts) ? shortcuts : [];
    if (!items.length) {
      const empty = document.createElement('p');
      empty.className = 'empty-state';
      empty.textContent = options.emptyText || 'No shortcuts yet. Add one to get started.';
      container.append(empty);
      return;
    }

    const fragment = document.createDocumentFragment();
    for (const item of items) {
      const safeRecord = globalThis.StilltabShortcutStorage?.normalizeShortcutRecord(item);
      if (!safeRecord) continue;
      const host = new URL(safeRecord.url).hostname.replace(/^www\./i, '');
      const entry = document.createElement('div');
      entry.className = 'shortcut-entry';

      const link = document.createElement('a');
      link.className = 'shortcut';
      link.href = safeRecord.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.title = `${safeRecord.title} · ${host}`;

      const icon = document.createElement('span');
      icon.className = `shortcut-glyph shortcut-glyph--site-${colorIndex(safeRecord.url)}`;
      icon.setAttribute('aria-hidden', 'true');
      const fallbackText = safeRecord.glyph || monogram(safeRecord.url);
      const fallback = document.createElement('span');
      fallback.textContent = fallbackText;
      icon.append(fallback);

      const faviconUrl = safeRecord.glyph ? '' : globalThis.StilltabShortcutFavicon?.getFaviconUrl(safeRecord.url, {
        faviconDataUrl: safeRecord.faviconDataUrl,
        allowPublicFallback: options.allowPublicFallback === true,
        size: 64
      });
      if (faviconUrl) {
        const image = document.createElement('img');
        image.className = 'shortcut-favicon';
        image.alt = '';
        image.loading = 'lazy';
        image.decoding = 'async';
        image.referrerPolicy = 'no-referrer';
        image.draggable = false;
        image.src = faviconUrl;
        image.addEventListener('error', () => image.replaceWith(fallback), { once: true });
        icon.replaceChildren(image);
      }

      const title = document.createElement('span');
      title.className = 'shortcut-title';
      title.textContent = safeRecord.title;
      link.append(icon, title);
      if (options.showArrow !== false) {
        const arrow = document.createElement('span');
        arrow.className = 'shortcut-arrow';
        arrow.setAttribute('aria-hidden', 'true');
        arrow.textContent = '↗';
        link.append(arrow);
      }
      entry.append(link);

      if (options.showRemove !== false) {
        const remove = document.createElement('button');
        remove.type = 'button';
        remove.className = 'shortcut-remove';
        remove.dataset.action = 'remove-shortcut';
        remove.dataset.id = safeRecord.id;
        remove.setAttribute('aria-label', `Remove ${safeRecord.title}`);
        remove.title = 'Remove shortcut';
        remove.textContent = '×';
        entry.append(remove);
      }
      fragment.append(entry);
    }
    container.append(fragment);
  }

  globalThis.StilltabShortcutUI = Object.freeze({ renderShortcuts });
})();
