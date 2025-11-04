import { parseMarkdown } from '@/utils/markdown'

type CalloutProps = {
	title: string
	content: string
	style: 'info' | 'warning' | 'error' | 'success'
}

export default function Callout(props: CalloutProps) {
	return (
		<div className={`mb-6 rounded-lg p-6 ${getCalloutStyle(props.style)}`}>
			<h3 className="mb-2 font-semibold">{props.title}</h3>
			<p dangerouslySetInnerHTML={{ __html: parseMarkdown(props.content) }} />
		</div>
	)
}
function getCalloutStyle(style: string): string {
	switch (style) {
		case 'info':
			return 'bg-blue-50 border-l-4 border-blue-400 text-black'
		case 'warning':
			return 'bg-yellow-50 border-l-4 border-yellow-400 text-black'
		case 'success':
			return 'bg-green-50 border-l-4 border-green-400 text-black'
		default:
			return 'bg-gray-50 border-l-4 border-gray-400 text-black'
	}
}
