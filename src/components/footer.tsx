import Image from 'next/image'
import TEXT from '@/constants/text'
import SPACING from '@/constants/spacing'

export default function Footer() {
	return (
		<footer className="border-t-[0.5px] border-gray-300 p-5 text-center text-sm text-gray-500">
			<p>{TEXT.footer.copyright}</p>
			<p>{TEXT.footer.technologies}</p>
			<a
				className="inline-flex items-center gap-3 hover:underline"
				href={TEXT.github.url}
				target="_blank"
				rel="noopener noreferrer"
			>
				{TEXT.footer.visitGithub}
				<Image
					src="github.svg"
					alt={TEXT.github.iconAlt}
					width={SPACING.iconSize}
					height={SPACING.iconSize}
					className="inline"
				/>
			</a>
		</footer>
	)
}
