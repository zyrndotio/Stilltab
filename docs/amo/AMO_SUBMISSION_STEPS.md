# Submit Stilltab 0.8.0 to Mozilla Add-ons (AMO)

**No submission has been made.** These steps are for an AMO-listed Firefox add-on. This build ships readable, authored HTML, CSS, and JavaScript; the packaging script only copies files and creates archives. It does not minify, bundle, template, or generate extension code.

## Use the correct ZIP

Upload **`stilltab-v0.8.0-amo-upload.zip`** as the add-on package. It contains `manifest.json` at the ZIP root plus structured `newtab/`, `popup/`, `shared/`, and `assets/icons/` directories. AMO can also accept the Firefox `.xpi`; use the AMO ZIP when following the source-bundle route.

Do **not** upload `stilltab-v0.8.0-source.zip` as the installable package. That archive contains the full readable project under a containing directory, including `docs/`, `manifests/`, `scripts/`, `src/`, and the README. The Edge and Chrome ZIPs are for their respective browsers, not AMO.

## Before opening the submission form

1. **Finish public-facing details.** Complete the maintainer/contact placeholder in [`../PRIVACY.md`](../PRIVACY.md), publish the reviewed notice at a stable public HTTPS URL, and keep that URL handy. Stilltab can send user-entered data to external services on user action, so do not publish the current draft as if it were a final notice.
2. **Choose the stable add-on ID.** The source Firefox manifest at `manifests/firefox.json` currently says `stilltab@local.extension`. Decide whether to keep it or replace it with a stable identifier you control *before the first AMO submission*. Do not change the ID after release without a migration plan.
3. **Choose the license and support contact.** No license has been selected. Choose the license you intend to grant; do not infer one from the source bundle. Prepare a monitored support contact, homepage (if any), listing description, category, changelog, and screenshots.
4. **Test a clean Firefox install.** Test Firefox 142 or newer, including accepted/declined native data-consent and optional-origin flows, the toolbar action's **Add current tab** popup, query of only the active tab, saved shortcut rendering, first-run profiles, local widgets, reset, and real Firefox Sync with two signed-in desktop profiles and Add-ons sync enabled. Firefox requires the `tabs` permission to expose the active tab's URL/title/favicon metadata; Stilltab's popup queries only the active tab after user invocation. Treat Sync as desktop-focused until Android is separately tested.
5. **Rebuild the exact version.** From the repository root, run `./scripts/build-packages.sh`. Verify `stilltab-v0.8.0-amo-upload.zip` and `stilltab-v0.8.0-firefox.xpi`; the archive must have `manifest.json` at its root.

## AMO submission steps

1. Sign in at [addons.mozilla.org/developers/](https://addons.mozilla.org/developers/) with the publisher account that will own Stilltab.
2. Select **Submit a New Add-on**. Choose AMO-listed distribution for a public catalog listing. Self-distribution is signed by Mozilla but is not publicly discoverable in the AMO catalog.
3. Upload **`stilltab-v0.8.0-amo-upload.zip`** as the add-on file. Do not upload the nested source ZIP in this package-upload field.
4. If asked **“Do you need to submit source code?”**, select **No** for this build: the shipped JavaScript, HTML, and CSS are the readable authored source; no code minifier, bundler, web template engine, or source-to-source generator is used. The image icons are artwork, not generated extension code. If later code transforms are introduced, update the answer and submit reproducible source/build instructions.
5. Review AMO's current automatic validation report. Fix errors before proceeding. Examine warnings instead of dismissing them merely because submission is allowed. Review dynamic UI insertions and explain their escaping/validation invariants to reviewers.
6. Choose **Firefox for Desktop** unless Android behavior is tested and supported. Separate Chromium packages do not make the AMO listing a Chrome or Edge release.
7. Enter name, summary, full description, category, version notes/changelog, language, homepage/support contacts, and the public HTTPS privacy-policy URL. Accurately state that optional search, weather, RSS/article, stock, and crypto features contact their selected destinations only when invoked; disclose the user-supplied Alpha Vantage key and the same-origin Firefox favicon-cache behavior.
8. Upload the 128 px extension icon if requested; use `src/assets/icons/stilltab-512.png` for a larger listing image if requested. Add real screenshots of the tested extension UI, including the toolbar action; do not use mockups that imply unshipped functionality or permissions.
9. Confirm license, add-on ID, version `0.8.0`, data-collection disclosure, privacy-policy URL, platform, and distribution choice before continuing.
10. Add reviewer notes: Stilltab makes no analytics/telemetry calls; Firefox declares no required data collection and uses native optional data-consent/host prompts for the user-selected external features; the toolbar popup queries only the active tab after user action; Firefox's `tabs` permission is needed for title/URL/favicon fields; favicon bytes are cached only when available and are excluded from Sync; no public favicon service is contacted by default. Explain where to find optional widgets and that Firefox Sync is Firefox-only. Be transparent about the existing broad-but-optional HTTPS feed/article origin and seek reviewer acceptance.
11. Submit for review. Follow messages/status in the developer hub, make requested changes in a new version, and do not advertise the add-on as approved until AMO signs and publishes it.

## Mozilla references

- [Submit an add-on](https://extensionworkshop.com/documentation/publish/submitting-an-add-on/)
- [Source code submission](https://extensionworkshop.com/documentation/publish/source-code-submission/)
- [Add-on policies](https://extensionworkshop.com/documentation/publish/add-on-policies/)
- [Firefox built-in data consent](https://extensionworkshop.com/documentation/develop/firefox-builtin-data-consent/)
- [Mozilla guide to the Tabs API](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Working_with_the_Tabs_API)

This is operational guidance, not legal advice. AMO's current submission UI, policy, and validator are authoritative if they change.
