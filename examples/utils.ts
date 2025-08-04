/**
 * 環境変数からNILTO_API_KEYを取得する
 * @returns APIキー
 */
export function getApiKey(): string {
  const apiKey = Deno.env.get("NILTO_API_KEY");

  if (!apiKey) {
    console.error("環境変数 NILTO_API_KEY が未設定です");
    Deno.exit(1);
  }

  return apiKey;
}
