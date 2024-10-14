/**
 * NiltoError
 *
 * Nilto APIで発生するエラーを処理するカスタムエラークラス
 *
 * @extends {Error}
 */
export class NiltoError extends Error {
  public status: number;
  public errorData: any;

  /**
   * NiltoErrorクラスのコンストラクタ
   *
   * @param {number} status - HTTPステータスコードを指定
   * @param {any} errorData - 追加のエラーデータをオプションで指定
   */
  constructor(status: number, errorData: any) {
    const message = NiltoError.generateMessage(status);
    super(message);
    this.status = status;
    this.errorData = errorData;
    this.name = "NiltoError";
  }

  /**
   * ステータスコードに応じたメッセージを生成
   *
   * @private
   * @static
   * @param {number} status - HTTPステータスコード
   * @returns {string} - ステータスコードに対応するエラーメッセージ
   */
  private static generateMessage(status: number): string {
    switch (status) {
      case 400:
        return "Bad Request: リクエストパラメータが不正";
      case 401:
        return "Unauthorized: APIキーが不正";
      case 402:
        return "Payment Required: 転送量の上限を超過、もしくは支払いの不備";
      case 403:
        return "Forbidden: 非公開リソースへのアクセス";
      case 404:
        return "Not Found: リソースが存在しない";
      case 429:
        return "Too Many Requests: 一定時間内のリクエスト数が上限超過";
      case 500:
        return "Internal Server Error: NILTOサーバー内におけるエラー";
      default:
        return `An error occurred with status code: ${status}.`;
    }
  }
}
