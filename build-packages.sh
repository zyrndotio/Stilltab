#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OUT="${1:-$(dirname "$ROOT")}"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
mkdir -p "$OUT"

VERSION="$(python3 -c 'import json,sys; print(json.load(open(sys.argv[1]))["version"])' "$ROOT/manifest.json")"
for manifest in "$ROOT/manifest.edge.json" "$ROOT/manifest.chrome.json"; do
  BROWSER_VERSION="$(python3 -c 'import json,sys; print(json.load(open(sys.argv[1]))["version"])' "$manifest")"
  if [[ "$VERSION" != "$BROWSER_VERSION" ]]; then
    echo "Browser manifest versions differ ($VERSION vs $BROWSER_VERSION in $manifest)." >&2
    exit 1
  fi
done

stage_package() {
  local target="$1"
  local manifest="$2"
  mkdir -p "$target/icons"
  cp "$manifest" "$target/manifest.json"
  cp "$ROOT/newtab.html" "$ROOT/newtab.js" "$ROOT/styles.css" \
    "$ROOT/browser-compat.js" "$ROOT/shortcut-storage.js" \
    "$ROOT/shortcut-favicon.js" "$ROOT/shortcut-ui.js" \
    "$ROOT/shortcut-popup.html" "$ROOT/shortcut-popup.js" "$ROOT/shortcut-popup.css" "$target/"
  for size in 32 48 64 96 128; do
    cp "$ROOT/icons/stilltab-${size}.png" "$target/icons/"
  done
}

stage_package "$TMP/firefox" "$ROOT/manifest.json"
stage_package "$TMP/edge" "$ROOT/manifest.edge.json"
stage_package "$TMP/chrome" "$ROOT/manifest.chrome.json"

rm -f "$OUT/stilltab-v${VERSION}-firefox.xpi" \
  "$OUT/stilltab-v${VERSION}-amo-upload.zip" \
  "$OUT/stilltab-v${VERSION}-edge.zip" \
  "$OUT/stilltab-v${VERSION}-chrome.zip" \
  "$OUT/stilltab-v${VERSION}-source.zip"
(
  cd "$TMP/firefox"
  zip -qr "$OUT/stilltab-v${VERSION}-firefox.xpi" .
  zip -qr "$OUT/stilltab-v${VERSION}-amo-upload.zip" .
)
(
  cd "$TMP/edge"
  zip -qr "$OUT/stilltab-v${VERSION}-edge.zip" .
)
(
  cd "$TMP/chrome"
  zip -qr "$OUT/stilltab-v${VERSION}-chrome.zip" .
)

# Build the source archive from an explicit allowlist. Never zip the project tree
# itself: after git init that would disclose .git metadata and arbitrary local files.
SOURCE_ROOT="$TMP/source/$(basename "$ROOT")"
mkdir -p "$SOURCE_ROOT/icons"
cp "$ROOT/.gitignore" "$ROOT/README.md" "$ROOT/PRIVACY.md" \
  "$ROOT/AMO_RELEASE_CHECKLIST.md" "$ROOT/AMO_SUBMISSION_STEPS.md" \
  "$ROOT/DEVELOPMENT_SOURCES.md" "$ROOT/build-packages.sh" \
  "$ROOT/manifest.json" "$ROOT/manifest.edge.json" "$ROOT/manifest.chrome.json" \
  "$ROOT/newtab.html" "$ROOT/newtab.js" "$ROOT/styles.css" \
  "$ROOT/browser-compat.js" "$ROOT/shortcut-storage.js" \
  "$ROOT/shortcut-favicon.js" "$ROOT/shortcut-ui.js" \
  "$ROOT/shortcut-popup.html" "$ROOT/shortcut-popup.js" "$ROOT/shortcut-popup.css" "$SOURCE_ROOT/"
cp "$ROOT"/icons/stilltab-*.png "$SOURCE_ROOT/icons/"
(
  cd "$TMP/source"
  zip -qr "$OUT/stilltab-v${VERSION}-source.zip" "$(basename "$ROOT")"
)

echo "Built Stilltab $VERSION packages in $OUT"
echo "  Firefox XPI and AMO upload ZIP"
echo "  Edge ZIP, Chrome ZIP, and allowlisted source ZIP"
