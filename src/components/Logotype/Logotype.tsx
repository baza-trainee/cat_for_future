import logo from 'src/assets/icons/logo.svg';
import s from './Logotype.module.scss';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface LogotypeProps {
	onClick?: () => void;
}

const Logotype: React.FC<LogotypeProps> = ({ onClick }) => {
	const [scroll, setScroll] = useState<boolean>(false);

	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
		return () => {
			setScroll(false);
		};
	}, [scroll]);

	const onClickLogo = () => {
		setScroll(true);
		onClick ? onClick() : null;
	};

	return (
		<div className={s.logo} onClick={onClickLogo}>
			<Link to="/">
				<img src={logo} alt="Logotype" />
			</Link>
		</div>
	);
};

export default Logotype;
