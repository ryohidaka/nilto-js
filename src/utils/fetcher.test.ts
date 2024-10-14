import { describe, it, expect, vi, Mock } from "vitest";
import { fetcher } from "./fetcher";
import { NiltoError } from ".";

// fetchをモック化
global.fetch = vi.fn();

describe("fetcher", () => {
  const apiKey = "test-api-key";
  const url = "https://example.com/api";

  it("正常なレスポンスを返す", async () => {
    // モックレスポンス設定
    const mockResponse = { data: "test data" };
    (global.fetch as Mock).mockResolvedValue({
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
    const errorData = { message: "error" };
    (global.fetch as Mock).mockResolvedValue({
      ok: false,
      status: 400,
      json: vi.fn().mockResolvedValue(errorData),
    });

    await expect(fetcher(apiKey, url)).rejects.toThrowError(
      new NiltoError(400, errorData),
    );
  });

  it("NiltoErrorがスローされた場合に再スローされる", async () => {
    const customError = new NiltoError(500, "Internal Server Error");

    // fetchがNiltoErrorをスローするように設定
    (global.fetch as Mock).mockRejectedValue(customError);

    await expect(fetcher(apiKey, url)).rejects.toThrowError(customError);
  });
});
