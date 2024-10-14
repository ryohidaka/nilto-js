import { describe, it, expect } from "vitest";
import { NiltoError } from ".";

describe("NiltoError", () => {
  it("400エラー", () => {
    const error = new NiltoError(400, { detail: "Invalid request" });
    expect(error.message).toBe("Bad Request: リクエストパラメータが不正");
    expect(error.status).toBe(400);
    expect(error.errorData).toEqual({ detail: "Invalid request" });
    expect(error.name).toBe("NiltoError");
  });

  it("401エラー", () => {
    const error = new NiltoError(401, null);
    expect(error.message).toBe("Unauthorized: APIキーが不正");
    expect(error.status).toBe(401);
    expect(error.errorData).toBeNull();
  });

  it("402エラー", () => {
    const error = new NiltoError(402, null);
    expect(error.message).toBe(
      "Payment Required: 転送量の上限を超過、もしくは支払いの不備",
    );
    expect(error.status).toBe(402);
    expect(error.errorData).toBeNull();
  });

  it("403エラー", () => {
    const error = new NiltoError(403, null);
    expect(error.message).toBe("Forbidden: 非公開リソースへのアクセス");
    expect(error.status).toBe(403);
    expect(error.errorData).toBeNull();
  });

  it("404エラー", () => {
    const error = new NiltoError(404, {});
    expect(error.message).toBe("Not Found: リソースが存在しない");
    expect(error.status).toBe(404);
    expect(error.errorData).toEqual({});
  });

  it("429エラー", () => {
    const error = new NiltoError(429, {});
    expect(error.message).toBe(
      "Too Many Requests: 一定時間内のリクエスト数が上限超過",
    );
    expect(error.status).toBe(429);
    expect(error.errorData).toEqual({});
  });

  it("500エラー", () => {
    const error = new NiltoError(500, {});
    expect(error.message).toBe(
      "Internal Server Error: NILTOサーバー内におけるエラー",
    );
    expect(error.status).toBe(500);
    expect(error.errorData).toEqual({});
  });

  it("その他のエラー", () => {
    const error = new NiltoError(999, "unknown error");
    expect(error.message).toBe("An error occurred with status code: 999.");
    expect(error.status).toBe(999);
    expect(error.errorData).toBe("unknown error");
  });
});
