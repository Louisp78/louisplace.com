export default interface StorageServiceInterface {
	getAll(key: string): string[]
	get(key: string, id: string): string | null
}
