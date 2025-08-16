// next.config.js
const checkEnvVariables = require("./check-env-variables")
checkEnvVariables()

/** Optional: read Supabase host from env (we’ll also hard-allow below) */
const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || ""
let SUPABASE_HOST = ""
try {
  SUPABASE_HOST = SUPABASE_URL ? new URL(SUPABASE_URL).host : ""
} catch {}

/** Security headers (safe CSP for images) */
const securityHeaders = [
  { key: "X-Powered-By", value: "ABC" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob:",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      "connect-src 'self' https:",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
]

/** Remote image allow-list */
const imageRemotePatterns = [
  ...(process.env.NODE_ENV === "development"
    ? [{ protocol: "http", hostname: "localhost" }]
    : []),

  // Your Supabase bucket host explicitly
  {
    protocol: "https",
    hostname: "pcdgwbndjibgzdsykhte.supabase.co",
    pathname: "/storage/v1/object/public/**",
  },

  // Also allow whichever Supabase host is in env (if different)
  ...(SUPABASE_HOST
    ? [
        {
          protocol: "https",
          hostname: SUPABASE_HOST,
          pathname: "/storage/v1/object/public/**",
        },
      ]
    : []),

  // Common extras you might hit
  { protocol: "https", hostname: "medusa-public-images.s3.eu-west-1.amazonaws.com" },
  { protocol: "https", hostname: "medusa-server-testing.s3.amazonaws.com" },
  { protocol: "https", hostname: "medusa-server-testing.s3.us-east-1.amazonaws.com" },
  { protocol: "https", hostname: "github.com" },
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  // Keep these relaxed if your repo has type or lint noise
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  images: {
    remotePatterns: imageRemotePatterns,
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 414, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [64, 96, 128, 256, 384],
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Response headers + caching
  async headers() {
    return [
      { source: "/(.*)", headers: securityHeaders },
      {
        source: "/api/(.*)",
        headers: [{ key: "Cache-Control", value: "no-cache, no-store, must-revalidate, max-age=0" }],
      },
      {
        source: "/(.*)/products/(.*)",
        headers: [{ key: "Cache-Control", value: "no-cache, no-store, must-revalidate, max-age=0" }],
      },
      {
        source: "/(.*)/categories/(.*)",
        headers: [{ key: "Cache-Control", value: "no-cache, no-store, must-revalidate, max-age=0" }],
      },
      {
        source: "/_next/static/(.*)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/_next/image(.*)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ]
  },

  // Optional API proxy: /api/* -> NEXT_PUBLIC_MEDUSA_BACKEND_URL
  async rewrites() {
    const dst = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL
    if (dst && /^https?:\/\//i.test(dst)) {
      return [{ source: "/api/:path*", destination: `${dst}/:path*` }]
    }
    return []
  },

  // Helpful for debugging fetches locally
  logging: {
    fetches: { fullUrl: process.env.NODE_ENV !== "production" },
  },
}

module.exports = nextConfig
