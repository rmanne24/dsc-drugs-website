import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // The site is previewed on 127.0.0.1; Next blocks dev-only client resources
  // from hosts it does not know, which leaves the page un-hydrated.
  allowedDevOrigins: ["127.0.0.1"],
  // Keep the production-like view clean while designing in the browser.
  devIndicators: false,
};

export default nextConfig;
