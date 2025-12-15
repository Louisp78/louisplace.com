import AuthService from '@/features/auth/auth.service'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
	const url = new URL(request.url)
	const code = url.searchParams.get('code')
	const state = url.searchParams.get('state')

	const stateCheck = await new AuthService().verifyState(state || '')
	if (!stateCheck || !code) {
		return NextResponse.redirect(new URL('/?error=no_code', request.url))
	}

	// TODO: Send code to your backend
	console.log('Google OAuth code:', code)
	return NextResponse.redirect(new URL('/', request.url))
}
