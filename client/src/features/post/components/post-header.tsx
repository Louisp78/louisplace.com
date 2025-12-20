import Image from 'next/image'
import { PostData } from '../post'
import Quote from './quote'
import PostContent from './post-content'

export default function PostHeader({ post }: { post: PostData }) {
	return (
		<section className="mb-12 text-center">
			<header className="mb-2 block text-sm text-gray-500">
				By {post.metadata.author} • Published{' '}
				{new Date(post.metadata.publishedAt).toLocaleDateString()} •
				{post.metadata.estimatedReadingTimeMinutes} min read
			</header>
			<h1 className="mb-8 text-4xl font-bold">
				<PostContent component={post.metadata.title} />
			</h1>
			{post.metadata.image && (
				<div className="mb-8 flex justify-center">
					<Image
						src={post.metadata.image.src}
						width={post.metadata.image.width}
						height={post.metadata.image.height}
						alt={post.metadata.image.alt}
						className="rounded-lg shadow-lg"
					/>
				</div>
			)}
			<Quote content={post.metadata.summary} />
		</section>
	)
}
