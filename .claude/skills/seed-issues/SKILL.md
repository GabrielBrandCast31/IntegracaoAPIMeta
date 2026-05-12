---
name: seed-issues
description: |
  Cria o backlog inicial de issues do MVP do Brandcast Flow no GitHub a partir do escopo definido em CLAUDE.md. Usa o padrão epic + sub-tasks, com labels e milestone padronizados.

  Use quando o usuário pedir para: popular issues do projeto, criar backlog inicial, semear tickets do MVP, "seed issues", "criar issues do MVP", "popular o board".

  NÃO use para: criar issue avulsa fora do MVP, recriar issues já existentes, ou trabalhar com growth-ideas (essas ficam em docs/growth-ideas.md).
---

# Seed Issues — Brandcast Flow

Cria o backlog completo do MVP em GitHub Issues. O usuário quer ficar na revisão, então execute de forma idempotente e mostre o plano antes de escrever qualquer coisa.

## Pré-flight obrigatório

Antes de criar **qualquer** issue, valide e pare se falhar:

1. `command -v gh` — gh CLI instalado. Se não estiver, instrua: `brew install gh && gh auth login` e pare.
2. `gh auth status` — autenticado. Se não, instrua: `gh auth login` e pare.
3. `git remote get-url origin` — repo GitHub configurado.
4. `gh repo view --json nameWithOwner -q .nameWithOwner` — usa esse repo como alvo. Confirme com o usuário antes de seguir.
5. Verifique se `CLAUDE.md` existe e contém a seção "Escopo do MVP".

## Fluxo

### Passo 1 — Mostrar o plano

Antes de chamar qualquer `gh issue create`, monte uma tabela markdown com:

- Repo alvo (de `gh repo view`)
- Milestone a criar: **MVP**
- Labels a criar (ver lista abaixo)
- Lista numerada de epics (13) com contagem de sub-tasks de cada

**Pare e aguarde confirmação explícita do usuário** (algo como "pode criar", "manda ver", "go"). Se ele pedir ajustes, ajuste e mostre o plano de novo.

### Passo 2 — Idempotência

- Para cada label, use `gh label create <name> --color <hex> --description "<desc>" --force` (o `--force` faz upsert).
- Para o milestone, use `gh api repos/:owner/:repo/milestones` para listar; se "MVP" não existir, `gh api repos/:owner/:repo/milestones -f title=MVP -f description="Escopo trancado do MVP — 13 itens."`
- Para issues, antes de criar, faça `gh issue list --search "in:title <título exato>" --json number,title` e pule se já existir. Reporte ao final quantas foram puladas.

### Passo 3 — Criar epics, depois sub-tasks, depois linkar

Ordem importa: epic primeiro pra ter o número e referenciar nas sub-tasks. Depois edite o body do epic incluindo a task-list com `- [ ] #<num-da-subtask>`.

Para cada epic:
```
gh issue create \
  --title "<título>" \
  --body "<body>" \
  --label "type:epic,phase:mvp,area:<area>" \
  --milestone "MVP"
```

Para cada sub-task:
```
gh issue create \
  --title "<título>" \
  --body "<body referenciando o epic com 'Parte de #<epic-num>'>" \
  --label "type:task,phase:mvp,area:<area>" \
  --milestone "MVP"
```

Ao final, atualize o body de cada epic via `gh issue edit <epic-num> --body "<body com task-list>"`.

### Passo 4 — Reportar

Imprima um resumo:
- Total criado
- Total pulado (já existia)
- URL do milestone
- Erros, se houver

## Labels a garantir (upsert)

| Label              | Cor      | Descrição                          |
|--------------------|----------|------------------------------------|
| `type:epic`        | `#5319e7` | Trabalho macro, agrupa sub-tasks  |
| `type:task`        | `#0e8a16` | Tarefa implementável               |
| `phase:mvp`        | `#d93f0b` | Faz parte do MVP trancado          |
| `area:backend`     | `#1d76db` | Python/FastAPI/banco               |
| `area:frontend`    | `#fbca04` | Next.js/Vite/React                 |
| `area:devops`      | `#0052cc` | Infra/CI/observabilidade           |
| `area:design`      | `#c5def5` | UX/UI/protótipo                    |
| `area:product`     | `#5319e7` | Decisão de produto, sem código     |

## Plano dos 13 epics

Body padrão de epic:

```markdown
## Objetivo
<frase do CLAUDE.md, item N do MVP>

## Definição de pronto
- [ ] Todas as sub-tasks fechadas
- [ ] Fluxo end-to-end manualmente testado em staging
- [ ] CI verde
- [ ] Revisão de segurança (quando aplicável) feita

## Sub-tasks
<inserido no Passo 3 — task-list com refs>

## Referências
- [CLAUDE.md](../CLAUDE.md) — escopo do MVP
```

Body padrão de sub-task:

```markdown
## Contexto
Parte de #<epic-num> — <título do epic>.

## Escopo
<o que faz, sem detalhe de implementação>

## Critérios de aceite
- [ ] <critério 1>
- [ ] <critério 2>
- [ ] CI verde
- [ ] Coberto por teste (quando aplicável)

## Fora de escopo
<o que NÃO faz aqui — empurra pra outra issue/epic>
```

### Epic 1 — Login e autenticação `area:backend`

Sub-tasks:
- **`backend`** — Modelo User + hashing Argon2id + endpoints login/refresh/logout
- **`backend`** — JWT sessão curta + refresh rotation com detecção de reuse
- **`backend`** — RBAC: papéis (Admin, Gestor, Designer, Copywriter, Cliente Aprovador, Visualizador) + matriz de permissões
- **`backend`** — Schema multi-tenant + Row-Level Security no Postgres
- **`frontend`** — Tela de login, cadastro, recuperação de senha; validação React Hook Form + Zod
- **`frontend`** — Guard de rota autenticada + interceptor de refresh no cliente HTTP
- **`devops`** — Setup de KMS/Vault e variáveis sensíveis (JWT secret, pepper)

### Epic 2 — Cadastro de clientes/projetos `area:backend`

Sub-tasks:
- **`backend`** — Models Client/Project com tenant_id + RLS + endpoints CRUD
- **`backend`** — Convite de membros (TeamMember) com link tokenizado + RBAC por cliente
- **`frontend`** — Lista de clientes, criação, página individual do cliente
- **`frontend`** — Tela equipe + convites + gestão de papéis

### Epic 3 — Conexão Meta Ads `area:backend`

Sub-tasks:
- **`backend`** — OAuth2 flow Meta (Authorization Code + PKCE, state CSRF, escopos mínimos)
- **`backend`** — Storage criptografado de refresh tokens (envelope encryption com KMS) + audit log de leitura
- **`backend`** — Listagem de Business Managers, ad accounts, pages e Instagram via Graph API
- **`backend`** — Endpoint de reconexão + health check da conexão
- **`frontend`** — Tela "Conexões Meta" (conectar, listar, reconectar, status, badge de saúde)
- **`devops`** — Configurar credenciais do Meta App (App ID, App Secret) no secrets manager

### Epic 4 — Conexão Google Ads `area:backend`

Sub-tasks:
- **`backend`** — OAuth2 flow Google + handling de MCC vs conta normal
- **`backend`** — Storage criptografado de refresh tokens
- **`backend`** — Listagem de contas Google Ads acessíveis
- **`frontend`** — Tela "Conexões Google Ads" (conectar, selecionar conta principal, reconectar, status)
- **`devops`** — Configurar credenciais do Google OAuth + developer token Google Ads

### Epic 5 — Cadastro de campanhas `area:backend`

Sub-tasks:
- **`backend`** — Models Campaign + AdGroup/AdSet + máquina de estados rígida
- **`backend`** — Endpoints CRUD com validação Pydantic estrita por plataforma
- **`backend`** — Endpoint de transição de estado (idempotente) + audit log
- **`frontend`** — Wizard de criação Meta com checkpoints e autosave em rascunho
- **`frontend`** — Wizard de criação Google Search com checkpoints e autosave
- **`frontend`** — Lista de campanhas + filtros (cliente, plataforma, status, período)
- **`frontend`** — Página de detalhes da campanha

### Epic 6 — Cadastro de criativos `area:backend`

Sub-tasks:
- **`backend`** — Model AdCreative + endpoint upload (multipart) + storage S3-compat com URLs assinadas
- **`backend`** — Validação de mídia (magic bytes, dimensões, peso, formato) + antivírus
- **`backend`** — Versionamento de criativo (v1/v2/v3) + diff
- **`frontend`** — Upload com progresso, thumbnail antes de finalizar, retry em falha
- **`frontend`** — Galeria de criativos por campanha com preview
- **`devops`** — Bucket S3-compat (R2/Supabase Storage) + CDN + política de retenção

### Epic 7 — Cadastro de copies `area:backend`

Sub-tasks:
- **`backend`** — Model AdCopy + endpoints CRUD + validação de limites por plataforma (Meta vs Google)
- **`frontend`** — Editor de copies com contagem de caracteres por plataforma e preview

### Epic 8 — Cadastro de públicos básicos `area:backend`

Sub-tasks:
- **`backend`** — Model Audience + endpoints CRUD (localização, idade, gênero, interesses)
- **`frontend`** — Construtor de público com mapa de localização e seleção de interesses (Meta)
- **`frontend`** — Construtor de palavras-chave + match types (Google)

### Epic 9 — Cadastro de orçamento e datas `area:backend`

Sub-tasks:
- **`backend`** — Campos budget + schedule no Campaign + validações cruzadas (orçamento × duração)
- **`frontend`** — Etapa do wizard com calendário e seletor de orçamento diário/total

### Epic 10 — Aprovação por link público `area:backend`

Sub-tasks:
- **`backend`** — Model ApprovalLink + token HMAC com expiração curta + revogável + single-use opcional
- **`backend`** — Endpoint público GET (leitura) servindo dados necessários, sem expor IDs internos
- **`backend`** — Endpoint público POST (aprovar / pedir ajuste / comentar) com rate limit
- **`backend`** — Models ApprovalAction + Comment + audit log (IP, user-agent, timestamp)
- **`backend`** — Notificação ao gestor de tráfego (e-mail + futura WhatsApp)
- **`frontend`** — Página pública `/approve/<token>` mobile-first com headers de segurança rígidos
- **`frontend`** — Preview fiel dos anúncios (Meta e Google) com fallback
- **`frontend`** — Fluxo aprovar / pedir ajuste / comentar — 1 toque para aprovar
- **`design`** — Mockup mobile-first da página pública de aprovação

### Epic 11 — Publicação automática após aprovação `area:backend`

Sub-tasks:
- **`backend`** — Model PublishingJob + fila (Celery/arq/RQ) + Redis
- **`backend`** — Worker Meta — cria Campaign, AdSet, AdCreative e Ad via Marketing API
- **`backend`** — Worker Google — cria Campaign, AdGroup, Keywords e Ads via Google Ads API
- **`backend`** — Máquina de estados: Aprovada → Pronta → Publicando → Publicada/Erro com idempotência
- **`backend`** — Retry policy com backoff por tipo de erro (auth, rate limit, validation, transient)
- **`backend`** — Webhook receiver (Meta) com verificação HMAC + replay protection
- **`devops`** — Hosting do worker (Fly.io/Railway) + concorrência limitada por ad account
- **`devops`** — Dashboard de saúde da fila (jobs, latência, taxa de erro)

### Epic 12 — Logs de publicação `area:backend`

Sub-tasks:
- **`backend`** — Model PublishingLog (payload enviado, resposta crua da API, IDs externos)
- **`backend`** — Endpoint de listagem + filtros + retry manual
- **`frontend`** — Tela de logs por campanha com botão "tentar novamente" para jobs em erro

### Epic 13 — Dashboard básico de performance `area:backend`

Sub-tasks:
- **`backend`** — Model PerformanceMetric + ingestão periódica (pull) com cursor/since-token
- **`backend`** — Dedupe por (campaign_id, date, metric) + backfill seguro
- **`backend`** — Endpoints de agregação por cliente / plataforma / período
- **`frontend`** — Dashboard com gráficos Recharts (investimento, impressões, cliques, CTR, CPC, conversões, custo/conversão)
- **`frontend`** — Filtros por cliente, plataforma e período
- **`devops`** — Cron/scheduler para ingestão de métricas

## Resumo esperado ao terminar

```
Repo: GabrielBrandCast31/IntegracaoAPIMeta
Milestone: MVP — criado (https://...)
Labels: 8 criadas/atualizadas
Epics:  13 criados, 0 pulados
Tasks:  ~52 criadas, 0 pulados
Erros:  nenhum
```
