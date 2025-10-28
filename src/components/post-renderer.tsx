import Image from 'next/image'

interface PostComponent {
	type: string
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	data: any
}

interface PostRendererProps {
	content: PostComponent[]
}

export default function PostRenderer({ content }: PostRendererProps) {
	return (
		<div className="mx-auto max-w-4xl px-6 py-8">
			{content.map((component, index) => (
				<ComponentRenderer key={index} component={component} />
			))}
		</div>
	)
}

function ComponentRenderer({ component }: { component: PostComponent }) {
	switch (component.type) {
		case 'hero':
			return (
				<div className="mb-12 text-center">
					<h1 className="mb-8 text-4xl font-bold">{component.data.title}</h1>
					{component.data.image && (
						<div className="mb-8 flex justify-center">
							<Image
								src={component.data.image.src}
								width={component.data.image.width}
								height={component.data.image.height}
								alt={component.data.image.alt}
								className="rounded-lg shadow-lg"
							/>
						</div>
					)}
				</div>
			)

		case 'paragraph':
			return (
				<div className="prose prose-lg mb-6">
					<p dangerouslySetInnerHTML={{ __html: parseMarkdown(component.data.text) }} />
				</div>
			)

		case 'callout':
			return (
				<div className={`mb-6 rounded-lg p-6 ${getCalloutStyle(component.data.style)}`}>
					<h3 className="mb-2 font-semibold">{component.data.title}</h3>
					<p dangerouslySetInnerHTML={{ __html: parseMarkdown(component.data.content) }} />
				</div>
			)

		case 'section':
			return (
				<div className="mb-8">
					<h2 className="mb-4 text-2xl font-semibold">{component.data.title}</h2>
					<ul className="space-y-2">
						{component.data.items.map((item: string, index: number) => (
							<li key={index} className="flex items-start">
								<span className="mr-2">•</span>
								<span dangerouslySetInnerHTML={{ __html: parseMarkdown(item) }} />
							</li>
						))}
					</ul>
				</div>
			)

		case 'quote':
			return (
				<blockquote
					className={`mb-6 border-l-4 border-blue-500 py-4 pl-6 italic ${
						component.data.highlight ? 'rounded-r-lg bg-blue-50' : ''
					}`}
				>
					<p dangerouslySetInnerHTML={{ __html: parseMarkdown(component.data.text) }} />
				</blockquote>
			)

		case 'cta':
			return (
				<div className={`mb-6 rounded-lg p-6 ${getCTAStyle(component.data.style)}`}>
					<p
						className="text-center font-medium"
						dangerouslySetInnerHTML={{ __html: parseMarkdown(component.data.text) }}
					/>
				</div>
			)

		default:
			return <div>Unknown component type: {component.type}</div>
	}
}

function parseMarkdown(text: string): string {
	return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>')
}

function getCalloutStyle(style: string): string {
	switch (style) {
		case 'info':
			return 'bg-blue-50 border-l-4 border-blue-400'
		case 'warning':
			return 'bg-yellow-50 border-l-4 border-yellow-400'
		case 'success':
			return 'bg-green-50 border-l-4 border-green-400'
		default:
			return 'bg-gray-50 border-l-4 border-gray-400'
	}
}

function getCTAStyle(style: string): string {
	switch (style) {
		case 'question':
			return 'bg-purple-50 border border-purple-200'
		case 'action':
			return 'bg-green-50 border border-green-200'
		default:
			return 'bg-gray-50 border border-gray-200'
	}
}
