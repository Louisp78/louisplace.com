import { PostData } from '@/features/post/post'
import { Metadata } from 'next'
import PostServiceInterface from './post.service.interface'
import postRepositoryFactory from './repository/post.repository.factory'

export default class PostService implements PostServiceInterface {
	public posts: PostData[] = []

	private repository = postRepositoryFactory()

	private static instance: PostService

	private constructor() {}

	public static async getInstance(): Promise<PostService> {
		if (!PostService.instance) {
			PostService.instance = new PostService()
			PostService.instance.posts = await PostService.instance.getPosts()
		}
		return PostService.instance
	}

	public getPostFromSlug(slug: string): PostData | undefined {
		return this.posts.find((post) => post.metadata.slug === slug)
	}

	public getMetadataFromSlug(slug: string): Metadata {
		const postData = this.getPostFromSlug(slug)!
		return {
			title: postData.metadata.title,
			description: postData.metadata.summary,
			authors: postData.metadata.author ? [{ name: postData.metadata.author }] : undefined,
			keywords: postData.metadata.tags,
			metadataBase: new URL(process.env.PUBLIC_URL || 'http://localhost:3000'),
			openGraph: {
				title: postData.metadata.title,
				description: postData.metadata.summary,
				images: postData.metadata.image.src,
			},
		}
	}

	private async getPosts(): Promise<PostData[]> {
		const posts = await this.repository.getPosts()
		if (!posts) {
			return []
		}

		posts.sort((a, b) => {
			return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime()
		})
		return posts
	}
}
