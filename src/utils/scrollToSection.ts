export const scrollToSection = (id: string) => {
	const section = document.querySelector(`#${id}`);
	const headerElement = document.getElementById('header');
	const headerHeight = headerElement?.offsetHeight;

	if (section && headerHeight) {
		const scrollPosition = section.getBoundingClientRect().top + window.scrollY - headerHeight;
		window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
	}
};

export const scrollOnTop = () => {
	window.scrollTo({
		top: 0,
		behavior: 'smooth',
	});
};
