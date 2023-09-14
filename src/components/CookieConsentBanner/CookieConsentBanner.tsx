import { useState, useEffect } from 'react';
import s from './CookieConsentBanner.module.scss';
import close from 'src/assets/icons/close.svg';
import Button from '../Button/Button';

const CookieConsentBanner: React.FC = () => {
	const [showBanner, setShowBanner] = useState<boolean>(true);

	const hasAcceptedCookies = localStorage.getItem('acceptedCookies');

	useEffect(() => {
		if (hasAcceptedCookies) {
			setShowBanner(false);
		}
	}, [hasAcceptedCookies]);

	const acceptCookies = () => {
		localStorage.setItem('acceptedCookies', 'true');

		setShowBanner(false);
	};

	const closeBanner = () => {
		setShowBanner(false);
	};

	return (
		showBanner && (
			<div className={s.cookie}>
				<div className={s.closeWrapper}>
					<img className={s.close} onClick={closeBanner} src={close} alt="Close" />
				</div>
				<div className={s.text}>
					<p>
						Цей сайт використовує файли cookies для правильної роботи та покращення сервісу. Якщо ви
						погоджуєтесь з їх використанням, натисніть OK. Більше інформації в
					</p>
					<a href="src/assets/documents/privacy-policy.pdf" className={s.link}>
						Політика конфіденційності
					</a>
				</div>
				<div className={s.btnWrapper}>
					<Button
						buttonClasses={'primaryBtn'}
						type={'button'}
						name={'OK'}
						onClick={acceptCookies}
					/>
				</div>
			</div>
		)
	);
};

export default CookieConsentBanner;
