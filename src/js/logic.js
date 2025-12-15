/**
 * Logic for Cosmic Vibration Diagnosis
 */

const DIMENSIONS = {
    EI: { positive: 'E', negative: 'I', label: 'Energy' },
    SN: { positive: 'N', negative: 'S', label: 'Mind' },
    TF: { positive: 'T', negative: 'F', label: 'Nature' },
    JP: { positive: 'J', negative: 'P', label: 'Tactics' },
    Resonance: { positive: 'Sun', negative: 'Moon', label: 'Identity' }
};

/**
 * Calculates the final type based on logic.
 * @param {Object} answers - Key-value pair of questionId: score (-2 to +2)
 * @returns {Object} Result type and details
 */
export function calculateType(answers, questions) {
    const scores = {
        EI: 0,
        SN: 0,
        TF: 0,
        JP: 0,
        Resonance: 0
    };

    // Calculate raw scores
    questions.forEach(q => {
        const score = answers[q.id] || 0;
        // If question weight_positive is the first char of dimension (e.g. E in EI)
        // Then positive score adds to E.
        // Actually, let's normalize: Positive score (+1, +2) supports weight_positive.
        // Negative score (-1, -2) supports weight_negative.
        
        scores[q.dimension] += score;
    });

    // Determine letters
    const type = 
        (scores.EI >= 0 ? 'E' : 'I') +
        (scores.SN >= 0 ? 'N' : 'S') +
        (scores.TF >= 0 ? 'T' : 'F') +
        (scores.JP >= 0 ? 'J' : 'P');
    
    // Determine Resonance (Sun/Moon)
    const resonance = scores.Resonance >= 0 ? 'Sun' : 'Moon';

    // Full ID (e.g., "INTJ-Sun")
    const resultId = `${type}-${resonance}`;

    return {
        type: type,
        resonance: resonance,
        resultId: resultId,
        scores: scores
    };
}
