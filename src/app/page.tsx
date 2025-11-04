import PostCard from '@/components/post-card'
import { PostData, PostMetadata } from '@/types/post'
import { addDays } from '@/utils/date'
import fs from 'fs'
import path from 'path'

const POSTS_PATH = path.join(process.cwd(), 'src/posts')

export default async function PostsPage() {
	async function getPostsMetadata(): Promise<PostMetadata[]> {
		const postFileList = fs.readdirSync(POSTS_PATH).filter((file) => file.endsWith('.json'))
		const metadataList = await Promise.all(
			postFileList.map(async (filePath) => {
				const fileContent = fs.readFileSync(path.join(POSTS_PATH, filePath), 'utf8')
				const postData: PostData = JSON.parse(fileContent)
				return postData.metadata
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
			<main className="h-screen">
				<div className="flex justify-between">
					<h1 className="pb-5 font-[Syne] text-4xl font-bold">Louis&apos; Blog</h1>
				</div>
				<ul className="grid grid-cols-1 gap-3 overflow-visible pt-5 sm:grid-cols-2 lg:grid-cols-3">
					{postMetadaList.map((metadata: PostMetadata) => (
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
		</div>
	)
}
