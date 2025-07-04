interface InteractionData {
  timestamp: string;
  action: string;
  details?: any;
}

interface ComprehensiveData {
  sessionStart: string;
  sessionEnd?: string;
  totalTimeSpent: number;
  interactions: InteractionData[];
  gameData?: {
    quizAnswers: number[];
    quizScore: number;
    puzzleCompleted: boolean;
    puzzleTime: number;
  };
  dreamsData?: {
    checkedDreams: number[];
    totalDreams: number;
    checkedCount: number;
  };
  stageProgression: {
    stage: string;
    timestamp: string;
    timeSpent: number;
  }[];
}

class InteractionTracker {
  private data: ComprehensiveData;
  private currentStageStart: number;
  private currentStage: string;

  constructor() {
    // Clear all previous session data to start fresh
    this.clearPreviousSession();
    
    this.data = {
      sessionStart: new Date().toISOString(),
      totalTimeSpent: 0,
      interactions: [],
      stageProgression: []
    };
    this.currentStageStart = Date.now();
    this.currentStage = 'password';
    
    // Save the fresh session start
    this.saveData();
  }

  private clearPreviousSession() {
    // Clear all birthday-related data from localStorage
    localStorage.removeItem('interactionData');
    localStorage.removeItem('birthdayGameData');
    localStorage.removeItem('birthdayDreamsData');
    
    console.log('🧹 Previous session data cleared - starting fresh journey');
  }

  private saveData() {
    localStorage.setItem('interactionData', JSON.stringify(this.data));
  }

  trackInteraction(action: string, details?: any) {
    const interaction: InteractionData = {
      timestamp: new Date().toISOString(),
      action,
      details
    };
    
    this.data.interactions.push(interaction);
    this.saveData();
    
    console.log('Interaction tracked:', interaction);
  }

  trackStageChange(newStage: string) {
    const now = Date.now();
    const timeSpent = now - this.currentStageStart;
    
    // Record previous stage completion
    if (this.currentStage) {
      this.data.stageProgression.push({
        stage: this.currentStage,
        timestamp: new Date().toISOString(),
        timeSpent
      });
    }
    
    this.currentStage = newStage;
    this.currentStageStart = now;
    
    this.trackInteraction('stage_change', { 
      from: this.currentStage, 
      to: newStage,
      timeSpent 
    });
  }

  trackGameData(gameData: any) {
    this.data.gameData = gameData;
    this.trackInteraction('game_completed', gameData);
    this.saveData();
  }

  trackDreamsData(dreamsData: any) {
    this.data.dreamsData = dreamsData;
    this.trackInteraction('dreams_completed', dreamsData);
    this.saveData();
  }

  trackClick(element: string, details?: any) {
    this.trackInteraction('click', { element, ...details });
  }

  trackHeartClick(reasonIndex: number) {
    this.trackInteraction('heart_clicked', { reasonIndex });
  }

  trackQuizAnswer(questionIndex: number, selectedAnswer: number, correct: boolean) {
    this.trackInteraction('quiz_answer', { 
      questionIndex, 
      selectedAnswer, 
      correct 
    });
  }

  trackDreamSelection(dreamId: number, selected: boolean) {
    this.trackInteraction('dream_selection', { dreamId, selected });
  }

  trackCandlesBlow() {
    this.trackInteraction('candles_blown');
  }

  trackTimelineEvent(eventIndex: number) {
    this.trackInteraction('timeline_event_viewed', { eventIndex });
  }

  trackGiftOpen(giftIndex: number) {
    this.trackInteraction('gift_opened', { giftIndex });
  }

  finalizeSesssion() {
    const now = Date.now();
    const sessionStart = new Date(this.data.sessionStart).getTime();
    
    this.data.sessionEnd = new Date().toISOString();
    this.data.totalTimeSpent = now - sessionStart;
    
    // Add final stage
    this.data.stageProgression.push({
      stage: this.currentStage,
      timestamp: new Date().toISOString(),
      timeSpent: now - this.currentStageStart
    });
    
    this.trackInteraction('session_completed');
    this.saveData();
    
    console.log('🎯 Session finalized - comprehensive data ready for email');
    
    return this.data;
  }

  getData(): ComprehensiveData {
    return this.data;
  }

  // Method to manually clear session (if needed for testing)
  clearSession() {
    this.clearPreviousSession();
    console.log('🔄 Session manually cleared');
  }
}

export const tracker = new InteractionTracker();