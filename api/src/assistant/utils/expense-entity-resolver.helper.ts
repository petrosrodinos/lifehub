export interface NamedEntity {
    uuid: string;
    name: string;
}

export interface EntityCandidate extends NamedEntity {
    type: 'account' | 'category' | 'subcategory' | 'tag';
}

export type EntityResolution =
    | { ok: true; uuid: string }
    | { ok: false; error: string; candidates?: EntityCandidate[] };

export type CategoryResolution =
    | { ok: true; category_uuid?: string; subcategory_uuid?: string }
    | { ok: false; error: string; candidates?: EntityCandidate[] };

function normalizeName(name: string): string {
    return name.toLowerCase().trim();
}

function namesMatch(candidateName: string, query: string): boolean {
    const candidate = normalizeName(candidateName);
    const normalizedQuery = normalizeName(query);

    if (candidate.length === 0 || normalizedQuery.length === 0) {
        return false;
    }

    return candidate.includes(normalizedQuery) || normalizedQuery.includes(candidate);
}

export function matchByName<T extends NamedEntity>(candidates: T[], query: string): T[] {
    return candidates.filter((candidate) => namesMatch(candidate.name, query));
}

export function resolveAccount(accounts: NamedEntity[], name: string): EntityResolution {
    const matches = matchByName(accounts, name);

    if (matches.length === 0) {
        return { ok: false, error: `No account matching "${name}" was found.` };
    }

    if (matches.length > 1) {
        return {
            ok: false,
            error: `Multiple accounts match "${name}". Ask the user to clarify or call list_expense_accounts.`,
            candidates: matches.map((match) => ({ ...match, type: 'account' as const })),
        };
    }

    return { ok: true, uuid: matches[0].uuid };
}

export function resolveCategoryOrSubcategory(
    categories: NamedEntity[],
    subcategories: Array<NamedEntity & { category_uuid: string }>,
    name: string,
): CategoryResolution {
    const subcategoryMatches = matchByName(subcategories, name);

    if (subcategoryMatches.length === 1) {
        return {
            ok: true,
            subcategory_uuid: subcategoryMatches[0].uuid,
            category_uuid: subcategoryMatches[0].category_uuid,
        };
    }

    if (subcategoryMatches.length > 1) {
        return {
            ok: false,
            error: `Multiple subcategories match "${name}". Ask the user to clarify or call list_expense_categories.`,
            candidates: subcategoryMatches.map((match) => ({ uuid: match.uuid, name: match.name, type: 'subcategory' as const })),
        };
    }

    const categoryMatches = matchByName(categories, name);

    if (categoryMatches.length === 1) {
        return { ok: true, category_uuid: categoryMatches[0].uuid };
    }

    if (categoryMatches.length > 1) {
        return {
            ok: false,
            error: `Multiple categories match "${name}". Ask the user to clarify or call list_expense_categories.`,
            candidates: categoryMatches.map((match) => ({ uuid: match.uuid, name: match.name, type: 'category' as const })),
        };
    }

    return { ok: false, error: `No category or subcategory matching "${name}" was found.` };
}

export function resolveTag(tags: Array<{ uuid: string; title: string }>, name: string): EntityResolution {
    const candidates = tags.map((tag) => ({ uuid: tag.uuid, name: tag.title }));
    const matches = matchByName(candidates, name);

    if (matches.length === 0) {
        return { ok: false, error: `No tag matching "${name}" was found.` };
    }

    if (matches.length > 1) {
        return {
            ok: false,
            error: `Multiple tags match "${name}". Ask the user to clarify or call list_expense_tags.`,
            candidates: matches.map((match) => ({ ...match, type: 'tag' as const })),
        };
    }

    return { ok: true, uuid: matches[0].uuid };
}
