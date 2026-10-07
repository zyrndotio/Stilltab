# Submit Stilltab 0.7 to Mozilla Add-ons (AMO)

**No submission has been made.** These steps are for an AMO-listed Firefox add-on. This build is authored in readable HTML, CSS, and JavaScript files; the packaging script only copies files and creates archives. It does not minify, bundle, template, or generate extension code.

## Use the correct ZIP

The file to upload as the add-on package is **`stilltab-v0.7.0-amo-upload.zip`**. It contains `manifest.json`, `newtab.html`, `newtab.js`, `styles.css`, and the extension-sized PNG icons at the ZIP root. AMO can also accept the Firefox `.xpi`; use the flat AMO ZIP when following the source-bundle route.

Do **not** upload `stilltab-v0.7.0-source.zip` as the installable package. That archive contains the whole `stilltab/` project directory—including documentation, both browser manifests, and the build script—under a containing folder. Keep it as the human-readable project/reviewer archive. The Edge ZIP is for Microsoft Edge, not AMO.

## Before opening the submission form

1. **Finish the public-facing details.** Complete the contact placeholder in `PRIVACY.md`, publish the privacy notice at a stable public HTTPS URL, and keep that URL handy. Stilltab can send user-entered data to external services on user action, so do not publish the current draft as if it were a final notice.
2. **Choose the stable add-on ID.** The Firefox manifest currently says `stilltab@local.extension`. Decide whether to keep it or replace it with a stable identifier you control *before the first AMO submission*. Do not change the ID after release without a migration plan.
3. **Decide the license and support contact.** The project does not silently choose a software license or invent a publisher email. Have the license choice, support email/page, homepage (if any), listing description, category, changelog, and screenshots ready.
4. **Test a clean Firefox install.** Test Firefox 142 or newer, including declined and accepted data/host prompts, bookmark and crypto actions, first-run profiles, compact/collapsed settings, and real Firefox Sync if you intend to list that feature. List Firefox desktop only until Android behavior is independently tested.
5. **Rebuild the exact version.** From the project directory, run `./build-packages.sh`. Check `stilltab-v0.7.0-amo-upload.zip` and `stilltab-v0.7.0-firefox.xpi`; the archive must have `manifest.json` at its root.

## AMO submission steps

1. Sign in at [addons.mozilla.org/developers/](https://addons.mozilla.org/developers/) with the publisher account that will own Stilltab.
2. Select **Submit a New Add-on**. Choose AMO-listed distribution if you want the add-on publicly discoverable in the Firefox Add-ons catalog. The alternative is self-distribution, which is signed by Mozilla but is not a public AMO listing.
3. When asked for the add-on file, upload **`stilltab-v0.7.0-amo-upload.zip`**. Do not upload the nested archival source ZIP in this package-upload field.
4. If AMO asks **“Do you need to submit source code?”**, select **No** for this build: the shipped JavaScript, HTML, and CSS are already the readable authored source files, and no code minifier, bundler, web template engine, or source-to-source generator is used. The icon artwork is image content, not generated extension code. If you later introduce a tool that transforms/combines extension code, update the answer and submit the corresponding complete, reproducible source and build instructions.
5. Review AMO's automatic validation report. Fix errors before proceeding. Do not dismiss any warning simply because the page still allows submission; examine the current lint output and add reviewer notes for intentional design choices such as runtime optional feed-origin access.
6. Choose **Firefox for Desktop** as the compatible platform for this listing unless you have completed and are prepared to support Android testing. The separate Edge package does not make the AMO listing an Edge release.
7. Enter the public listing details: add-on name, concise summary, full description, category, version notes/changelog, language, homepage/support contacts, and the public HTTPS privacy-policy URL. State that the optional search, weather, RSS/article, stock, and crypto features contact their chosen providers only when used. Explain the user-supplied Alpha Vantage key and the local-only defaults accurately.
8. Upload the 128 px extension icon if the form requests a listing icon; use `stilltab/icons/stilltab-512.png` for a larger listing image if requested. Add real screenshots of the tested extension UI—do not use mockups that imply features or permissions that are not in the submitted build.
9. Select the license you actually want to grant. Confirm the manifest add-on ID, version `0.7.0`, data-collection disclosure, privacy-policy URL, platform, and distribution choice before continuing.
10. Add reviewer notes explaining that Stilltab makes no analytics or tracking calls, uses Firefox's declared optional data-consent categories and per-origin optional host access for explicit external features, and keeps the crypto API request manual. Mention that the Firefox Sync feature is Firefox-only and that Edge uses a separate manifest and first-use disclosure flow. Provide steps to reach each feature and any test credentials only if they are safe, non-sensitive demo credentials.
11. Submit the listing for review. AMO will validate and review it and may ask for changes or additional information. Follow the submission's status/messages in the developer hub and make any requested fixes in a new version. Do not advertise the listing as approved until AMO completes review and the signed listing is published.

## Mozilla references

- [Submit an add-on](https://extensionworkshop.com/documentation/publish/submitting-an-add-on/)
- [Source code submission](https://extensionworkshop.com/documentation/publish/source-code-submission/)
- [Add-on policies](https://extensionworkshop.com/documentation/publish/add-on-policies/)
- [Firefox built-in data consent](https://extensionworkshop.com/documentation/develop/firefox-builtin-data-consent/)

This guide is operational guidance, not legal advice. AMO's current submission UI, policy, and validator are authoritative if they change.
