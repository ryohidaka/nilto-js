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
}
