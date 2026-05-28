function normalize(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s]/g, '')
        .replace(/\s+/g, ' ');
}

export function scoreShortAnswer(
    userAnswer: string,
    correctAnswer: string,
    acceptableAnswers: string[],
): boolean {
    if (!userAnswer?.trim()) return false;

    const normalized = normalize(userAnswer);
    const allCorrect = [correctAnswer, ...acceptableAnswers].map(normalize);

    return allCorrect.some((answer) => {
        if (normalized === answer) return true;
        // Accept if the user's answer contains the key phrase
        if (answer.length > 4 && normalized.includes(answer)) return true;
        // Accept if the key phrase contains the user's answer (for concise answers)
        if (normalized.length > 4 && answer.includes(normalized)) return true;
        return false;
    });
}

// Extension point: replace with AI-based grading in future
export async function scoreShortAnswerAi(
    _userAnswer: string,
    _correctAnswer: string,
    _gradingGuidance: string | null,
): Promise<boolean> {
    throw new Error('AI-based short answer grading not implemented yet');
}
