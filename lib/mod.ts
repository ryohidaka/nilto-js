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
}
