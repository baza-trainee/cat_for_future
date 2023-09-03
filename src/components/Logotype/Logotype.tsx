import logo from 'src/images/logo.svg';
import s from './Logotype.module.scss';
import { Link } from 'react-router-dom';

const Logotype: React.FC = () => {
	return (
		<div className={s.logo}>
			<Link to="/">
				<img src={logo} alt="Logotype" />
			</Link>
		</div>
	);
};

export default Logotype;
