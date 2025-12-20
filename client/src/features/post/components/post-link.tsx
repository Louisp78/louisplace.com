import React from 'react'

interface LinkProps {
	href: string
	children: React.ReactNode
}

export default function PostLink({ href, children }: LinkProps) {
	return (
		<a
			href={href}
			className="inline-flex items-center gap-1 text-blue-500 hover:underline"
			target="_blank"
			rel="noopener noreferrer"
		>
			{children}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				fill="currentColor"
				viewBox="0 0 16 16"
				className="ml-1"
			>
				<path d="M6.354 5.5H2.5a.5.5 0 0 0 0 1h3.293l-4.147 4.146a.5.5 0 0 0 .708.708L6.5 7.207V10.5a.5.5 0 0 0 1 0V6.5a.5.5 0 0 0-.5-.5z" />
				<path d="M10.5 2a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-1 0v-11a.5.5 0 0 1 .5-.5z" />
			</svg>
		</a>
	)
}
