import path from 'path'
import fs from 'fs'
import { compileMDX } from 'next-mdx-remote/rsc' // or your MDX renderer
import PostCard from '@/components/post-card/PostCard'
import { Metadata } from '@/types/metadata'

interface BlogPostProps {
	params: Promise<{
		slug: string
	}>
}

// TODO: create a set of custom components for MDX rendering
function CustomH1({ children }: { children: React.ReactNode }) {
	return <h1 style={{ color: 'blue', fontSize: '100px' }}>{children}</h1>
}

const overrideComponents = {
	h1: CustomH1,
}

export default async function BlogPost({ params }: BlogPostProps) {
	const { slug } = await params
	const postsDir = path.join(process.cwd(), 'src/posts')
	const filePath = path.join(postsDir, `${slug}.mdx`)
	const source = fs.readFileSync(filePath, 'utf8')
	const { content } = await compileMDX<Metadata>({
		source,
		options: { parseFrontmatter: true },
		components: {
			PostCard,
			...overrideComponents,
		},
	})

	return <div>{content}</div>
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
