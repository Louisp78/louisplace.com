import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
}

export default nextConfig
