import AuthService from '@/features/auth/auth.service'
import { AuthProvider } from '@/features/auth/auth.service.interface'
import { NextResponse } from 'next/server'

export async function GET(request: Request, { params }: { params: Promise<{ provider: string }> }) {
	const provider: AuthProvider = (await params).provider as AuthProvider

	const url = new URL(request.url)
	const code = url.searchParams.get('code')
	const state = url.searchParams.get('state')

	const stateCheck = await new AuthService().verifyState(state || '')
	if (!stateCheck || !code) {
		return NextResponse.redirect(new URL('/?error=no_code', request.url))
	}

	const queryParams = new URLSearchParams({ code })
	const requestUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/oauth/${provider}?${queryParams.toString()}`
	console.log('Request URL:', requestUrl)
	const response = await fetch(requestUrl, {
		method: 'POST',
	})

	if (!response.ok) {
		console.error('Backend auth failed:', response.status)
		return NextResponse.redirect(new URL('/?error=auth_failed', request.url))
	}

	const redirectResponse = NextResponse.redirect(new URL('/', request.url))

	const setCookieHeaders = response.headers.getSetCookie()
	setCookieHeaders.forEach((cookie) => {
		redirectResponse.headers.append('Set-Cookie', cookie)
	})

	return redirectResponse
}
