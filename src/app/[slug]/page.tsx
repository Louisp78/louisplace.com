import PostRenderer from '@/components/post-renderer'
import { PostData } from '@/types/post'
import fs from 'fs'
import type { Metadata } from 'next'
import path from 'path'

interface BlogPostProps {
	params: Promise<{ slug: string }>
}

function getPostDataFromSlug(slug: string): PostData {
	const postsDir = path.join(process.cwd(), 'src/posts')
	const filePath = path.join(postsDir, `${slug}.json`)

	const fileContent = fs.readFileSync(filePath, 'utf8')
	return JSON.parse(fileContent)
}

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
	const { slug } = await params
	const postData: PostData = getPostDataFromSlug(slug)

	return {
		title: postData.metadata.title,
		description: postData.metadata.summary,
		authors: postData.metadata.author ? [{ name: postData.metadata.author }] : undefined,
		keywords: postData.metadata.tags,
		openGraph: {
			title: postData.metadata.title,
			description: postData.metadata.summary,
			images: postData.metadata.image.src,
		},
	}
}

export default async function BlogPost({ params }: BlogPostProps) {
	const { slug } = await params
	const postData: PostData = getPostDataFromSlug(slug)

	return (
		<article className="mx-auto max-w-4xl px-6 pt-8 pb-28">
			<PostRenderer post={postData} />
		</article>
	)
}
