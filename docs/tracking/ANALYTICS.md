# 📊 Google Analytics 4 (GA4) - Event Tracking Completo

> Última atualização: Junho 2026
> Fontes: [GA4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4), [Google Support](https://support.google.com/analytics)

## 📋 Índice
1. [GA4 Overview](#ga4-overview)
2. [Event Types](#event-types)
3. [Recommended Events](#recommended-events)
4. [Event Parameters](#event-parameters)
5. [E-commerce Events](#e-commerce-events)
6. [Implementation](#implementation)
7. [GTM Integration](#gtm-integration)
8. [Best Practices](#best-practices)

---

## 🎯 GA4 Overview

### O que mudou do Universal Analytics?

| Aspecto | UA (antigo) | GA4 (novo) |
|---------|-----------|-----------|
| **Modelo** | Sessions | Events |
| **Rastreamento** | Page views | User actions |
| **Foco** | Páginas visitadas | Comportamento do usuário |
| **App + Web** | Separado | Integrado |
| **Machine Learning** | Limitado | Avançado (Predictive) |
| **Cross-device** | Manual | Automático |

### Principais Diferenças

**Universal Analytics:** "Usuário visitou 5 páginas"
**GA4:** "Usuário viu 3 produtos, adicionou 1 ao carrinho, mas não comprou"

### Event-Based Model

GA4 funciona 100% baseado em eventos:

```
Evento = Ação do usuário
├─ event_name (obrigatório)
├─ parameters (opcionais)
└─ user_id ou client_id (identificação)
```

---

## 📌 Event Types

### 1. **Automatically Collected Events**

Coletados automaticamente pelo GA4:

```
- page_view
- scroll (50% da página)
- view_search_results
- video_start
- video_progress
- video_complete
- file_download
```

**Você não precisa implementar nada!** Só ativar Enhanced Measurement.

### 2. **Enhanced Measurement Events**

Eventos coletados quando você ativa "Enhanced Measurement":

```
- page_view
- scroll
- outbound_click
- site_search
- video_engagement
- file_download
- form_submit
```

**Ativação no GA4:**
Admin → Data Streams → Web → Enhanced Measurement

### 3. **Recommended Events**

Eventos predefinidos com nomes e parâmetros específicos que desbloqueiam relatórios.

**Exemplos:**
- `purchase`
- `add_to_cart`
- `view_item`
- `search`
- `login`

**Benefício:** Desbloqueiam relatórios automáticos no GA4!

### 4. **Custom Events**

Eventos customizados que você cria para casos específicos.

```javascript
gtag('event', 'meu_evento_customizado', {
  'meu_parametro': 'valor'
});
```

---

## ⭐ Recommended Events

### E-commerce Funnel Events

#### 1. **view_item** - Visualizar Produto

```javascript
gtag('event', 'view_item', {
  items: [{
    item_id: 'prod_123',
    item_name: 'Camiseta Azul',
    price: 79.90,
    currency: 'BRL',
    item_category: 'roupas',
    item_variant: 'tamanho-M'
  }]
});
```

**Parâmetros:**
- `items`: Array de produtos
- `item_id`: ID único do produto (OBRIGATÓRIO)
- `item_name`: Nome do produto
- `price`: Preço do produto
- `currency`: Código da moeda
- `item_category`: Categoria do produto
- `item_variant`: Variação (tamanho, cor, etc)

#### 2. **add_to_cart** - Adicionar ao Carrinho

```javascript
gtag('event', 'add_to_cart', {
  value: 159.80,
  currency: 'BRL',
  items: [
    {
      item_id: 'prod_123',
      item_name: 'Camiseta Azul',
      price: 79.90,
      quantity: 1
    },
    {
      item_id: 'prod_456',
      item_name: 'Calça Preta',
      price: 80.00,
      quantity: 1
    }
  ]
});
```

**Parâmetros:**
- `value`: Valor total adicionado ao carrinho
- `currency`: Moeda
- `items`: Array de produtos

#### 3. **begin_checkout** - Iniciar Checkout

```javascript
gtag('event', 'begin_checkout', {
  value: 159.80,
  currency: 'BRL',
  coupon: 'SUMMER10',
  items: [
    {
      item_id: 'prod_123',
      item_name: 'Camiseta Azul',
      price: 79.90,
      quantity: 1
    }
  ]
});
```

**Parâmetros:**
- `value`: Valor do carrinho
- `coupon`: Cupom aplicado (opcional)
- `items`: Array de produtos

#### 4. **add_shipping_info** - Adicionar Informação de Entrega

```javascript
gtag('event', 'add_shipping_info', {
  value: 159.80,
  currency: 'BRL',
  coupon: 'SUMMER10',
  shipping_tier: 'standard',
  items: [...]
});
```

#### 5. **add_payment_info** - Adicionar Informação de Pagamento

```javascript
gtag('event', 'add_payment_info', {
  value: 159.80,
  currency: 'BRL',
  coupon: 'SUMMER10',
  payment_type: 'credit_card',
  items: [...]
});
```

#### 6. **purchase** - Compra (MAIS IMPORTANTE!)

```javascript
gtag('event', 'purchase', {
  transaction_id: 'order_20260610_12345',
  affiliation: 'Online Store',
  value: 159.80,
  tax: 25.00,
  shipping: 15.00,
  currency: 'BRL',
  coupon: 'SUMMER10',
  items: [
    {
      item_id: 'prod_123',
      item_name: 'Camiseta Azul',
      price: 79.90,
      quantity: 1,
      item_category: 'roupas'
    },
    {
      item_id: 'prod_456',
      item_name: 'Calça Preta',
      price: 80.00,
      quantity: 1,
      item_category: 'roupas'
    }
  ]
});
```

**Parâmetros obrigatórios:**
- `value`: Valor total da compra
- `currency`: Moeda
- `transaction_id`: ID único da transação (MUITO IMPORTANTE!)

**Parâmetros recomendados:**
- `tax`: Valor de impostos
- `shipping`: Valor do frete
- `coupon`: Cupom utilizado
- `items`: Array de produtos comprados

#### 7. **refund** - Reembolso

```javascript
gtag('event', 'refund', {
  transaction_id: 'order_20260610_12345',
  value: 159.80,
  currency: 'BRL',
  items: [...]
});
```

#### 8. **select_item** - Selecionar Item

```javascript
gtag('event', 'select_item', {
  items: [{
    item_id: 'prod_123',
    item_name: 'Camiseta Azul',
    item_list_name: 'Featured Products'
  }]
});
```

### Other Recommended Events

#### **search** - Pesquisa

```javascript
gtag('event', 'search', {
  search_term: 'camiseta azul'
});
```

#### **view_search_results** - Ver Resultados de Busca

```javascript
gtag('event', 'view_search_results', {
  search_term: 'camiseta azul'
});
```

#### **login** - Login

```javascript
gtag('event', 'login', {
  method: 'email'  // 'email', 'google', 'facebook', etc
});
```

#### **sign_up** - Inscrição

```javascript
gtag('event', 'sign_up', {
  method: 'email'  // Método de inscrição
});
```

---

## 📝 Event Parameters

### Parameter Scope Levels

GA4 tem 3 níveis de parâmetros:

#### 1. **User-Scoped Parameters**
Valem para todo usuário em toda sessão

```javascript
gtag('config', 'G-XXXXXXXXXX', {
  'user_id': 'user_123',
  'language': 'pt-BR'
});
```

#### 2. **Session-Scoped Parameters**
Valem para a sessão atual

```javascript
gtag('set', {'session_id': 'session_abc123'});
```

#### 3. **Event-Scoped Parameters**
Valem apenas para este evento

```javascript
gtag('event', 'purchase', {
  'value': 99.99,
  'currency': 'BRL'
});
```

### Common Event Parameters

```javascript
gtag('event', 'purchase', {
  // OBRIGATÓRIO para monetization
  'value': 99.99,
  'currency': 'BRL',
  
  // RECOMENDADO
  'transaction_id': 'tx_12345',
  'affiliation': 'Online Store',
  'tax': 10.00,
  'shipping': 5.00,
  'coupon': 'SUMMER10',
  
  // CUSTOMIZADO
  'payment_method': 'credit_card',
  'customer_type': 'returning'
});
```

### Items Array Structure

```javascript
items: [
  {
    'item_id': 'prod_123',              // RECOMENDADO
    'item_name': 'Camiseta Azul',      // RECOMENDADO
    'quantity': 1,                      // RECOMENDADO
    'price': 79.90,                     // OPCIONAL
    'currency': 'BRL',                  // OPCIONAL
    'item_category': 'roupas',          // OPCIONAL
    'item_category2': 'masculino',      // OPCIONAL
    'item_category3': 'camisetas',      // OPCIONAL
    'item_category4': '',               // OPCIONAL
    'item_category5': '',               // OPCIONAL
    'item_brand': 'Nike',               // OPCIONAL
    'item_variant': 'tamanho-M',        // OPCIONAL
    'item_list_name': 'Best Sellers',   // OPCIONAL
    'item_list_position': 1,            // OPCIONAL
    'promotion_id': 'promo_123',        // OPCIONAL
    'promotion_name': 'Summer Sale'     // OPCIONAL
  }
]
```

---

## 🛒 E-commerce Events

### Complete E-commerce Flow

```
1. view_item_list → Usuário vê lista de produtos
2. view_item → Clica em um produto
3. select_item → Seleciona para comparar
4. view_cart → Vai ao carrinho
5. add_to_cart → Adiciona produtos
6. remove_from_cart → Remove produtos
7. begin_checkout → Inicia checkout
8. add_shipping_info → Adiciona endereço
9. add_payment_info → Adiciona pagamento
10. purchase → COMPRA!
```

### Implementation Checklist

```javascript
// 1. Setup GA4
gtag('config', 'G-XXXXXXXXXX', {
  'user_id': 'user_12345'
});

// 2. View Product
gtag('event', 'view_item', {
  items: [{
    item_id: 'prod_123',
    item_name: 'Camiseta',
    price: 79.90,
    currency: 'BRL'
  }]
});

// 3. Add to Cart
gtag('event', 'add_to_cart', {
  value: 79.90,
  currency: 'BRL',
  items: [...]
});

// 4. Begin Checkout
gtag('event', 'begin_checkout', {
  value: 79.90,
  currency: 'BRL',
  items: [...]
});

// 5. Purchase
gtag('event', 'purchase', {
  transaction_id: 'order_123',
  value: 79.90,
  currency: 'BRL',
  items: [...]
});
```

---

## 🔧 Implementation

### Setup Básico

#### 1. Instalar GA4 Tag

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

**Substitua `G-XXXXXXXXXX` com seu GA4 Measurement ID**

#### 2. Aonde colocar?
Ideal no `<head>` de TODAS as páginas, ou via GTM.

### Track Event

```javascript
// Evento simples
gtag('event', 'page_view');

// Evento com parâmetros
gtag('event', 'purchase', {
  'value': 99.99,
  'currency': 'BRL',
  'transaction_id': 'order_123'
});

// Evento com array de itens
gtag('event', 'view_item', {
  'items': [{
    'item_id': 'prod_123',
    'item_name': 'Produto',
    'price': 99.99
  }]
});
```

### Set User Properties

```javascript
gtag('set', {
  'user_id': 'user_123'
});

// Ou em config
gtag('config', 'G-XXXXXXXXXX', {
  'user_id': 'user_123',
  'user_properties': {
    'subscription_status': 'active'
  }
});
```

---

## 🏷️ GTM Integration

### Implementar GA4 via GTM (Recomendado)

#### Passo 1: Criar Variable para Measurement ID

1. Variables → New
2. Type: Constant
3. Value: `G-XXXXXXXXXX`
4. Name: "Const - GA4 Measurement ID"
5. Save

#### Passo 2: Criar Tag GA4 Initialization

1. Tags → New
2. Type: Google Analytics: GA4 Configuration
3. Measurement ID: `{{Const - GA4 Measurement ID}}`
4. Trigger: All Pages
5. Name: "GA4 - Initialization"
6. Save

#### Passo 3: Criar Tag para Purchase Event

1. Tags → New
2. Type: Google Analytics: GA4 Event
3. Measurement ID: `{{Const - GA4 Measurement ID}}`
4. Event Name: `purchase`
5. Event Parameters:
   - value: `{{DLV - Transaction Value}}`
   - currency: `BRL`
   - transaction_id: `{{DLV - Transaction ID}}`
   - items: `{{DLV - Items}}`
6. Trigger: Purchase Complete
7. Name: "GA4 - Purchase"
8. Save

### Data Layer Structure para GA4

```javascript
dataLayer.push({
  'event': 'purchase',
  'eventData': {
    'transaction_id': 'order_123',
    'transaction_value': 199.90,
    'currency': 'BRL',
    'items': [
      {
        'item_id': 'prod_001',
        'item_name': 'Produto A',
        'price': 99.90,
        'quantity': 1
      }
    ]
  }
});
```

---

## ✅ Best Practices

### 1. **Sempre use transaction_id no Purchase**

```javascript
// ❌ ERRADO
gtag('event', 'purchase', {
  'value': 99.99,
  'currency': 'BRL'
});

// ✅ CORRETO
gtag('event', 'purchase', {
  'value': 99.99,
  'currency': 'BRL',
  'transaction_id': 'order_' + Date.now()
});
```

### 2. **Use Recommended Events**

```javascript
// ❌ ERRADO - Custom event
gtag('event', 'user_comprou', {
  'valor': 99.99
});

// ✅ CORRETO - Recommended event
gtag('event', 'purchase', {
  'value': 99.99,
  'currency': 'BRL'
});
```

### 3. **Items Array sempre atualizado**

```javascript
// ❌ ERRADO - sem item_id
items: [{
  'item_name': 'Produto'
}]

// ✅ CORRETO
items: [{
  'item_id': 'prod_123',
  'item_name': 'Produto'
}]
```

### 4. **Currency obrigatório com value**

```javascript
// ❌ ERRADO
{
  'value': 99.99
  // Falta currency!
}

// ✅ CORRETO
{
  'value': 99.99,
  'currency': 'BRL'
}
```

### 5. **E-commerce funnel completo**

Sempre rastreie o funil inteiro:

```
view_item → add_to_cart → begin_checkout → purchase
```

### 6. **Custom events com moderação**

```javascript
// ✅ BOM - Eventos importantes
gtag('event', 'video_completed', {duration: 120});

// ❌ EXCESSIVO - Dados não importantes
gtag('event', 'mouse_hover', {element: 'btn'});
```

### 7. **User ID Implementation**

```javascript
// Set user ID quando login
gtag('config', 'G-XXXXXXXXXX', {
  'user_id': 'user_12345'
});

// Clear user ID no logout
gtag('config', 'G-XXXXXXXXXX', {
  'user_id': undefined
});
```

---

## 🔍 Debugging

### Google Analytics Debugger (Chrome Extension)

1. Install: [Google Analytics Debugger](https://chrome.google.com/webstore)
2. Enable extension
3. Abra DevTools Console
4. Navegue no seu site
5. Veja todos os eventos sendo rastreados

### Real-Time Report

No GA4:
1. Reports → Real-time
2. Veja visitantes em tempo real
3. Veja eventos acontecendo

### Event Validation

No GA4:
1. Admin → Data Collection → Events
2. Crie "Custom event" de teste
3. Verifique eventos mapeados corretamente

---

## 🔗 Resources

- [GA4 Event Tracking](https://developers.google.com/analytics/devguides/collection/ga4/events)
- [E-commerce Measurement](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce)
- [Recommended Events](https://developers.google.com/analytics/devguides/collection/ga4/reference/events)
- [GA4 Setup Guide](https://support.google.com/analytics/answer/10089681)

---

**Próxima página:** [Google Ads](./GOOGLE_ADS.md)
