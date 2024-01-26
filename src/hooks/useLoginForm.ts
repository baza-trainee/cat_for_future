import { useLoginMutation } from 'src/store/slice/authApiSlice.ts';
import { useGetUserQuery } from 'src/store/slice/userApiSlice.ts';
import { useState } from 'react';
import { FormikHelpers } from 'formik';

export interface IFormValues {
	loginEmail: string;
	loginPassword: string;
}

export const useLoginForm = () => {
	const [login] = useLoginMutation();
	const { refetch } = useGetUserQuery(undefined);
	const [loginError, setLoginError] = useState<string | null>(null);

	const initialValues: IFormValues = {
		loginEmail: '',
		loginPassword: '',
	};

	const handleSubmit = async (values: IFormValues, actions: FormikHelpers<IFormValues>) => {
		const formData = new FormData();
		formData.append('username', values.loginEmail);
		formData.append('password', values.loginPassword);

		try {
			const userToken = await login(formData).unwrap();
			localStorage.setItem('token', userToken.access_token);
			const { data: refetchedData } = await refetch();
			if (refetchedData) {
				if (refetchedData.is_superuser === true) {
					window.location.href = '/admin';
				} else {
					window.location.href = '/account';
				}
			}
			actions.resetForm();
		} catch (e) {
			setLoginError('Ви вказали невірні данні');
		}
	};

	return { handleSubmit, loginError, initialValues, setLoginError };
};
