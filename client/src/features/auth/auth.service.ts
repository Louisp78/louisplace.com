import { cookies } from 'next/headers'
import AuthServiceInterface, { AuthProvider } from './auth.service.interface'
import crypto from 'crypto'

const STATE_COOKIE_MAX_AGE = 10 * 60
const STATE_COOKIE_KEY = 'oauth_state'

export default class AuthService implements AuthServiceInterface {
	public async getParams(provider: AuthProvider): Promise<URLSearchParams> {
		const state = this.generateState()
		await this.storeState(state)

		switch (provider) {
			case AuthProvider.GOOGLE:
				return new URLSearchParams({
					client_id: process.env.GOOGLE_ID || '',
					redirect_uri: `${process.env.PUBLIC_URL}/api/auth/google/callback`,
					response_type: 'code',
					scope: 'openid email profile',
					// state,
				})
			case AuthProvider.GITHUB:
				return new URLSearchParams({
					client_id: process.env.GITHUB_ID || '',
					redirect_uri: `${process.env.PUBLIC_URL}/api/auth/github/callback`,
					response_type: 'code',
					scope: 'read:user user:email',
					// state,
				})
		}
	}

	public async verifyState(paramState: string): Promise<boolean> {
		const cookieStore = await cookies()
		const storedState = cookieStore.get(STATE_COOKIE_KEY)?.value

		const result = !!paramState && !!storedState && paramState === storedState
		if (result) {
			cookieStore.delete(STATE_COOKIE_KEY)
		}

		return result
	}

	private generateState(): string {
		return crypto.randomBytes(32).toString('hex')
	}

	private async storeState(state: string): Promise<void> {
		const cookieStore = await cookies()
		cookieStore.set(STATE_COOKIE_KEY, state, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			maxAge: STATE_COOKIE_MAX_AGE,
			path: '/',
		})
	}
}
