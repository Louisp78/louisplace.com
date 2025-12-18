import FileStorageService from '@/features/storage/file-storage.service'
import PostRepository from './post.repository'
import IPostRepository from './post.repository.interface'

const postRepositoryFactory = (): IPostRepository => {
	const storageService = new FileStorageService()
	return new PostRepository(storageService)
}

export default postRepositoryFactory
