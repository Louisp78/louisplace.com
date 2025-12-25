import Footer from '@/components/footer'
import TEXT from '@/constants/text'
import fontService from '@/font/font.service'
import type { Metadata } from 'next'
import './globals.css'
import GoogleLoginIcon from '@/components/google-login-icon'
import Link from 'next/link'

export const metadata: Metadata = {
	title: TEXT.metadata.title,
	description: TEXT.metadata.description,
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html
			lang="en"
			className={`${fontService.fontBase.className} ${fontService.fontTitle.variable}`}
		>
			<body className={`overflow-y-auto antialiased`}>
				<header className="fixed top-0 z-50 max-h-16 w-full bg-black/70 backdrop-blur-md">
					<div className="flex w-full items-center justify-evenly px-0 py-3 md:justify-between md:px-12">
						<h1 className="font-[Syne] text-4xl font-bold">Louis&apos; Blog</h1>
						<Link
							href={'/api/auth/google/login'}
							className="block rounded border-2 border-white p-2 transition hover:bg-white/10 hover:no-underline md:flex"
						>
							<GoogleLoginIcon className="h-5 w-5" />
							<span className="ml-2 hidden text-white md:block">{TEXT.login.googleButton}</span>
						</Link>
					</div>
				</header>
				<div className="min-h-screen pt-16">{children}</div>
				<Footer />
			</body>
		</html>
	)
}
