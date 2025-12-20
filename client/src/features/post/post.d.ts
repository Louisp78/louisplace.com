export type PostDataContent =
	| {
			type: 'title'
			data: {
				content: PostDataContent
			}
	  }
	| {
			type: 'paragraph'
			data: {
				content: PostDataContent
			}
	  }
	| {
			type: 'subtitle'
			data: {
				content: PostDataContent
			}
	  }
	| {
			type: 'callout'
			data: {
				title: string
				content: PostDataContent
				style: CalloutStyle
			}
	  }
	| {
			type: 'ul'
			data: {
				title: PostDataContent | null
				items: PostDataContent[]
			}
	  }
	| {
			type: 'quote'
			data: {
				content: PostDataContent
				highlight: boolean
			}
	  }
	| {
			type: 'link'
			data: {
				href: string
				content: string
			}
	  }
	| string

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
