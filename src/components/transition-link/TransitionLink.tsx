'use client'

import { useRouter } from 'next/navigation'
import './TransitionLink.css'
import Link, { LinkProps } from 'next/link'

export interface TransitionLinkProps extends LinkProps {
	children: React.ReactNode
	href: string
}

export function TransitionLink({ children, href, ...props }: TransitionLinkProps) {
	const router = useRouter()

	async function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
		event.preventDefault()
		const body = document.querySelector('body')
		body?.classList.add('page-transition')
		await new Promise((resolve) => setTimeout(resolve, 500))
		router.push(href)
		await new Promise((resolve) => setTimeout(resolve, 500))
		body?.classList.remove('page-transition')
	}

	return (
		<Link href={href} {...props} onClick={handleClick}>
			{children}
		</Link>
	)
}
