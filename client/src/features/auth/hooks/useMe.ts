import { UserControllerApi } from '@/features/api-repository-generated'
import { useMutation } from '@tanstack/react-query'

export default function useMe() {
	return useMutation({
		mutationKey: ['me'],
		mutationFn: async () => new UserControllerApi().getUserInfos(),
	})
}
