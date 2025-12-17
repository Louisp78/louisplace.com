import AuthService from '@/features/auth/auth.service'
import { AuthProvider } from '@/features/auth/auth.service.interface'
import { NextResponse } from 'next/server'

export async function GET(_: Request, { params }: { params: Promise<{ provider: string }> }) {
	const provider: AuthProvider = (await params).provider as AuthProvider
	const paramsString = await new AuthService().getParams(provider)
	return NextResponse.redirect(`${AuthService.getAuthUrl(provider)}?${paramsString}`)
}
