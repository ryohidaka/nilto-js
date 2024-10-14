/**
 * 指定されたAPIキーとURLを使用してGETリクエストを送信し、レスポンスをパースする。
 *
 * @param apiKey - APIリクエストに使用するAPIキー
 * @param url - リクエストを送信する対象のURL
 * @returns レスポンスデータをPromiseで返却する
 * @throws Error - APIリクエストが失敗した場合にエラーをスローする
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

    return response.json() as T;
  } catch (error) {
    throw error;
  }
}
