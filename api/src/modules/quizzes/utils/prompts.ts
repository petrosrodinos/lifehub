export function buildQuizGenerationSystemPrompt(): string {
    return `You are an expert educator creating quiz questions from study material.
Generate questions that test conceptual understanding and critical thinking, not just memorization.
Each question must be clearly worded, answerable from the provided content, and unambiguous.
Avoid questions that require outside knowledge. Focus on the most important concepts.
Return only the requested JSON array — no markdown, no extra explanation.`;
}

export function buildQuizGenerationUserPrompt(
    chunk: string,
    chunkIndex: number,
    totalChunks: number,
    questionsPerChunk: number,
    difficulty: string,
    allowedTypes: string[],
): string {
    const typesDescription = allowedTypes.join(', ');
    const difficultyGuide =
        difficulty === 'MIXED'
            ? 'Mix of EASY, MEDIUM, and HARD difficulties.'
            : `All questions should be ${difficulty} difficulty.`;

    return `Generate up to ${questionsPerChunk} quiz questions from this study content.
Use these question types: ${typesDescription}.
${difficultyGuide}

Content (chunk ${chunkIndex + 1} of ${totalChunks}):
${chunk}

Question schema rules:
- question_text: clear, specific question (10–500 chars)
- question_type: exactly one of ${typesDescription}
- difficulty: EASY | MEDIUM | HARD
- correct_answer: the correct answer as plain text
- explanation: concise explanation of why this is correct (max 600 chars)
- hint: optional short hint (max 200 chars, omit if not useful)

For MULTIPLE_CHOICE only:
- options: array of exactly 4 options, exactly 1 has is_correct=true
- Options should be plausible and varied, not obviously wrong
- Do not include "All of the above" or "None of the above"

For TRUE_FALSE only:
- correct_answer must be exactly "true" or "false"
- question_text should be a clear declarative statement

For SHORT_ANSWER only:
- acceptable_answers: 2–5 acceptable variations of the answer
- grading_guidance: short guidance on what constitutes a correct answer

Return a JSON array of question objects. Aim for variety in types if multiple are allowed.`;
}

export function buildQuizTitlePrompt(questionTexts: string[]): string {
    return `Based on these quiz question topics, generate a concise educational title for this quiz.
The title should be 3–8 words, human-readable, and summarise the overall subject.

Topics: ${questionTexts.slice(0, 8).join('; ')}

Return only the title text, nothing else.`;
}

export function buildQuizDescriptionPrompt(questionTexts: string[], title: string): string {
    return `Write a 1–2 sentence description for a quiz titled "${title}".
The description should summarise what concepts are covered.

Sample questions: ${questionTexts.slice(0, 5).join('; ')}

Return only the description text, nothing else.`;
}
