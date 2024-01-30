import { useState } from 'react';
import axios from 'axios';

const usePaymentHandler = () => {
	const [errorMessage, setErrorMessage] = useState('');

	const handlePayment = async ({ paymentData }: { paymentData: { amount: number } }) => {
		const baseUrl = import.meta.env.VITE_API_BASE_URL || '';

		try {
			const { data } = await axios.post(`${baseUrl}/api/v1/donate`, paymentData);
			const checkoutUrl = data.payment_url;
			return checkoutUrl;
		} catch (error) {
			setErrorMessage('Error occurred while processing payment');
			console.error(error);
			return null;
		}
	};

	return {
		errorMessage,
		handlePayment,
	};
};

export default usePaymentHandler;
