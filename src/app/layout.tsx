import type { Metadata } from 'next'
import Image from 'next/image'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import TEXT from '@/constants/text'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

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
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} overflow-y-auto antialiased`}>
				<div className="min-h-screen">{children}</div>
				<footer className="border-t-[0.5px] border-gray-300 p-5 text-center text-sm text-gray-500">
					<p>{TEXT.footer.copyright}</p>
					<p>{TEXT.footer.technologies}</p>
					<a
						className="inline-flex items-center gap-3 hover:underline"
						href="https://github.com/Louisp78/louisplace.com"
						target="_blank"
						rel="noopener noreferrer"
					>
						{TEXT.footer.visitGithub}
						<Image src="github.svg" alt="GitHub" width={16} height={16} className="inline" />
					</a>
				</footer>
			</body>
		</html>
	)
}
