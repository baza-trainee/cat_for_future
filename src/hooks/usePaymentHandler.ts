import { useState } from 'react';
import axios from 'axios';

const usePaymentHandler = () => {
	const [errorMessage, setErrorMessage] = useState('');

	const handlePayment = async ({ paymentData }: { paymentData: { amount: number } }) => {
		const baseUrl = 'https://cat-for-future.crabdance.com/api/v1' || '';

		try {
			const { data } = await axios.post(`${baseUrl}/donate`, paymentData);
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
