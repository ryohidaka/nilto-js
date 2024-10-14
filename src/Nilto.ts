import { GetContentsParams, GetContentsResponse } from "./types";
import { fetcher } from "./utils";

/**
 * NILTO SDK for JavaScript
 */
export class Nilto {
  private baseUrl = "https://cms-api.nilto.com/v1";
  private apiKey = "";

  /**
   * Niltoクラスの初期化処理.
   *
   * @constructor
   * @param {string} apiKey - NILTO CMS APIへのリクエストを認証するために必要なAPIキー。
   *
   * @example
   * ```typescript
   * const nilto = new Nilto('your-api-key');
   * ```
   */
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * コンテンツの配列を取得
   *
   * 指定した条件に合うコンテンツの配列を取得します。
   *
   * @async
   * @method getContents
   * @param {GetContentsParams} [params] - コンテンツの絞り込み条件。
   * @returns {Promise<GetContentsResponse>} コンテンツの配列および関連メタデータを含むレスポンスオブジェクト。
   *
   * @throws {Error} ネットワークエラーやAPIエラーが発生した場合にスローされます。
   *
   * @see {@link https://www.nilto.com/api#tag/Contents-GET-API/operation/get-contents} APIドキュメント
   *
   * @example
   * ```typescript
   * const params: GetContentsParams = {
   *   model: 'blog_articles',
   *   limit: 10,
   *   offset: 0,
   * };
   * const contentsResponse = await nilto.getContents(params);
   * console.log(contentsResponse.contents);
   * ```
   */
  async getContents(params?: GetContentsParams): Promise<GetContentsResponse> {
    const url = new URL(`${this.baseUrl}/contents`);

    if (params) {
      // TODO: フィールド種類ごとのフィルターを追加
      Object.keys(params).forEach((key) => {
        if (params[key] !== undefined) {
          url.searchParams.append(key, String(params[key]));
        }
      });
    }

    const res = await fetcher<GetContentsResponse>(this.apiKey, url.toString());

    return res;
  }
}
