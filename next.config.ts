// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
// typescript: {
//     ignoreBuildErrors: true, // Not recommended for production
//   },};

// export default nextConfig;
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;