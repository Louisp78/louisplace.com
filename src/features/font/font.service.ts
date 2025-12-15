import { Geist_Mono, Syne } from 'next/font/google'
import FontInterface from './font.interface'

const geistMono = Geist_Mono({
	subsets: ['latin'],
})
const syne = Syne({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700', '800'],
	variable: '--font-syne',
})

export default {
	fontBase: geistMono,
	fontTitle: syne,
} as FontInterface
