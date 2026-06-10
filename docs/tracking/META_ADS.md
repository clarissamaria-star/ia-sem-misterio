# 📱 Meta Pixel Events & Conversion Tracking - Documentação Oficial

> Última atualização: Junho 2026
> Fontes: [Meta for Developers](https://developers.facebook.com/docs/meta-pixel/)

## 📋 Índice
1. [Visão Geral](#visão-geral)
2. [Meta Pixel Standard Events](#meta-pixel-standard-events)
3. [Implementação](#implementação)
4. [Event Parameters](#event-parameters)
5. [Best Practices](#best-practices)
6. [Troubleshooting](#troubleshooting)

---

## 🔍 Visão Geral

### O que é Meta Pixel?

Meta Pixel é um snippet de código JavaScript que permite rastrear a atividade dos visitantes no seu website. Ele registra automaticamente as ações dos usuários (eventos) que você define como conversões valiosas.

**Principais funcionalidades:**
- ✅ Rastreamento de conversões (compras, inscrições, leads)
- ✅ Otimização de campanhas publicitárias
- ✅ Criação de públicos personalizados (audiences)
- ✅ Medição de ROI das campanhas

### Por que usar Meta Pixel?

- **Conversão em tempo real**: Veja as ações dos usuários instantaneamente
- **Otimização de anúncios**: Facebook aprende quem converte
- **Retargeting**: Re-engage usuarios que visitaram seu site
- **Análise de funil**: Entenda o comportamento do usuário

---

## 📊 Meta Pixel Standard Events

### O que são Standard Events?

Standard Events são ações predefinidas que correspondem a atividades comuns de conversão:
- Busca de produtos
- Visualização de produtos
- Adição ao carrinho
- Conclusão de compra

### Lista Completa de Standard Events

#### 1. **PageView** (Visualização de Página)
Rastreado automaticamente quando o Meta Pixel é instalado.

```javascript
fbq('track', 'PageView');
```

#### 2. **ViewContent** (Visualizar Conteúdo)
Usuário visualizou um produto ou conteúdo específico.

```javascript
fbq('track', 'ViewContent', {
  content_ids: ['product_id_123'],
  content_type: 'product',
  value: 29.99,
  currency: 'BRL'
});
```

**Parâmetros:**
- `content_ids`: ID(s) do produto
- `content_type`: 'product' | 'product_group'
- `value`: Preço do produto
- `currency`: Código da moeda (BRL, USD, etc.)

#### 3. **Search** (Pesquisa)
Usuário pesquisou um produto.

```javascript
fbq('track', 'Search', {
  search_string: 'camiseta azul',
  content_type: 'product'
});
```

**Parâmetros:**
- `search_string`: O que o usuário procurou
- `content_type`: 'product' | 'product_group'

#### 4. **AddToCart** (Adicionar ao Carrinho)
Usuário adicionou um item ao carrinho.

```javascript
fbq('track', 'AddToCart', {
  content_ids: ['product_123', 'product_456'],
  content_type: 'product',
  value: 59.98,
  currency: 'BRL',
  num_items: 2
});
```

**Parâmetros:**
- `content_ids`: Array de IDs dos produtos
- `value`: Valor total dos itens
- `num_items`: Quantidade de itens
- `currency`: Moeda

#### 5. **AddToWishlist** (Adicionar à Lista de Desejos)
Usuário adicionou um item à lista de desejos.

```javascript
fbq('track', 'AddToWishlist', {
  content_ids: ['product_id_789'],
  value: 19.99,
  currency: 'BRL'
});
```

#### 6. **InitiateCheckout** (Iniciar Checkout)
Usuário começou o processo de compra.

```javascript
fbq('track', 'InitiateCheckout', {
  content_ids: ['product_123'],
  content_type: 'product',
  value: 99.99,
  currency: 'BRL',
  num_items: 1
});
```

**Nota importante:** Este evento deve ser disparado QUANDO O USUÁRIO INICIA O CHECKOUT, não quando completa.

#### 7. **AddPaymentInfo** (Adicionar Informação de Pagamento)
Usuário adicionou informações de pagamento.

```javascript
fbq('track', 'AddPaymentInfo', {
  content_ids: ['product_123'],
  value: 99.99,
  currency: 'BRL'
});
```

#### 8. **Purchase** (Compra)
Usuário completou uma compra - **O MAIS IMPORTANTE**.

```javascript
fbq('track', 'Purchase', {
  value: 199.99,
  currency: 'BRL',
  transaction_id: 'tx_12345',
  content_ids: ['product_123', 'product_456'],
  content_type: 'product',
  num_items: 2
});
```

**Parâmetros obrigatórios:**
- `value`: Valor total da compra
- `currency`: Moeda da transação

**Parâmetros recomendados:**
- `transaction_id`: ID único da transação (IMPORTANTE!)
- `content_ids`: Array de IDs dos produtos comprados
- `num_items`: Quantidade total de itens

#### 9. **Subscribe** (Inscrição)
Usuário se inscreveu em um serviço.

```javascript
fbq('track', 'Subscribe', {
  value: 49.99,
  currency: 'BRL'
});
```

#### 10. **CompleteRegistration** (Completar Registro)
Usuário completou o registro/cadastro.

```javascript
fbq('track', 'CompleteRegistration', {
  currency: 'BRL',
  status: 1
});
```

#### 11. **Contact** (Contato)
Usuário preencheu um formulário de contato.

```javascript
fbq('track', 'Contact');
```

#### 12. **CustomizeProduct** (Customizar Produto)
Usuário customizou um produto.

```javascript
fbq('track', 'CustomizeProduct', {
  content_ids: ['product_id'],
  value: 50.00,
  currency: 'BRL'
});
```

#### 13. **FindLocation** (Encontrar Localização)
Usuário procurou por uma localização.

```javascript
fbq('track', 'FindLocation');
```

#### 14. **Schedule** (Agendar)
Usuário agendou um serviço.

```javascript
fbq('track', 'Schedule', {
  value: 150.00,
  currency: 'BRL'
});
```

#### 15. **StartTrial** (Iniciar Teste Gratuito)
Usuário iniciou uma versão de teste.

```javascript
fbq('track', 'StartTrial', {
  value: 0.00,
  currency: 'BRL'
});
```

#### 16. **SubmitApplication** (Enviar Aplicação)
Usuário enviou uma aplicação.

```javascript
fbq('track', 'SubmitApplication');
```

#### 17. **Donate** (Doação)
Usuário fez uma doação.

```javascript
fbq('track', 'Donate', {
  value: 100.00,
  currency: 'BRL'
});
```

---

## 🔧 Implementação

### Instalação Básica

#### 1. Instalar Código Base do Pixel

Adicione este código no `<head>` de **TODAS** as páginas do site:

```html
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'SEU_PIXEL_ID_AQUI'); // Substitua com seu ID
  fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
  src="https://www.facebook.com/tr?id=SEU_PIXEL_ID_AQUI&ev=PageView&noscript=1" />
</noscript>
```

#### 2. Aonde colocar o código?

- ✅ **Melhor lugar**: Tag Manager (veremos mais adiante)
- ✅ **Alternativa**: Dentro do `<head>` do template base

### Implementação com Events

#### Exemplo: E-commerce - Página de Produto

```html
<!-- Página de Detalhes do Produto -->
<script>
fbq('track', 'ViewContent', {
  content_ids: ['SKU-12345'],
  content_type: 'product',
  content_name: 'Camiseta Azul Premium',
  value: 79.90,
  currency: 'BRL'
});
</script>
```

#### Exemplo: Botão "Adicionar ao Carrinho"

```html
<button onclick="addToCart()" class="btn-add-cart">
  Adicionar ao Carrinho
</button>

<script>
function addToCart() {
  // ... código de adicionar ao carrinho ...
  
  fbq('track', 'AddToCart', {
    content_ids: ['SKU-12345'],
    content_type: 'product',
    value: 79.90,
    currency: 'BRL',
    num_items: 1
  });
}
</script>
```

#### Exemplo: Página de Compra Completa

```html
<!-- Após confirmação de pagamento -->
<script>
fbq('track', 'Purchase', {
  value: 159.80,
  currency: 'BRL',
  transaction_id: 'order_' + Date.now(), // ID único
  content_ids: ['SKU-12345', 'SKU-67890'],
  content_type: 'product',
  num_items: 2
});
</script>
```

---

## 📝 Event Parameters

### Parâmetros Universais (Todos os Events)

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-----------|-----------|
| `value` | Number | Não | Valor monetário da ação |
| `currency` | String | Sim (se value) | Código ISO (BRL, USD, EUR) |
| `content_ids` | Array | Não | ID(s) do produto/conteúdo |
| `content_type` | String | Não | 'product' \| 'product_group' |
| `content_name` | String | Não | Nome do produto/conteúdo |

### Parâmetros para Purchase (Mais Críticos)

```javascript
{
  // OBRIGATÓRIO
  value: 299.90,           // Valor total
  currency: 'BRL',         // Moeda
  
  // ALTAMENTE RECOMENDADO
  transaction_id: 'tx_abc123', // ID único da transação
  
  // RECOMENDADO
  content_ids: ['prod_001'],
  content_type: 'product',
  num_items: 1,
  
  // OPCIONAL
  content_name: 'Nome do Produto',
  content_category: 'eletrônicos',
  delivery_category: 'delivery',
  predicted_ltv: 500.00  // Lifetime value predito
}
```

### Mapeamento de Moedas Comuns

```
BRL - Real Brasileiro
USD - Dólar Americano
EUR - Euro
GBP - Libra Esterlina
AUD - Dólar Australiano
CAD - Dólar Canadense
```

---

## ✅ Best Practices

### 1. **Sempre usar Transaction ID no Purchase**

```javascript
// ❌ ERRADO
fbq('track', 'Purchase', {
  value: 100.00,
  currency: 'BRL'
});

// ✅ CORRETO
fbq('track', 'Purchase', {
  value: 100.00,
  currency: 'BRL',
  transaction_id: 'order_' + new Date().getTime()
});
```

**Por quê?** Ajuda a Facebook identificar compras duplicadas.

### 2. **ViewContent antes de AddToCart**

Sempre rastreie a visualização antes de adicionar ao carrinho:

```javascript
// Página de Produto
fbq('track', 'ViewContent', {...});

// Clique no botão
fbq('track', 'AddToCart', {...});

// Confirmação de compra
fbq('track', 'Purchase', {...});
```

### 3. **Valores Corretos**

```javascript
// ❌ ERRADO - Sem separação decimal
fbq('track', 'Purchase', {
  value: 29990,  // Parece 29.990 mas é 29990
  currency: 'BRL'
});

// ✅ CORRETO - Com ponto decimal
fbq('track', 'Purchase', {
  value: 299.90,  // Exatamente 299,90
  currency: 'BRL'
});
```

### 4. **Rastrear Todos os Itens**

Para carrinho com múltiplos itens:

```javascript
fbq('track', 'AddToCart', {
  content_ids: ['prod_001', 'prod_002', 'prod_003'],
  value: 299.70,  // Soma de todos
  currency: 'BRL',
  num_items: 3
});
```

### 5. **Usar IDs Consistentes**

Os IDs dos produtos devem ser:
- ✅ Únicos
- ✅ Consistentes em todos os eventos
- ✅ Iguais aos IDs do seu catálogo

```javascript
// Use sempre o mesmo ID
fbq('track', 'ViewContent', {
  content_ids: ['SKU-A1B2C3']
});

fbq('track', 'AddToCart', {
  content_ids: ['SKU-A1B2C3']
});

fbq('track', 'Purchase', {
  content_ids: ['SKU-A1B2C3']
});
```

### 6. **Content Type Correto**

```javascript
// Ecommerce - produtos individuais
fbq('track', 'ViewContent', {
  content_type: 'product',  // Não 'product_group'
  content_ids: ['SKU-123']
});

// Catálogo - vários produtos
fbq('track', 'ViewContent', {
  content_type: 'product_group',
  content_ids: ['SKU-001', 'SKU-002', 'SKU-003']
});
```

### 7. **Rastreamento de Funil Completo**

Para melhor otimização, rastreie o funil inteiro:

```
1. PageView (automático)
2. ViewContent (página do produto)
3. AddToCart (clique no botão)
4. InitiateCheckout (início do checkout)
5. AddPaymentInfo (info de pagamento)
6. Purchase (conclusão)
```

---

## 🔍 Troubleshooting

### Problema: Eventos não aparecem em Eventos Manager

**Solução:**
1. Verifique se o Pixel ID está correto
2. Use Facebook Pixel Helper (extensão Chrome)
3. Abra DevTools (F12) e procure erros no console
4. Verifique se o firewall/adblocker não está bloqueando

### Problema: Purchase aparece com valor zero

```javascript
// ❌ ERRADO
fbq('track', 'Purchase', {
  currency: 'BRL'
  // Falta value!
});

// ✅ CORRETO
fbq('track', 'Purchase', {
  value: 99.99,
  currency: 'BRL'
});
```

### Problema: Duplicação de conversões

```javascript
// ❌ ERRADO - Disparado múltiplas vezes
document.addEventListener('click', function() {
  fbq('track', 'Purchase', {...});
});

// ✅ CORRETO - Disparado uma única vez
button.addEventListener('click', function() {
  fbq('track', 'Purchase', {...});
}, {once: true});
```

### Problema: Eventos não rastreando dados estruturados

```javascript
// ❌ ERRADO
fbq('track', 'Purchase', 'não é um objeto');

// ✅ CORRETO
fbq('track', 'Purchase', {
  value: 99.99,
  currency: 'BRL'
});
```

---

## 🔗 Resources Oficiais

- [Meta Pixel Reference](https://developers.facebook.com/docs/meta-pixel/reference/)
- [Conversion Tracking Guide](https://developers.facebook.com/docs/meta-pixel/implementation/conversion-tracking/)
- [Standard Events Specs](https://www.facebook.com/business/help/402791146561655)
- [Pixel Helper Tool](https://developers.facebook.com/docs/meta-pixel/support/pixel-helper/)
- [Best Practices](https://www.facebook.com/business/help/2254103654917599)

---

**Próxima página:** [GTM Integration](./GTM.md)
