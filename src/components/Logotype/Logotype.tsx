import logo from 'src/images/logo.png';
import s from './Logotype.module.scss';

const Logotype: React.FC = () => {
	return (
		<div className={s.logo}>
			<img src={logo} alt="Logotype" />
		</div>
	);
};

export default Logotype;
