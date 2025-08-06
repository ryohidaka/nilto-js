/**
 * オブジェクトまたは配列の全てのキーをキャメルケースに変換する。
 * ネストされた構造にも再帰的に対応。
 * 文字列でISO日時形式の場合はDateオブジェクトに変換する。
 *
 * @param input - 変換対象の任意の値
 * @returns キーがキャメルケースに変換されたオブジェクト、配列、または元の値
 */
export function convertKeysToCamelCase<T>(input: unknown): T {
  if (Array.isArray(input)) {
    return input.map((item) => convertKeysToCamelCase(item)) as unknown as T;
  }

  if (input !== null && typeof input === "object") {
    return Object.fromEntries(
      Object.entries(input).map(([key, value]) => {
        const newKey = toCamelCase(key);
        const newValue = convertKeysToCamelCase(value);
        return [newKey, newValue];
      }),
    ) as T;
  }

  if (typeof input === "string" && isIsoDateString(input)) {
    return new Date(input) as unknown as T;
  }

  return input as T;
}

/**
 * スネークケースの文字列をキャメルケースに変換する。
 * 先頭にアンダースコアがある場合は保持し、その後の最初の文字は小文字に変換する。
 * 例: "_created_at" → "_createdAt"
 *
 * @param str - 変換対象の文字列（snake_case）
 * @returns キャメルケースに変換された文字列
 */
function toCamelCase(str: string): string {
  const hasLeadingUnderscore = str.startsWith("_");
  const trimmed = hasLeadingUnderscore ? str.slice(1) : str;

  // アンダースコア＋小文字を大文字に変換（例: _a → A）
  const camel = trimmed.replace(/_([a-z])/g, (_, c) => c.toUpperCase());

  // 先頭がアンダースコアの場合、先頭文字は小文字にする
  const result = hasLeadingUnderscore && camel.length > 0
    ? camel.charAt(0).toLowerCase() + camel.slice(1)
    : camel;

  return hasLeadingUnderscore ? `_${result}` : result;
}

/**
 * ISO 8601形式のUTC日時文字列かどうか判定する。
 * 例: "2023-01-01T12:00:00Z", "2023-01-01T12:00:00.123Z"
 *
 * @param value - 判定対象の文字列
 * @returns ISO日時文字列ならtrue、そうでなければfalse
 */
function isIsoDateString(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/.test(value);
}
