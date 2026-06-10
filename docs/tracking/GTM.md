# 🏷️ Google Tag Manager (GTM) - Documentação Completa

> Última atualização: Junho 2026
> Fontes: [Google Tag Manager Docs](https://support.google.com/tagmanager), [Google for Developers](https://developers.google.com/tag-platform/tag-manager)

## 📋 Índice
1. [O que é GTM](#o-que-é-gtm)
2. [Conceitos Fundamentais](#conceitos-fundamentais)
3. [Data Layer](#data-layer)
4. [Variables](#variables)
5. [Triggers](#triggers)
6. [Tags](#tags)
7. [Meta Pixel Integration](#meta-pixel-integration)
8. [Best Practices](#best-practices)

---

## 🎯 O que é GTM?

### Visão Geral

Google Tag Manager (GTM) é uma ferramenta gratuita que permite gerenciar e implantar scripts de rastreamento (tags) sem precisar editar código HTML.

**Principais benefícios:**
- ✅ Sem necessidade de modificar código do website
- ✅ Centralizar todos os pixels em um único lugar
- ✅ Versioning e rollback de mudanças
- ✅ Interface visual intuitiva
- ✅ Testes antes de publicar

### Fluxo de Trabalho

```
Website → GTM Container → Meta Pixel
                       → Google Analytics
                       → Google Ads
                       → LinkedIn Pixel
                       → Etc.
```

---

## 🏗️ Conceitos Fundamentais

### 4 Pilares do GTM

#### 1. **Data Layer** 📊
Objeto JavaScript que passa dados para o GTM

#### 2. **Variables** 🔤
Placeholders nomeados para valores dinâmicos

#### 3. **Triggers** 🎯
Condições que determinam quando uma tag deve disparar

#### 4. **Tags** 🏷️
Códigos/scripts que são executados quando triggers disparam

### Relação entre os Componentes

```
Usuário clica em botão
         ↓
    Data Layer push
         ↓
    Trigger detecta evento
         ↓
    Variables extraem dados
         ↓
    Tag dispara (Meta Pixel)
```

---

## 📊 Data Layer

### O que é Data Layer?

Data Layer é um objeto JavaScript que armazena informações sobre eventos e dados do usuário, funcionando como "ponte" entre seu site e o GTM.

### Inicialização do Data Layer

**Antes de carregar o GTM**, coloque no `<head>`

```html
<script>
  window.dataLayer = window.dataLayer || [];
</script>
```

### Exemplo Básico de Push

```javascript
// Quando um evento acontece
dataLayer.push({
  'event': 'purchase_complete',
  'transaction_id': 'tx_12345',
  'transaction_value': 299.90,
  'transaction_currency': 'BRL'
});
```

### Estrutura Recomendada

```javascript
dataLayer.push({
  // Evento obrigatório
  'event': 'nome_do_evento',
  
  // Dados do evento
  'eventData': {
    'transaction_id': 'tx_abc123',
    'transaction_value': 299.90,
    'transaction_currency': 'BRL',
    'items': [
      {
        'id': 'prod_001',
        'name': 'Produto A',
        'price': 99.90,
        'quantity': 1
      },
      {
        'id': 'prod_002',
        'name': 'Produto B',
        'price': 100.00,
        'quantity': 1
      }
    ]
  },
  
  // Dados do usuário (opcional)
  'userData': {
    'user_id': 'user_12345',
    'email': 'user@example.com'
  }
});
```

### Data Layer para Different Events

#### ViewContent (Visualizar Produto)

```javascript
dataLayer.push({
  'event': 'view_content',
  'eventData': {
    'content_id': 'prod_123',
    'content_name': 'Camiseta Azul',
    'content_type': 'product',
    'value': 79.90,
    'currency': 'BRL'
  }
});
```

#### AddToCart (Adicionar ao Carrinho)

```javascript
dataLayer.push({
  'event': 'add_to_cart',
  'eventData': {
    'content_ids': ['prod_001', 'prod_002'],
    'value': 179.80,
    'currency': 'BRL',
    'num_items': 2
  }
});
```

#### InitiateCheckout (Iniciar Checkout)

```javascript
dataLayer.push({
  'event': 'initiate_checkout',
  'eventData': {
    'value': 179.80,
    'currency': 'BRL',
    'num_items': 2
  }
});
```

#### Purchase (Compra)

```javascript
dataLayer.push({
  'event': 'purchase',
  'eventData': {
    'transaction_id': 'order_20260610_12345',
    'transaction_value': 179.80,
    'currency': 'BRL',
    'content_ids': ['prod_001', 'prod_002'],
    'num_items': 2,
    'items': [
      {
        'id': 'prod_001',
        'name': 'Produto A',
        'price': 79.90,
        'quantity': 1,
        'category': 'roupas'
      },
      {
        'id': 'prod_002',
        'name': 'Produto B',
        'price': 100.00,
        'quantity': 1,
        'category': 'acessórios'
      }
    ]
  }
});
```

### Data Layer Variables e Timing

```javascript
// ❌ ERRADO - Disparar sem evento
dataLayer.push({
  'user_id': 'user_123'
  // Sem 'event'!
});

// ✅ CORRETO - Sempre com evento
dataLayer.push({
  'event': 'user_login',
  'user_id': 'user_123'
});
```

---

## 🔤 Variables

### O que são Variables?

Variables são placeholders que armazenam valores dinâmicos extraídos de:
- Data Layer
- JavaScript
- Cookies
- Query parameters
- DOM elements

### Tipos de Variables

#### 1. **Data Layer Variables**

Extrai dados do data layer.

**Configuração no GTM:**
- Type: Data Layer Variable
- Data Layer Variable Name: `eventData.transaction_id`
- Data Type: String

**Uso:** `{{DLV - Transaction ID}}`

#### 2. **JavaScript Variables**

Executa código JavaScript customizado.

```javascript
function() {
  return window.location.pathname;
}
```

**Exemplo:** Pegar URL atual

```javascript
function() {
  return document.location.pathname;
}
```

#### 3. **DOM Element Variables**

Extrai texto/atributo de elementos HTML.

```javascript
// Pegar valor de input
document.querySelector('input[name="email"]').value

// Pegar classe de um elemento
document.querySelector('.product-title').textContent
```

#### 4. **Cookie Variables**

Lê valores de cookies.

**Configuração:**
- Type: 1st Party Cookie
- Cookie Name: `user_id`

#### 5. **Query Parameter Variables**

Extrai parâmetros da URL.

**URL:** `https://example.com/?utm_source=facebook&utm_campaign=summer`

- Type: Query Parameter
- Parameter: `utm_source`
- Resultado: "facebook"

### Variáveis Úteis Pré-Configuradas

```
{{Page Hostname}}     // example.com
{{Page Path}}         // /produto/123
{{Page URL}}          // https://example.com/produto
{{Event}}             // Nome do evento
{{Timestamp}}         // Timestamp Unix
{{Random Number}}     // Número aleatório
```

### Exemplo: Criar Variable para Transaction ID

**No GTM:**
1. Go to Variables
2. New → Data Layer Variable
3. Nome: "DLV - Transaction ID"
4. Data Layer Variable Name: `eventData.transaction_id`
5. Save

**Usar na Tag:**
```
{{DLV - Transaction ID}}
```

---

## 🎯 Triggers

### O que são Triggers?

Triggers são condições que definem QUANDO uma tag deve disparar.

**Exemplos:**
- Quando página carrega
- Quando usuário clica em botão
- Quando data layer atualiza com evento específico
- Quando URL contém palavra-chave

### Tipos de Triggers

#### 1. **Page View** (Visualização de Página)

Dispara quando página carrega.

**Configuração:**
- Type: Page View
- This trigger fires on: All Page Views

**Uso:** Rastrear visitantes gerais

#### 2. **Custom Event** (Evento Customizado)

Dispara quando data layer push com evento específico.

**Configuração:**
- Type: Custom Event
- Event name: `purchase`
- Fire When: equals

```javascript
// No seu site
dataLayer.push({
  'event': 'purchase',
  // ... dados
});
// → Trigger dispara!
```

#### 3. **Click**

Dispara quando clica em elemento.

**Configuração:**
- Type: Click
- Wait for Tags: No (ou sim, depende)
- Check Validation: Yes

**Filtros:**
```
Click Element ID  equals  'btn-checkout'
Click Class       contains 'btn-primary'
```

#### 4. **Form Submission**

Dispara quando form é enviado.

**Configuração:**
- Type: Form Submission
- Form ID: (deixe vazio para todos)

#### 5. **Scroll**

Dispara quando usuário scrollar.

**Configuração:**
- Type: Scroll Depth
- When user scrolls: 50%

#### 6. **Time on Page**

Dispara após X segundos.

**Configuração:**
- Type: Timer
- Interval: 5000 (ms) = 5 segundos

#### 7. **Element Visibility**

Dispara quando elemento fica visível.

**Uso:** Rastrear quando seção importante entra em viewport

### Trigger Conditions (Filtros)

```
Tipo de Condição:
- equals
- does not equal
- contains
- does not contain
- starts with
- ends with
- matches regex
- greater than
- less than
```

**Exemplo:**

```
Trigger dispara quando:
- Event equals "purchase"
- AND Page Path contains "/checkout"
- AND eventData.transaction_value greater than 50
```

### Exemplo Prático: Purchase Trigger

**Setup:**
1. Type: Custom Event
2. Event name equals `purchase`
3. Fire When:
   - Event equals "purchase"
   - AND eventData.transaction_value is not empty

**Tags que usam este trigger:**
- Meta Pixel Purchase Tag
- Google Analytics Purchase Tag
- Google Ads Conversion Tag

---

## 🏷️ Tags

### O que é uma Tag?

Tag é um snippet de código ou pixel que dispara quando seu trigger é ativado.

### Anatomia de uma Tag

```
Tag Name: "Meta Pixel - Purchase"
         ↓
Tag Type: "Meta Pixel"
         ↓
Configuração: {
  Pixel ID: "1234567890"
  Event: "Purchase"
  Parameters: {
    value: {{DLV - Transaction Value}}
    currency: "BRL"
  }
}
         ↓
Trigger: "Purchase Complete"
         ↓
Firing Limit: No limit
         ↓
Disable tag if: (none)
```

### Criar Tag Meta Pixel no GTM

#### Step 1: Go to Tags → New

#### Step 2: Escolher Tipo

- Search: "Meta Pixel"
- Select: "Meta Pixel"

#### Step 3: Configurar Tag

```
Tag Configuration:
- Pixel ID: 1234567890 (seu ID)
- Track Standard Event: Purchase
- Event Parameters:
  - value: {{DLV - Transaction Value}}
  - currency: "BRL"
  - transaction_id: {{DLV - Transaction ID}}
```

#### Step 4: Escolher Trigger

- Select trigger: "Purchase Complete"

#### Step 5: Nomear e Salvar

- Tag Name: "Meta Pixel - Purchase"
- Save

### Variações de Tags Meta Pixel

#### Tag: ViewContent

```
Pixel ID: 1234567890
Standard Event: ViewContent
Parameters:
- content_id: {{DLV - Product ID}}
- content_type: "product"
- value: {{DLV - Product Price}}
- currency: "BRL"
```

#### Tag: AddToCart

```
Pixel ID: 1234567890
Standard Event: AddToCart
Parameters:
- content_id: {{DLV - Product ID}}
- value: {{DLV - Cart Value}}
- currency: "BRL"
- num_items: {{DLV - Num Items}}
```

#### Tag: InitiateCheckout

```
Pixel ID: 1234567890
Standard Event: InitiateCheckout
Parameters:
- value: {{DLV - Cart Value}}
- currency: "BRL"
- num_items: {{DLV - Num Items}}
```

---

## 🔗 Meta Pixel Integration

### Instalação Meta Pixel via GTM

#### Passo 1: Criar Variable para Pixel ID

1. Variables → New
2. Type: Constant
3. Value: `1234567890` (seu Meta Pixel ID)
4. Name: "Const - Meta Pixel ID"
5. Save

#### Passo 2: Criar Tag Base (Pixel Init)

1. Tags → New
2. Type: Meta Pixel
3. Pixel ID: `{{Const - Meta Pixel ID}}`
4. Event: (deixe vazio ou PageView)
5. Track Standard Event: OFF
6. Trigger: All Pages
7. Name: "Meta Pixel - Initialization"
8. Save

#### Passo 3: Criar Tags para Each Event

Para cada evento (ViewContent, Purchase, etc):

**Tag: Meta Pixel - Purchase**
```
Pixel ID: {{Const - Meta Pixel ID}}
Track Standard Event: ON
Standard Event: Purchase
Event Parameters:
  - value: {{DLV - Transaction Value}}
  - currency: "BRL"
  - transaction_id: {{DLV - Transaction ID}}
  - content_ids: {{DLV - Content IDs}}
```
Trigger: Purchase Complete

### Data Layer Push Structure para Meta Pixel

```javascript
// No seu site, quando compra acontece:
dataLayer.push({
  'event': 'purchase',
  'eventData': {
    'transaction_id': 'order_' + Date.now(),
    'transaction_value': 299.90,
    'currency': 'BRL',
    'content_ids': ['prod_001', 'prod_002'],
    'num_items': 2
  }
});

// GTM recebe → Trigger detecta "purchase"
// ↓
// Variables extraem dados com {{DLV - ...}}
// ↓
// Tag Meta Pixel mapeia: fbq('track', 'Purchase', {...})
```

---

## ✅ Best Practices

### 1. **Naming Convention**

Use nomes descritivos:

```
✅ BOAS NAMING:
- "Meta Pixel - Purchase"
- "DLV - Transaction ID"
- "Trigger - Checkout Complete"

❌ RUINS:
- "Tag 1"
- "var1"
- "trigger_123"
```

### 2. **Organize em Pastas**

```
Triggers:
├─ Page Views
├─ Clicks
├─ Form Submissions
└─ Custom Events

Tags:
├─ Meta Pixel
├─ Google Analytics
├─ Google Ads
└─ LinkedIn

Variables:
├─ Data Layer Variables
├─ Page Variables
└─ User Variables
```

### 3. **Versioning**

Sempre trabalhe em versão de desenvolvimento:

1. Create new version
2. Make changes
3. Preview and test
4. Submit for review
5. Publish

**Nunca** edite versão published!

### 4. **Testing com Preview Mode**

1. Click "Preview"
2. Acesse seu site
3. GTM Debug panel abre
4. Verifique eventos e tags

### 5. **Container Export/Import**

Faça backup:

1. Admin → Container Settings
2. Export Container
3. Salve como `.json`

### 6. **Use Limits para Prevenção de Duplicatas**

```
Tag Firing Limit:
- Unlimited (padrão)
- Once per page load
- Once per session
- Once per day
```

Exemplo:

```
Tag: "Analytics - Page View"
Firing Limit: "Once per page load"
```

### 7. **Debugging com GT.M Preview**

Steps:
1. Click "Preview" no GTM
2. Abra DevTools Console (F12)
3. Procure por: `dataLayer` events
4. Veja qual trigger disparou
5. Veja qual tag disparou

### 8. **Conditional Tag Firing**

Não dispare tag se:
```
Disable tag if:
- Page Path equals "/admin"
- OR User ID is empty
```

---

## 🔍 Common Issues & Solutions

### Problema: DataLayer não está funcionando

```javascript
// ❌ ERRADO - Antes de inicializar
dataLayer.push({...});
<!-- GTM Script -->

// ✅ CORRETO - Depois que GTM carrega
<!-- GTM Script -->
<!-- ... depois -->
dataLayer.push({...});
```

### Problema: Evento não dispara trigger

1. Abra Preview Mode
2. Clique elemento/evento
3. Veja no debug panel se `dataLayer.push` ocorreu
4. Verifique se trigger conditions matcham

### Problema: Valores chegam como "undefined"

```javascript
// ❌ ERRADO
dataLayer.push({
  'event': 'purchase'
  // Faltam dados!
});

// ✅ CORRETO
dataLayer.push({
  'event': 'purchase',
  'eventData': {
    'transaction_value': 99.99,
    'currency': 'BRL'
  }
});
```

### Problema: Múltiplas tags disparando

Use "Wait for tags" e "Check validation":

```
Tag A: Meta Pixel
- Wait for Tags: 500ms
- Check Validation: Yes

Tag B: Google Analytics
- Depends on: Tag A
```

---

## 🔗 Resources

- [GTM Documentation](https://support.google.com/tagmanager)
- [Data Layer Guide](https://developers.google.com/tag-platform/tag-manager/datalayer)
- [Variables Reference](https://support.google.com/tagmanager/answer/7683362)
- [Triggers Guide](https://support.google.com/tagmanager/answer/7679219)

---

**Próxima página:** [Google Analytics 4](./ANALYTICS.md)
