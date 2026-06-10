# 📊 Tracking & Conversion Setup - Documentação Completa

> **Status:** ✅ Completo e Atualizado (Junho 2026)
> 
> Esta documentação é baseada nas documentações oficiais de Meta, Google e práticas recomendadas.

---

## 🚀 Começando

### Objetivo Geral

Configurar um sistema de rastreamento completo que capture:
- ✅ **Meta Pixel** - Rastreamento para Meta Ads
- ✅ **Google Analytics 4** - Análise de comportamento
- ✅ **Google Ads** - Rastreamento de conversões
- ✅ **Google Tag Manager** - Centralizar tudo sem editar código

### Fluxo Completo

```
Usuário clica anúncio Meta
        ↓
Chega no seu site
        ↓
dataLayer.push({event: 'purchase', ...})
        ↓
GTM detecta evento
        ↓
Meta Pixel track → fbq('track', 'Purchase')
GA4 track        → gtag('event', 'purchase')
Google Ads track → gtag('event', 'purchase')
        ↓
Conversões rastreadas em 3 plataformas
```

---

## 📄 Documentação

### 1. **Meta Ads** - [META_ADS.md](./META_ADS.md)

Meta Pixel para rastreamento de eventos e conversões em campanhas Meta.

**Tópicos:**
- ✅ O que é Meta Pixel
- ✅ 17 Standard Events (ViewContent, Purchase, etc)
- ✅ Event Parameters
- ✅ Implementação
- ✅ Best Practices
- ✅ Troubleshooting

**Arquivo:** `META_ADS.md`
**Tempo de leitura:** 25 minutos

---

### 2. **Google Tag Manager** - [GTM.md](./GTM.md)

Centralizar todos os pixels em um único lugar.

**Tópicos:**
- ✅ Visão geral do GTM
- ✅ Data Layer (coração do GTM)
- ✅ Variables (placeholders dinâmicos)
- ✅ Triggers (quando disparar)
- ✅ Tags (código que dispara)
- ✅ Integração Meta Pixel + GTM
- ✅ Best Practices

**Arquivo:** `GTM.md`
**Tempo de leitura:** 30 minutos

---

### 3. **Google Analytics 4** - [ANALYTICS.md](./ANALYTICS.md)

Rastreamento de eventos para análise e inteligência.

**Tópicos:**
- ✅ O que mudou do UA para GA4
- ✅ Tipos de eventos
- ✅ Recommended Events (purchase, add_to_cart, etc)
- ✅ E-commerce tracking
- ✅ Event Parameters
- ✅ Items Array (produtos)
- ✅ Integração com GTM
- ✅ Best Practices

**Arquivo:** `ANALYTICS.md`
**Tempo de leitura:** 28 minutos

---

### 4. **Google Ads** - [GOOGLE_ADS.md](./GOOGLE_ADS.md)

Conversion tracking para otimizar campanhas.

**Tópicos:**
- ✅ O que é Conversion Tracking
- ✅ Tipos de conversões
- ✅ Google Tag Setup
- ✅ Integração com GTM
- ✅ Events recomendados
- ✅ Attribution Models
- ✅ Enhanced Conversions
- ✅ Best Practices

**Arquivo:** `GOOGLE_ADS.md`
**Tempo de leitura:** 22 minutos

---

## 🎯 Implementação Passo-a-Passo

### Phase 1: Setup inicial (30 minutos)

#### 1.1 Criar contas

- [ ] Meta Business Account (ads.facebook.com)
- [ ] Google Tag Manager Account
- [ ] Google Analytics 4 Property
- [ ] Google Ads Account

#### 1.2 Configurar IDs

```
Meta Pixel ID:          1234567890
GA4 Measurement ID:     G-XXXXXXXXXX
Google Ads Conversion:  AW-YYYYYYYYYY
GTM Container ID:       GTM-ZZZZZZZZ
```

### Phase 2: GTM + Data Layer (45 minutos)

#### 2.1 Instalar GTM Container

```html
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>
```

#### 2.2 Inicializar Data Layer

```javascript
<script>
  window.dataLayer = window.dataLayer || [];
</script>
```

#### 2.3 Implementar Data Layer Push

```javascript
// Quando usuário compra
dataLayer.push({
  'event': 'purchase',
  'eventData': {
    'transaction_id': 'order_123',
    'transaction_value': 199.90,
    'currency': 'BRL',
    'items': [{
      'item_id': 'prod_001',
      'item_name': 'Produto',
      'price': 199.90,
      'quantity': 1
    }]
  }
});
```

### Phase 3: Meta Pixel (30 minutos)

#### 3.1 Criar Meta Pixel (se não tiver)

1. Meta Business Suite → Data Sources → Pixels
2. Create New Pixel
3. Get Pixel ID

#### 3.2 Criar Tag Meta Pixel no GTM

1. Tags → New
2. Type: Meta Pixel
3. Pixel ID: {{Const - Meta Pixel ID}}
4. Track Standard Event: Purchase
5. Trigger: Purchase Complete
6. Save

### Phase 4: Google Analytics 4 (30 minutos)

#### 4.1 Setup GA4

1. Google Analytics → Create Property
2. Web Stream
3. Get Measurement ID (G-XXXXXXXX)

#### 4.2 Tag GA4 no GTM

1. Tags → New
2. Type: Google Analytics: GA4 Configuration
3. Measurement ID: {{Const - GA4 Measurement ID}}
4. Trigger: All Pages
5. Save

#### 4.3 GA4 Events Tags

```
Tag: GA4 - Purchase
Type: GA4 Event
Event: purchase
Parameters:
- value: {{DLV - Transaction Value}}
- currency: BRL
- transaction_id: {{DLV - Transaction ID}}
Trigger: Purchase Complete
```

### Phase 5: Google Ads (30 minutos)

#### 5.1 Criar Conversion

1. Google Ads → Tools → Conversions
2. Create New Conversion
3. Type: Website
4. Get Conversion ID (AW-XXXXXXXXX)
5. Get Conversion Label

#### 5.2 Tag Google Ads no GTM

```
Tag: Google Ads - Conversion Tracking
Type: Google Ads Conversion Tracking
Conversion ID: {{Const - Google Ads Conversion ID}}
Conversion Label: {{Const - Google Ads Conversion Label}}
Value: {{DLV - Transaction Value}}
Currency: BRL
Trigger: Purchase Complete
```

#### 5.3 Link Google Ads ↔ GA4

1. Google Ads → Tools → Linked accounts
2. Google Analytics 4
3. Link and enable conversion import

### Phase 6: Testing & QA (1 hora)

#### 6.1 Preview Mode

1. GTM Preview
2. Acesse seu site
3. Faça transação de teste
4. Veja no Debug Panel:
   - [ ] dataLayer push
   - [ ] Triggers firing
   - [ ] Tags firing

#### 6.2 Real-Time Verification

```
✅ Google Analytics → Real-time → Ver evento
✅ Meta Events Manager → Ver purchase event
✅ Google Ads → Conversions → Ver conversion
```

#### 6.3 Aguarde 24 horas

Dados levam até 24h para aparecer em todos os lugares.

---

## 🔍 Arquitetura de Dados

```
                    ┌─────────────────────────┐
                    │  Seu Website/App        │
                    │  (DataLayer Push)       │
                    └────────────┬────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │   Google Tag Manager    │
                    │  (Centraliza eventos)   │
                    └────────────┬────────────┘
                                 │
        ┌────────────────┬───────┴───────┬────────────────┐
        │                │               │                │
        ▼                ▼               ▼                ▼
    ┌────────┐      ┌────────┐     ┌────────┐     ┌────────────┐
    │  Meta  │      │  GA4   │     │Google  │     │  LinkedIn  │
    │ Pixel  │      │        │     │ Ads    │     │ Pixel etc. │
    └────────┘      └────────┘     └────────┘     └────────────┘
        │                │               │                │
        ▼                ▼               ▼                ▼
    ┌──────────────────────────────────────────────────────────┐
    │         Marketing Analysis & Optimization               │
    │  - Campaign Performance                                  │
    │  - User Behavior Insights                                │
    │  - ROAS Calculation                                      │
    │  - Audience Building                                     │
    └──────────────────────────────────────────────────────────┘
```

---

## 📊 Example: E-commerce Purchase Flow

### Código JavaScript (no seu site)

```javascript
// 1. Usuário clica "Comprar"
// 2. Processa pagamento
// 3. Compra confirmada → Push para dataLayer

dataLayer.push({
  'event': 'purchase',
  'eventData': {
    // ID da transação (IMPORTANTÍSSIMO!)
    'transaction_id': 'order_20260610_' + Date.now(),
    
    // Valores
    'transaction_value': 299.90,
    'currency': 'BRL',
    
    // Produtos
    'items': [
      {
        'item_id': 'SKU-001',
        'item_name': 'Camiseta Premium Azul',
        'price': 79.90,
        'quantity': 2,
        'item_category': 'roupas'
      },
      {
        'item_id': 'SKU-002',
        'item_name': 'Calça Preta Premium',
        'price': 120.00,
        'quantity': 1,
        'item_category': 'roupas'
      }
    ]
  }
});
```

### O que acontece automaticamente

```
1. GTM detecta 'purchase' event
   ↓
2. Trigger "Purchase Complete" ativa
   ↓
3. Tags disparam:
   ├─ Meta Pixel: fbq('track', 'Purchase', {...})
   ├─ GA4: gtag('event', 'purchase', {...})
   └─ Google Ads: gtag('event', 'purchase', {...})
   ↓
4. Conversões registradas em:
   ├─ Meta Ads Manager
   ├─ Google Analytics
   ├─ Google Ads
   └─ (Qualquer outro pixel)
```

---

## 🎓 Conceitos Fundamentais

### Event

**O quê:** Ação do usuário que você quer rastrear
**Exemplo:** Purchase, AddToCart, ViewContent

### Event Parameter

**O quê:** Dados sobre o evento
**Exemplo:** {value: 99.99, currency: "BRL"}

### Data Layer

**O quê:** Objeto JavaScript que passa dados
**Quem usa:** GTM (extrai dados via variables)

### Variable

**O quê:** Placeholder para valores dinâmicos
**Exemplo:** {{DLV - Transaction Value}}

### Trigger

**O quê:** Condição que dispara tags
**Exemplo:** Quando event = "purchase"

### Tag

**O quê:** Código/pixel que executa
**Exemplo:** Meta Pixel fbq('track', 'Purchase')

---

## ✅ Checklist Final

```
SETUP
☐ Meta Pixel criado e ID obtido
☐ GA4 Property criado e ID obtido
☐ Google Ads Conversion criado e ID obtido
☐ GTM Container criado e ID obtido

IMPLEMENTAÇÃO
☐ GTM Container instalado no site
☐ Data Layer inicializado
☐ DataLayer push implementado
☐ Variables criadas em GTM
☐ Triggers criados
☐ Tags Meta Pixel criadas
☐ Tags GA4 criadas
☐ Tags Google Ads criadas

TESTES
☐ Preview mode ativado
☐ Teste de compra realizado
☐ dataLayer push verificado
☐ Triggers disparam?
☐ Tags disparam?
☐ Meta Events Manager mostra evento?
☐ GA4 Real-time mostra evento?
☐ Google Ads mostra conversão?

PUBLICAÇÃO
☐ Versão GTM submetida para review
☐ Versão publicada
☐ Aguardou 24 horas
☐ Dados aparecem em todos os dashboards?

MONITORING
☐ Dashboard criado em GA4
☐ Dashboard criado em Google Ads
☐ Alert configurado para anomalias
☐ Documentação interna atualizada
```

---

## 🔗 Quick Links

| Plataforma | Link | Ação |
|-----------|------|------|
| **Meta Business** | https://business.facebook.com | Criar Pixel |
| **Google Tag Manager** | https://tagmanager.google.com | Gerenciar Tags |
| **Google Analytics** | https://analytics.google.com | Ver Dados |
| **Google Ads** | https://ads.google.com | Conversões |
| **GTM Documentation** | https://support.google.com/tagmanager | Ajuda |
| **GA4 Debugger** | Chrome Web Store | Debug |

---

## 📞 Common Issues

| Problema | Causa | Solução |
|----------|-------|--------|
| Conversão não aparece | GTM tag não dispara | Verificar trigger em Preview |
| Valores chegam como zero | value não definido | Incluir value no event |
| Duplicação de conversões | transaction_id igual | Usar ID único por transação |
| Dados não aparecem em GA4 | GA4 tag não configurada | Criar tag GA4 em GTM |
| Meta Pixel não rastreia | Pixel ID incorreto | Verificar em Meta Business |

---

## 📚 Documentos Relacionados

- [META_ADS.md](./META_ADS.md) - Meta Pixel detalhado
- [GTM.md](./GTM.md) - Google Tag Manager detalhado
- [ANALYTICS.md](./ANALYTICS.md) - Google Analytics 4 detalhado
- [GOOGLE_ADS.md](./GOOGLE_ADS.md) - Google Ads detalhado

---

## 💡 Next Steps

1. **Ler documentações completas** (2 horas)
2. **Setup inicial** (1-2 horas)
3. **Implementar data layer** (1-2 horas)
4. **Criar tags em GTM** (1-2 horas)
5. **Testar** (1 hora)
6. **Monitorar** (contínuo)

**Total:** ~8-10 horas para setup completo

---

**Última atualização:** Junho 2026
**Versão:** 1.0
**Status:** ✅ Production Ready
