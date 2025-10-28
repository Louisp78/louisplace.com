import PostRenderer from '@/components/post-renderer'
import { PostData } from '@/types/post'
import fs from 'fs'
import path from 'path'

interface BlogPostProps {
	params: Promise<{ slug: string }>
}

export default async function BlogPost({ params }: BlogPostProps) {
	const { slug } = await params
	const postsDir = path.join(process.cwd(), 'src/posts')
	const filePath = path.join(postsDir, `${slug}.json`)

	const fileContent = fs.readFileSync(filePath, 'utf8')
	const postData: PostData = JSON.parse(fileContent)

	// TODO: add tag for SEO using metadata
	return (
		<article>
			{/* TODO : display an header with some of metadata in it */}
			<PostRenderer content={postData.content} />
		</article>
	)
}

export function generateStaticParams() {
	const postsDir = path.join(process.cwd(), 'src/posts')
	const files = fs.readdirSync(postsDir).filter((file) => file.endsWith('.json'))

	return files.map((file) => ({
		slug: file.replace(/\.json$/, ''),
	}))
}

export const dynamicParams = false
