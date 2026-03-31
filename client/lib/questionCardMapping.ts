import { ExplanationCard, Situation, SequenceItem } from "@shared/api";

/**
 * Extract significant keywords from text
 * Filters out common stop words and very short words
 */
function extractKeywords(text: string): string[] {
  const stopWords = new Set([
    "der",
    "die",
    "das",
    "ein",
    "eine",
    "einen",
    "einem",
    "einen",
    "einer",
    "eines",
    "und",
    "oder",
    "aber",
    "doch",
    "sondern",
    "sowie",
    "schließlich",
    "ist",
    "sind",
    "war",
    "waren",
    "sein",
    "zu",
    "in",
    "von",
    "mit",
    "auf",
    "bei",
    "an",
    "aus",
    "für",
    "durch",
    "nach",
    "um",
    "vor",
    "über",
    "unter",
    "zwischen",
    "ohne",
    "während",
    "wegen",
    "trotz",
    "statt",
    "infolge",
    "als",
    "wenn",
    "damit",
    "deshalb",
    "daher",
    "deswegen",
    "weil",
    "wobei",
    "falls",
    "sofern",
    "dafür",
    "dagegen",
    "danach",
    "dabei",
    "davor",
    "darin",
    "darunter",
    "darauf",
    "daraus",
    "darin",
    "darum",
    "darunter",
    "darunter",
    "darüber",
    "darunter",
  ]);

  const words = text
    .toLowerCase()
    .split(/\s+/)
    .map((word) => word.replace(/[^a-zäöüß]/g, ""))
    .filter((word) => word.length > 2 && !stopWords.has(word));

  return words;
}

/**
 * Calculate similarity score between a question and an explanation card
 * Higher score means better match
 */
function scoreSimilarity(
  situation: Situation,
  card: ExplanationCard
): number {
  const cardKeywords = new Set([
    ...extractKeywords(card.title),
    ...extractKeywords(card.content),
  ]);

  const situationKeywords = extractKeywords(situation.description);

  if (cardKeywords.size === 0 || situationKeywords.length === 0) {
    return 0;
  }

  // Count matching keywords
  const matches = situationKeywords.filter((keyword) =>
    cardKeywords.has(keyword)
  ).length;

  // Calculate similarity as percentage of situation keywords that match
  const similarity = matches / situationKeywords.length;

  return similarity;
}

/**
 * Create a sequence with all explanation cards first, then all questions, then completion card last
 */
export function createInterleaveSequence(
  cards: ExplanationCard[],
  situations: Situation[]
): SequenceItem[] {
  const sequence: SequenceItem[] = [];

  // Separate completion card (id="5") from regular cards
  const regularCards = cards.filter((card) => card.id !== "5");
  const completionCard = cards.find((card) => card.id === "5");

  // Add regular cards first
  regularCards.forEach((card) => {
    sequence.push({
      type: "card",
      data: card,
    });
  });

  // Then add all questions
  situations.forEach((situation) => {
    sequence.push({
      type: "question",
      data: situation,
    });
  });

  // Finally add completion card at the end
  if (completionCard) {
    sequence.push({
      type: "card",
      data: completionCard,
    });
  }

  return sequence;
}

/**
 * Count total questions in a sequence
 */
export function countQuestionsInSequence(
  sequence: SequenceItem[]
): number {
  return sequence.filter((item) => item.type === "question").length;
}
