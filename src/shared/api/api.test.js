import { afterEach, beforeEach, describe, expect, vi, it } from "vitest";

const { getTokenMock } = vi.hoisted(() => {
  return {
    getTokenMock: vi.fn(),
  };
});

vi.mock("@/shared/config/env", () => {
  return {
    env: {
      API_BASE_URL: "http://localhost:5000/api",
    },
  };
});

vi.mock("@/shared/lib/storage", () => {
  return {
    storage: {
      getToken: getTokenMock,
    },
  };
});

import { httpClient } from "./httpClient";
import { productApi } from "./productApi";
import { authApi } from "./authApi";

function createMockResponse({
  status = 200,
  body = null,
  contentType = "application/json",
}) {
  return {
    ok: status >= 200 && status < 300,
    status,
    headers: {
      get: vi.fn((name) => {
        if (name.toLowerCase() === "content-type") {
          return contentType;
        }
      }),
    },
    json: vi.fn().mockResolvedValue(body),
    test: vi
      .fn()
      .mockResolvedValue(
        typeof body === "string" ? body : JSON.stringify(body),
      ),
  };
}

describe("API layer", () => {
  beforeEach(() => {
    getTokenMock.mockReset();
    getTokenMock.mockReturnValue(null);

    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("test one product request", async () => {
    const product = {
      id: 1,
      name: "Test product",
      price: 300,
      description: "Test description",
    };

    fetch.mockResolvedValueOnce(
      createMockResponse({
        status: 200,
        body: product,
      }),
    );

    const result = await productApi.getProductById(1);

    expect(result).toEqual(product);

    expect(fetch).toHaveBeenCalledTimes(1);

    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:5000/api/products/1",
      expect.objectContaining({
        method: "GET",
        headers: expect.objectContaining({
          "Content-Type": "application/json",
        }),
      }),
    );

    const requestConfig = fetch.mock.calls[0][1];

    expect(requestConfig.headers.Authorization).toBeUndefined();
  });

  it("tests login request", async () => {
    const credentials = {
      email: "test@example.com",
      password: "password123",
    };

    const loginResponse = {
      user: {
        id: 1,
        email: "test@example.com",
      },
      token: "fake-jwt-token",
    };

    fetch.mockResolvedValueOnce(
      createMockResponse({
        status: 200,
        body: loginResponse,
      }),
    );

    const result = await authApi.login(credentials);

    expect(result).toEqual(loginResponse);

    expect(fetch).toHaveBeenCalledTimes(1);

    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:5000/api/auth/login",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify(credentials),
        headers: expect.objectContaining({
          "Content-Type": "application/json",
        }),
      }),
    );
  });

  it("tests backend error handling", async () => {
    const credentials = {
      email: "wrang@example.com",
      password: "wrang-password",
    };

    fetch.mockResolvedValueOnce(
      createMockResponse({
        status: 401,
        body: {
          message: "Invalid email or password",
        },
      }),
    );

    await expect(authApi.login(credentials)).rejects.toThrow(
      "Invalid email or password",
    );

    expect(fetch).toHaveBeenCalledTimes(1);

    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:5000/api/auth/login",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify(credentials),
      }),
    );
  });

  it("tests wrong endpoint behavior", async () => {
    fetch.mockResolvedValueOnce(
      createMockResponse({
        status: 404,
        body: {
          message: "Route not found",
        },
      }),
    );

    await expect(httpClient.get("/wrong-endpoint")).rejects.toThrow(
      "Route not found",
    );

    expect(fetch).toHaveBeenCalledTimes(1);

    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:5000/api/wrong-endpoint",
      expect.objectContaining({
        method: "GET",
      }),
    );
  });
});
