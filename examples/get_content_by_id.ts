import { Nilto } from "../mod.ts";
import { getApiKey } from "./utils.ts";

const apiKey = getApiKey();
const client = new Nilto(apiKey);

try {
  const res = await client.getContentById("20784888");

  console.log(res); // <- テーブル形式で出力
} catch (error) {
  console.error("APIエラー:", error);
}
