import Env from '@/features/environment/env'
import { NextResponse } from 'next/server'

export async function GET() {
	const params = new URLSearchParams({
		client_id: Env.GITHUB_ID,
		redirect_uri: `${Env.PUBLIC_URL}/api/auth/github/callback`,
		scope: 'read:user user:email',
	})
	return NextResponse.redirect(`https://github.com/login/oauth/authorize?${params}`)
}
