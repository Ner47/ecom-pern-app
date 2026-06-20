import { env } from "@/shared/config/env";
import { storage } from "@/shared/lib/storage";

function buildUrl(path) {
  if (path.startsWith("http")) {
    return path;
  }

  return `${env.API_BASE_URL}${path}`;
}

async function request(path, options = {}) {
  const token = storage.getToken();

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const config = {
    ...options,
    headers,
  };

  if (
    config.body &&
    typeof config.body === "object" &&
    !(config.body instanceof FormData)
  ) {
    config.body = JSON.stringify(config.body);
  }

  if (config.body instanceof FormData) {
    delete config.headers["Content-Type"];
  }

  const response = await fetch(buildUrl(path), config);

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;

    try {
      const errorData = await response.json();
      message = errorData.message || message;
    } catch {
      message = await response.text();
    }

    throw new Error(message);
  }

  if (response.status === 204) {
    return null;
  }

  const contentType = response.headers.get("content-type");

  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }

  return response.text();
}

export const httpClient = {
  get: (path, options) =>
    request(path, {
      method: "GET",
      ...options,
    }),

  post: (path, body, options) =>
    request(path, {
      method: "POST",
      body,
      ...options,
    }),

  put: (path, body, options) =>
    request(path, {
      method: "PUT",
      body,
      ...options,
    }),
  patch: (path, body, options) =>
    request(path, {
      method: "PATCH",
      body,
      ...options,
    }),

  delete: (path, options) =>
    request(path, {
      method: "DELETE",
      ...options,
    }),
};
