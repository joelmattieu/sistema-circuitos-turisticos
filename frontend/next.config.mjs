/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  trailingSlash: true,
  distDir: "dist",
  images: {
    unoptimized: true,
  },
  turbopack: {},
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.ignoreWarnings = [/Attempted import error/, /cascading/i];
    }
    return config;
  },
};

export default nextConfig;
