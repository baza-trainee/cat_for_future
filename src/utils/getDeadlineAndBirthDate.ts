export const getDeadlineAndBirthDate = (birthdayDate: string, currentDate: number) => {
	// currentDate it's a timestamp of current date, you can get it with Date.now() method

	const [year, month, day] = birthdayDate.split('-');

	// Make date in format "year-month-dayT00:00:00"
	const correctBirthdayDate = `${year}-${month}-${day}T00:00:00`;

	// get cat age timestamp
	const ageInTimestamp = currentDate - new Date(correctBirthdayDate).getTime();

	// get cat age in days
	const correctCatAgeInDay = Math.floor(ageInTimestamp / (1000 * 3600 * 24));

	const getCatAgeInMonth = (): number => {
		return Math.round(correctCatAgeInDay / 30);
	};

	// count of days for waiting
	if (correctCatAgeInDay < 150) {
		const differenceForWaiting = (150 - correctCatAgeInDay) * 24 * 60 * 60 * 1000;

		const deadline = differenceForWaiting + currentDate;

		// make date in format "year-month-dayT00:00:00"
		const date = new Date(new Date(deadline).setHours(0, 0, 0, 0)).toISOString().slice(0, 19);

		return {
			date,
			lessFourMonths: true,
			getCatAge: getCatAgeInMonth,
		};
	} else {
		return {
			date: new Date(currentDate).toISOString().slice(0, 19),
			lessFourMonths: false,
			getCatAge: getCatAgeInMonth,
		};
	}
};
