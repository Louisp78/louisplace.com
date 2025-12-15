import PostCard from '@/features/post/components/post-card'
import { PostData, PostMetadata } from '@/features/post/post'
import PostService from '@/features/post/post.service'
import { addDays } from '@/utils/date'

export default async function PostsPage() {
	const postMetadata = (await PostService.getInstance()).posts.map(
		(post: PostData) => post.metadata
	)

	return (
		<main className="flex-1 p-5">
			<div className="flex justify-between">
				<h1 className="pb-5 font-[Syne] text-4xl font-bold">Louis&apos; Blog</h1>
			</div>
			<ul className="grid grid-cols-1 gap-3 overflow-visible pt-5 sm:grid-cols-2 lg:grid-cols-3">
				{postMetadata.map((metadata: PostMetadata) => (
					<li key={metadata.slug}>
						<PostCard
							title={metadata.title}
							image={metadata.image}
							description={metadata.summary}
							isNew={new Date(metadata.publishedAt) > addDays(new Date(), -7)}
							slug={metadata.slug}
						/>
					</li>
				))}
			</ul>
		</main>
	)
}
