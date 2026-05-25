#!/bin/bash
# Load environment variables from .env file
# Supports both key=value and key="value with spaces" formats

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="$(cd "$SCRIPT_DIR/.." && pwd)/.env"

if [ ! -f "$ENV_FILE" ]; then
    return 0
fi

while IFS='=' read -r key value; do
    # Skip comments and empty lines
    [[ "$key" =~ ^#.*$ ]] && continue
    [[ -z "$key" ]] && continue

    # Remove surrounding quotes from value
    value="${value#\"}" ; value="${value%\"}"
    value="${value#\'}" ; value="${value%\'}"

    # Export the variable (only if key is a valid env var name)
    if [[ "$key" =~ ^[A-Za-z_][A-Za-z0-9_]*$ ]]; then
        export "$key=$value"
    fi
done < "$ENV_FILE"