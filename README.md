# Stilltab 0.8

Stilltab turns a browser's new tab into a calm, configurable dashboard. It is **local-first**: no analytics, advertising, tracking pixels, cookie API, remote scripts/fonts, or background polling. Search and provider data are sent only when the user invokes the relevant feature. Chrome, Edge, and Firefox use browser-specific manifests and release packages.

## Start here

- New installs begin with **Minimal** defaults and a first-run chooser: Minimal, Focus, or Work & Study. Picking a profile changes the theme/layout and visible widgets; switching later keeps saved user data.
- **Customize** includes a Privacy Center, per-widget on/off controls, multiple layout choices, and settings sections that individually expand/collapse or can all be expanded/collapsed. Opening and closing the drawer/dialogs uses a soft, spring-like flow; system reduced-motion preferences are respected.
- Nothing is enabled by a profile that causes a network request. Each external provider is manually invoked; Firefox shows native data-consent and optional site-permission prompts, while Edge displays an in-app first-use disclosure and then asks for the necessary optional site permission.

## Features

- **Dashboard widgets:** clock with a deterministic daily motivational quote, search, quick links, focus reminder, to-do list, Pomodoro timer, weather, quick notes, RSS feed/article reader, stock tracker, local bookmark manager, crypto ticker, and user-authored text widgets. Widgets can be switched off and arranged by drag/drop, keyboard, or order controls.
- **Search:** eleven built-in providers plus custom HTTPS URL templates and keyword shortcuts such as `yt cats`, `gh issues`, and `wiki Ada Lovelace`. Search queries go to the selected destination; Stilltab does not store a search history.
- **Shortcuts:** enter a short domain such as `youtube.com`; HTTPS is added automatically and a title is inferred. Click Stilltab's toolbar button and choose **Add current tab** to save the active page's title and favicon too. Chromium reads icons from its local favicon store. Firefox caches a small same-origin HTTPS icon locally when available; otherwise it uses a generated monogram. No public favicon service is called by default. Remove links individually or import/export a shortcut JSON backup.
- **Bookmark manager:** save, tag, filter, import/export, or remove links inside Stilltab. It does not read or change the browser's own bookmarks. Bookmark data remains local and links open through normal browser navigation.
- **Crypto ticker:** watch up to 20 CoinGecko-listed IDs/symbols and manually refresh informational USD spot prices and 24-hour change. It does not connect to wallets, make trades, or provide advice. Keyless CoinGecko API traffic is rate-limited by shared IP.
- **Themes:** twelve coordinated visual profiles set palette, surfaces, corners, font, spacing, and layout together. Fine-tune colors, nine local font stacks, gradients, card style, density, layout, and safe custom CSS. Custom CSS has explicit **Turn off** and **Clear** controls; turning it off keeps the code saved, while clearing removes it and restores the default styling.
- **Layouts:** Balanced, Wide, Focused, Bento, Compact sidebar, and Masonry; responsive fallbacks prevent the multi-column layouts from overflowing on small screens.
- **Device backgrounds:** choose an image from the device; Stilltab compresses it locally and adds an adjustable readability overlay. It is not uploaded and stays out of Sync and selective theme backups.
- **Pomodoro and tasks:** local tasks and a focus/short-break/long-break timer. Click the large countdown to change the selected mode's duration; saving resets that countdown, while canceling leaves it alone. The timer has no notifications or background alarm; its end time is persisted locally so it catches up when Stilltab is next opened.
- **Weather:** manually set a city or refresh the saved city via Open-Meteo. There is no geolocation or auto-refresh; attribution appears in the widget.
- **RSS reader:** add an HTTPS RSS/Atom feed and refresh manually. A selected title can be read as extracted text in the extension; it does not run the remote page's scripts, styles, or embedded media. Removing the feed or resetting Stilltab attempts to revoke the feed and article-site permissions granted for it.
- **Stocks:** manually request Alpha Vantage end-of-day quotes with a personal API key. The key is stored separately in local extension storage, is not encrypted at rest by Stilltab, and is excluded from backups and Sync.
- **Privacy Center:** lists local data, the destination/provider, whether a first-use approval is required, and how to clear local app-level consents. Browser host permissions are separately managed in the browser's extension manager.
- **Firefox Sync:** opt-in and off by default. Firefox Sync handles encryption and transport for a bounded selection of settings. It does not sync bookmarks, crypto, wallpaper, weather, feeds, stocks/API key, or Pomodoro state. The control is hidden on Edge; use JSON backups to transfer selected data there.
- **Backups:** export/import all settings or separate custom-theme, shortcut, and bookmark JSON files. Imports are validated; selective link/bookmark imports merge and skip duplicates. API keys and provider approvals are not included.

## Privacy and external requests

Stilltab stores preferences, themes, widget data, bookmarks, background images, weather/RSS caches, the crypto watchlist, small Firefox favicon image data captured through the toolbar action, and a local-only list of RSS/article site origins used to clean up related permissions in the browser's extension-local storage. The permission-origin list and favicon image data are excluded from Firefox Sync. It does not access cookies, browser bookmark collections, history, or wallet accounts. It has no Stilltab-operated server.

Search queries go to the chosen search website through normal navigation. Weather requests send the entered/saved city and request IP to Open-Meteo only after a user action. RSS/article requests send the chosen HTTPS URL and request IP to that origin on add/refresh/read. Stock refreshes send the selected ticker, user API key, and request IP to Alpha Vantage. Crypto refreshes send the chosen CoinGecko coin ID and request IP to CoinGecko. Provider terms, rate limits, and logging apply. Requests made through the extension API omit credentials/cookies and referrer; opening a search, shortcut, or bookmark uses normal browser navigation and that destination's browser behavior. Chromium favicons come from the browser's internal store. Firefox may make one same-origin HTTPS favicon request without cookies or referrer when the user clicks **Add current tab**, then stores the small icon locally; it does not contact Google or another public favicon service by default.

See [`PRIVACY.md`](PRIVACY.md) for the detailed privacy-notice draft. It has a maintainer contact placeholder and **must be completed and published at a stable HTTPS URL before an AMO release**.

## Browser compatibility

- **Firefox:** Firefox 142 or newer. The minimum supports the manifest-based data-consent declaration used for an AMO submission. Firefox Sync is Firefox-only and should be treated as desktop-focused until Android support is separately tested.
- **Google Chrome:** Chrome 121 or newer for Promise-returning Manifest V3 extension APIs. Chrome uses the Chromium favicon permission and a temporary `activeTab` grant when the toolbar action is clicked.
- **Microsoft Edge:** current Chromium Edge, Edge 136 or newer. Edge uses the Chromium favicon permission and a temporary `activeTab` grant; Firefox Sync is unavailable there.

## Build release packages

From this directory:

```bash
./build-packages.sh
```

The script copies the untransformed authored files and produces these files in the parent directory by default (or a path supplied as its first argument):

- `stilltab-v0.8.0-firefox.xpi` — flat Firefox extension package for local testing.
- `stilltab-v0.8.0-amo-upload.zip` — same installable Firefox files at the ZIP root, ready for the AMO package-upload field.
- `stilltab-v0.8.0-edge.zip` and `stilltab-v0.8.0-chrome.zip` — browser-specific Chromium packages with their manifests at the package root.
- `stilltab-v0.8.0-source.zip` — complete, readable project archive with all three manifests, docs, icons, popup modules, and package script. It is not the installable AMO package.

The build script does **not** minify, bundle, template, or generate extension code. Shipped HTML, CSS, and JavaScript are the authored source. AMO signs an approved listing; the locally generated XPI is unsigned.

### Temporary installation

**Firefox:** open `about:debugging#/runtime/this-firefox` → **Load Temporary Add-on…** → select the XPI, or choose `manifest.json` from an extracted Firefox package/project.

**Edge:** unzip `stilltab-v0.8.0-edge.zip` → open `edge://extensions` → enable **Developer mode** → **Load unpacked** → choose the extracted directory containing its `manifest.json`.

**Chrome:** unzip `stilltab-v0.8.0-chrome.zip` → open `chrome://extensions` → enable **Developer mode** → **Load unpacked** → choose the extracted directory containing its `manifest.json`.

## Mozilla Add-ons (AMO)

See [`AMO_SUBMISSION_STEPS.md`](AMO_SUBMISSION_STEPS.md) for the step-by-step flow, exact package filename, listing details, and how to answer the source-code question. Stilltab has **not** been submitted, signed, approved, or listed. Review the current [`AMO_RELEASE_CHECKLIST.md`](AMO_RELEASE_CHECKLIST.md) before publishing.

## Project files

- `manifest.json` — Firefox MV3 manifest and Firefox data-consent declaration.
- `manifest.edge.json` and `manifest.chrome.json` — Chromium-specific manifest variants; the build script places the chosen manifest at each package root.
- `newtab.html`, `newtab.js`, `styles.css` — complete, readable app source.
- `shortcut-popup.html`, `shortcut-popup.js`, and `shortcut-popup.css` — toolbar action for saving the active tab to Quick links.
- `shortcut-storage.js`, `shortcut-favicon.js`, `shortcut-ui.js`, and `browser-compat.js` — separated shortcut persistence, favicon, rendering, and browser-namespace helpers.
- `icons/stilltab-32.png` through `icons/stilltab-128.png` — extension icons; `stilltab-512.png` is a listing-size image; `stilltab-master.png` is the original artwork.
- `build-packages.sh` — file-copy/archive-only package builder.
- `PRIVACY.md`, `AMO_RELEASE_CHECKLIST.md`, `AMO_SUBMISSION_STEPS.md`, and `DEVELOPMENT_SOURCES.md` — release and implementation guidance.
