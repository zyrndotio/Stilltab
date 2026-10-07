# Stilltab Privacy Notice

**Draft for Stilltab 0.8.0.** Effective date: 2026-10-07. This implementation-oriented notice still requires a real maintainer contact and public HTTPS hosting before a public AMO release. It is not legal advice.

**Maintainer and contact:** `[Add maintainer name and a monitored contact address before publishing.]`

## Summary

Stilltab does not operate an analytics, advertising, or account server. It does not run analytics, telemetry, tracking pixels, remote scripts, remote fonts, or background data polling. It does not read or write browser cookies, browser history, browser bookmark collections, or cryptocurrency wallets. Most preferences and widget data remain in the browser's extension-local storage. Optional features send selected/requested data directly to the provider only when the user invokes that feature. Stilltab does not call a public favicon lookup service by default.

Firefox presents its native optional data-consent and host-permission prompts. Firefox also requires the `tabs` permission for the popup to read the active tab's title, address, and favicon; the popup only queries the active tab after the user opens it. Chrome and Edge use `activeTab` so the popup can read only the invoked tab, plus Chromium's `favicon` permission for its internal favicon endpoint. Edge displays a Stilltab first-use disclosure and then requests only the selected provider's optional host access. Browser permissions are separate from Stilltab's in-app consent. Stilltab keeps a local-only list of RSS/article origins whose access was approved so it can attempt to revoke those related host permissions when the feed is removed or settings are reset; users can always review permissions in the browser's extension manager.

## Data stored on this device

The browser's extension-local storage can contain profile/theme/layout choices, widget visibility/order, custom CSS, user-made themes, search provider and custom search templates, shortcut links and small favicon image data captured in Firefox from the active tab, local bookmarks and tags, to-do items, Pomodoro state, focus text, quick notes, user-created text widgets, and an optional compressed image chosen from the device. Optional widgets also locally cache the selected weather place and its result, a small RSS title/link list, the local-only RSS/article-origin cleanup list, stock quotes, and the user's CoinGecko watchlist/prices. The origin list and favicon image data are excluded from Firefox Sync; image data may be included in a user-exported shortcut or settings backup.

The bookmark widget is an independent Stilltab list; it does not import, read, or change the browser's native bookmark collection. Chromium gets shortcut icons from the browser's internal favicon store. In Firefox, when the user clicks the toolbar action to add the current tab, Stilltab may request that tab's small same-origin HTTPS favicon once, without cookies or a referrer, and cache at most 4 KB locally. It does not request cross-origin favicon files or use a public favicon service by default. Manually entered Firefox links without a cached icon use a monogram. The crypto widget does not access an exchange account, wallet, holdings, or private key.

The personal Alpha Vantage API key is stored separately in local extension storage. It is **not encrypted at rest by Stilltab**, may be included in an outgoing Alpha Vantage request URL because that is the provider's documented authentication method, and is excluded from all Stilltab JSON backups and Firefox Sync. Do not enter a key associated with a sensitive account.

Article text is extracted only after the user selects a story. It appears temporarily in the local reader and is not retained by Stilltab.

## Data sent to other services

Stilltab does not send data to a Stilltab-operated server. When a user invokes an external feature, the destination receives the details below and may process them under its own terms, logs, and privacy notice:

- **Search:** the submitted query goes to the chosen search provider. Built-in and custom keyword shortcuts select the destination; Stilltab does not keep a search history. Searches use normal browser navigation, so destination-site browser behavior applies.
- **Shortcuts and local bookmarks:** opening a link visits that website through normal browser navigation. The destination receives the ordinary request details associated with that visit and may use its own cookies. Stilltab does not read or transmit the user's browser bookmark collection.
- **Favicons:** Chromium's `_favicon/` endpoint reads from the browser's local favicon store. In Firefox, the user's explicit **Add current tab** action can cause one request to the active page's same-origin HTTPS favicon URL, if available. That site can receive the request IP; the request omits cookies and referrer and is made only during the save action. The result is stored as a small local image and is not fetched on subsequent new-tab loads. Cross-origin icons and icons unavailable under these limits fall back to a monogram. Google or another public favicon service is not contacted by default.
- **Weather:** the user-entered city, or saved city when manually refreshed, and request IP go to Open-Meteo. No geolocation is detected and no refresh runs in the background. Extension API requests omit credentials/cookies and referrer. Results are cached locally. The widget credits Open-Meteo, CC BY 4.0, and GeoNames. Review [Open-Meteo's terms](https://open-meteo.com/en/terms) and [license](https://open-meteo.com/en/licence), including provider logging and attribution terms.
- **RSS and article reading:** adding or refreshing a feed sends its HTTPS URL and request IP to that feed's origin. Clicking an article title to read it sends the article URL and request IP to that article's origin. The requests omit credentials/cookies and referrer, reject redirects, and occur only after the relevant user action. Feed titles/links are cached locally; the original page is not executed or embedded.
- **Stock quotes:** a manual request sends the ticker, the user's Alpha Vantage API key, and request IP directly to Alpha Vantage. The key is included in the provider request URL and may be logged by that provider. Default global quotes are end-of-day, not live. Review [Alpha Vantage's documentation](https://www.alphavantage.co/documentation/) and [market-data policy](https://www.alphavantage.co/realtime_data_policy/). The widget does not trade or offer recommendations.
- **Crypto prices:** a manual refresh sends the chosen CoinGecko coin ID and request IP directly to CoinGecko. Stilltab sends no wallet address, exchange credentials, holdings, or private keys. Keyless API traffic is rate-limited and limits may be shared by IP. Prices are informational; Stilltab does not trade or provide financial advice. See [CoinGecko's Simple Price API](https://docs.coingecko.com/reference/simple-price) and [rate-limit guidance](https://docs.coingecko.com/docs/errors-and-rate-limits).
- **Firefox Sync:** if enabled, Stilltab writes a size-limited selection of themes, settings, shortcut links (not cached favicon image data), tasks, notes, and custom widgets to Firefox's `storage.sync`. Firefox Sync synchronizes and encrypts that data end-to-end before transmission; Stilltab does not operate or receive data from a sync server. Sync excludes the background image, weather location/cache, RSS feed/cache, stock list/key, bookmarks, crypto watchlist/cache, and Pomodoro state. It requires Firefox Sync with **Add-ons** enabled and may take around ten minutes to propagate. Disabling Sync stops future uploads but does not delete the existing remote copy; **Delete synced copy** removes Stilltab's Sync keys.

## Profiles, widgets, and choices

A first-run profile changes only local visual settings and widget visibility; it does not enable or invoke an external provider. Built-in widgets can be switched on/off. Provider requests are manually initiated, never polled in the background. Declining a Firefox prompt or an Edge in-app consent prompt prevents the corresponding request; local-only features remain available. The Privacy Center explains each provider and local data category. Firefox Sync is off by default and available only in Firefox.

## Retention and deletion

Local data can be changed through the extension, removed using **Restore default setup**, or removed when browser extension/profile storage is cleared or the extension is uninstalled. The settings reset retains the existing remote Firefox Sync copy; delete that copy separately from the Privacy/Sync controls. On another device, Stilltab pauses Sync if it observes that its remote snapshot was removed, while leaving that device's local data intact.

Third-party providers control their own logs and retention. Normal search, shortcut, bookmark, and original-article navigation follows the destination site's own browser behavior.

## Data sharing and sale

The Stilltab project does not sell user data or share it with advertisers or use it for profiling. A user-initiated provider request goes directly to the destination service; the developer does not receive request contents through a Stilltab backend.

## Changes

Material changes to permissions, data flows, or external providers should be reflected in this notice and the browser store listing before release. Last reviewed against the 0.8.0 source: 2026-10-07.
