/**
 * Tracker - Centralized event tracking through GTM
 * All events flow through dataLayer which GTM handles
 * GTM will route to Meta Pixel, GA4, Google Ads, etc.
 */

/**
 * Push event to dataLayer (GTM handles routing)
 */
const pushDataLayer = (event, data) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event,
      eventData: data,
      timestamp: new Date().toISOString(),
    });
  }
};

/**
 * Main tracker function - sends event through dataLayer to GTM
 */
export const trackEvent = (eventName, data = {}) => {
  // Push to dataLayer (GTM routes to all platforms)
  pushDataLayer(eventName, data);

  // Log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Event tracked:', {
      event: eventName,
      data,
      timestamp: new Date().toISOString(),
    });
  }
};

/**
 * Quiz-specific tracker events
 */
export const tracker = {
  // Quiz started
  quizStart: (deviceType) => {
    trackEvent('quiz_start', {
      quiz_name: 'IA Sem Mistério',
      device_type: deviceType,
    });
  },

  // Question viewed
  questionViewed: (questionNumber, totalQuestions) => {
    trackEvent('question_viewed', {
      question_number: questionNumber,
      total_questions: totalQuestions,
      progress_percentage: Math.round((questionNumber / totalQuestions) * 100),
    });
  },

  // Answer selected
  answerSelected: (questionNumber, answerText, scoreValue, cumulativeScore) => {
    trackEvent('answer_selected', {
      question_number: questionNumber,
      answer_selected: answerText,
      score_value: scoreValue,
      cumulative_score: cumulativeScore,
    });
  },

  // Quiz completed
  quizComplete: (totalScore, profileType, timeToComplete) => {
    trackEvent('quiz_complete', {
      total_score: totalScore,
      profile_type: profileType,
      time_to_complete: timeToComplete,
      questions_answered: 10,
      completion_rate: 100,
    });

    // Also track as conversion for Meta Pixel
    trackMetaPixel('Lead', {
      value: 0,
      currency: 'BRL',
    });
  },

  // WhatsApp button clicked
  whatsappClick: (profileType) => {
    trackEvent('whatsapp_click', {
      profile_type: profileType,
      button_text: 'Entrar no Grupo de WhatsApp',
    });
  },

  // Quiz abandoned
  quizAbandoned: (lastQuestionViewed, questionsAnswered, currentScore) => {
    trackEvent('quiz_abandoned', {
      last_question_viewed: lastQuestionViewed,
      questions_answered: questionsAnswered,
      current_score: currentScore,
    });
  },
};

export default tracker;
