import { describe, it, expect, vi, Mock } from "vitest";
import { fetcher } from "./fetcher";
import { NiltoError } from ".";

describe("fetcher", () => {
  const apiKey = "test-api-key";
  const url = "https://example.com/api";

  it("正常なレスポンスを返す", async () => {
    // モックレスポンス設定
    const mockResponse = { data: "test data" };
    (vi.spyOn(global, "fetch") as Mock).mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockResponse),
    });

    const result = await fetcher(apiKey, url);

    // 正常なレスポンスの確認
    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(url, {
      method: "GET",
      headers: {
        "X-NILTO-API-KEY": apiKey,
        "Content-Type": "application/json",
      },
    });
  });

  it("エラーレスポンスをスローする", async () => {
    // モックエラーレスポンス設定
    const errorData = "Bad Request: リクエストパラメータが不正";
    (vi.spyOn(global, "fetch") as Mock).mockResolvedValue({
      ok: false,
      status: 400,
      json: vi.fn().mockResolvedValue(errorData),
    });

    await expect(fetcher(apiKey, url)).rejects.toThrowError(
      new NiltoError(400, errorData),
    );
  });

  it("NiltoErrorがスローされた場合に再スローされる", async () => {
    const customError = new NiltoError(
      500,
      "Internal Server Error: NILTOサーバー内におけるエラー",
    );

    // fetchがNiltoErrorをスローするように設定
    (vi.spyOn(global, "fetch") as Mock).mockRejectedValue(customError);

    await expect(fetcher(apiKey, url)).rejects.toThrowError(customError);
  });
});
