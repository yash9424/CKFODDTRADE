/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Drop real photography into /public/images and reference it locally.
    // Remote patterns are here so stock/CDN photography can be swapped in
    // without touching component code.
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
    ],
  },
}

export default nextConfig
