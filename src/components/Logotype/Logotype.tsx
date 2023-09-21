import logo from 'src/assets/icons/logo.svg';
import s from './Logotype.module.scss';
import { Link } from 'react-router-dom';

interface LogotypeProps {
	onClick?: () => void;
}

const Logotype: React.FC<LogotypeProps> = ({ onClick }) => {
	return (
		<div className={s.logo} onClick={onClick}>
			<Link to="/">
				<img src={logo} alt="Logotype" />
			</Link>
		</div>
	);
};

export default Logotype;
