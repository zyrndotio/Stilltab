#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT="${1:-$(dirname "$ROOT")}"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
mkdir -p "$OUT"

VERSION="$(python3 -c 'import json,sys; print(json.load(open(sys.argv[1]))["version"])' "$ROOT/manifests/firefox.json")"
for manifest in "$ROOT/manifests/edge.json" "$ROOT/manifests/chrome.json"; do
  BROWSER_VERSION="$(python3 -c 'import json,sys; print(json.load(open(sys.argv[1]))["version"])' "$manifest")"
  if [[ "$VERSION" != "$BROWSER_VERSION" ]]; then
    echo "Browser manifest versions differ ($VERSION vs $BROWSER_VERSION in $manifest)." >&2
    exit 1
  fi
done

stage_package() {
  local target="$1"
  local manifest="$2"
  mkdir -p "$target/assets/icons"
  cp "$manifest" "$target/manifest.json"
  cp -R "$ROOT/src/newtab" "$ROOT/src/popup" "$ROOT/src/shared" "$target/"
  for size in 32 48 64 96 128; do
    cp "$ROOT/src/assets/icons/stilltab-${size}.png" "$target/assets/icons/"
  done
}

stage_package "$TMP/firefox" "$ROOT/manifests/firefox.json"
stage_package "$TMP/edge" "$ROOT/manifests/edge.json"
stage_package "$TMP/chrome" "$ROOT/manifests/chrome.json"

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

# Build the source archive from explicit project directories; never include .git
# metadata or arbitrary workspace files.
SOURCE_ROOT="$TMP/source/$(basename "$ROOT")"
mkdir -p "$SOURCE_ROOT"
cp "$ROOT/.gitignore" "$ROOT/README.md" "$ROOT/CHANGELOG.md" "$SOURCE_ROOT/"
cp -R "$ROOT/docs" "$ROOT/manifests" "$ROOT/scripts" "$ROOT/src" "$SOURCE_ROOT/"
(
  cd "$TMP/source"
  zip -qr "$OUT/stilltab-v${VERSION}-source.zip" "$(basename "$ROOT")"
)

echo "Built Stilltab $VERSION packages in $OUT"
echo "  Firefox XPI and AMO upload ZIP"
echo "  Edge ZIP, Chrome ZIP, and allowlisted source ZIP"
