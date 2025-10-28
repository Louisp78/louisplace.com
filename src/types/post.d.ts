export interface PostData {
	metadata: {
		title: string
		summary: string
		image: string
		slug: string
		publishedAt: string
		author?: string
		tags?: string[]
		category?: string
	}
	content: Array<{
		type: string
		data: object
	}>
}
