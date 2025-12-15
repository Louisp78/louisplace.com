import { PostData } from '@/features/post/post'
import PostContent from './post-content'
import PostHeader from './post-header'

export default function Post({ post }: { post: PostData }) {
	return (
		<article className="mx-auto max-w-4xl px-6 pt-8 pb-28">
			<PostHeader post={post} />
			<section>
				{post.content.map((component, index) => (
					<PostContent key={index} component={component} />
				))}
			</section>
		</article>
	)
}
