# Changelog

Notable Stilltab changes are recorded here. Version sections correspond to Git tags; they describe source snapshots and do **not** imply AMO approval or a store release. The repository has tags for `v0.7.0` and `v0.8.0`; earlier prototype iterations have no preserved tags or versioned release notes, so they are not assigned invented version numbers here. The GitHub Releases page has no formal release entries yet.

## [Unreleased]

### Changed

- Reorganized the repository into `docs/`, `manifests/`, `scripts/`, and feature-focused `src/` directories.
- Updated the package builder to assemble Firefox, Edge, and Chrome packages from the organized source tree, with `manifest.json` at each package root.
- Added this changelog and a proposed v0.9 roadmap. These are repository/documentation changes; the extension version remains `0.8.0` and there is no new release tag.

## [0.8.0] - 2026-10-07

### Added

- Added a Chrome package alongside the Firefox and Edge builds, with browser-specific manifests and a shared compatibility adapter.
- Added a toolbar popup for saving the current tab to Quick links after the user invokes it.
- Added site-agnostic shortcut handling for HTTP(S) domains, including title/URL capture and useful monogram fallbacks.
- Added browser-local favicon support: Chromium's internal favicon endpoint and a bounded, user-triggered same-origin HTTPS favicon cache in Firefox.

### Changed

- Split shortcut storage, rendering, favicon handling, and popup behavior into small authored modules.
- Kept saved shortcut icon bytes local to each device and excluded them from Firefox Sync; no default public favicon lookup service is used.
- Expanded the privacy and permission documentation for toolbar capture, favicon behavior, and browser-specific permissions.

### Fixed

- Tracked optional RSS/article host grants locally so removing a feed or resetting settings can attempt to revoke the related permissions.

## [0.7.0] - 2026-10-07

### Added

- Added first-run setup with Minimal, Focus, and Work & Study starter profiles, plus a Privacy Center explaining local data and user-invoked provider requests.
- Added or consolidated dashboard widgets including local bookmarks and a manually refreshed CoinGecko crypto ticker, alongside search, notes, tasks, Pomodoro, weather, RSS/article reading, stocks, and user-authored text widgets.
- Added twelve coordinated theme presets, six layouts, local device wallpaper, custom gradients/CSS, and validated JSON import/export for themes, shortcuts, and bookmarks.
- Added draggable and keyboard-accessible widget ordering, collapsible settings sections, and smoother transitions that respect reduced-motion preferences.
- Added direct Pomodoro duration editing by clicking the countdown, and explicit custom-CSS Turn off and Clear controls.

### Changed

- Kept provider requests user-initiated, stored dashboard data locally, and documented Firefox's opt-in, bounded Sync behavior and its exclusions.

## Earlier development

The project was developed through earlier prototypes before the first preserved source tag. Feature requests and exact version boundaries for those iterations were not recorded in the Git history, so this changelog intentionally avoids fabricating `0.1`–`0.6` entries. The `v0.7.0` and `v0.8.0` tags are the complete tagged version history currently available in this repository.
