import PostRepository from './repository/post.repository'
import IPostRepository from './repository/post.repository.interface'
import IPostService from './post.service.interface'
import PostService from './post.service'
import { storageContainer } from '../storage'

const postContainer = {
	repository: (): IPostRepository => {
		return new PostRepository(storageContainer.service())
	},
	service: (): IPostService => new PostService(),
}

export default postContainer
