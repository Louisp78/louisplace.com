import FileStorageService from '@/features/storage/file-storage.service'
import PostRepository from './post.repository'
import PostRepositoryInterface from './post.repository.interface'

export default class PostRepositoryFactory {
	static create(): PostRepositoryInterface {
		return new PostRepository(new FileStorageService())
	}
}
