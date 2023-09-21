import Button from 'src/components/Button/Button';
import s from './SpinnerLoader.module.scss';

const SpinnerLoader = () => {

	return (

		// <div className={s.modal}>
			<div className={s.loaderContainer}>
				<div className={s.customSpinner}></div>
				<p className={s.text}>Завантаження</p>
			</div>
		// </div>
	);
};

export default SpinnerLoader;
