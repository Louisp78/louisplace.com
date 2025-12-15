import { z } from 'zod'

const EnvSchema = z.object({
	PUBLIC_BASE_URL: z.string('PUBLIC_BASE_URL must be a valid URL'),
	PUBLIC_URL: z.url('PUBLIC_URL must be a valid URL'),
	GITHUB_ID: z.string().min(1, 'GITHUB_ID is required'),
	GOOGLE_ID: z.string().min(1, 'GOOGLE_ID is required'),
})

export type EnvironmentInterface = z.infer<typeof EnvSchema>

const Env: EnvironmentInterface = {
	PUBLIC_BASE_URL: process.env.PUBLIC_BASE_URL!,
	PUBLIC_URL: process.env.PUBLIC_URL!,
	GITHUB_ID: process.env.GITHUB_ID!,
	GOOGLE_ID: process.env.GOOGLE_ID!,
}

EnvSchema.parse(Env)

export default Env
