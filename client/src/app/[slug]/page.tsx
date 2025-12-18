import { Post, postContainer, PostData } from '@/features/post'
import type { Metadata } from 'next'

interface PostPage {
	params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PostPage): Promise<Metadata> {
	const { slug } = await params
	const metadata: Metadata = postContainer.service().getMetadataFromSlug(slug)!

	return metadata
}

export default async function BlogPost({ params }: PostPage) {
	const { slug } = await params
	const postData: PostData = postContainer.service().getPostFromSlug(slug)!

	return <Post post={postData} />
}
