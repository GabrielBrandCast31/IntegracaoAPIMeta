# Brandcast Flow

SaaS para agências de marketing criarem, organizarem, aprovarem e publicarem campanhas de **tráfego pago** para clientes. Prioridade absoluta: **Meta Ads e Google Ads**.

## Promessa

> "Da ideia ao anúncio no ar, sem planilha, sem WhatsApp e sem retrabalho."

## Dor que resolve

Bagunça do processo de criação → aprovação → publicação de campanhas, que hoje acontece por WhatsApp, planilhas, prints e acessos manuais nas plataformas de anúncio.

## Escopo do MVP

Ordem de construção:

1. Login e autenticação
2. Cadastro de clientes/projetos
3. Conexão com Meta Ads
4. Conexão com Google Ads
5. Cadastro de campanhas (Meta primeiro, depois Google Search)
6. Cadastro de criativos
7. Cadastro de copies
8. Cadastro de públicos básicos
9. Cadastro de orçamento e datas
10. Aprovação por link público
11. Publicação automática após aprovação
12. Logs de publicação
13. Dashboard básico de performance

## Fluxo principal

Agência cria cliente → conecta contas Meta/Google → cria campanha (objetivo, orçamento, datas, público, criativos, copies, plataforma) → envia para aprovação → cliente acessa link público → aprova ou pede ajuste → se aprovado, sistema publica automaticamente na plataforma → salva logs → exibe métricas.

## Status de campanha

`Rascunho` → `Aguardando aprovação interna` → `Aguardando aprovação do cliente` → `Ajuste solicitado` → `Aprovada` → `Pronta para publicar` → `Publicando` → `Publicada` → `Erro na publicação` → `Pausada` → `Finalizada`

## Entidades

- **User** — usuários internos da agência ou convidados
- **Client / Project** — cada cliente/projeto da agência
- **AdAccount** — contas de anúncio conectadas (Meta/Google)
- **MetaBusinessConnection** — Business Manager, páginas, Instagram, contas de anúncio
- **GoogleAdsConnection** — conta Google Ads ou MCC
- **Campaign** — campanha criada no Brandcast Flow
- **CampaignPlatform** — plataforma onde será publicada
- **AdGroup / AdSet** — grupos de anúncios (Google) ou conjuntos (Meta)
- **AdCreative** — imagens, vídeos, peças
- **AdCopy** — variações de texto, título, descrição, CTA
- **Audience** — público, localização, segmentação
- **ApprovalLink** — link público enviado ao cliente
- **ApprovalAction** — aprovação ou solicitação de ajuste
- **PublishingJob** — tentativa de publicação automática
- **PublishingLog** — sucesso, erro, payload enviado, resposta da API
- **PerformanceMetric** — investimento, impressões, cliques, CTR, CPC, conversões, custo/conversão
- **Comment** — comentários internos ou do cliente
- **Notification** — notificações internas ou e-mail
- **TeamMember** — usuários vinculados a clientes com permissões

## Papéis de usuário

- **Admin** — gerencia tudo
- **Gestor de Tráfego** — cria, edita, publica, analisa campanhas
- **Designer** — sobe criativos
- **Copywriter** — cria copies
- **Cliente Aprovador** — visualiza campanhas enviadas, aprova ou pede ajuste
- **Visualizador** — apenas leitura

## Telas

Login · Cadastro · Dashboard · Clientes/Projetos · Página individual do cliente · Conexões Meta · Conexões Google · Lista de campanhas · Criar campanha · Detalhes da campanha · Criativos · Copies · Públicos · Aprovações · Página pública de aprovação · Publicação e logs · Dashboard de performance · Equipe · Configurações

## Stack sugerida

- **Frontend**: Next.js + React + TypeScript
- **Estilo**: Tailwind CSS
- **Banco**: PostgreSQL
- **Backend**: API routes do Next.js ou API separada
- **Auth**: Supabase Auth, Clerk ou Auth.js
- **Storage**: Supabase Storage, Cloudflare R2 ou AWS S3
- **Fila**: BullMQ + Redis, Inngest, Trigger.dev, QStash ou cron seguro
- **Integrações**: Meta Marketing API, Google Ads API
- **Deploy**: Vercel (front) + Supabase/Railway (banco e serviços)

Decisões finais ainda em aberto — qualquer escolha desta lista é aceitável.

## Fora do MVP

Não construir agora, mesmo se parecer fácil:

- Publicação orgânica (Instagram, Facebook, LinkedIn, TikTok, YouTube)
- TikTok Ads, LinkedIn Ads, YouTube Ads avançado
- Performance Max
- IA para criação automática
- White label
- Billing / assinatura
- Aplicativo mobile nativo

## Onde mais procurar

- [docs/growth-ideas.md](docs/growth-ideas.md) — alavancas de crescimento mapeadas para depois do MVP
