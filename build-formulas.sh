#!/bin/sh
set -eu
cd "$(dirname "$0")"
work_dir=$(mktemp -d)
trap 'rm -rf "$work_dir"' EXIT
for source in assets/formulas/*.tex; do
    name=$(basename "$source" .tex)
    pdflatex -interaction=batchmode -halt-on-error -output-directory="$work_dir" "$source"
    cp "$work_dir/$name.pdf" "assets/formulas/$name.pdf"
    gs -q -dSAFER -dBATCH -dNOPAUSE -sDEVICE=png16m -r300 \
        -dTextAlphaBits=4 -dGraphicsAlphaBits=4 \
        -sOutputFile="assets/formulas/$name.png" "assets/formulas/$name.pdf"
done
