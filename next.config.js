
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['tsx', 'ts'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    // Define process.env for client-side
    config.plugins.push(
      new config.webpack.DefinePlugin({
        'process.env': JSON.stringify(process.env),
      })
    );
    return config;
  }
};

module.exports = nextConfig;
