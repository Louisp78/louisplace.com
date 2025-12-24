import PostsPage from '@/app/page'
import { render } from '@testing-library/react'

import '@testing-library/jest-dom'

describe('Auth of Posts Page', () => {
	test('should display user-info icon when user is logged in', () => {
		const screen = render(<PostsPage />)

		screen.getByTestId('user-info-icon')

		expect(screen).toBeInTheDocument()
	})
	test('should not display user-info icon when user is not logged in', () => {
		global.fetch = jest.fn(() =>
			Promise.resolve({
				status: 403,
			} as Response)
		) as jest.Mock

		const screen = render(<PostsPage />)

		expect(screen.queryByTestId('user-info-icon')).toBeNull()
	})
})
