import { parseMarkdown } from '@/utils/markdown'

export type QuoteProps =
	| {
			highlight?: boolean
			text?: string
	  }
	| {
			highlight?: boolean
			children?: React.ReactNode
	  }

export default function Quote(props: QuoteProps) {
	return (
		<blockquote
			className={`mb-6 border-l-4 border-blue-500 py-4 pl-6 italic ${
				props.highlight ? 'rounded-r-lg bg-blue-50 text-black' : ''
			}`}
		>
			{'text' in props && props.text ? (
				<p dangerouslySetInnerHTML={{ __html: parseMarkdown(props.text) }} />
			) : null}
			{'children' in props && props.children}
		</blockquote>
	)
}
