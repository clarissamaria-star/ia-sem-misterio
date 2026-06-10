# 🏷️ GTM Setup Guide - Meta Pixel

> Guia passo-a-passo para configurar Meta Pixel no GTM-WVM7DW52

**Seu Pixel ID:** `2686781752624834`

---

## 📋 Checklist Rápido

```
□ STEP 1: Criar Variable para Pixel ID
□ STEP 2: Criar 5 Triggers
□ STEP 3: Criar 5 Tags Meta Pixel
□ STEP 4: Preview & Test
□ STEP 5: Publish
```

---

## STEP 1️⃣: Criar Variable para Pixel ID

**Acesse:** https://tagmanager.google.com → GTM-WVM7DW52 → **Variables**

1. Click **+ New** (lado direito)
2. Click em **Variable Configuration**
3. Escolha: **Constant**
4. **Value:** `2686781752624834`
5. **Variable Name:** `Const - Meta Pixel ID`
6. **Save**

✅ Pronto! Você tem 1 variable.

---

## STEP 2️⃣: Criar Triggers (5 no total)

**Acesse:** https://tagmanager.google.com → GTM-WVM7DW52 → **Triggers**

### Trigger #1: Quiz Start

1. Click **+ New**
2. **Trigger Configuration** → **Custom Event**
3. **Event name:** `quiz_start` (exatamente assim)
4. **Trigger Name:** `Trigger - Quiz Start`
5. **Save**

### Trigger #2: Question Viewed

1. Click **+ New**
2. **Trigger Configuration** → **Custom Event**
3. **Event name:** `question_viewed`
4. **Trigger Name:** `Trigger - Question Viewed`
5. **Save**

### Trigger #3: Answer Selected

1. Click **+ New**
2. **Trigger Configuration** → **Custom Event**
3. **Event name:** `answer_selected`
4. **Trigger Name:** `Trigger - Answer Selected`
5. **Save**

### Trigger #4: Quiz Complete

1. Click **+ New**
2. **Trigger Configuration** → **Custom Event**
3. **Event name:** `quiz_complete`
4. **Trigger Name:** `Trigger - Quiz Complete`
5. **Save**

### Trigger #5: WhatsApp Click

1. Click **+ New**
2. **Trigger Configuration** → **Custom Event**
3. **Event name:** `whatsapp_click`
4. **Trigger Name:** `Trigger - WhatsApp Click`
5. **Save**

✅ Pronto! Você tem 5 triggers.

---

## STEP 3️⃣: Criar Tags Meta Pixel (5 no total)

**Acesse:** https://tagmanager.google.com → GTM-WVM7DW52 → **Tags**

### Tag #1: Meta Pixel - Quiz Start

1. Click **+ New**
2. **Tag Configuration** → Search: **"Meta Pixel"** → Choose **Meta Pixel**
3. **Pixel ID:** Click no field e selecione `{{Const - Meta Pixel ID}}`
4. **Track Standard Event:** Ativar ✓
5. **Standard Event:** Choose **Lead**
6. **Firing Trigger:** Click → Select `Trigger - Quiz Start`
7. **Tag Name:** `Meta Pixel - Quiz Start`
8. **Save**

### Tag #2: Meta Pixel - Question Viewed

1. Click **+ New**
2. **Tag Configuration** → **Meta Pixel**
3. **Pixel ID:** `{{Const - Meta Pixel ID}}`
4. **Track Standard Event:** ✓ Ativar
5. **Standard Event:** Choose **ViewContent**
6. **Firing Trigger:** `Trigger - Question Viewed`
7. **Tag Name:** `Meta Pixel - Question Viewed`
8. **Save**

### Tag #3: Meta Pixel - Answer Selected

1. Click **+ New**
2. **Tag Configuration** → **Meta Pixel**
3. **Pixel ID:** `{{Const - Meta Pixel ID}}`
4. **Track Standard Event:** ✓ Ativar
5. **Standard Event:** Choose **ViewContent**
6. **Firing Trigger:** `Trigger - Answer Selected`
7. **Tag Name:** `Meta Pixel - Answer Selected`
8. **Save**

### Tag #4: Meta Pixel - Quiz Complete (Conversão!)

1. Click **+ New**
2. **Tag Configuration** → **Meta Pixel**
3. **Pixel ID:** `{{Const - Meta Pixel ID}}`
4. **Track Standard Event:** ✓ Ativar
5. **Standard Event:** Choose **Lead** (ou **Purchase** se quiser)
6. **Event Parameters:**
   - **Key:** `value` | **Value:** `0`
   - **Key:** `currency` | **Value:** `BRL`
7. **Firing Trigger:** `Trigger - Quiz Complete`
8. **Tag Name:** `Meta Pixel - Quiz Complete`
9. **Save**

### Tag #5: Meta Pixel - WhatsApp Click

1. Click **+ New**
2. **Tag Configuration** → **Meta Pixel**
3. **Pixel ID:** `{{Const - Meta Pixel ID}}`
4. **Track Standard Event:** ✓ Ativar
5. **Standard Event:** Choose **ViewContent**
6. **Firing Trigger:** `Trigger - WhatsApp Click`
7. **Tag Name:** `Meta Pixel - WhatsApp Click`
8. **Save**

✅ Pronto! Você tem 5 tags.

---

## STEP 4️⃣: Preview & Test

1. Click **Preview** (canto superior esquerdo)
2. Abra em nova aba: https://ia-sem-misterio.vercel.app
3. Complete o quiz
4. Volte para a aba do GTM Debug Panel
5. Veja os eventos disparando ✓

---

## STEP 5️⃣: Publicar

1. Click **Submit**
2. **Version name:** `v1 - Meta Pixel Setup`
3. **Version description:** `Added Meta Pixel tracking for quiz events`
4. Click **Publish**

✅ **PRONTO!** Meta Pixel está rastreando! 🎉

---

## 🔍 Verificação Final

Depois de publicado, você verá em:
- **Meta Business** → **Pixels** → **Eventos de Teste**

Os eventos aparecerão assim:
- `Lead` (Quiz Start)
- `ViewContent` (Question Viewed, Answer Selected, WhatsApp Click)
- `Lead` (Quiz Complete)

---

## ⚠️ Se algo deu errado

1. **Trigger não dispara?** 
   - Abra Preview, vá ao Console, veja se `dataLayer.push` está acontecendo
   - Verificar se o nome do evento está EXATAMENTE igual (case-sensitive)

2. **Tag não ativa?**
   - Vá em **Debug** → Procure pelo trigger
   - Tag deve estar marcada com ✓

3. **Meta Pixel não recebe?**
   - Aguarde 24h para dados aparecer
   - Verifique se Pixel ID está correto: `2686781752624834`

---

**Guia criado:** 2026-06-10
**Última atualização:** 2026-06-10
