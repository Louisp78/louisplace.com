import TEXT from '@/constants/text'
import font from '@/features/font/font.service'
import type { Metadata } from 'next'
import './globals.css'
import Footer from '@/components/footer'

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
		<html lang="en" className={font.fontSans.className}>
			<body className={`overflow-y-auto antialiased`}>
				<div className="min-h-screen">{children}</div>
				<Footer />
			</body>
		</html>
	)
}
