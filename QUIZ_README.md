# 🧠 IA Sem Mistério - Quiz de Qualificação

Um quiz interativo para qualificar e segmentar pessoas interessadas em aprender Inteligência Artificial.

## 🎯 O que faz

- ✅ 10 perguntas conversacionais
- ✅ Pontuação automática
- ✅ 3 perfis de segmentação diferentes
- ✅ Redirecionamento automático para grupos de WhatsApp
- ✅ Design responsivo e acolhedor

## 🚀 Como usar

### 1. Instalar dependências

```bash
npm install
```

### 2. Rodar localmente

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

### 3. Build para produção

```bash
npm run build
npm start
```

## 📊 Perfis de Segmentação

### 🟢 Iniciante Absoluto (Score 0-7)
- Nunca usou IA
- Tem dificuldade com tecnologia
- Precisa conteúdo básico e acolhedor
- **Grupo:** https://chat.whatsapp.com/KK826r1zmwJ5jvBYVXKyZV

### 🟡 Curioso (Score 8-15)
- Já ouviu falar de IA
- Testou algumas ferramentas
- Tem interesse genuíno
- **Grupo:** https://chat.whatsapp.com/HhgjP5mgWAm4rUpyKWgqXu

### 🔵 Pronto para Evoluir (Score 16+)
- Confortável com tecnologia
- Já usa IA
- Busca aprofundamento
- **Grupo:** https://chat.whatsapp.com/JbE4qjZG57y2s1Ut3sTF9K

## 🎨 Cores e Design

- **Azul Primário:** #001a33
- **Laranja:** #FFA500
- **WhatsApp Verde:** #25D366

## 📱 Responsividade

Otimizado para:
- ✅ Desktop (1920px+)
- ✅ Tablet (768px - 1024px)
- ✅ Mobile (320px - 767px)

## 📋 Perguntas do Quiz

1. Situação profissional
2. Frequência de uso de tecnologia
3. Conhecimento de IA
4. Sentimento sobre aprender IA
5. Dificuldades com tecnologia
6. O que gostaria de aprender
7. Áreas de interesse
8. Formato de aprendizado preferido
9. Investimento em educação prévia
10. Disponibilidade para aprender

## 🔄 Deploy no Vercel

O projeto está pronto para deploy no Vercel:

```bash
vercel
```

## 📝 Customização

### Mudar links de WhatsApp

Edite em `components/Quiz.js` a constante `WHATSAPP_GROUPS`:

```javascript
const WHATSAPP_GROUPS = {
  iniciante: 'https://chat.whatsapp.com/SEU_LINK_AQUI',
  curioso: 'https://chat.whatsapp.com/SEU_LINK_AQUI',
  pronto: 'https://chat.whatsapp.com/SEU_LINK_AQUI'
};
```

### Mudar as perguntas

Edite o array `QUESTIONS` em `components/Quiz.js`.

### Mudar as mensagens de resultado

Edite a constante `PROFILES` em `components/Quiz.js`.

## 🎯 Próximas melhorias

- [ ] Armazenar dados de respostas (banco de dados)
- [ ] Dashboard com analytics
- [ ] Enviar resultado por e-mail
- [ ] Temas customizáveis
- [ ] Suporte a múltiplos idiomas

## 📞 Suporte

Para dúvidas ou melhorias, entre em contato!
