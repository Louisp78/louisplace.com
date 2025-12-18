import { authContainer, AuthProvider } from '@/features/auth'
import { NextResponse } from 'next/server'

export async function GET(_: Request, { params }: { params: Promise<{ provider: string }> }) {
	const provider: AuthProvider = (await params).provider as AuthProvider
	return NextResponse.redirect(await authContainer.service().getAuthCodeUrlWithParams(provider))
}
