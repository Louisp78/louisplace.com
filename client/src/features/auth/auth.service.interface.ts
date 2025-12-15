export enum AuthProvider {
	GOOGLE = 'google',
	GITHUB = 'github',
}
export default interface AuthServiceInterface {
	getParams(provider: AuthProvider): Promise<URLSearchParams>
	verifyState(paramState: string): Promise<boolean>
}
