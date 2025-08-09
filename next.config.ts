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
   api: {
    bodyParser: {
      sizeLimit: '10mb', // Increase to your needs
    },
  }, // For App Router (which you're using)
  experimental: {
    serverComponentsExternalPackages: [],
  },
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;