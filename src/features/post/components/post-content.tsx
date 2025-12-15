import { parseMarkdown } from '@/utils/markdown'
import Quote from '../../../components/quote'
import { PostDataContent } from '@/features/post/post'
import Callout from '../../../components/callout/callout'
import { generateHash } from '@/utils/string'

export default function PostContent({ component }: { component: PostDataContent }) {
	switch (component.type) {
		case 'paragraph':
			return (
				<div className="mb-6">
					<p dangerouslySetInnerHTML={{ __html: parseMarkdown(component.data.text) }} />
				</div>
			)
		case 'title':
			return (
				<h2
					className="mb-4 text-2xl font-semibold"
					dangerouslySetInnerHTML={{ __html: parseMarkdown(component.data.text) }}
				/>
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
					<h2
						className="mb-4 text-2xl font-semibold"
						dangerouslySetInnerHTML={{ __html: parseMarkdown(component.data.title) }}
					/>
					<ul className="space-y-2">
						{component.data.items.map((item: string) => (
							<li key={generateHash(item)} className="flex items-start">
								<span className="mr-2">•</span>
								<span dangerouslySetInnerHTML={{ __html: parseMarkdown(item) }} />
							</li>
						))}
					</ul>
				</div>
			)

		case 'quote':
			return <Quote highlight={component.data.highlight} text={component.data.text} />
	}
}
