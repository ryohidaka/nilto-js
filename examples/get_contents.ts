import { type GetContentsParams, Nilto } from "@hidaka/nilto";
import { getApiKey } from "./utils.ts";

const apiKey = getApiKey();
const client = new Nilto(apiKey);

try {
  const params: GetContentsParams = {
    limit: 10,
  };

  const res = await client.getContents(params);

  console.log(`Total: ${res.total}`);
  console.log(`Offset: ${res.offset}`);
  console.log(`Limit: ${res.limit}`);
  console.table(res.data); // <- テーブル形式で出力
} catch (error) {
  console.error("APIエラー:", error);
}
