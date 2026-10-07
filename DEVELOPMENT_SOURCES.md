# Implementation sources

Reviewed 2026-10-06 for Stilltab 0.7.0. The user-facing privacy notice is `PRIVACY.md`; open AMO tasks/status are in `AMO_RELEASE_CHECKLIST.md` and exact submission actions are in `AMO_SUBMISSION_STEPS.md`.

## Firefox WebExtension permissions and local content security

Mozilla's [optional host permission reference](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/optional_host_permissions) and [optional permissions compatibility note](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/optional_permissions) establish runtime optional host access; Firefox introduced `optional_host_permissions` in release 128. Stilltab requests weather, Alpha Vantage, CoinGecko, and a user-selected HTTPS RSS/article origin only when the matching feature is invoked. The broad `https://*/*` pattern is declared optional so user-selected feed/article origins can be requested individually at runtime; this approach still requires explicit AMO validator/reviewer acceptance.

Mozilla's [permissions.request() reference](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/permissions/request) documents the user-gesture requirement and optional `data_collection` argument for categories declared under `browser_specific_settings.gecko.data_collection_permissions.optional`. Mozilla's [built-in data-consent guide](https://extensionworkshop.com/documentation/develop/firefox-builtin-data-consent/) describes those categories and the consent flow. The manifest declares no required user-data collection and the optional categories requested by current features. The built-in data-consent manifest flow reached Firefox 140 desktop; Mozilla's Add-ons Linter reports Firefox Android support for this manifest key beginning in 142. Stilltab therefore specifies **Firefox 142.0** minimum. Mozilla's [browser_specific_settings documentation](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/browser_specific_settings) notes that manifest data disclosure is required for new AMO submissions from 2025-11-03.

Mozilla's [extension-page CSP reference](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Content_Security_Policy) describes the default local-only script policy. Stilltab packages scripts/styles locally; its custom CSS editor rejects at-rules and resource/network-loading functions.

## Cross-browser implementation

Microsoft's [Edge extension API support reference](https://learn.microsoft.com/en-us/microsoft-edge/extensions/developer-guide/api-support) and Mozilla's [cross-browser WebExtensions guide](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Build_a_cross_browser_extension) describe Chromium-derived extension API support, Firefox/Edge API namespaces, browser-specific manifest fields, and the need to feature-detect browser-specific capabilities. Edge 136+ exposes the `browser.*` namespace used by this shared source. `manifest.edge.json` excludes Firefox-only Gecko data-consent metadata; Edge first-use explanations are in Stilltab and Edge still requests only the chosen optional host permission. Firefox preserves its native consent and host-prompt flow. Firefox Sync controls are hidden on Edge.

## Weather services

Open-Meteo's [Forecast API](https://open-meteo.com/en/docs) supports the current fields used by Stilltab. The [Geocoding API](https://open-meteo.com/en/docs/geocoding-api) describes the endpoint used only for a manually entered city. Its documentation credits GeoNames, which is also credited in the widget. Open-Meteo's [terms](https://open-meteo.com/en/terms) state non-commercial restrictions for its free API and describe IP/geographic-coordinate logs; its [license](https://open-meteo.com/en/licence) specifies CC BY 4.0 attribution. Recheck provider terms before any commercial distribution.

## Stock quotes

Alpha Vantage's [official API documentation](https://www.alphavantage.co/documentation/) describes `GLOBAL_QUOTE`, which requires an API key and supplies default end-of-day global quotes; real-time/15-minute US quotes require premium access. Its [market-data policy](https://www.alphavantage.co/realtime_data_policy/) describes additional rules for real-time/delayed US data and personal/commercial terms. Stilltab refreshes only on a user action, displays informational data, never trades, and keeps the user-provided key in local extension storage separate from all backups and Sync.

## CoinGecko crypto prices

CoinGecko's official [Simple Price endpoint](https://docs.coingecko.com/reference/simple-price) accepts coin IDs and quote currencies and can return 24-hour change/last-updated fields. Its [rate-limit guide](https://docs.coingecko.com/docs/errors-and-rate-limits) says keyless requests are rate-limited by IP and limits are shared by IP. The Stilltab ticker therefore refreshes manually, caches locally, does not access wallets/holdings/keys, and discloses that the coin ID and request IP go directly to CoinGecko.

## Firefox Sync and local data

Mozilla's [storage.sync reference](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage/sync) documents the 102,400-byte total quota, 8,192-byte per-item quota, and 512-item limit. It says data syncs across signed-in Firefox clients when Add-ons sync is enabled, typically on an approximately ten-minute cycle; Firefox for Android does not support this extension sync behavior. Stilltab caps its snapshot at 60,000 bytes and writes 4,000-byte base64 chunks. Sync excludes wallpaper, weather location/cache, RSS URL/cache, stocks/key, bookmarks, crypto assets, and Pomodoro state.

Mozilla Support's [Firefox Sync security explanation](https://support.mozilla.org/en-US/kb/how-firefox-sync-keeps-your-data-safe-even-if-tls-fails) states that Firefox Sync encrypts data on-device before transmission and does not send the encryption key to its server. Stilltab delegates transport encryption to Firefox Sync and does not claim ordinary local extension storage or the stock API key is encrypted at rest.

## AMO package and source code

Mozilla's [AMO submission guide](https://extensionworkshop.com/documentation/publish/submitting-an-add-on/), [source-code submission guide](https://extensionworkshop.com/documentation/publish/source-code-submission/), and [add-on policies](https://extensionworkshop.com/documentation/publish/add-on-policies/) explain package upload, source disclosure, review, listing, and privacy expectations. `build-packages.sh` copies the authored readable extension files to a flat Firefox package, an Edge package, and a separate full-project source archive; it does not minify, bundle, template, or generate code. The authored JS/HTML/CSS are shipped directly, so the current source-code questionnaire response is No unless build processing is introduced. Stilltab has not been submitted or approved.

## 0.7 interface and data boundaries

First-run profiles alter only local configuration and widget visibility. The bookmark manager is a distinct local Stilltab list and does not access the browser's bookmark API. The crypto widget contacts CoinGecko only on manual refresh. The Pomodoro countdown is a keyboard-accessible button that opens a mode-specific bounded duration editor; saving updates that mode and resets/stops the current countdown, while canceling leaves it unchanged. Custom CSS has separate local enabled and source-text state: Turn off removes the active stylesheet but preserves the code, Clear erases it, and older saved CSS without the enabled flag stays active on upgrade. Collapsible settings groups use native buttons and `aria-expanded`/`inert` state; transitions respect `prefers-reduced-motion`. Dual-browser Playwright simulations cover startup, consent, bookmark, crypto, RSS, stock, Sync, and custom CSS apply/off/on/clear; real-browser permission/Sync tests are still required before public release.
