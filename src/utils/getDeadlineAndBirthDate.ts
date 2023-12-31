export const getDeadlineAndBirthDate = (birthdayDate: string, currentDate: number) => {
	// currentDate it's a timestamp of current date, you can get it with Date.now() method

	const dateComponents = birthdayDate.split('.');

	// get date, month, year from arr dateComponents
	const birthdayDay = dateComponents[0];
	const birthdayMonth = dateComponents[1];
	const birthdayYear = dateComponents[2];

	// Make date in format "year-month-dayT00:00:00"
	const correctBirthdayDate = `${birthdayYear}-${birthdayMonth}-${birthdayDay}T00:00:00`;

	// get cat age timestamp
	const ageInTimestamp = currentDate - new Date(correctBirthdayDate).getTime();

	// get cat age in days
	const correctCatAgeInDay = Math.floor(ageInTimestamp / (1000 * 3600 * 24));

	const getCatAgeInMonth = (): number => {
		return Math.round(correctCatAgeInDay / 30);
	};

	// count of days for waiting
	if (correctCatAgeInDay < 120) {
		const differenceForWaiting = (120 - correctCatAgeInDay) * 24 * 60 * 60 * 1000;

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
