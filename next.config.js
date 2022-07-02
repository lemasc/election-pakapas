/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["election-pakapas-survey.vercel.app"],
  },
  async rewrites() {
    return [
      {
        source: "/api/survey/story",
        destination: "https://election-pakapas-survey.vercel.app/api/story",
      },
      {
        source: "/api/survey/og",
        destination: "https://election-pakapas-survey.vercel.app/api/og",
      },
    ];
  },
};

module.exports = nextConfig;
