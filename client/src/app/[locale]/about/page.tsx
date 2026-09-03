import { isLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface AboutPageProps {
	params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata | undefined> {
	const { locale } = await params

	if (!isLocale(locale)) {
		return undefined
	}

	const dict = getDictionary(locale)

	return {
		title: dict.about.metadata.title,
		description: dict.about.metadata.description,
	}
}

export default async function AboutPage({ params }: AboutPageProps) {
	const { locale } = await params

	if (!isLocale(locale)) {
		notFound()
	}

	const dict = getDictionary(locale)

	return (
		<main className="mx-auto flex max-w-2xl flex-col gap-8 p-4 pt-10 pb-12 md:p-5 md:pt-16">
			<header className="flex flex-col gap-4">
				<h1 className="font-[Syne] text-3xl font-bold md:text-5xl">{dict.about.title}</h1>
				<p className="text-gray-500 md:text-lg">{dict.about.intro}</p>
			</header>
			{dict.about.sections.map((section) => (
				<section key={section.heading} className="flex flex-col gap-3">
					<h2>{section.heading}</h2>
					{section.paragraphs.map((paragraph) => (
						<p key={paragraph} className="text-gray-500">
							{paragraph}
						</p>
					))}
				</section>
			))}
		</main>
	)
}
