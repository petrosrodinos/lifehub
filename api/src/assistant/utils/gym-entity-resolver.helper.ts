import { matchByName, type NamedEntity } from '@/assistant/utils/expense-entity-resolver.helper';

export interface GymEntityCandidate extends NamedEntity {
    type: 'exercise' | 'muscle_group';
}

export type GymEntityResolution =
    | { ok: true; uuid: string }
    | { ok: false; error: string; candidates?: GymEntityCandidate[] };

function resolveByName(
    entities: NamedEntity[],
    name: string,
    entityLabel: string,
    listToolName: string,
    candidateType: GymEntityCandidate['type'],
): GymEntityResolution {
    const matches = matchByName(entities, name);

    if (matches.length === 0) {
        return { ok: false, error: `No ${entityLabel} matching "${name}" was found.` };
    }

    if (matches.length > 1) {
        return {
            ok: false,
            error: `Multiple ${entityLabel}s match "${name}". Ask the user to clarify or call ${listToolName}.`,
            candidates: matches.map((match) => ({ ...match, type: candidateType })),
        };
    }

    return { ok: true, uuid: matches[0].uuid };
}

export function resolveExercise(exercises: NamedEntity[], name: string): GymEntityResolution {
    return resolveByName(exercises, name, 'exercise', 'list_exercises', 'exercise');
}

export function resolveMuscleGroup(muscleGroups: NamedEntity[], name: string): GymEntityResolution {
    return resolveByName(muscleGroups, name, 'muscle group', 'list_muscle_groups', 'muscle_group');
}
