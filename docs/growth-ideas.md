# Brandcast Flow — Alavancas de Crescimento

Ideias mapeadas para **depois do MVP** estar redondo. Organizadas por alavanca, não por tela, porque o que move adoção em ferramenta de agência é diferente do que melhora UX.

> Status: backlog estratégico. Nada aqui é compromisso de roadmap.

---

## 1. Efeito de rede pelo lado do cliente final

A aprovação por link é cavalo de Troia. Cada cliente da agência vira potencial divulgador.

- **Portal do cliente com marca da agência** (subdomínio + logo + cores), não só página de aprovação. Cliente loga e vê campanhas, relatórios, histórico.
- **Convite reverso**: cliente convida a agência. Página "peça pra sua agência usar o Brandcast Flow" gera lead inbound.
- **Assinatura no rodapé do PDF/relatório**: "Feito com Brandcast Flow" (removível em planos pagos, padrão Calendly/Typeform).

## 2. Time-to-value brutal no onboarding

A morte de SaaS B2B brasileiro é "instalei e não tive tempo de configurar".

- **Import de campanhas já rodando** no Meta/Google. Conectou a conta? Puxa as últimas 30, classifica por status, popula o painel.
- **Templates por nicho** (advocacia, dentista, e-commerce, infoproduto, imobiliária) — públicos, copies, CTAs e estrutura prontos.
- **Wizard "primeira aprovação enviada em 10 minutos"** com checkpoints visuais.

## 3. Substituir a reunião de status (retenção pesada)

Agência paga ferramenta que **elimina trabalho recorrente**, não que adiciona feature.

- **Relatório automático white-label** semanal/quinzenal por e-mail ao cliente, com narrativa em linguagem natural ("CTR subiu 18% vs semana anterior, recomendamos aumentar budget no criativo X").
- **Resumo executivo gerado por IA** em cima das métricas — não é "IA cria campanha", é "IA escreve o e-mail chato que o gestor de tráfego escreveria".
- **Alertas proativos**: criativo reprovado pelo Meta, política violada, CPA estourando 2x a meta, orçamento esgotando antes da data. App + WhatsApp.

## 4. WhatsApp como canal (não como cliente)

O pitch é "sem WhatsApp", mas cliente brasileiro **responde no WhatsApp**. Usar a favor.

- **Notificação de aprovação via WhatsApp** com link direto, em vez de e-mail. Abertura sobe de ~30% para >90%.
- **Aprovação 1-clique** pelo link (sem login do cliente).
- **Bot opcional**: cliente responde "aprovar" no WhatsApp, campanha é aprovada. Audit log registra o número.

## 5. Diferencial operacional que vira moat

Coisas que parecem chatas mas agência adora quando tem dor.

- **Versionamento de criativos** (v1/v2/v3) com diff visual — qual versão foi aprovada, timestamp e IP.
- **SLA de aprovação**: cliente tem X horas para responder ou aprova automaticamente (com aviso). Resolve a dor #1 do gestor: "cliente sumiu".
- **Audit log inviolável**: quem mudou o quê, quando — agência usa em disputa contratual.
- **Biblioteca de criativos reutilizáveis** entre clientes (com tags e permissão).

## 6. Acquisition loops via ferramenta gratuita

Lead magnet melhor que blog post.

- **Auditor gratuito de conta Meta Ads**: usuário conecta, ferramenta aponta 10 problemas (criativos sem variação, públicos sobrepostos, CPA fora da média do nicho). Captura e-mail + dor.
- **Gerador de UTM e calculadora de CPA-alvo** indexados no Google — tráfego SEO de gestor júnior.
- **Benchmark anônimo de CPC/CPA por nicho** alimentado pelos próprios dados da base (depois que tiver volume).

## 7. Monetização por expansão (não só seats)

Modelo de cobrança que cresce com o cliente.

- **Cobrança por volume de investimento gerenciado** (% do ad spend, com teto) — alinha incentivo: quanto mais campanhas rodam, mais você ganha.
- **Add-ons**: IA para copy/criativo, relatórios brancos avançados, integrações extras (CRM, BI).
- **Split de pagamento via PIX/Mercado Pago**: agência cobra cliente final pela plataforma + repassa fee.

## 8. Integrações que prendem o fluxo

- **RD Station / HubSpot / ActiveCampaign**: leads do anúncio caem direto no CRM do cliente.
- **Pixel/CAPI auto-setup**: ferramenta gera e instala eventos do Meta Pixel via GTM, sem developer.
- **Slack/Discord da agência**: notificações de aprovação, publicação e erros no canal do time.

---

## Priorização sugerida (pós-MVP)

Ordem por impacto/esforço:

1. **Import de campanhas existentes** — único item que tira o "não tenho tempo de configurar".
2. **Notificação de aprovação via WhatsApp** — resolve gargalo real do fluxo.
3. **Relatório automático white-label** — justifica a mensalidade todo mês na cabeça do cliente da agência.
4. **Portal do cliente white-label** — transforma cada cliente final em vetor de aquisição.
5. **Auditor gratuito Meta Ads** — canal de aquisição sem custo de mídia.

## Tradeoff principal

**White-label e templates por nicho são tentadores cedo demais.** Faz sentido só depois que o fluxo aprovação → publicação estiver redondo, senão ganha usuário e perde no básico.
