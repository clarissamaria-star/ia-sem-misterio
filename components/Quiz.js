import { useState, useEffect } from 'react';
import styles from '../styles/Quiz.module.css';
import { tracker } from '../lib/tracker';

const WHATSAPP_GROUPS = {
  iniciante: 'https://chat.whatsapp.com/KK826r1zmwJ5jvBYVXKyZV',
  curioso: 'https://chat.whatsapp.com/HhgjP5mgWAm4rUpyKWgqXu',
  pronto: 'https://chat.whatsapp.com/JbE4qjZG57y2s1Ut3sTF9K'
};

const QUESTIONS = [
  {
    id: 1,
    question: 'Qual é a sua situação profissional atual?',
    answers: [
      { text: 'Aposentado/a', score: 0 },
      { text: 'Ainda trabalho como empregado/a', score: 1 },
      { text: 'Tenho meu próprio negócio', score: 2 },
      { text: 'Estou em transição profissional', score: 1 }
    ]
  },
  {
    id: 2,
    question: 'Com que frequência você usa computador ou smartphone?',
    answers: [
      { text: 'Raramente ou nunca', score: 0 },
      { text: 'Alguns dias por semana', score: 1 },
      { text: 'Quase todos os dias', score: 2 },
      { text: 'Estou sempre conectado/a', score: 3 }
    ]
  },
  {
    id: 3,
    question: 'Já ouviu falar em Inteligência Artificial (IA)?',
    answers: [
      { text: 'Nunca ouvi falar', score: 0 },
      { text: 'Já ouvi, mas não sei bem o que é', score: 1 },
      { text: 'Tenho uma ideia geral', score: 2 },
      { text: 'Já usei alguma ferramenta de IA', score: 3 }
    ]
  },
  {
    id: 4,
    question: 'Qual é seu sentimento ao pensar em aprender sobre IA?',
    answers: [
      { text: 'Tenho medo de não conseguir', score: 0 },
      { text: 'Tenho curiosidade mas receio', score: 1 },
      { text: 'Estou aberto/a e curioso/a', score: 2 },
      { text: 'Estou muito entusiasmado/a', score: 3 }
    ]
  },
  {
    id: 5,
    question: 'Qual é sua maior dificuldade com tecnologia?',
    answers: [
      { text: 'Tenho dificuldade em aprender coisas novas', score: 0 },
      { text: 'Acho que evolui rápido demais', score: 1 },
      { text: 'Às vezes tenho dúvidas, mas acho meu caminho', score: 2 },
      { text: 'Não tenho grandes dificuldades', score: 3 }
    ]
  },
  {
    id: 6,
    question: 'O que você gostaria de aprender ou resolver com IA?',
    answers: [
      { text: 'Tudo é novo, não sei por onde começar', score: 0 },
      { text: 'Quero aprender o básico para acompanhar a evolução', score: 1 },
      { text: 'Quero usar IA para resolver problemas do dia a dia', score: 2 },
      { text: 'Quero dominar ferramentas de IA e usá-las profissionalmente', score: 3 }
    ]
  },
  {
    id: 7,
    question: 'Qual dessas áreas mais te interessa?',
    answers: [
      { text: 'Saúde e bem-estar', score: 1 },
      { text: 'Trabalho e profissão', score: 1 },
      { text: 'Finanças e orçamento pessoal', score: 1 },
      { text: 'Múltiplas áreas', score: 2 }
    ]
  },
  {
    id: 8,
    question: 'Como você prefere aprender coisas novas?',
    answers: [
      { text: 'Conversando e tirando dúvidas em comunidades', score: 0 },
      { text: 'Vídeos curtos e práticos', score: 1 },
      { text: 'Cursos estruturados com passo a passo', score: 2 },
      { text: 'Mentorias personalizadas', score: 3 }
    ]
  },
  {
    id: 9,
    question: 'Você já investiu em cursos ou treinamentos antes?',
    answers: [
      { text: 'Nunca investi em aprendizado', score: 0 },
      { text: 'Raramente, apenas cursos gratuitos', score: 1 },
      { text: 'Sim, já investi em alguns cursos', score: 2 },
      { text: 'Regularmente invisto em meu desenvolvimento', score: 3 }
    ]
  },
  {
    id: 10,
    question: 'Qual é sua disponibilidade para aprender?',
    answers: [
      { text: 'Pouca - apenas em momentos livres', score: 0 },
      { text: 'Moderada - algumas horas por semana', score: 1 },
      { text: 'Boa - várias horas por semana', score: 2 },
      { text: 'Excelente - tenho bastante tempo disponível', score: 3 }
    ]
  }
];

const PROFILES = {
  iniciante: {
    title: '🚀 Bem-vindo ao Primeiro Passo!',
    subtitle: 'Iniciante Absoluto',
    description: 'Você está começando sua jornada com IA e é completamente normal se sentir um pouco perdido. É exatamente para você que criamos essa comunidade!',
    benefits: [
      '✅ Começar do zero, sem culpa',
      '✅ Aprender no seu próprio ritmo',
      '✅ Comunidade acolhedora e paciente',
      '✅ Conteúdo simples e prático'
    ],
    cta: 'Entrar no Grupo #5 - Iniciantes',
    whatsappLink: WHATSAPP_GROUPS.iniciante
  },
  curioso: {
    title: '🎓 Você Está Pronto!',
    subtitle: 'Curioso & Interessado',
    description: 'Você já tem curiosidade e disposição para aprender. Parabéns! Você está no caminho certo para dominar IA e evoluir.',
    benefits: [
      '✅ Conteúdo atualizado e prático',
      '✅ Dúvidas respondidas pela comunidade',
      '✅ Ferramentas e técnicas úteis',
      '✅ Comunidade engajada e colaborativa'
    ],
    cta: 'Entrar no Grupo #6 - Curiosos',
    whatsappLink: WHATSAPP_GROUPS.curioso
  },
  pronto: {
    title: '💡 Você é um Game Changer!',
    subtitle: 'Pronto para Evoluir',
    description: 'Você já está confortável com tecnologia e IA. Agora é hora de aprofundar, dominar e usar como vantagem competitiva.',
    benefits: [
      '✅ Conteúdo avançado e aprofundado',
      '✅ Estratégias profissionais',
      '✅ Oportunidades de aplicação prática',
      '✅ Networking com pessoas preparadas'
    ],
    cta: 'Entrar no Grupo #7 - Game Changers',
    whatsappLink: WHATSAPP_GROUPS.pronto
  }
};

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [profile, setProfile] = useState(null);
  const [quizStartTime] = useState(Date.now());

  useEffect(() => {
    const deviceType = typeof window !== 'undefined' && window.innerWidth < 768 ? 'mobile' : 'desktop';
    tracker.quizStart(deviceType);
    tracker.questionViewed(1, QUESTIONS.length);
  }, []);

  const handleAnswer = (answerScore) => {
    const currentQ = QUESTIONS[currentQuestion];
    const selectedAnswer = currentQ.answers.find(a => a.score === answerScore);

    // Track answer selection
    tracker.answerSelected(
      currentQuestion + 1,
      selectedAnswer?.text || 'Unknown',
      answerScore,
      score + answerScore
    );

    const newScore = score + answerScore;
    setScore(newScore);

    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      // Track next question view
      tracker.questionViewed(currentQuestion + 2, QUESTIONS.length);
    } else {
      const timeToComplete = Math.floor((Date.now() - quizStartTime) / 1000);
      determineProfile(newScore, timeToComplete);
    }
  };

  const determineProfile = (totalScore, timeToComplete) => {
    let profileType;
    if (totalScore < 8) {
      profileType = 'iniciante';
    } else if (totalScore < 16) {
      profileType = 'curioso';
    } else {
      profileType = 'pronto';
    }

    // Track quiz completion
    tracker.quizComplete(totalScore, profileType, timeToComplete);

    setProfile(profileType);
    setShowResult(true);
  };

  const handleWhatsAppClick = (profileType, whatsappLink) => {
    // Track WhatsApp click
    tracker.whatsappClick(profileType);

    // Open WhatsApp in new tab
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        window.open(whatsappLink, '_blank');
      }
    }, 100);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setProfile(null);
  };

  if (showResult && profile) {
    const profileData = PROFILES[profile];
    return (
      <div className={styles.resultContainer}>
        <div className={styles.resultCard}>
          <div className={styles.resultHeader}>
            <img src="/logo.svg" alt="IA Sem Mistério" className={styles.logo} />
            <h1>{profileData.title}</h1>
            <p className={styles.resultSubtitle}>{profileData.subtitle}</p>
          </div>

          <p className={styles.resultDescription}>{profileData.description}</p>

          <div className={styles.benefitsList}>
            <h3>O que você vai ganhar:</h3>
            {profileData.benefits.map((benefit, index) => (
              <p key={index}>{benefit}</p>
            ))}
          </div>

          <button
            onClick={() => handleWhatsAppClick(profile, profileData.whatsappLink)}
            className={styles.whatsappButton}
          >
            <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.924 1.273c-1.546.807-2.967 1.968-4.059 3.331 1.195-1.348 2.823-2.34 4.656-2.62 1.577-.229 3.168.196 4.331 1.003" />
            </svg>
            {profileData.cta}
          </button>

          <button onClick={resetQuiz} className={styles.resetButton}>
            Refazer Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.quizContainer}>
      <div className={styles.header}>
        <img src="/logo.svg" alt="IA Sem Mistério" className={styles.logo} />
        <h1>IA Sem Mistério</h1>
        <p>Para Toda Idade</p>
      </div>

      <div className={styles.progressBar}>
        <div
          className={styles.progress}
          style={{ width: `${((currentQuestion + 1) / QUESTIONS.length) * 100}%` }}
        ></div>
      </div>

      <p className={styles.questionCounter}>
        Pergunta {currentQuestion + 1} de {QUESTIONS.length}
      </p>

      <div className={styles.questionCard}>
        <h2>{QUESTIONS[currentQuestion].question}</h2>

        <div className={styles.answersGrid}>
          {QUESTIONS[currentQuestion].answers.map((answer, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(answer.score)}
              className={styles.answerButton}
            >
              {answer.text}
            </button>
          ))}
        </div>
      </div>

      <p className={styles.disclaimer}>
        ⏳ Está levando menos de 2 minutos. Você está indo bem!
      </p>
    </div>
  );
}
