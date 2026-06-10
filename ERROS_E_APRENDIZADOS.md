# 📚 Erros & Aprendizados - IA Sem Mistério

> Registro de erros encontrados, soluções e lições aprendidas

---

## 📌 Erro #1: GTM JSON Import Format Invalid

**Data:** 2026-06-10
**Status:** ✅ RESOLVIDO

### O Problema
```
Error deserializing enum type [Type]. Unrecognized value [template].
```

Ao tentar importar `gtm-config.json` no GTM, recebemos erro de formato inválido.

### A Causa Raiz
Eu **não validei** o JSON contra a documentação oficial do GTM. Assumiu-se uma estrutura sem testar:
1. O campo `"type": "template"` NÃO é um valor válido no enum do GTM
2. A estrutura do `parameter[]` não corresponde ao schema de importação real
3. Não exportei um exemplo real do GTM para usar como referência
4. Gerou-se um arquivo complexo (~100+ linhas) sem testes

### A Solução
Ao invés de gerar um JSON manual complexo, usar:
1. **Opção A (Recomendada):** Exportar um container existente do GTM e usar como template
2. **Opção B:** Usar a API do GTM para criar via código
3. **Opção C:** Criar manualmente (mais confiável que gerar JSON)

### Lição Aprendida
- ⚠️ **Não assumir estrutura de JSON sem validar com docs oficiais**
- ⚠️ **GTM JSON import é complexo e varia por versão**
- ✅ **Melhor abordagem:** Fornecer guia step-by-step para criar manualmente ou usar template validado

### Ação Tomada
Vou fornecer um **guia manual passo-a-passo** validado para criar no GTM, que é mais confiável do que JSON auto-gerado.

---

## 🎓 Regras de Ouro (Aprendidas)

### 1. JSON/XML Imports
- ❌ Não gerar estruturas complexas sem validação oficial
- ✅ Sempre testar com exemplo real da plataforma
- ✅ Validar contra JSON schema se disponível

### 2. GTM Específico
- ❌ Não criar configs GTM sem testar import primeiro
- ✅ Manual step-by-step é mais confiável que arquivo
- ✅ Documentação oficial é a fonte de verdade

### 3. Comunicação com Usuário
- ✅ Admitir erro rapidamente
- ✅ Aprender e não repetir
- ✅ Documentar para referência futura
- ✅ **Salvar na memória para NÃO errar de novo** (conforme pedido por Clarissa)

---

## 🔄 Rotina de Correção Imediata

**Demanda do Usuário:** "vc precisa criar uma rotina de quando errar ja corrigir o erro" - Clarissa em 2026-06-10

**Objetivo:** Estabelecer um protocolo para que erros sejam identificados, documentados e evitados no futuro.

### Passo 1: IDENTIFICAR o Erro
- Qual é o erro EXATO? (mensagem de erro, código, linha)
- Reproduzir se possível
- Tirar screenshot ou log se relevante

### Passo 2: ENTENDER a Raiz Causa
- Por quê isso deu erro?
- Qual foi minha suposição incorreta?
- Onde deveria ter validado?
- Qual era minha falta de conhecimento?

### Passo 3: CORRIGIR Imediatamente
- ❌ NÃO esperar para depois
- ✅ CORRIGIR agora mesmo
- ✅ Testar a correção

### Passo 4: REGISTRAR na Memória
- Salvar em arquivo `~/memory/erro-*.md` com análise completa
- Para referência em futuras conversas
- Evita repetir o mesmo erro

### Passo 5: DOCUMENTAR no Projeto
- Adicionar neste arquivo (ERROS_E_APRENDIZADOS.md)
- Para que o usuário saiba que aprendemos

---

## 📋 Template para Novos Erros

```markdown
## Erro #X: [Título]

**Data:** YYYY-MM-DD
**Status:** ⏳ EM ANDAMENTO / ✅ RESOLVIDO / ❌ NÃO RESOLVIDO

### O Problema
[Descrever o erro exato]

### A Causa
[Por que aconteceu]

### A Solução
[Como foi resolvido]

### Lição Aprendida
- [Ponto 1]
- [Ponto 2]

### Ação Tomada
[Que mudança foi feita]
```

---

**Última atualização:** 2026-06-10
