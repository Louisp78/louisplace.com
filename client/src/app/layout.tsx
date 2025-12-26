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
						<AppBar />
				<div className="min-h-screen pt-16">{children}</div>
				<Footer />
			</body>
		</html>
	)
}
