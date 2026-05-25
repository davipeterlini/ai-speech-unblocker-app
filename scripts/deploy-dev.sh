#!/bin/bash

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_info() { echo -e "${BLUE}ℹ️  $1${NC}"; }
print_success() { echo -e "${GREEN}✅ $1${NC}"; }
print_error() { echo -e "${RED}❌ $1${NC}"; }

command_exists() { command -v "$1" >/dev/null 2>&1; }

load_deploy_config() {
    local script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
    source "$script_dir/utils/load-env.sh"
    print_success "Environment loaded"
}

get_branch_name() {
    if [ -n "$BRANCH_NAME" ]; then
        echo "$BRANCH_NAME"
    elif [ -n "$BRANCH_TAG" ]; then
        echo "$BRANCH_TAG"
    elif command_exists git && [ -d ".git" ]; then
        git rev-parse --abbrev-ref HEAD
    else
        echo "develop"
    fi
}

sanitize_branch_name() {
    echo "$1" | sed 's/\//-/g' | sed 's/[^a-zA-Z0-9._-]/-/g' | tr '[:upper:]' '[:lower:]'
}

load_deploy_config

if [ -z "$PROJECT_ID" ]; then
    print_error "PROJECT_ID is not set"
    exit 1
fi

REGION="${REGION:-us-west1}"
SERVICE_NAME="${SERVICE_NAME:-ai-speech-unblocker-dev}"
SERVICE_PORT="${SERVICE_PORT:-8080}"
SERVICE_MEMORY="${SERVICE_MEMORY:-1Gi}"
SERVICE_CPU="${SERVICE_CPU:-1000m}"
SERVICE_MAX_INSTANCES="${SERVICE_MAX_INSTANCES:-100}"
SERVICE_MIN_INSTANCES="${SERVICE_MIN_INSTANCES:-0}"

BRANCH_NAME=$(get_branch_name)
BRANCH_TAG=$(sanitize_branch_name "$BRANCH_NAME")

echo ""
echo "═══════════════════════════════════════════════════════"
echo "  ai-speech-unblocker - Development Deployment"
echo "═══════════════════════════════════════════════════════"
echo ""

print_info "Checking prerequisites..."

if ! command_exists npm; then
    print_error "npm is not installed"
    exit 1
fi

if ! command_exists gcloud; then
    print_error "gcloud is not installed"
    exit 1
fi

if [ -z "$SERVICE_ACCOUNT_KEY_PATH" ]; then
    print_error "SERVICE_ACCOUNT_KEY_PATH not set"
    exit 1
fi

if [ ! -f "$SERVICE_ACCOUNT_KEY_PATH" ]; then
    print_error "Service account key file not found: $SERVICE_ACCOUNT_KEY_PATH"
    exit 1
fi

print_info "Activating service account..."
gcloud auth activate-service-account --key-file="$SERVICE_ACCOUNT_KEY_PATH" --quiet

print_info "Setting project to $PROJECT_ID..."
gcloud config set project "$PROJECT_ID" --quiet

print_info "Deployment configuration:"
echo "  Project ID: $PROJECT_ID"
echo "  Region: $REGION"
echo "  Service Name: $SERVICE_NAME"
echo "  Branch: $BRANCH_NAME"
echo "  Branch Tag: $BRANCH_TAG"
echo ""

print_info "Installing dependencies..."
npm ci

print_info "Building application..."
npm run build

if [ ! -d "dist" ] || [ -z "$(ls -A dist 2>/dev/null)" ]; then
    print_error "dist/ directory is empty or doesn't exist"
    exit 1
fi

print_info "Deploying with Cloud Build..."

ENV_VARS_ARRAY=("NODE_ENV=production")
if [ -n "$GEMINI_API_KEY" ]; then
    ENV_VARS_ARRAY+=("GEMINI_API_KEY=$GEMINI_API_KEY")
fi
if [ -n "$VITE_GOOGLE_CLIENT_ID" ]; then
    ENV_VARS_ARRAY+=("VITE_GOOGLE_CLIENT_ID=$VITE_GOOGLE_CLIENT_ID")
fi

ENV_VARS=$(IFS=,; echo "${ENV_VARS_ARRAY[*]}")
print_info "Environment variables: $ENV_VARS"

if gcloud run deploy "$SERVICE_NAME" \
    --source . \
    --region "$REGION" \
    --project "$PROJECT_ID" \
    --platform managed \
    --port "$SERVICE_PORT" \
    --memory "$SERVICE_MEMORY" \
    --cpu "$SERVICE_CPU" \
    --max-instances "$SERVICE_MAX_INSTANCES" \
    --min-instances "$SERVICE_MIN_INSTANCES" \
    --set-env-vars "$ENV_VARS" \
    --labels "branch=$BRANCH_TAG,deployed-by=deploy-script,method=cloud-build,environment=development" \
    --tag "$BRANCH_TAG" \
    --quiet; then

    print_success "Service deployed successfully"
else
    print_error "Service deployment failed"
    exit 1
fi

print_info "Verifying deployment..."

if SERVICE_URL=$(gcloud run services describe "$SERVICE_NAME" --region "$REGION" --project "$PROJECT_ID" --format='value(status.url)' 2>/dev/null); then
    echo ""
    echo "═══════════════════════════════════════════════════════"
    print_success "Deployment completed successfully!"
    echo "═══════════════════════════════════════════════════════"
    echo ""
    print_info "Service URL: ${GREEN}$SERVICE_URL${NC}"
    print_info "Branch: ${GREEN}$BRANCH_NAME${NC}"
    echo ""
else
    print_warning "Could not retrieve service URL"
fi

print_success "Happy coding!"
echo ""