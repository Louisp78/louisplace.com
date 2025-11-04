export function generateHash(text: string): number {
	let hash = 0
	for (const char of text) {
		hash = (hash << 5) - hash + char.charCodeAt(0)
		hash |= 0 // Constrain to 32bit integer
	}
	return hash
}
