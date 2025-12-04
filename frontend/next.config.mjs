/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  trailingSlash: true,
  // output: "export",
  distDir: "dist",
  images: {
    unoptimized: true,
  },
  turbopack: {},
};

export default nextConfig;
