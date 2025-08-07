/**
 * グローバル fetch をモックし、指定された JSON ファイルの内容を返却する
 * @param filePath - fetch が返却する JSON ファイルのパス
 */
export async function mockFetchFromFile(filePath: string): Promise<void> {
  const decoder = new TextDecoder("utf-8");
  const data = await Deno.readFile(`__fixtures__/${filePath}`);
  const json = JSON.parse(decoder.decode(data));

  globalThis.fetch = (
    _input: RequestInfo | URL,
    _init?: RequestInit,
  ): Promise<Response> => {
    return Promise.resolve(
      new Response(JSON.stringify(json), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    );
  };
}
