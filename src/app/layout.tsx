import type { Metadata } from 'next'
import Image from 'next/image'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'Louis Place - Software Engineer Blog',
	description:
		'Learnings software engineering, with basics and advanced topics. Like architecture, clean code, history of software engineering, and more.',
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
					<p>© {new Date().getFullYear()} Louis Place. All rights reserved.</p>
					<p>Made with ❤️ using Next.js, TypeScript, and Tailwind CSS. Hosted using my VPS 🫶</p>
					<a
						className="inline-flex items-center gap-3 hover:underline"
						href="https://github.com/Louisp78/louisplace.com"
						target="_blank"
						rel="noopener noreferrer"
					>
						Visit the source on GitHub
						<Image src="github.svg" alt="GitHub" width={16} height={16} className="inline" />
					</a>
				</footer>
			</body>
		</html>
	)
}
