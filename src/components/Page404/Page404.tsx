import Button from 'src/components/Button/Button';
import s from './Page404.module.scss';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { scrollOnTop } from 'src/utils/scrollToSection';

const Page404 = () => {
	const navigate = useNavigate();

	useEffect(() => {
		scrollOnTop();
	}, []);

	const handleClick = () => {
		navigate('/');
	};

	return (
		<section className={s.page404}>
			<h2 className={s.title}>404</h2>
			<p className={s.text}>Сторінка, яку ви шукаєте, переміщена або видалена</p>
			<Button
				buttonClasses={'primaryBtn'}
				type={'button'}
				name={'На Головну'}
				onClick={handleClick}
			/>
		</section>
	);
};

export default Page404;
