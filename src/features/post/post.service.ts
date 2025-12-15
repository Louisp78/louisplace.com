import { PostData } from '@/features/post/post'
import fs from 'fs'
import path from 'path'
import PostServiceInterface from './post.interface'
import { Metadata } from 'next'

const POSTS_PATH = path.join(process.cwd(), 'src/features/post/data')

export default class PostService implements PostServiceInterface {
	public posts: PostData[] = []

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
		const postFileList = fs.readdirSync(POSTS_PATH).filter((file) => file.endsWith('.json'))
		const posts = await Promise.all(
			postFileList.map(async (filePath) => {
				const fileContent = fs.readFileSync(path.join(POSTS_PATH, filePath), 'utf8')
				const postData: PostData = JSON.parse(fileContent)
				return postData
			})
		)
		posts.sort((a, b) => {
			return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime()
		})
		return posts
	}
}
