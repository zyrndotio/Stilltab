(() => {
  'use strict';

  // Firefox exposes browser.*; Chrome and Edge expose chrome.*.
  // Chrome 121+ supports promises for asynchronous extension APIs, so use the
  // native namespace directly instead of adding a third-party polyfill.
  if (typeof globalThis.browser !== 'undefined') return;
  if (typeof globalThis.chrome === 'undefined') return;
  globalThis.browser = globalThis.chrome;
})();
