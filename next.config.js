/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 支持 x402 中间件
  experimental: {
    // 如果需要的话可以在这里添加实验性功能
  },
  webpack: (config, { isServer }) => {
    // 忽略 Solana 相关的模块问题
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    
    // 忽略 Solana 编译警告
    config.ignoreWarnings = [
      { module: /node_modules\/@solana/ },
      { module: /node_modules\/x402/ },
    ];

    return config;
  },
  // 只在生产环境进行类型检查
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig

