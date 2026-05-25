# AI Speech Unblocker

Break through speech blocks with AI assistance.

## Setup Local

```bash
# Instalar dependencias
npm install

# Copiar variaveis de ambiente
cp .env.example .env

# Iniciar desenvolvimento
npm run dev

# Executar testes
npm run test

# Build para producao
npm run build
```

## Deploy

Este projeto usa GitHub Actions para deploy automatico no Google Cloud Run.

### Workflows

- **tests.yml** - Executa testes automaticamente em push/PR para main ou develop
- **deploy-dev.yml** - Deploy de desenvolvimento (manual via workflow_dispatch)
- **deploy-prd.yml** - Deploy de producao (automatico ao criar tag v*)
- **release.yml** - Pipeline de release

### Configuracao para Deploy

1. Configure os GitHub Secrets:
   - `PROJECT_ID` - ID do projeto GCP
   - `GCP_SERVICE_ACCOUNT_KEY` - Chave JSON da Service Account
   - `GOOGLE_CLIENT_ID` - OAuth Client ID do Google

2. Configure as GitHub Variables:
   - `DEPLOY_AI_STUDIO` - false
   - `SYNC_WORK_REPO` - false

3. Para fazer deploy de desenvolvimento:
   ```bash
   gh workflow run deploy-dev.yml --repo davipeterlini/ai-speech-unblocker-app
   ```

4. Para fazer deploy de producao:
   ```bash
   git tag v0.1.0 && git push origin v0.1.0
   ```

## Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS
- Vitest + Testing Library
- Google OAuth (@react-oauth/google)
- Cloud Run (GCP)
- GitHub Actions