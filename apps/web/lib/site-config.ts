function xProfileUrl(value: string | undefined): string | undefined {
  if (!value?.trim()) return undefined;
  const url = new URL(value.trim());
  if (
    url.protocol !== "https:" ||
    !["x.com", "www.x.com", "twitter.com", "www.twitter.com"].includes(url.hostname) ||
    !/^\/[A-Za-z0-9_]{1,15}\/?$/.test(url.pathname) ||
    url.username || url.password || url.port || url.search || url.hash
  ) {
    throw new Error("NEXT_PUBLIC_X_URL must be a full HTTPS X profile URL, such as https://x.com/your_handle.");
  }
  return url.href;
}

export const companyXUrl = xProfileUrl(process.env.NEXT_PUBLIC_X_URL);
