import { Geist } from 'next/font/google'
import FontInterface from './font.interface'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

export default {
	fontSans: geistSans,
} as FontInterface
