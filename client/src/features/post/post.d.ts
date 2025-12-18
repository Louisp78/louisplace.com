export type PostDataContent =
	| {
			type: 'title'
			data: {
				text: string
			}
	  }
	| {
			type: 'paragraph'
			data: {
				text: string
			}
	  }
	| {
			type: 'callout'
			data: {
				title: string
				content: string
				style: CalloutStyle
			}
	  }
	| {
			type: 'ul'
			data: {
				title: string
				items: string[]
			}
	  }
	| {
			type: 'quote'
			data: {
				text: string
				highlight: boolean
			}
	  }

export interface PostMetadata {
	title: string
	summary: string
	slug: string
	image: {
		src: string
		width: number
		height: number
		alt: string
	}
	author: string
	publishedAt: string
	estimatedReadingTimeMinutes: number
	tags?: string[]
	category?: string
}

export interface PostData {
	metadata: PostMetadata
	content: Array<PostDataContent>
}
