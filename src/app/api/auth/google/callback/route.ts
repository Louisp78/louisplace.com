export async function GET(req: Request) {
	const url = new URL(req.url)
	const code = url.searchParams.get('code')
	console.log('Google OAuth code:', code)
}
