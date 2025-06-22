import path from 'path'
import fs from 'fs'

interface BlogPostProps {
	params: Promise<{
		slug: string
	}>
}

export default async function BlogPost({ params }: BlogPostProps) {
	const { slug } = await params
	const { default: Post } = await import(`@/posts/${slug}.mdx`)

	return <Post />
}

// Making Next.js generate static paths for the dynamic route
export function generateStaticParams() {
	const postsDir = path.join(process.cwd(), 'src/posts')
	const files = fs.readdirSync(postsDir)
	return files
		.filter((file) => file.endsWith('.mdx'))
		.map((file) => ({
			slug: file.replace(/\.mdx$/, ''),
		}))
}

export const dynamicParams = false
