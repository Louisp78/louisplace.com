import StorageServiceInterface from '@/features/storage/storage.service.interface'
import path from 'path'
import { PostData } from '../post'
import IPostRepository from './post.repository.interface'

const POSTS_PATH = path.join(process.cwd(), 'src/features/post/data')

export default class PostRepository implements IPostRepository {
	public constructor(private storage: StorageServiceInterface) {}

	async getPosts(): Promise<PostData[]> {
		const postFileList = this.storage.getAll(POSTS_PATH)
		return await Promise.all(
			postFileList.map(async (filePath) => {
				const fileContent = this.storage.get(POSTS_PATH, filePath)!
				const postData: PostData = JSON.parse(fileContent)
				return postData
			})
		)
	}
	async getPost(slug: string): Promise<PostData | null> {
		const posts = await this.getPosts()
		const post = posts.find((post) => post.metadata.slug === slug)
		return post || null
	}
}
