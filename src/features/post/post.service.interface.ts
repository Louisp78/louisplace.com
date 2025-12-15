import { Metadata } from 'next'
import { PostData } from './post'

export default interface PostServiceInterface {
	posts: PostData[]
	getPostFromSlug(slug: string): PostData | undefined
	getMetadataFromSlug(slug: string): Metadata
}
