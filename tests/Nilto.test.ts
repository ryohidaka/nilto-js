import { Nilto } from "../src";
import { describe, expect, it, Mock, vi } from "vitest";

// fetchをモック化
global.fetch = vi.fn();

describe("Nilto", () => {
  it("init", () => {
    const client = new Nilto("test-key");
  });

  it("getContents", async () => {
    // モックレスポンス設定
    const mockResponse = { data: "test data" };
    (global.fetch as Mock).mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockResponse),
    });

    const client = new Nilto("test-key");
    const contents = await client.getContents({ model: "sample" });
    expect(contents).toEqual(mockResponse);
  });
});
