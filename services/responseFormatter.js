/**
 * responseFormatter.js
 * Formats AI responses to be SMS-style (short, human-like)
 * Matches answer length to question complexity
 */

class ResponseFormatter {
  constructor() {
    // Question length categories
    this.SHORT_QUESTION = 'short';      // < 20 words
    this.MEDIUM_QUESTION = 'medium';    // 20-50 words
    this.LONG_QUESTION = 'long';        // > 50 words

    // Response length targets (words)
    this.targetLengths = {
      short: { min: 10, max: 30 },      // "Will I get job?" → 1-2 sentences
      medium: { min: 30, max: 80 },     // Regular questions → 2-3 sentences
      long: { min: 80, max: 200 }       // Complex questions → 4-5 sentences
    };
  }

  /**
   * Categorize question by complexity
   */
  categorizeQuestion(question) {
    if (!question) return this.MEDIUM_QUESTION;

    const wordCount = question.trim().split(/\s+/).length;

    if (wordCount < 20) return this.SHORT_QUESTION;
    if (wordCount < 50) return this.MEDIUM_QUESTION;
    return this.LONG_QUESTION;
  }

  /**
   * Count words in text
   */
  countWords(text) {
    if (!text) return 0;
    return text.trim().split(/\s+/).length;
  }

  /**
   * Truncate to target length while keeping sentences intact
   */
  truncateToLength(text, targetMin, targetMax) {
    if (!text) return '';

    const wordCount = this.countWords(text);

    // If already within range, return as-is
    if (wordCount >= targetMin && wordCount <= targetMax) {
      return text;
    }

    // If text is too short, add ellipsis or return as-is
    if (wordCount < targetMin) {
      return text;
    }

    // Text is too long - truncate by sentences
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    let result = '';
    let currentWordCount = 0;

    for (const sentence of sentences) {
      const sentenceWordCount = this.countWords(sentence);
      
      if (currentWordCount + sentenceWordCount <= targetMax) {
        result += sentence;
        currentWordCount += sentenceWordCount;
      } else {
        break;
      }
    }

    return result.trim() || text.substring(0, 200) + '...';
  }

  /**
   * Remove verbose phrases and make text more concise
   */
  makeMoreConcise(text) {
    if (!text) return '';

    let result = text;

    // Remove verbose opening phrases
    const verbosePhrases = [
      /Based on your birth chart,?\s*/i,
      /According to astrology,?\s*/i,
      /In astrology,?\s*/i,
      /Astrologically speaking,?\s*/i,
      /From an astrological perspective,?\s*/i,
      /Your astrological chart shows\s*/i,
      /Looking at your chart,?\s*/i,
      /As per your birth details,?\s*/i,
      /Based on your details,?\s*/i,
    ];

    verbosePhrases.forEach(phrase => {
      result = result.replace(phrase, '');
    });

    // Remove redundant conjunctions
    result = result.replace(/Additionally,?\s+/gi, '');
    result = result.replace(/Furthermore,?\s+/gi, '');
    result = result.replace(/However,?\s+/gi, '');
    result = result.replace(/Moreover,?\s+/gi, '');

    // Combine multiple spaces
    result = result.replace(/\s+/g, ' ').trim();

    return result;
  }

  /**
   * Add casual, friendly tone
   */
  makeMoreHuman(text) {
    if (!text) return '';

    let result = text;

    // Add casual connectors
    const replacements = [
      [/^You will experience/i, "You'll experience"],
      [/^You are going to/i, "You're going to"],
      [/^This will/i, "This'll"],
      [/^I am/i, "I'm"],
      [/^It is/i, "It's"],
      [/^Do not/i, "Don't"],
      [/^Can not/i, "Can't"],
      [/^Will not/i, "Won't"],
    ];

    replacements.forEach(([pattern, replacement]) => {
      result = result.replace(pattern, replacement);
    });

    return result;
  }

  /**
   * Format response to be SMS-style
   * @param {string} answer - AI's original answer
   * @param {string} question - User's question
   * @returns {string} Formatted SMS-style answer
   */
  formatToSMSStyle(answer, question) {
    if (!answer) return '';

    // Step 1: Categorize question
    const category = this.categorizeQuestion(question);

    // Step 2: Make more concise
    let formatted = this.makeMoreConcise(answer);

    // Step 3: Add human tone
    formatted = this.makeMoreHuman(formatted);

    // Step 4: Truncate to appropriate length
    const targets = this.targetLengths[category];
    formatted = this.truncateToLength(formatted, targets.min, targets.max);

    // Step 5: Ensure it ends with proper punctuation
    if (!formatted.endsWith('.') && !formatted.endsWith('!') && !formatted.endsWith('?')) {
      formatted += '.';
    }

    return formatted;
  }

  /**
   * Format remedy to be actionable and short
   */
  formatRemedy(remedy, question) {
    if (!remedy) return '';

    let formatted = remedy;

    // Remove "Here are" or "Here is"
    formatted = formatted.replace(/^Here (is|are)\s+/i, '');

    // Make bullets more concise if present
    formatted = formatted
      .split('\n')
      .map(line => {
        let cleaned = line.trim();
        // Remove common prefixes
        cleaned = cleaned.replace(/^[-•*]\s+/, '').trim();
        cleaned = cleaned.replace(/^[0-9]+\.\s+/, '').trim();
        return cleaned;
      })
      .filter(line => line.length > 0)
      .join('\n');

    return formatted;
  }

  /**
   * Check if answer seems appropriate for question length
   */
  isAnswerAppropriate(answer, question) {
    const category = this.categorizeQuestion(question);
    const targets = this.targetLengths[category];
    const answerWordCount = this.countWords(answer);

    return answerWordCount >= targets.min && answerWordCount <= targets.max;
  }
}

export default new ResponseFormatter();
