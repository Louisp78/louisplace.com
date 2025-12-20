import Image from 'next/image'
import { PostData } from '../post'
import PostContent from './post-content'
import Quote from './quote'

const DEFAULT_IMAGE_ASPECT_RATIO = '16 / 9'

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
					{(() => {
						const img = post.metadata.image
						const aspect =
							img.width && img.height && img.height > 0
								? `${img.width} / ${img.height}`
								: DEFAULT_IMAGE_ASPECT_RATIO
						return (
							<div
								className="w-full max-w-[100%] overflow-hidden rounded-lg shadow-lg"
								style={{ position: 'relative', width: '100%', aspectRatio: aspect }}
							>
								<Image src={img.src} alt={img.alt} fill priority style={{ objectFit: 'cover' }} />
							</div>
						)
					})()}
				</div>
			)}
			<Quote content={post.metadata.summary} />
		</section>
	)
}
