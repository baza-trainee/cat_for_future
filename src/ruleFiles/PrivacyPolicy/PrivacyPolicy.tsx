import s from './PrivacyPolicy.module.scss';

export const PrivacyPolicy = () => {
	return (
		<embed
			src={'/files/pol_conf.pdf' + '#toolbar=0'}
			type="application/pdf"
			className={s.privacy}
		/>
	);
};
