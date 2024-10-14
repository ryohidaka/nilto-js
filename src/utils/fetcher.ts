import { NiltoError } from ".";

/**
 * 指定されたAPIキーとURLを使用してGETリクエストを送信し、レスポンスをパースする。
 * レスポンスが正常でない場合は、NiltoErrorをスローする
 *
 * @param apiKey - APIリクエストに使用するAPIキー
 * @param url - リクエストを送信する対象のURL
 * @returns レスポンスデータをPromiseで返却する
 * @throws NiltoError - APIリクエストが失敗した場合にエラーをスローする
 */
export async function fetcher<T>(apiKey: string, url: string): Promise<T> {
  try {
    const headers = {
      "X-NILTO-API-KEY": apiKey,
      "Content-Type": "application/json",
    };

    const response = await fetch(url, {
      method: "GET",
      headers,
    });

    // レスポンスが正常でない場合は、エラーデータを取得しNiltoErrorをスロー
    if (!response.ok) {
      const errorData = await response.json();
      throw new NiltoError(response.status, errorData);
    }

    // 正常な場合は、レスポンスをJSON形式で返す
    return response.json() as T;
  } catch (error) {
    // NiltoErrorの場合は再度NiltoErrorをスロー
    if (error instanceof NiltoError) {
      throw new NiltoError(error.status, error.message);
    }

    // その他のエラーはそのままスロー
    throw error;
  }
}
