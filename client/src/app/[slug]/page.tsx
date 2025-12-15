import Post from '@/features/post/components/post'
import { PostData } from '@/features/post/post'
import PostService from '@/features/post/post.service'
import type { Metadata } from 'next'

interface PostPage {
	params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PostPage): Promise<Metadata> {
	const { slug } = await params
	const metadata: Metadata = await PostService.getInstance().then(
		(service) => service.getMetadataFromSlug(slug)!
	)
	return metadata
}

export default async function BlogPost({ params }: PostPage) {
	const { slug } = await params
	const postData: PostData = await PostService.getInstance().then(
		(service) => service.getPostFromSlug(slug)!
	)

	return <Post post={postData} />
}
