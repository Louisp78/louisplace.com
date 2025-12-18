import { AuthProvider } from './auth-provider.enum'

export default interface IOAuthService {
	getAuthCodeUrlWithParams(provider: AuthProvider): Promise<string>
	verifyState(paramState: string): Promise<boolean>
}
