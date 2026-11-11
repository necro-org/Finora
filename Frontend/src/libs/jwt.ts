export function decodeJwtPayload(
  token: string,
): Record<string, unknown> | null {
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;

    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(
      base64.length + ((4 - (base64.length % 4)) % 4),
      "=",
    );
    const bytes = Uint8Array.from(atob(padded), (char) => char.charCodeAt(0));

    return JSON.parse(new TextDecoder().decode(bytes));
  } catch {
    return null;
  }
}

export function getTokenExpiresAt(token: string | null): number | null {
  if (!token) return null;

  const expiresAt = decodeJwtPayload(token)?.exp;
  if (typeof expiresAt !== "number") return null;

  return expiresAt * 1000;
}

export function isTokenValid(token: string | null): token is string {
  const expiresAt = getTokenExpiresAt(token);
  return expiresAt !== null && expiresAt > Date.now();
}
