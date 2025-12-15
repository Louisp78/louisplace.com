import { PostData } from '../post'

export default interface PostRepositoryInterface {
	getPost: (slug: string) => Promise<PostData | null>
	getPosts: () => Promise<PostData[] | null>
}
