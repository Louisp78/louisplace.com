import Image from 'next/image'

export default function PostCard(props: { new?: boolean }) {
	return (
		<div className="relative">
			{props.new && (
				<div className="absolute -top-4 -left-3 w-fit rounded-4xl border-2 border-amber-900 bg-amber-300 px-2 py-0.5 text-amber-900">
					New Post
				</div>
			)}
			<article className="rounded-xl border-2 border-gray-500 p-3">
				<Image
					src="/expo-and-native.png"
					width={500}
					height={500}
					alt="Coupling React Native Expo and native mobile development are the true way to unlock true power of mobile engineering."
					className="rounded-xl"
				/>
				<h2 className="font-[Syne] text-2xl font-semibold">
					Expo + Natif : Une bromance innatendue
				</h2>
				<p className="line-clamp-3 overflow-hidden pt-4 text-ellipsis">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis ullam est aperiam eius
					asperiores ipsam quam alias, quaerat pariatur consectetur nostrum, in error quidem, rerum
					placeat iusto perspiciatis maxime dolore.
				</p>
			</article>
		</div>
	)
}
