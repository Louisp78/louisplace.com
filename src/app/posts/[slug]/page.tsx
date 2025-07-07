import { mdxComponents } from '@/components/mdx-components'
import { Metadata } from '@/types/metadata'
import fs from 'fs'
import { compileMDX } from 'next-mdx-remote/rsc'
import path from 'path'

interface BlogPostProps {
	params: Promise<{
		slug: string
	}>
}

export default async function BlogPost({ params }: BlogPostProps) {
	const { slug } = await params
	const postsDir = path.join(process.cwd(), 'src/posts')
	const filePath = path.join(postsDir, `${slug}.mdx`)
	const source = fs.readFileSync(filePath, 'utf8')
	const { content } = await compileMDX<Metadata>({
		source,
		options: { parseFrontmatter: true },
		components: mdxComponents,
	})

	return <div className="m-6">{content}</div>
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
