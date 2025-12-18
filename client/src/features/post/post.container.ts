import FileStorageService from '@/features/storage/file-storage.service'
import PostRepository from './repository/post.repository'
import IPostRepository from './repository/post.repository.interface'
import IPostService from './post.service.interface'
import PostService from './post.service'

const postContainer = {
	repository: (): IPostRepository => {
		const storageService = new FileStorageService()
		return new PostRepository(storageService)
	},
	service: (): IPostService => new PostService(),
}

export default postContainer
