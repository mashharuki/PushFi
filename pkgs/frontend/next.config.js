/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        "fs": false,
        "net": false,
        "tls": false
      }
    }
    return config
  },
  images: {
    domains: [
      'bafybeigmzj3hktgmjpbsl6akvlmucgrwedvajhp4ehjhtvuwdoexjy2hci.ipfs.dweb.link',
      'bafkreihnwh275aqcc6sjo2f37yaphhh2rp44tsmdrsv25k72iiozybzluy.ipfs.w3s.link'
    ],
  },
}

module.exports = nextConfig