import { z } from 'zod'

const EnvSchema = z.object({
	PUBLIC_BASE_URL: z.string().min(1, 'PUBLIC_BASE_URL is required'),
	PUBLIC_URL: z.url('PUBLIC_URL must be a valid URL'),
	NEXT_PUBLIC_BACKEND_URL: z.url('BACKEND_URL must be a valid URL'),
	GITHUB_ID: z.string().min(1, 'GITHUB_ID is required'),
	GOOGLE_ID: z.string().min(1, 'GOOGLE_ID is required'),
})

export type EnvironmentInterface = z.infer<typeof EnvSchema>

const Env: EnvironmentInterface = {
	PUBLIC_BASE_URL: process.env.PUBLIC_BASE_URL!,
	PUBLIC_URL: process.env.PUBLIC_URL!,
	NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL!,
	GITHUB_ID: process.env.GITHUB_ID!,
	GOOGLE_ID: process.env.GOOGLE_ID!,
}

EnvSchema.parse(Env)

export default Env
