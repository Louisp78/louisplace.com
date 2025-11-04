import Image from 'next/image'
import { TransitionLink } from '@/components/transition-link/TransitionLink'

export interface PostCardProps {
	isNew?: boolean
	imageHref: string
	description: string
	title: string
	slug: string
}

export default function PostCard(props: PostCardProps) {
	return (
		<TransitionLink href={'/' + props.slug}>
			<div className="relative transition-transform duration-200 ease-in-out hover:scale-[1.01]">
				{props.isNew && (
					<div className="absolute -top-4 -right-3 w-fit rounded-4xl border-2 border-amber-900 bg-amber-300 px-2 py-0.5 text-amber-900">
						New Post
					</div>
				)}
				<article className="h-[500px] rounded-xl border-2 border-gray-500 p-3">
					<div className="h-[300px] max-h-[300px] pb-4">
						<Image
							src={props.imageHref}
							width={500}
							height={300}
							alt="Coupling React Native Expo and native mobile development are the true way to unlock true power of mobile engineering."
							className="h-full w-full rounded-xl object-cover"
						/>
					</div>
					<h2 className="pb-2 font-[Syne] text-2xl font-semibold">{props.title}</h2>
					<p className="line-clamp-3 overflow-hidden text-ellipsis">{props.description}</p>
				</article>
			</div>
		</TransitionLink>
	)
}
