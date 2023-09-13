import { useState } from 'react';
import s from './CookieConsentBanner.module.scss';
import Button from '../Button/Button';
import close from 'src/assets/icons/close.svg';

const CookieConsentBanner: React.FC = () => {
	const [showBanner, setShowBanner] = useState<boolean>(true);

	const handleAccept = () => {
		setShowBanner(false);
	};

	if (!showBanner) {
		return null;
	}
	return (
		<div className={s.cookie}>
			<div className={s.close}>
				<img onClick={handleAccept} src={close} alt="Close" />
			</div>
			<p>
				Цей сайт використовує файли cookies для правильної роботи та покращення сервісу. Якщо ви
				погоджуєтесь з їх використанням, натисніть OK. Більше інформації в Політика конфіденційності
			</p>
			<a className={s.link}>Політика конфіденційності</a>
			<Button
				buttonClasses={'primaryBtn helpBtn'}
				type={'button'}
				name={'OK'}
				onClick={handleAccept}
			/>
		</div>
	);
};

export default CookieConsentBanner;
