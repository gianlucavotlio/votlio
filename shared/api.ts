/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

/**
 * Political paths in Votlio
 */
export type PoliticalPath = "established" | "independent" | "isolated";

/**
 * Answer option for a situation
 */
export interface AnswerOption {
  id: string;
  text: string;
  xp: number;
  path: PoliticalPath;
  feedbackText: string;
}

/**
 * A situation/quiz question
 */
export interface Situation {
  id: string;
  chapterId: string;
  description: string;
  options: AnswerOption[];
}

/**
 * Explanation card within a chapter
 */
export interface ExplanationCard {
  id: string;
  title: string;
  content: string;
}

/**
 * A topic/theme area in the learning platform
 */
export interface Topic {
  id: string;
  title: string;
  description: string;
  icon: string; // emoji or icon name
  order: number;
}

/**
 * Learning stages for the platform
 */
export interface LearningStage {
  id: "grundlagen" | "anwendung" | "vertiefung";
  label: string;
  order: number;
}

/**
 * A chapter that users can learn from
 */
export interface Chapter {
  id: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  topicId?: string; // Link to topic
  stageId?: "grundlagen" | "anwendung" | "vertiefung"; // Link to learning stage
  category?: "Grundwissen" | "Wiederholung" | "Vertiefung"; // Deprecated, kept for backward compatibility
  explanationCards: ExplanationCard[];
  situations: Situation[];
  analysisQuestions?: AnalysisQuestion[]; // Deep learning analysis questions
  icon: string; // emoji or icon name
}

/**
 * User's game session progress
 */
export interface GameSession {
  id: string;
  chapterId: string;
  currentSituationIndex: number;
  totalXp: number;
  pathCounts: {
    established: number;
    independent: number;
    isolated: number;
  };
  answers: Array<{
    situationId: string;
    selectedOptionId: string;
    xpEarned: number;
    pathSelected: PoliticalPath;
  }>;
}

/**
 * Final game result
 */
export interface GameResult {
  sessionId: string;
  chapterId: string;
  chapterTitle: string;
  totalXp: number;
  dominantPath: PoliticalPath;
  pathBreakdown: {
    established: number;
    independent: number;
    isolated: number;
  };
  resultDescription: string;
}

/**
 * Option for an analysis question
 */
export interface AnalysisOption {
  id: string;
  text: string;
  isCorrect?: boolean;
}

/**
 * Deep learning analysis question
 * Supports multiple question types: multiple-choice with reasoning, comparison, critical evaluation, assignments
 */
export interface AnalysisQuestion {
  id: string;
  chapterId: string;
  type: "multiple-choice-reasoning" | "comparison" | "critical-evaluation" | "assignment";
  description: string;
  options?: AnalysisOption[];
  correctAnswerId?: string;
  feedbackText: string;
  explanationText: string; // 2-4 sentences with academic explanation
}

/**
 * Sequence item for interleaved learning flow
 * Represents either an explanation card, a situation question, or an analysis question in the learning sequence
 */
export type SequenceItem = {
  type: "card" | "question" | "analysis-question";
  data: ExplanationCard | Situation | AnalysisQuestion;
  cardId?: string; // For questions, references which card it follows
};
