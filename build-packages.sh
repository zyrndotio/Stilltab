#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OUT="${1:-$(dirname "$ROOT")}"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
mkdir -p "$OUT"

VERSION="$(python3 -c 'import json,sys; print(json.load(open(sys.argv[1]))["version"])' "$ROOT/manifest.json")"
EDGE_VERSION="$(python3 -c 'import json,sys; print(json.load(open(sys.argv[1]))["version"])' "$ROOT/manifest.edge.json")"
if [[ "$VERSION" != "$EDGE_VERSION" ]]; then
  echo "Firefox and Edge manifest versions differ ($VERSION vs $EDGE_VERSION)." >&2
  exit 1
fi

stage_package() {
  local target="$1"
  local manifest="$2"
  mkdir -p "$target/icons"
  cp "$manifest" "$target/manifest.json"
  cp "$ROOT/newtab.html" "$ROOT/newtab.js" "$ROOT/styles.css" "$target/"
  for size in 32 48 64 96 128; do
    cp "$ROOT/icons/stilltab-${size}.png" "$target/icons/"
  done
}

stage_package "$TMP/firefox" "$ROOT/manifest.json"
stage_package "$TMP/edge" "$ROOT/manifest.edge.json"

rm -f "$OUT/stilltab-v${VERSION}-firefox.xpi" "$OUT/stilltab-v${VERSION}-amo-upload.zip" "$OUT/stilltab-v${VERSION}-edge.zip" "$OUT/stilltab-v${VERSION}-source.zip"
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
  cd "$(dirname "$ROOT")"
  zip -qr "$OUT/stilltab-v${VERSION}-source.zip" "$(basename "$ROOT")"
)

echo "Built Stilltab $VERSION packages in $OUT"
