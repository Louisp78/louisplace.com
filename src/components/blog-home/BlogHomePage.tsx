import PostCard from '@/components/post-card/PostCard'
import { Metadata } from '@/types/metadata'
import { globby } from 'globby'
import fs from 'fs'
import { addDays } from '@/utils/date'
import { compileMDX } from 'next-mdx-remote/rsc'

export default async function BlogHomePage() {
	async function getPostsMetadata(): Promise<Metadata[]> {
		const postList = await globby('src/posts/**/*.mdx', {
			absolute: true,
			onlyFiles: true,
		})
		const metadataList = await Promise.all(
			postList.map(async (pathFile) => {
				const source = fs.readFileSync(pathFile)
				const { frontmatter } = await compileMDX<Metadata>({
					source,
					options: { parseFrontmatter: true },
					components: {
						PostCard,
					},
				})
				return frontmatter as Metadata
			})
		)
		metadataList.sort((a, b) => {
			return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
		})
		return metadataList
	}

	const postMetadaList = await getPostsMetadata()
	return (
		<div className="overflow-y-auto p-5">
			<main>
				<div className="flex justify-between">
					<h1 className="pb-5 font-[Syne] text-4xl font-bold">Louis&apos; Lab 🧪</h1>
				</div>
				<ul className="grid grid-cols-1 gap-3 overflow-visible pt-5 sm:grid-cols-2 lg:grid-cols-3">
					{postMetadaList.map((metadata: Metadata) => (
						<li key={metadata.slug}>
							<PostCard
								title={metadata.title}
								imageHref={metadata.image}
								description={metadata.summary}
								new={new Date(metadata.publishedAt) > addDays(new Date(), -7)}
								slug={metadata.slug}
							/>
						</li>
					))}
				</ul>
			</main>
		</div>
	)
}
