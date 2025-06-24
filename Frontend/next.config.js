const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: ['./styles'],
  },
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
  },
  async rewrites() {
    return [
      {
        source: '/api/signup',
        destination: '/api/register',
      },
    ];
  },
};

module.exports = nextConfig;