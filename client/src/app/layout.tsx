import Footer from '@/components/footer'
import TEXT from '@/constants/text'
import fontService from '@/font/font.service'
import type { Metadata } from 'next'
import './globals.css'

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
				<div className="min-h-screen">{children}</div>
				<Footer />
			</body>
		</html>
	)
}
