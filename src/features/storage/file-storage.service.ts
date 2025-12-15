import fs from 'fs'
import StorageServiceInterface from './storage.service.interface'
import path from 'path'

export default class FileStorageService implements StorageServiceInterface {
	get(key: string, id: string): string | null {
		return fs.readFileSync(path.join(key, id), 'utf8')
	}
	getAll(key: string): string[] {
		return fs.readdirSync(key).filter((file) => file.endsWith('.json'))
	}
}
