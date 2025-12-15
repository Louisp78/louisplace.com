import Env from '@/features/environment/env'
import { NextResponse } from 'next/server'

export async function GET() {
	const params = new URLSearchParams({
		client_id: Env.GOOGLE_ID,
		redirect_uri: `${Env.PUBLIC_URL}/api/auth/google/callback`,
		response_type: 'code',
		scope: 'openid email profile',
	})
	return NextResponse.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params}`)
}
