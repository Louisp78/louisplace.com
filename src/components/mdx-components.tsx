import PostCard from '@/components/post-card/PostCard'
import { ChevronLeft } from 'lucide-react'
import Image, { ImageProps } from 'next/image'
import Link from 'next/link'

function CustomH1({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Link href="/posts" className="absolute top-12 left-10">
				<ChevronLeft />
			</Link>
			<div className="mt-10 mb-6 flex w-full flex-col items-center gap-3 pr-6 pl-6">
				<h1 className="text-center text-4xl font-bold text-gray-900 md:text-left dark:text-white">
					{children}
				</h1>
				<hr className="mt-0 h-0.5 w-full rounded border-0 bg-gray-700 opacity-60" />
			</div>
		</>
	)
}

function CustomH2({ children }: { children: React.ReactNode }) {
	return (
		<h2 className="mt-8 mb-4 text-3xl font-semibold text-gray-800 dark:text-gray-200">
			{children}
		</h2>
	)
}

function CustomH3({ children }: { children: React.ReactNode }) {
	return (
		<h3 className="mt-6 mb-3 text-2xl font-semibold text-gray-700 dark:text-gray-300">
			{children}
		</h3>
	)
}
function CustomP({ children }: { children: React.ReactNode }) {
	return <p className="mb-4 text-lg leading-7 text-gray-800 dark:text-gray-200">{children}</p>
}

function CustomBlockquote({ children }: { children: React.ReactNode }) {
	return (
		<blockquote className="my-6 border-l-4 border-blue-400 pl-4 text-gray-600 italic dark:text-gray-400">
			{children}
		</blockquote>
	)
}

function CustomUl({ children }: { children: React.ReactNode }) {
	return <ul className="mb-4 list-disc pl-6">{children}</ul>
}

function CustomOl({ children }: { children: React.ReactNode }) {
	return <ol className="mb-4 list-decimal pl-6">{children}</ol>
}

function CustomLi({ children }: { children: React.ReactNode }) {
	return <li className="mb-2">{children}</li>
}

function CustomCode({ children }: { children: React.ReactNode }) {
	return (
		<code className="rounded bg-gray-100 px-1 py-0.5 font-mono text-sm text-pink-600 dark:bg-gray-800 dark:text-pink-400">
			{children}
		</code>
	)
}

function CustomPre({ children }: { children: React.ReactNode }) {
	return (
		<pre className="my-6 overflow-x-auto rounded bg-gray-900 p-4 text-gray-100">{children}</pre>
	)
}

function CustomImg(props: ImageProps) {
	return (
		<div className="flex w-full justify-center">
			<Image
				{...props}
				className="mx-auto my-6 h-auto max-w-full rounded-lg shadow-md"
				alt={props.alt}
			/>
		</div>
	)
}

export const mdxComponents = {
	h1: CustomH1,
	h2: CustomH2,
	h3: CustomH3,
	p: CustomP,
	blockquote: CustomBlockquote,
	ul: CustomUl,
	ol: CustomOl,
	li: CustomLi,
	code: CustomCode,
	pre: CustomPre,
	img: CustomImg,
	Image,
	PostCard,
}
