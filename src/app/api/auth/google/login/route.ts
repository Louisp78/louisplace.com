import AuthService from '@/features/auth/auth.service'
import { AuthProvider } from '@/features/auth/auth.service.interface'
import { NextResponse } from 'next/server'

export async function GET() {
	const params = new AuthService().getParams(AuthProvider.GOOGLE)
	return NextResponse.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params}`)
}
