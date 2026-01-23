/**
 * Simple fuzzy matching for unit names
 * Returns a score (0-1) indicating how well the query matches the target
 */
export function fuzzyScore(query: string, target: string): number {
  const q = query.toLowerCase();
  const t = target.toLowerCase();

  // Exact match
  if (t === q) return 1;

  // Contains the full query
  if (t.includes(q)) return 0.9;

  // Check if all characters appear in order
  let qIndex = 0;
  let matchedChars = 0;
  let consecutiveBonus = 0;
  let lastMatchIndex = -2;

  for (let tIndex = 0; tIndex < t.length && qIndex < q.length; tIndex++) {
    if (t[tIndex] === q[qIndex]) {
      matchedChars++;
      if (tIndex === lastMatchIndex + 1) {
        consecutiveBonus += 0.1;
      }
      lastMatchIndex = tIndex;
      qIndex++;
    }
  }

  if (qIndex < q.length) {
    // Not all query characters were found in order
    return 0;
  }

  // Score based on:
  // - Percentage of query chars matched (should be 100% if we get here)
  // - Length similarity
  // - Consecutive character bonus
  const lengthRatio = q.length / t.length;
  const baseScore = 0.5 + (lengthRatio * 0.3) + Math.min(consecutiveBonus, 0.2);

  return Math.min(baseScore, 0.89); // Cap below "contains" score
}

/**
 * Find the best matching unit name from a list
 */
export function findBestMatch(
  query: string,
  names: string[],
  threshold = 0.3
): { name: string; score: number } | null {
  let bestMatch: { name: string; score: number } | null = null;

  for (const name of names) {
    const score = fuzzyScore(query, name);
    if (score >= threshold && (!bestMatch || score > bestMatch.score)) {
      bestMatch = { name, score };
    }
  }

  return bestMatch;
}

/**
 * Find all matches above threshold, sorted by score
 */
export function findAllMatches(
  query: string,
  names: string[],
  threshold = 0.3,
  limit = 10
): Array<{ name: string; score: number }> {
  const matches: Array<{ name: string; score: number }> = [];

  for (const name of names) {
    const score = fuzzyScore(query, name);
    if (score >= threshold) {
      matches.push({ name, score });
    }
  }

  return matches
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
