import { useState, useEffect } from 'react';
import s from './CookieConsentBanner.module.scss';
import close from 'src/assets/icons/close_black.svg';
import Button from '../Button/Button';
import { useGetDocumentQuery } from 'src/store/slice/documentsSlice.ts';
import { IDocuments } from 'src/types/IDocuments.ts';

const CookieConsentBanner: React.FC = () => {
	const [showBanner, setShowBanner] = useState<boolean>(false);
	const { data: policy } = useGetDocumentQuery('');
	const [link, setLink] = useState('');
	const hasAcceptedCookies = localStorage.getItem('acceptedCookies');

	useEffect(() => {
		if (policy) {
			const item = policy.find((item: IDocuments) => item.name === 'Політика конфіденційності');
			setLink(item.media_path);
		}
	}, [policy]);

	useEffect(() => {
		if (!hasAcceptedCookies) {
			setShowBanner(true);
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
					<a href={link} className={s.link}>
						Політика конфіденційності
					</a>
				</div>
				<Button
					buttonClasses={'primaryBtn'}
					type={'button'}
					name={'OK'}
					onClick={acceptCookies}
					styleBtn={{ width: '8.75rem' }}
				/>
			</div>
		)
	);
};

export default CookieConsentBanner;
