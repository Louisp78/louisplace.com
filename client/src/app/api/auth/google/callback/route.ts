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

	const queryParams = new URLSearchParams({ code })
	const requestUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google?${queryParams.toString()}`
	console.log('Request URL:', requestUrl)
	const response = await fetch(requestUrl, {
		method: 'POST',
	})

	console.log('Backend response status:', response.status)

	console.log('Google OAuth code:', code)

	return NextResponse.redirect(new URL('/', request.url))
}
