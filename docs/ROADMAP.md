# Stilltab roadmap — proposed next update

This is a proposal, not a commitment or implemented feature list. The recommended next milestone is **v0.9: Reliability and cross-browser portability**. Stilltab already has many widgets; the next release should make the existing experience easier to trust, maintain, and carry between browsers.

## Recommended priorities

1. **Cross-browser release testing.** Exercise the packaged Firefox, Chrome, and Edge builds in real browsers; add reproducible smoke tests for startup, toolbar capture, permissions, storage migration, and backups. Keep store-specific permissions and prompts documented.
2. **Resolve the AMO HTML warnings.** Replace remaining dynamic `innerHTML` templates with DOM-based rendering where practical. Preserve current normalization/escaping, then rerun AMO lint and review any remaining warnings rather than treating them as harmless by default.
3. **Portable, user-controlled sync.** Design an opt-in path for Chrome and Edge using a user-selected storage endpoint, with client-side encryption, an explicit setup/disable flow, and conflict preview/merge. Do not add a Stilltab account/server or background network traffic. Validate the threat model and recovery behavior before implementation; retain manual JSON export as the offline fallback.
4. **Make failures actionable.** Improve visible states for unavailable providers, denied permissions, quota limits, malformed imports, and sync conflicts. Tell the user what remains local and offer a clear retry or recovery path.
5. **Preserve accessibility and privacy.** Test keyboard-only navigation, focus restoration, reduced-motion, screen-reader labels, and small screens. Do not introduce analytics, cookie access, remote scripts/fonts, or unrequested polling.

## Suggested release gates

- Real-browser smoke test passes on the declared Firefox, Chrome, and Edge minimum versions.
- AMO lint has no errors; each remaining warning is reviewed and explained.
- Import/export and any sync conflict path preserve a recoverable local copy.
- Permission and data-flow descriptions match the shipped manifests and UI.
- No additional widget is added unless it solves a demonstrated user need without making the dashboard feel cluttered.

**Suggested order:** stabilize and test first, then implement cross-browser encrypted sync only after its design and recovery tests are agreed. The roadmap should be revised after real-browser testing and user feedback.
