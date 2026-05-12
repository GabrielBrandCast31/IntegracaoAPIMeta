---
name: open-pr
description: |
  Faz push da branch atual e abre um Pull Request para a branch `dev` usando o template `.github/PULL_REQUEST_TEMPLATE.md`, **pré-preenchido** com tipo, escopo, descrição, mudanças por área, plano de teste e link da issue. Deixa pronto pro usuário só revisar e mergear.

  Use quando: terminei de implementar uma feature/fix em uma branch local, o usuário disse "abre o PR", "manda pra revisão", "push + PR", "open PR", ou quando a tarefa estiver pronta e precisar virar review.

  NÃO use quando: a branch atual for `main` ou `dev`, ou quando ainda houver mudanças não commitadas que o usuário não quer no PR.
---

# Open PR — Brandcast Flow

Push da branch atual + abre PR pra `dev` com `.github/PULL_REQUEST_TEMPLATE.md` **pré-preenchido**. O usuário fica só com a revisão final — você faz o trabalho de classificar, escrever descrição, marcar checkboxes corretas e listar plano de teste.

## Pré-flight

1. `git rev-parse --abbrev-ref HEAD` — pega a branch atual.
2. **Pare** se for `main` ou `dev`.
3. `git status --porcelain` — se houver mudanças não commitadas, pergunte ao usuário se devem entrar no PR.
4. `command -v gh` — gh CLI. Se faltar, instrua `brew install gh && gh auth login` e pare.
5. `gh auth status` — autenticado.
6. `test -f .github/PULL_REQUEST_TEMPLATE.md` — template existe. Se não, pare e avise.

## Fluxo

### Passo 1 — Push

```
git push -u origin <branch-atual>
```

### Passo 2 — Coletar contexto

Antes de escrever qualquer coisa no body, colete:

```
# Issue do nome da branch (regex ^[a-z]+/([0-9]+)-)
branch="$(git rev-parse --abbrev-ref HEAD)"
prefix="${branch%%/*}"                                  # feat | fix | chore | docs | refactor | test | perf
issue="$(echo "$branch" | grep -oE '^[a-z]+/[0-9]+' | grep -oE '[0-9]+' || true)"

# Garantir referência ao dev
git fetch origin dev:refs/remotes/origin/dev --depth=200 || true

# Commits desta branch vs dev
commits="$(git log origin/dev..HEAD --pretty=format:'- %s' --no-merges)"

# Arquivos alterados
files="$(git diff --name-only origin/dev..HEAD)"

# Verifica se já existe PR
existing="$(gh pr list --head "$branch" --base dev --state open --json url --jq '.[0].url // ""')"
```

Se `existing` não vazio, **não crie outro PR** — ofereça editar com `gh pr edit "$existing" --body-file ...`.

### Passo 3 — Ler e preencher o template

Carregue `.github/PULL_REQUEST_TEMPLATE.md` em memória e faça as substituições abaixo. **Marque as caixas** trocando `- [ ]` por `- [x]` na linha exata, **sem reescrever o template**.

**Seção "What does this PR do?"** — marque uma e só uma:

| Prefixo da branch | Caixa a marcar      |
|-------------------|---------------------|
| `feat`            | `- [x] Feature`     |
| `fix`             | `- [x] Fix`         |
| `chore`           | `- [x] Chore`       |
| `docs`            | `- [x] Chore`       |
| `refactor`        | `- [x] Refactor`    |
| `test`            | `- [x] Test`        |
| `perf`            | `- [x] Refactor`    |

Se a branch teve mudança visual relevante (CSS, Tailwind, layout), marque **também** `- [x] Styling`.

**Seção "Scope"** — baseado em `$files`:

- Arquivos só em `backend/` → `- [x] Backend`
- Arquivos só em `frontend/` → `- [x] Frontend`
- Arquivos em ambos → `- [x] Full Stack`
- Apenas `docs/`, `README.md`, `*.md` → `- [x] Documentation`
- `.github/` ou raiz mista → escolha a melhor caixa e mencione na seção Notes.

**Seção "Description"** — substitua a linha `This PR introduces...` por uma descrição real (2–4 frases) do que muda e por quê. Depois dela, adicione uma linha em branco e:

```
Closes #<issue>      <!-- só se houver número de issue extraído da branch -->
```

Se não houver issue, omita essa linha (não deixe placeholder).

**Seção "Changes > Backend"** — só marque caixa cujo path bate com o que mudou:

- `- [x] Services` se mudou em `backend/app/services/` (ou similar)
- `- [x] Schemas` se mudou em `backend/app/schemas/` ou Pydantic models
- `- [x] Controller` se mudou em `backend/app/api/`, `backend/app/routers/`
- `- [x] Repository` se mudou em `backend/app/repositories/` ou camada de acesso a dados
- `- [x] Core Config` se mudou em `backend/app/core/`, settings, deps, lifespan
- `- [x] DevOps update (CI/CD)` se mudou `.github/workflows/*backend*` ou similar

Se a convenção de pastas ainda não existir, marque a caixa mais próxima e mencione na Notes.

**Seção "Changes > Frontend"** — análogo:

- `- [x] Pages` para `frontend/src/pages/`, `frontend/src/routes/`
- `- [x] Components` para `frontend/src/components/`
- `- [x] Hooks` para `frontend/src/hooks/`
- `- [x] Lib Update` para `frontend/package.json`, mudança em libs/configs
- `- [x] DevOps update (CI/CD)` para workflows do frontend

**Seção "How to test"** — substitua os passos `1. Run \`...\`` / `2. Visit \`/...\`` / `3. Ensure that \`...\`` por passos **reais**, específicos da feature. Exemplo:

```
1. `cd backend && uv run uvicorn main:app --reload`
2. `cd frontend && npm run dev`
3. Abra `http://localhost:5173/clients/<id>/connections/meta`
4. Clique em "Conectar Meta Ads" → faça o OAuth → confirme que listou os ad accounts
5. Recarregue a página → estado deve persistir
```

Se for puramente backend, descreva via `curl` / `httpx` / `pytest`. Se for puramente frontend, descreva pelo browser.

**Seção "Notes"** — substitua `N/A` por algo útil quando aplicável:

- Decisão controversa que vale revisão extra
- Dívida deixada e por que (com link pra issue ou TODO)
- Migration que precisa de atenção
- Variável de ambiente nova que precisa ser provisionada
- Risco de segurança considerado

Se realmente não há nada, deixe `N/A`.

### Passo 4 — Título do PR

Em ordem de prioridade:
1. Se houver 1 commit novo vs `dev`, use o subject dele.
2. Se houver múltiplos, gere um conciso (≤70 chars) que resuma a mudança.

Prefixe pelo tipo quando o subject não tem: `feat: ...`, `fix: ...`, `chore: ...`. Evite duplo prefixo.

### Passo 5 — Abrir PR

Salve o body preenchido em arquivo temporário (para evitar escaping de aspas/heredoc) e use `--body-file`:

```
tmpbody=$(mktemp)
# escreve o body completo em $tmpbody (template já preenchido)
gh pr create \
  --base dev \
  --head "$branch" \
  --title "$title" \
  --body-file "$tmpbody"
rm "$tmpbody"
```

Não use `--draft` por padrão — o usuário quer revisar.

### Passo 6 — Reportar

Output curto:
- URL do PR criado
- Issue vinculada (se houver)
- Resumo do que foi marcado (tipo, escopo, áreas)
- Frase final: "pronto pra revisão"

## Falhas conhecidas

- **Branch sem commits diferentes de `dev`**: `gh pr create` falha. Pare com mensagem clara.
- **`dev` não existe no remoto**: pare; pergunte ao usuário em vez de criar.
- **Template foi editado e perdeu uma das caixas exatas** (ex: alguém renomeou "Feature" para "Feat"): caia pra busca case-insensitive e avise no output, mas não silencie.
