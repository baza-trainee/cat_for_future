export const formatPhoneNumber = (value: string) => {
	if (!value) return value;
	const digits = value.replace(/\D/g, '');

	if (digits.length === 12) {
		return `+${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5, 8)} ${digits.slice(
			8,
			10
		)} ${digits.slice(10, 12)}`;
	} else {
		return value;
	}
};
