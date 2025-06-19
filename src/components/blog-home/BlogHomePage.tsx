import PostCard from '@/components/post-card/PostCard'

export default function BlogHomePage() {
	return (
		<div className="overflow-y-scroll p-5">
			<main>
				<h1 className="pb-5 font-[Syne] text-4xl font-bold">Louis&apos; Blog</h1>
				<ul className="flex flex-col gap-3 overflow-visible pt-5">
					<li>
						<PostCard new />
					</li>
					<li>
						<PostCard />
					</li>
					<li>
						<PostCard />
					</li>
					<li>
						<PostCard />
					</li>
					<li>
						<PostCard />
					</li>
				</ul>
			</main>
		</div>
	)
}
