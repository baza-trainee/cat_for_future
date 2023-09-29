export const getDeadlineDate = (birthdayDate: string, currentDate: number) => {
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
	const correctAgeInDay = Math.floor(ageInTimestamp / (1000 * 3600 * 24));

	// count of days for waiting
	if (correctAgeInDay < 120) {
		const differenceForWaiting = (120 - correctAgeInDay) * 24 * 60 * 60 * 1000;

		const deadline = differenceForWaiting + currentDate;

		// make date in format "year-month-dayT00:00:00"
		const date = new Date(deadline).toISOString().slice(0, 19);

		return { date, lessFourMonths: true };
	} else {
		return { date: new Date(currentDate).toISOString().slice(0, 19), lessFourMonths: false };
	}
};
