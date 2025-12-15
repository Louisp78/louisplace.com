import AuthService from '@/features/auth/auth.service'
import { AuthProvider } from '@/features/auth/auth.service.interface'
import { NextResponse } from 'next/server'

export async function GET() {
	const params = new AuthService().getParams(AuthProvider.GITHUB)
	return NextResponse.redirect(`https://github.com/login/oauth/authorize?${params}`)
}
