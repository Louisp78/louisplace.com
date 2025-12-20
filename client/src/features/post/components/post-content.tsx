import { generateHash } from '@/utils/string'
import { PostDataContent } from '../post'
import { parseInlineMarkdown } from '../utils/markdown'
import Callout from './callout'
import Quote from './quote'
import PostLink from './post-link'

export default function PostContent({ component }: { component: PostDataContent }) {
	if (typeof component === 'string') {
		return <p dangerouslySetInnerHTML={{ __html: parseInlineMarkdown(component) }}></p>
	}

	switch (component.type) {
		case 'paragraph':
			return (
				<div className="mb-6">
					<PostContent component={component.data.content} />
				</div>
			)
		case 'title':
			return (
				<h2 className="mb-4 text-2xl font-semibold">
					<PostContent component={component.data.content} />
				</h2>
			)

		case 'subtitle':
			return (
				<h3 className="mb-3 text-xl font-semibold">
					<PostContent component={component.data.content} />
				</h3>
			)

		case 'callout':
			return (
				<Callout
					title={component.data.title}
					content={component.data.content}
					style={component.data.style}
				/>
			)

		case 'ul':
			return (
				<div className="mb-8">
					{component.data.title && (
						<div className="mb-2">
							<PostContent component={component.data.title} />
						</div>
					)}
					<ul className="space-y-2">
						{component.data.items.map((item: PostDataContent) => (
							<li key={generateHash(item.toString())} className="flex items-start">
								<span className="mr-2">•</span>
								<PostContent component={item} />
							</li>
						))}
					</ul>
				</div>
			)

		case 'quote':
			return <Quote highlight={component.data.highlight} content={component.data.content} />
		case 'link':
			return (
				<PostLink href={component.data.href}>
					<PostContent component={component.data.content} />
				</PostLink>
			)
	}
}
