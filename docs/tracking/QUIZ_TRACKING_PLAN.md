# 📊 Plano de Rastreamento - Quiz "IA Sem Mistério"

> **Data:** Junho 2026
> **Objetivo:** Entender profundamente a jornada de cada usuário no quiz

---

## 🎯 Visão Geral

Este documento detalha **EXATAMENTE** o que será rastreado em cada etapa da jornada do usuário no quiz, quais dados serão coletados, e como isso nos ajudará a tomar decisões.

```
Usuário clica no anúncio Meta
        ↓
Chega no quiz (https://ia-sem-misterio.vercel.app)
        ↓
Vê a primeira pergunta
        ↓
Responde todas as 10 perguntas (2 minutos)
        ↓
Vê o resultado (Iniciante/Curioso/Pronto para Evoluir)
        ↓
Clica no botão WhatsApp
        ↓
Entra no grupo de WhatsApp
```

**Nosso trabalho:** Rastrear **CADA UM** desses momentos para entender:
- ✅ Quem entra no quiz
- ✅ Quem completa o quiz
- ✅ Qual é o perfil de cada pessoa
- ✅ Quem clica para ir ao WhatsApp
- ✅ Taxa de conversão de anúncio → quiz → WhatsApp

---

## 📈 Hierarquia de Eventos

```
Nível 1: Page Views
├─ quiz_page_view
├─ quiz_start
└─ quiz_complete

Nível 2: Interações
├─ question_viewed
├─ answer_selected
└─ quiz_abandoned

Nível 3: Conversões
├─ profile_determined
├─ whatsapp_click
└─ whatsapp_join_success
```

---

## 🔍 Eventos Detalhados

### 1️⃣ **quiz_page_view** - Usuário chega no site

**Quando dispara:** Assim que página carrega

**Dados coletados:**
```javascript
{
  'event': 'page_view',
  'page_title': 'IA Sem Mistério - Quiz',
  'page_location': 'https://ia-sem-misterio.vercel.app',
  'referrer': 'facebook.com',  // ou google.com, etc
  'utm_source': 'facebook',
  'utm_campaign': 'ia_sem_misterio',
  'utm_medium': 'paid'
}
```

**Por que importa:**
- Saber qual plataforma de anúncio traz mais tráfego
- Entender qual anúncio específico está funcionando melhor
- Calcular custo por clique

**Dashboard:** 
- Tráfego total diário
- Fonte do tráfego (Meta, Google, LinkedIn, etc)
- Campanha que trouxe mais visitantes

---

### 2️⃣ **quiz_start** - Usuário clica "Começar Quiz"

**Quando dispara:** Quando clica no botão para iniciar

**Dados coletados:**
```javascript
{
  'event': 'quiz_start',
  'quiz_name': 'IA Sem Mistério',
  'user_id': undefined,  // Ainda não logado
  'timestamp': 1718000000,
  'device_type': 'mobile' // ou 'desktop'
}
```

**Por que importa:**
- Medir quantos visitantes realmente começam o quiz
- Taxa de "bounce" (chegou e saiu sem fazer nada)
- Se é mais mobile ou desktop

**Taxa esperada:**
```
Visitantes: 100
Começam quiz: 85  (85% conversion)
Completam: 68    (80% completion)
Vão ao WhatsApp: 61 (90% of completions)
```

**Dashboard:**
- Taxa de abandono ANTES do quiz
- Tempo médio na página inicial

---

### 3️⃣ **question_viewed** - Usuário vê pergunta

**Quando dispara:** Cada vez que uma pergunta aparece

**Dados coletados:**
```javascript
{
  'event': 'question_viewed',
  'question_number': 1,  // 1-10
  'question_text': 'Qual é a sua situação profissional atual?',
  'total_questions': 10,
  'progress_percentage': 10
}
```

**Por que importa:**
- Ver em qual pergunta as pessoas abandonam
- Se pergunta 7 tem taxa alta de abandono, ela é confusa!
- Otimizar as perguntas que causam mais drop-off

**Padrão esperado:**
```
Pergunta 1: 100 pessoas  (100%)
Pergunta 2: 98 pessoas   (98%)
Pergunta 3: 97 pessoas   (97%)
Pergunta 5: 85 pessoas   (85%)
Pergunta 10: 68 pessoas  (68%)
```

Se pessoa abandona na pergunta 5, saberemos que precisa melhorar!

**Dashboard:**
- Drop-off por pergunta
- Pergunta com maior abandono (alerta se >20%)

---

### 4️⃣ **answer_selected** - Usuário responde pergunta

**Quando dispara:** Cada clique em uma resposta

**Dados coletados:**
```javascript
{
  'event': 'answer_selected',
  'question_number': 1,
  'answer_selected': 'Aposentado/a',
  'score_value': 0,
  'cumulative_score': 0,
  'time_to_answer': 3  // segundos
}
```

**Por que importa:**
- Entender padrão de respostas
- Saber qual resposta mais pessoas escolhem
- Medir velocidade média de resposta (muito rápido = não lê?)

**Exemplo de insight:**
```
Pergunta 1 - Situação profissional:
- Aposentado/a: 40%
- Ainda trabalho: 45%
- Negócio próprio: 10%
- Transição: 5%

→ INSIGHT: Maioria é aposentado ou trabalha em emprego
→ AÇÃO: Mensagens no WhatsApp devem falar sobre aposentadoria e tech
```

**Dashboard:**
- Distribuição de respostas por pergunta
- Tempo médio para responder
- Score médio final

---

### 5️⃣ **quiz_complete** - Usuário termina o quiz

**Quando dispara:** Quando clica no resultado final

**Dados coletados:**
```javascript
{
  'event': 'quiz_complete',
  'total_score': 12,
  'profile_type': 'curioso',  // iniciante, curioso, pronto
  'time_to_complete': 95,  // segundos
  'questions_answered': 10,
  'completion_rate': 100
}
```

**Por que importa:**
- Saber quantos completam (taxa de conclusão)
- Qual é a distribuição de perfis
- Se estou atraindo a audiência certa

**Exemplo de distribuição desejada:**
```
Iniciante Absoluto: 30%
Curioso: 50%
Pronto para Evoluir: 20%

Se iniciantes são 60%, algo está errado com os anúncios!
```

**Dashboard:**
- Taxa de conclusão (objetivo: >80%)
- Distribuição de perfis
- Tempo médio para completar
- Score médio

---

### 6️⃣ **profile_result_displayed** - Resultado mostrado

**Quando dispara:** Quando tela de resultado carrega

**Dados coletados:**
```javascript
{
  'event': 'profile_result_displayed',
  'profile_type': 'curioso',
  'profile_title': 'Você Está Pronto!',
  'profile_description': 'Você já tem curiosidade e disposição...',
  'whatsapp_group': '#6 - Curiosos',
  'whatsapp_url': 'https://chat.whatsapp.com/...'
}
```

**Por que importa:**
- Confirmar que sistema funciona
- Rastrear qual perfil viu qual mensagem
- A/B testing futuro de mensagens de resultado

**Dashboard:**
- Nenhum (já coberto no quiz_complete)

---

### 7️⃣ **whatsapp_click** - Usuário clica botão WhatsApp

**Quando dispara:** Clique no botão verde "Entrar no Grupo"

**Dados coletados:**
```javascript
{
  'event': 'whatsapp_click',
  'profile_type': 'curioso',
  'whatsapp_group_name': 'IA Sem Mistério #6 - Curiosos',
  'button_text': 'Entrar no Grupo de WhatsApp',
  'click_time_after_result': 5  // segundos
}
```

**Por que importa:**
- Taxa de conversão: Quiz → WhatsApp
- Qual perfil mais clica
- Se esperam antes de clicar ou clicam imediatamente

**Exemplo:**
```
Perfil Iniciante: 75% clica
Perfil Curioso: 92% clica
Perfil Pronto: 88% clica

→ Iniciantes hesitam! Precisa mensagem mais convincente
```

**Dashboard:**
- Taxa de clique por perfil
- Tempo médio até clicar

---

### 8️⃣ **whatsapp_join_success** - Entra no grupo

**Quando dispara:** Depois que WhatsApp abre (rastreado por UTM do link)

**Dados coletados:**
```javascript
{
  'event': 'whatsapp_join_confirmed',
  'profile_type': 'curioso',
  'whatsapp_group': '#6',
  'join_timestamp': 1718000500,
  'referrer': 'quiz',
  'utm_source': 'ia_sem_misterio_quiz',
  'utm_campaign': 'curioso_profile'
}
```

**Por que importa:**
- Confirmar conversão final
- Saber qual grupo cada pessoa entrou
- Medir velocity (tempo anúncio → Quiz → WhatsApp)

**Métrica crítica:**
```
100 cliques em anúncio
  ↓
85 começam quiz (85%)
  ↓
68 completam (80% dos que começaram)
  ↓
62 clicam WhatsApp (91% dos que completaram)
  ↓
55 entram no grupo (89% dos que clicaram)

CONVERSÃO TOTAL: 55% (anúncio → grupo)
```

**Dashboard:**
- Funil de conversão (anúncio → grupo)
- Tempo total da jornada
- Qual grupo tem mais gente

---

### 9️⃣ **quiz_abandoned** - Usuário abandona

**Quando dispara:** Se voltar atrás, fechar aba, ou timeout (5 min sem atividade)

**Dados coletados:**
```javascript
{
  'event': 'quiz_abandoned',
  'last_question_viewed': 5,
  'questions_answered': 4,
  'current_score': 8,
  'abandon_reason': 'back_button', // ou 'close_tab', 'timeout'
  'session_duration': 120  // segundos
}
```

**Por que importa:**
- Entender por que as pessoas desistem
- Qual pergunta as faz desistir
- Otimizar fluxo

**Exemplo de ação:**
```
Se 15% abandona na pergunta 4:
→ Pergunta 4 é muito confusa
→ Reescrever com linguagem mais simples
→ Testar nova versão
```

**Dashboard:**
- Taxa de abandono geral
- Onde abandonam (qual pergunta)
- Razão do abandono

---

## 📊 Dashboard Principal (o que você vai ver)

### Real-time (Agora)

```
┌─────────────────────────────────────────┐
│  IA SEM MISTÉRIO - QUIZ ANALYTICS       │
├─────────────────────────────────────────┤
│                                         │
│  📊 HOJE:                               │
│  └─ Visitantes: 234                     │
│  └─ Começaram quiz: 198 (85%)          │
│  └─ Completaram: 156 (79%)             │
│  └─ Foram ao WhatsApp: 143 (92%)       │
│  └─ Taxa conversão total: 61%          │
│                                         │
│  👥 DISTRIBUIÇÃO DE PERFIS:             │
│  └─ Iniciante: 47 (30%)                │
│  └─ Curioso: 78 (50%)                  │
│  └─ Pronto para Evoluir: 31 (20%)      │
│                                         │
│  ⏱️  VELOCIDADE:                         │
│  └─ Tempo médio no quiz: 95 segundos    │
│  └─ Tempo até clicar WhatsApp: 3 seg    │
│                                         │
│  ⚠️  ALERTAS:                            │
│  └─ Pergunta 5: 18% abandono            │
│  └─ Iniciantes clicam menos (75% vs 92%)│
│                                         │
└─────────────────────────────────────────┘
```

### Por Período

```
Últimos 7 dias:
- Anúncios: 1.580 cliques
- Quiz: 1.250 começaram (79%)
- Conversão final: 687 no WhatsApp (54%)
- Custo por conversão: R$X

Distribuição por dia:
Segunda: 156 conversões
Terça: 189 conversões
Quarta: 145 conversões
...
```

---

## 🔄 Funil de Conversão

```
Anúncio (100%)
├─ Chegam no site (100%)
├─ Começam quiz (85%)    ← DROP 15%
├─ Completam quiz (68%)  ← DROP 17%
├─ Clicam WhatsApp (62%) ← DROP 6%
└─ Entram no grupo (55%) ← DROP 7%

TOTAL: 55% de conversão
```

---

## 📋 Segmentação para Análise

### Por Perfil

```
INICIANTE ABSOLUTO (30%)
├─ Taxa de conclusão: 85%
├─ Tempo médio: 105 seg
├─ Taxa WhatsApp: 75%
└─ Grupo: #5

CURIOSO (50%)
├─ Taxa de conclusão: 92%
├─ Tempo médio: 92 seg
├─ Taxa WhatsApp: 94%
└─ Grupo: #6

PRONTO PARA EVOLUIR (20%)
├─ Taxa de conclusão: 95%
├─ Tempo médio: 85 seg
├─ Taxa WhatsApp: 90%
└─ Grupo: #7
```

### Por Fonte

```
Meta Ads
├─ Conversão: 62%
└─ Custo: R$5/conversão

Google Ads (futuro)
├─ Conversão: ?
└─ Custo: ?

LinkedIn (futuro)
├─ Conversão: ?
└─ Custo: ?
```

### Por Dispositivo

```
Mobile (60%)
├─ Taxa conclusão: 75%
└─ Drop-off na pergunta: 5

Desktop (40%)
├─ Taxa conclusão: 88%
└─ Drop-off na pergunta: 7
```

---

## 💡 Insights Acionáveis

### O que aprenderemos

```
INSIGHT 1: Qual é o perfil dominante?
→ Se 60% são "Iniciante", anúncios estão atraindo certo público
→ Mensagens no WhatsApp devem ser básicas

INSIGHT 2: Em qual pergunta mais gente cai?
→ Se pergunta 5 tem 20% drop, ela é ruim
→ Reescrever com linguagem mais simples

INSIGHT 3: Qual fonte traz melhor conversão?
→ Se Meta converte 62% e Google 45%
→ Aumentar budget em Meta

INSIGHT 4: Mobile vs Desktop?
→ Se mobile tem 75% conversão vs desktop 88%
→ Otimizar interface mobile

INSIGHT 5: Qual perfil clica menos no WhatsApp?
→ Se Iniciantes clicam 75% vs Curiosos 94%
→ Mensagem final precisa ser mais convincente para iniciantes
```

---

## 🎯 Metas de Performance

**Mês 1 - Calibration:**
- Visitantes: 1.000+
- Taxa de conclusão: 70%+
- Taxa de conversão (anúncio → grupo): 50%+

**Mês 2 - Optimization:**
- Visitantes: 1.500+
- Taxa de conclusão: 75%+
- Taxa de conversão: 55%+

**Mês 3 - Scale:**
- Visitantes: 3.000+
- Taxa de conclusão: 80%+
- Taxa de conversão: 60%+

---

## 🔧 Implementação Técnica

### Data Layer Push (o que escrever no código)

#### Evento 1: Quiz Inicia
```javascript
dataLayer.push({
  'event': 'quiz_start',
  'eventData': {
    'quiz_name': 'IA Sem Mistério',
    'device_type': window.innerWidth < 768 ? 'mobile' : 'desktop'
  }
});
```

#### Evento 2: Responde Pergunta
```javascript
dataLayer.push({
  'event': 'answer_selected',
  'eventData': {
    'question_number': 1,
    'answer_selected': 'Aposentado/a',
    'score_value': 0,
    'cumulative_score': 0
  }
});
```

#### Evento 3: Quiz Completa
```javascript
dataLayer.push({
  'event': 'quiz_complete',
  'eventData': {
    'total_score': 12,
    'profile_type': 'curioso',
    'time_to_complete': Math.floor((Date.now() - quizStartTime) / 1000)
  }
});
```

#### Evento 4: Clica WhatsApp
```javascript
dataLayer.push({
  'event': 'whatsapp_click',
  'eventData': {
    'profile_type': profileType,
    'whatsapp_group': groupName
  }
});
// Depois direciona
window.open(whatsappUrl, '_blank');
```

---

## 📈 Reports para Acompanhar

### Diário
- Conversões totais
- Visitantes
- Taxa de conclusão
- Perfil dominante

### Semanal
- Funil de conversão
- Drop-off por pergunta
- Performance por anúncio
- Costo por conversão

### Mensal
- Trends de performance
- Segmentação por perfil
- Comparativo mês anterior
- Roadmap de otimizações

---

## ✅ Checklist de Implementação

```
□ Data Layer push em quiz_start
□ Data Layer push em cada resposta
□ Data Layer push em quiz_complete
□ Data Layer push em whatsapp_click
□ Trigger "Quiz Start" em GTM
□ Trigger "Answer Selected" em GTM
□ Trigger "Quiz Complete" em GTM
□ Trigger "WhatsApp Click" em GTM
□ Tag Meta Pixel para cada evento
□ Tag GA4 para cada evento
□ Tag Google Ads para conversão
□ Preview em GTM testado
□ Publicar versão GTM
□ Aguardar 24h para dados
□ Criar dashboard em GA4
□ Criar dashboard em Meta
□ Criar dashboard em Google Ads
□ Monitorar primeira semana
□ Documento de insights compartilhado
```

---

## 🎓 Perguntas que Responderemos

1. **"Quanto custa trazer alguém até o WhatsApp?"**
   → Custo anúncio / Conversões finais

2. **"Qual tipo de pessoa eu estou atraindo?"**
   → Distribuição de perfis (30% Iniciante, 50% Curioso, 20% Pronto)

3. **"Onde as pessoas desistem?"**
   → Pergunta com maior abandono

4. **"Qual fonte de anúncio funciona melhor?"**
   → Taxa de conversão por plataforma (Meta vs Google)

5. **"O quiz está funcionando?"**
   → Taxa de conclusão (meta: >75%)

6. **"As mensagens estão claras?"**
   → Taxa de abandono (se >30%, algo está confuso)

7. **"Qual grupo cresce mais rápido?"**
   → Comparativo #5 vs #6 vs #7

8. **"Preciso mudar os anúncios?"**
   → Analisar perfil dos que chegam vs alvo esperado

---

**Este plano responde EXATAMENTE o que você vai saber com o rastreamento implementado!**

Próximo passo: Implementar no código 🚀
