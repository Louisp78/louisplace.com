import { z } from 'zod'

const EnvSchema = z.object({
	PUBLIC_BASE_URL: z.string('PUBLIC_BASE_URL must be a valid URL'),
	PUBLIC_URL: z.url('PUBLIC_URL must be a valid URL'),
	GITHUB_ID: z.string().min(1, 'GITHUB_ID is required'),
	GITHUB_SECRET: z.string().min(1, 'GITHUB_SECRET is required'),
})

export type EnvironmentInterface = z.infer<typeof EnvSchema>

const Env: EnvironmentInterface = {
	PUBLIC_BASE_URL: process.env.PUBLIC_BASE_URL!,
	PUBLIC_URL: process.env.PUBLIC_URL!,
	GITHUB_ID: process.env.GITHUB_ID!,
	GITHUB_SECRET: process.env.GITHUB_SECRET!,
}

EnvSchema.parse(Env)

export default Env
