# 🎯 Google Ads Conversion Tracking - Documentação Oficial

> Última atualização: Junho 2026
> Fontes: [Google Ads Help](https://support.google.com/google-ads), [Google for Developers](https://developers.google.com/google-ads)

## 📋 Índice
1. [Overview](#overview)
2. [Conversion Types](#conversion-types)
3. [Google Tag Setup](#google-tag-setup)
4. [GTM Integration](#gtm-integration)
5. [Event Tracking](#event-tracking)
6. [Attribution Models](#attribution-models)
7. [Best Practices](#best-practices)

---

## 🔍 Overview

### O que é Conversion Tracking?

Conversion tracking mede ações importantes que usuários fazem depois de clicar no seu anúncio:
- ✅ Compras no site
- ✅ Inscrições em newsletters
- ✅ Downloads
- ✅ Preenchimento de formulários
- ✅ Chamadas telefônicas
- ✅ Eventos customizados

### Por que é importante?

```
Anúncio clicado → Usuário chega no site → Ação importante
                                         ↓
                                    Conversion rastreada
                                         ↓
                                    Google otimiza campanhas
                                         ↓
                                    Mais conversões por menos gasto
```

### Benefits

- ✅ Entender quais anúncios geram conversões
- ✅ Otimizar campanhas automaticamente
- ✅ Calcular ROAS (Return on Ad Spend)
- ✅ Recriar públicos que convertem

---

## 🎯 Conversion Types

### 1. **Website Conversions**

Ações no seu website.

#### Tipos:
```
- Purchase (Compra)
- Signup (Inscrição)
- Lead (Lead/Contato)
- Download (Download)
- Newsletter (Newsletter)
- Other (Outro)
```

#### Setup no Google Ads:

1. Go to: Tools → Conversions
2. Click: "+" → Conversion
3. Select: "Website"
4. Choose type: "Purchase"
5. Enter: Conversion name, value, currency
6. Create conversion

### 2. **Call Conversions**

Chamadas telefônicas geradas pelos anúncios.

#### Setup:
1. Conversions → "+" → Call
2. Configure: Phone number, category
3. Track: With call extensions ou call-only ads

### 3. **App Conversions**

Eventos em aplicativos móveis.

#### Setup:
1. Conversions → "+" → App
2. Select: Android ou iOS
3. Configure: App conversion events

### 4. **Offline Conversions**

Conversões offline (compras em loja, etc).

#### Upload via:
- Google Ads UI (manual)
- Data Manager (automático)
- Google Analytics (integrado)

---

## 🏷️ Google Tag Setup

### O que é Google Tag?

Google Tag é um único código que rastreia conversões para:
- ✅ Google Ads
- ✅ Google Analytics 4
- ✅ Google Marketing Platform

Anteriormente havia 2 códigos separados (Google Ads conversion tracking + Google Analytics). Agora é um só!

### Instalação do Google Tag

#### Passo 1: Criar Google Tag Account

1. Go to: [Google Tag Manager](https://tagmanager.google.com)
2. Create account / container
3. Get Container ID

#### Passo 2: Adicionar Google Tag ao Site

```html
<!-- Google tag (gtag.js) - Google Ads: 1234567890 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-1234567890"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'AW-1234567890');
</script>
```

**Importante:** 
- `AW-1234567890` é seu Google Ads Conversion ID
- Coloque no `<head>` de TODAS as páginas

#### Passo 3: Rastrear Conversão

```javascript
// Quando conversão acontece (ex: compra confirmada)
gtag('event', 'purchase', {
  'value': 99.99,
  'currency': 'BRL',
  'transaction_id': 'order_123'
});
```

### Encontrar seu Conversion ID

1. Google Ads → Tools → Conversions
2. Clique na conversão que criou
3. Procure por: "Conversion ID"
4. Format: `AW-1234567890`

---

## 🔗 GTM Integration (Recomendado)

### Por que usar GTM para Google Ads?

✅ Não precisa editar código do site
✅ Gerenciar múltiplas conversões facilmente
✅ Testar antes de publicar
✅ Versionamento e rollback

### Setup Google Ads Conversion em GTM

#### Passo 1: Criar Constant Variable para Conversion ID

1. Variables → New
2. Type: Constant
3. Value: `AW-1234567890` (seu conversion ID)
4. Name: "Const - Google Ads Conversion ID"
5. Save

#### Passo 2: Criar Tag Google Ads Conversion

1. Tags → New
2. Type: Google Ads Conversion Tracking
3. Conversion ID: `{{Const - Google Ads Conversion ID}}`
4. Conversion Label: (vazio para agora)
5. Conversion Value: `{{DLV - Purchase Value}}`
6. Conversion Currency: `BRL`
7. Conversion Page Language: `pt-BR` (opcional)
8. Trigger: Purchase Complete
9. Name: "Google Ads - Purchase Conversion"
10. Save

#### Passo 3: Configurar Conversion Labels

Cada tipo de conversão precisa de um label único.

**No Google Ads:**
1. Tools → Conversions → Select conversion
2. Procure por: "Conversion label"
3. Copy: algo como `AW-1234567890/abc12xyz`

**No GTM Tag:**
```
Conversion Label: AW-1234567890/abc12xyz
```

### Multiple Conversions Setup

Se você rastreia múltiplas conversões:

**Tag 1: Purchase**
```
Conversion ID: AW-1234567890
Conversion Label: AW-1234567890/purchase_label
Trigger: Purchase Complete
```

**Tag 2: Lead**
```
Conversion ID: AW-1234567890
Conversion Label: AW-1234567890/lead_label
Trigger: Form Submission
```

**Tag 3: Newsletter Signup**
```
Conversion ID: AW-1234567890
Conversion Label: AW-1234567890/newsletter_label
Trigger: Newsletter Signup
```

---

## 📊 Event Tracking

### Recommended Events para Google Ads

Google Ads work melhor com GA4 Recommended Events:

#### Purchase

```javascript
gtag('event', 'purchase', {
  'transaction_id': 'order_123',
  'value': 199.90,
  'currency': 'BRL',
  'items': [{
    'item_id': 'prod_123',
    'item_name': 'Produto',
    'price': 199.90,
    'quantity': 1
  }]
});
```

#### Add to Cart

```javascript
gtag('event', 'add_to_cart', {
  'value': 99.90,
  'currency': 'BRL',
  'items': [...]
});
```

#### View Item (Product Page)

```javascript
gtag('event', 'view_item', {
  'items': [{
    'item_id': 'prod_123',
    'item_name': 'Produto',
    'price': 99.90,
    'currency': 'BRL'
  }]
});
```

#### Sign Up

```javascript
gtag('event', 'sign_up', {
  'method': 'email'
});
```

#### Generate Lead (Form Submission)

```javascript
gtag('event', 'generate_lead', {
  'currency': 'BRL',
  'value': 0  // Só preencha se há valor associado
});
```

### Custom Conversion Events

Para eventos específicos do seu negócio:

```javascript
// Agendamento de consulta
gtag('event', 'schedule_consultation', {
  'value': 0,
  'currency': 'BRL',
  'consultation_type': 'dentist'
});

// Download de PDF
gtag('event', 'download', {
  'file_name': 'catalogo_produtos.pdf'
});

// Demonstração de produto
gtag('event', 'watch_demo', {
  'product': 'software_xyz'
});
```

---

## 📊 Attribution Models

### O que é Attribution?

Attribution mostra qual clique/anúncio recebe crédito pela conversão.

### Models disponíveis:

#### 1. **Last Click**
100% de crédito para último clique
```
Clique anúncio search → (outro) → Clique anúncio display → PURCHASE
                                                             ↑
                                            Display anúncio recebe 100% crédito
```

#### 2. **First Click**
100% de crédito para primeiro clique
```
Clique search → (outro) → Clique display → PURCHASE
↑
Search anúncio recebe 100% crédito
```

#### 3. **Linear**
Mesmo crédito para todos os cliques
```
Clique search (50%) → Clique display (50%) → PURCHASE
```

#### 4. **Time Decay**
Mais crédito para cliques mais recentes
```
Clique search (20%) → Clique display (80%) → PURCHASE
```

#### 5. **Position-Based (Data-Driven)**
Mais inteligente, baseado em dados históricos
```
Default: 40% primeiro + 40% último + 20% meio
```

### Como mudar Attribution Model:

1. Google Ads → Tools → Conversions
2. Select conversion
3. Attribution model → Change

---

## ✅ Best Practices

### 1. **Sempre incluir Transaction ID**

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

**Por quê?** Evita duplicação de conversões.

### 2. **Incluir Conversion Value**

```javascript
// ❌ ERRADO - Sem valor
gtag('event', 'purchase', {
  'currency': 'BRL'
});

// ✅ CORRETO - Com valor
gtag('event', 'purchase', {
  'value': 199.90,
  'currency': 'BRL'
});
```

**Benefício:** Google otimiza para conversões de maior valor.

### 3. **Usar Google Analytics Integration**

Conecte Google Ads com GA4:
1. Google Ads → Tools → Linked accounts
2. Google Analytics
3. Link account
4. Enable conversion import

**Benefício:** Conversões rastreadas em GA4 aparecem em Google Ads automaticamente!

### 4. **Rastrear Offline Conversions**

Se tem conversões offline (ligações, lojas):

```javascript
// Online tracking
gtag('event', 'generate_lead', {
  'value': 0,
  'currency': 'BRL',
  'gclid': getCookie('gclid')  // Google Click ID
});

// Depois, quando converte offline:
// Upload em Google Ads → Data Manager
```

### 5. **Setup Enhanced Conversions**

Google Ads pode rastrear melhor usando dados de clientes:

```javascript
gtag('event', 'purchase', {
  'value': 199.90,
  'currency': 'BRL',
  'transaction_id': 'order_123',
  
  // Enhanced conversion data (hashed)
  'user_data': {
    'email': [hashEmail('user@example.com')],
    'phone_number': [hashPhone('1199999999')],
    'first_name': [hashFirstName('João')],
    'last_name': [hashLastName('Silva')],
    'city': [hashCity('São Paulo')],
    'state': [hashState('SP')],
    'postal_code': [hashPostal('01311100')],
    'country': [hashCountry('BR')]
  }
});
```

**Importante:** Google Ads faz hash dos dados automaticamente!

### 6. **Teste antes de publicar**

Use GTM Preview:
1. Click "Preview" em GTM
2. Acesse seu site
3. Faça ação que dispara conversion
4. Veja em GTM Debug panel se tag dispara
5. Veja em Google Ads → Conversions → Conversion actions se aparece na lista

### 7. **Configure Conversion Value corretamente**

```javascript
// ❌ ERRADO - Valor total, sem separação
gtag('event', 'purchase', {
  'value': 19990,  // Parece ser 19.990!
  'currency': 'BRL'
});

// ✅ CORRETO - Valor com decimal correto
gtag('event', 'purchase', {
  'value': 199.90,  // Exatamente 199,90
  'currency': 'BRL'
});
```

### 8. **Rastreie Leads com valor**

Nem sempre lead tem valor monetário, mas você pode estimar:

```javascript
// Lead sem valor monetário
gtag('event', 'generate_lead', {
  'currency': 'BRL'
});

// Lead com valor estimado
gtag('event', 'generate_lead', {
  'value': 250.00,  // Valor médio do contrato
  'currency': 'BRL'
});
```

---

## 🔍 Troubleshooting

### Problema: Conversão não aparecendo em Google Ads

**Checklist:**
1. ✅ Conversion foi criada em Google Ads?
2. ✅ Conversion ID está correto (AW-XXXXXXXXX)?
3. ✅ Conversion Label está correto?
4. ✅ GTM tag dispara? (veja em Preview)
5. ✅ Evento push acontece? (veja no console)
6. ✅ Aguardou 24 horas para dados aparecer?

### Problema: Muitas conversões duplicadas

```javascript
// ❌ ERRADO - Pode disparar múltiplas vezes
document.addEventListener('click', function() {
  gtag('event', 'purchase', {...});
});

// ✅ CORRETO - Dispara uma única vez
button.addEventListener('click', function() {
  gtag('event', 'purchase', {...});
}, {once: true});
```

### Problema: Conversion value aparece como zero

```javascript
// ❌ ERRADO
gtag('event', 'purchase', {
  'currency': 'BRL'
  // Falta 'value'!
});

// ✅ CORRETO
gtag('event', 'purchase', {
  'value': 99.99,
  'currency': 'BRL'
});
```

### Problema: Tags não disparando no GTM

1. Abra GTM Preview
2. Procure por seu evento no dataLayer
3. Veja se trigger conditions matcham
4. Verifique se tem typos em event name

---

## 📱 Mobile App Conversions

### Setup para Apps

Se você tem app Android/iOS:

1. Google Ads → Tools → Conversions
2. "+" → App conversion
3. Select app → Android ou iOS
4. Configure events
5. Implementar Firebase SDK no app
6. Enviar eventos para Firebase
7. Conversões aparecem em Google Ads automaticamente

### Eventos Recomendados para Apps:

```
- app_opens (abrir app)
- first_open (primeira abertura)
- in_app_purchase (compra in-app)
- view_item (ver produto)
- add_to_cart
- purchase
- sign_up
- login
```

---

## 🔗 Resources

- [Google Ads Conversion Setup](https://support.google.com/google-ads/answer/1722022)
- [Enhanced Conversions](https://support.google.com/google-ads/answer/9888656)
- [Conversion Tracking Guide](https://support.google.com/google-ads/answer/7521212)
- [Google Tag Documentation](https://support.google.com/google-ads/answer/7548399)
- [Data Manager Upload](https://support.google.com/google-ads/answer/8950093)

---

## 📊 Complete Tracking Setup Checklist

```
☐ 1. Google Tag instalado no site
☐ 2. Conversion criada em Google Ads
☐ 3. Conversion ID e Label corretos
☐ 4. GTM tags configuradas
☐ 5. DataLayer pushs implementados
☐ 6. Triggers corretos
☐ 7. Variables mapeadas
☐ 8. Purchase events com transaction_id
☐ 9. Google Ads ↔ GA4 linked
☐ 10. Preview testado
☐ 11. Conversion aparecendo em GA4
☐ 12. Conversion aparecendo em Google Ads
☐ 13. Dashboard criado para monitoramento
☐ 14. Attribution model definido
```

---

**Integração Completa:** Você agora tem Meta Pixel, GA4 e Google Ads rastreando!
