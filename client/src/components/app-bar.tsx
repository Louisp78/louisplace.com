'use client'

import Link from 'next/link'
import GoogleLoginIcon from './google-login-icon'
import TEXT from '@/constants/text'
import { useAuth } from '@/features/auth/index.client'

export default function AppBar() {
	const { user } = useAuth()

	return (
		<header className="fixed top-0 z-50 max-h-16 w-full bg-black/70 backdrop-blur-md">
			<div className="flex w-full items-center justify-evenly px-0 py-3 md:justify-between md:px-12">
				<h1 className="font-[Syne] text-4xl font-bold">Louis&apos; Blog</h1>
				{!user && (
					<Link
						href={'/api/auth/google/login'}
						className="block rounded border-2 border-white p-2 transition hover:bg-white/10 hover:no-underline md:flex"
					>
						<GoogleLoginIcon className="h-5 w-5" />
						<span className="ml-2 hidden text-white md:block">{TEXT.login.googleButton}</span>
					</Link>
				)}
			</div>
		</header>
	)
}
