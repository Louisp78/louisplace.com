import { fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom'

import UserInfoPage from './user-info-page'
import { UserDTO } from '../api-repository-generated'
import TEXT from '@/constants/text'
describe('User Info Page', () => {
	beforeEach(() => {
		global.fetch = jest.fn(() =>
			Promise.resolve({
				json: () =>
					Promise.resolve({
						id: 1,
						firstname: 'Louis Place',
						lastname: 'llouisp',
						email: 'example@example.com',
						username: 'llouisp',
					} as UserDTO),
			} as Response)
		) as jest.Mock
	})

	test('should display user information correctly', () => {
		const { queryByText } = render(<UserInfoPage />)

		expect(queryByText('Louis Place')).toBeDefined()
		expect(queryByText('@llouisp')).toBeDefined()
	})
	test('should render a form', () => {
		const screen = render(<UserInfoPage />)
		const firstNameInput = screen.getByLabelText('First Name')
		const lastNameInput = screen.getByLabelText('Last Name')
		const usernameInput = screen.getByLabelText('Username')
		const emailInput = screen.getByLabelText('Email')
		const submitButton = screen.getByRole('button', { name: /submit/i })

		expect(firstNameInput).toBeInTheDocument()
		expect(lastNameInput).toBeInTheDocument()
		expect(usernameInput).toBeInTheDocument()
		expect(emailInput).toBeInTheDocument()
		expect(submitButton).toBeInTheDocument()
	})
	test('should update user information on form submission', () => {
		const screen = render(<UserInfoPage />)
		const firstNameInput = screen.getByLabelText('First Name')
		const lastNameInput = screen.getByLabelText('Last Name')
		const usernameInput = screen.getByLabelText('Username')
		const emailInput = screen.getByLabelText('Email')
		const submitButton = screen.getByRole('button', { name: /submit/i })

		fireEvent.change(firstNameInput, { target: { value: 'NewFirstName' } })
		fireEvent.change(lastNameInput, { target: { value: 'NewLastName' } })
		fireEvent.change(usernameInput, { target: { value: 'NewUsername' } })
		fireEvent.change(emailInput, { target: { value: 'example@example.com' } })
		fireEvent.click(submitButton)

		expect(global.fetch).toHaveBeenCalledWith(
			expect.any(String),
			expect.objectContaining({
				method: 'PUT',
				body: JSON.stringify({
					firstName: 'NewFirstName',
					lastName: 'NewLastName',
					username: 'NewUsername',
					email: 'example@example.com',
				}),
			})
		)
	})

	test('should disconnect user when clicking logout button', () => {
		const screen = render(<UserInfoPage />)
		const logoutButton = screen.getByRole('button', { name: /logout/i })

		fireEvent.click(logoutButton)

		expect(global.fetch).toHaveBeenCalledWith(
			expect.any(String),
			expect.objectContaining({
				method: 'POST',
			})
		)
	})
	test('should disable form submission while updating', () => {
		const screen = render(<UserInfoPage />)
		const submitButton = screen.getByRole('button', { name: /submit/i })

		fireEvent.click(submitButton)

		expect(submitButton).toBeDisabled()
	})
	test('should show success message on successful update', () => {
		const screen = render(<UserInfoPage />)
		const submitButton = screen.getByRole('button', { name: /submit/i })

		fireEvent.click(submitButton)

		expect(screen.getByText(TEXT.userInfoPage.successUpdate)).toBeInTheDocument()
	})
	test('should show error message on failed update', () => {
		global.fetch = jest.fn(() =>
			Promise.resolve({
				ok: false,
			} as Response)
		) as jest.Mock

		const screen = render(<UserInfoPage />)
		const submitButton = screen.getByRole('button', { name: /submit/i })

		fireEvent.click(submitButton)

		expect(screen.getByText(TEXT.userInfoPage.errorUpdate)).toBeInTheDocument()
	})
	test('should enable submit button when form is filled with different data from original', () => {
		const screen = render(<UserInfoPage />)
		const firstNameInput = screen.getByLabelText('First Name')
		const submitButton = screen.getByRole('button', { name: /submit/i })

		fireEvent.change(firstNameInput, { target: { value: 'DifferentName' } })

		expect(submitButton).toBeEnabled()
	})

	test('should disable submit button when form is filled with the same data as original', () => {
		const screen = render(<UserInfoPage />)
		const submitButton = screen.getByRole('button', { name: /submit/i })

		expect(submitButton).toBeDisabled()
	})
})
