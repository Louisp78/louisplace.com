#!/usr/bin/env bash

load_env_file() {
  local file="$1"
  if [ -f "$file" ]; then
    set -a
    source "$file"
    set +a
  fi
}

export -f load_env_file
