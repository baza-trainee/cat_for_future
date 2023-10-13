export const pluralize = (
	count: number,
	noun: string,
	suffix = 'ів',
	suffix2 = 'ь',
	suffix3 = 'і'
) => {
	if (count >= 10 && count <= 20) return `${noun}${suffix}`;
	const n = count.toString().slice(-1);
	return `${noun}${
		['0', '5', '6', '7', '8', '9'].includes(n)
			? suffix
			: n === '1'
			? suffix2
			: ['2', '3', '4'].includes(n)
			? suffix3
			: ''
	}`;
};

export const pluralizeForTimer = (
	count: number,
	noun: string,
	suffix = 'ин',
	suffix2 = 'ина',
	suffix3 = 'ини'
) => {
	if (count >= 10 && count <= 20) return `${noun}${suffix}`;
	const n = count.toString().slice(-1);
	return `${noun}${
		['0', '5', '6', '7', '8', '9'].includes(n)
			? suffix
			: n === '1'
			? suffix2
			: ['2', '3', '4'].includes(n)
			? suffix3
			: ''
	}`;
};
