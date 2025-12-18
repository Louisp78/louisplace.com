import { Metadata } from 'next'
import { PostData } from './post'

export default interface IPostService {
	posts: PostData[]
	getPostFromSlug(slug: string): PostData | undefined
	getMetadataFromSlug(slug: string): Metadata
}
