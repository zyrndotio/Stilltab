(() => {
  'use strict';

  const api = globalThis.browser ?? globalThis.chrome;
  const $ = selector => document.querySelector(selector);
  const button = $('#add-current-tab');
  const status = $('#popup-status');
  const list = $('#popup-shortcut-list');

  function setStatus(message, kind = '') {
    status.textContent = message;
    status.dataset.kind = kind;
  }

  async function renderSavedShortcuts() {
    try {
      const shortcuts = await StilltabShortcutStorage.getShortcuts();
      StilltabShortcutUI.renderShortcuts(list, shortcuts, { showRemove: false, showArrow: false, emptyText: 'Your saved shortcuts will appear here.' });
    } catch (error) {
      console.warn('Stilltab could not read shortcuts.', error);
      setStatus('Could not read local shortcuts.', 'error');
    }
  }

  async function addNewShortcut() {
    button.disabled = true;
    setStatus('Reading the active tab…');
    try {
      const tabs = await api.tabs.query({ active: true, lastFocusedWindow: true });
      const tab = tabs?.[0];
      const url = StilltabShortcutStorage.normalizeShortcutUrl(tab?.url);
      if (!tab || !url) {
        setStatus('This browser page cannot be saved. Open a regular http(s) website first.', 'error');
        return;
      }
      const currentShortcuts = await StilltabShortcutStorage.getShortcuts();
      const alreadyCached = currentShortcuts.some(item => item.url === url && item.faviconDataUrl);
      const faviconDataUrl = alreadyCached ? '' : await StilltabShortcutFavicon.captureActiveTabFavicon(tab);
      const result = await StilltabShortcutStorage.addShortcut({
        url,
        title: tab.title || new URL(url).hostname,
        faviconDataUrl
      });
      if (!result.ok && result.reason === 'limit') {
        setStatus(`Stilltab supports up to ${StilltabShortcutStorage.MAX_SHORTCUTS} shortcuts.`, 'error');
        return;
      }
      if (!result.ok) {
        setStatus('That address is not a valid website URL.', 'error');
        return;
      }
      setStatus(result.duplicate ? 'That site was already saved; its local icon was refreshed if available.' : 'Added to Stilltab shortcuts.', 'success');
      await renderSavedShortcuts();
    } catch (error) {
      console.warn('Stilltab could not save the active tab.', error);
      setStatus('Could not save this tab. Check extension storage permissions.', 'error');
    } finally {
      button.disabled = false;
    }
  }

  button.addEventListener('click', addNewShortcut);
  renderSavedShortcuts();
})();
