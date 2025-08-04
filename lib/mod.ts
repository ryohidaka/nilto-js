import type { GetContentsParams, GetContentsResponse } from "@hidaka/nilto";
import { buildQueryParams, request } from "./client/mod.ts";
import { DEFAULT_DEPTH, DEFAULT_LIMIT, DEFAULT_OFFSET } from "./constants.ts";

export * from "./contents/mod.ts";
export * from "./models/content.ts";

/**
 * NILTO SDK for JavaScript
 *
 * @example 初期化
 * ```ts
 * import { Nilto } from '@hidaka/nilto';
 *
 * const nilto = new Nilto('your-api-key-here');
 * ```
 */
export class Nilto {
  private apiKey: string;

  /**
   * Niltoクラスの初期化処理.
   *
   * @param apiKey - NILTO CMS APIへのリクエストを認証するために必要なAPIキー。
   */
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * クエリパラメータに基づいてコンテンツ一覧を取得する
   *
   * @param params - クエリパラメータのオブジェクト（例: { model: "news", offset: 50, limit: 10 }）
   * @returns コンテンツ一覧のレスポンス
   * @throws Error
   *
   * @example 使用例
   * ```ts
   * import { type GetContentsParams,Nilto } from '@hidaka/nilto';
   *
   * const nilto = new Nilto('your-api-key-here');
   *
   * const params: GetContentsParams = { limit: 10 };
   *
   * const res = await nilto.getContents(params);
   *
   * console.log(`Total: ${res.total}`);
   * console.log(`Offset: ${res.offset}`);
   * console.log(`Limit: ${res.limit}`);
   * console.table(res.data);
   * ```
   */
  getContents(
    params: Partial<GetContentsParams> = {},
  ): Promise<GetContentsResponse> {
    // クエリ文字列を取得
    const query = buildQueryParams(params, {
      depth: DEFAULT_DEPTH,
      limit: DEFAULT_LIMIT,
      offset: DEFAULT_OFFSET,
    });

    return this.get<GetContentsResponse>(`contents?${query}`);
  }

  /**
   * 共通Get処理
   * @param path - リクエストパス
   * @returns
   */
  private get<T>(path: string): Promise<T> {
    return request<T>("GET", path, this.apiKey);
  }
}
