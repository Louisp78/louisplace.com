import { PostData } from '@/features/post/post'
import { parseMarkdown } from '@/utils/markdown'
import Image from 'next/image'
import Quote from '../../../components/quote'

export default function PostHeader({ post }: { post: PostData }) {
	return (
		<section className="mb-12 text-center">
			<header className="mb-2 block text-sm text-gray-500">
				By {post.metadata.author} • Published{' '}
				{new Date(post.metadata.publishedAt).toLocaleDateString()} •
				{post.metadata.estimatedReadingTimeMinutes} min read
			</header>
			<h1
				className="mb-8 text-4xl font-bold"
				dangerouslySetInnerHTML={{ __html: parseMarkdown(post.metadata.title) }}
			/>
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
			<Quote text={post.metadata.summary} />
		</section>
	)
}
