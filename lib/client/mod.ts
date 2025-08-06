import { BASE_URL } from "../constants.ts";
import type { RequestMethod } from "./types.ts";
import { convertKeysToCamelCase } from "./utils.ts";

/**
 * fetchを用いてHTTPリクエストを送信する
 *
 * @param method - HTTPメソッド
 * @param path - リクエストパス（BASE_URLからの相対パス）
 * @param apiKey - 認証用APIキー
 * @param data - 送信データ（POST/PUT用）
 * @returns パース済みレスポンスデータ
 * @throws Error
 */
export async function request<T>(
  method: RequestMethod,
  path: string,
  apiKey: string,
  data?: unknown,
): Promise<T> {
  const url = `${BASE_URL}${path}`;

  const headers: HeadersInit = {
    "X-NILTO-API-KEY": apiKey,
    "Content-Type": "application/json",
  };

  const init: RequestInit = {
    method,
    headers,
    ...(data ? { body: JSON.stringify(data) } : {}),
  };

  try {
    const response = await fetch(url, init);
    const raw = await response.json();

    return convertKeysToCamelCase<T>(raw);
  } catch (error) {
    throw error;
  }
}

/**
 * クエリパラメータを元にクエリ文字列を構築する
 *
 * @param params - クエリパラメータオブジェクト
 * @param defaults - デフォルト値を指定する（省略可）
 * @returns クエリ文字列
 */
export function buildQueryParams(
  params: Record<string, unknown>,
  defaults: Record<string, unknown> = {},
): string {
  const query = new URLSearchParams();

  const merged = { ...defaults, ...params };

  for (const [key, value] of Object.entries(merged)) {
    if (value !== undefined) {
      query.append(key, String(value));
    }
  }

  return query.toString();
}
