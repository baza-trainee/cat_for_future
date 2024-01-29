import React from 'react';
import { ReactComponent as Phone } from 'src/assets/icons/phone-icon.svg';
import { ReactComponent as Email } from 'src/assets/icons/email-icon.svg';
import { ReactComponent as Facebook } from 'src/assets/icons/facebook-icon.svg';
import { ReactComponent as Instagram } from 'src/assets/icons/instagram-icon.svg';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import s from 'src/components/ContactsInfo/ContactsInfo.module.scss';
import { useGetContactsQuery } from 'src/store/slice/contactsApiSlice.ts';
import { formatPhoneNumber } from 'src/utils/formatPhoneNumber.ts';

interface ContactsInfoProps {
	type?: string;
	componentType?: string;
	styleContacts?: React.CSSProperties;
}

const ContactsInfo: React.FC<ContactsInfoProps> = ({ type, styleContacts, componentType }) => {
	const { data: contacts } = useGetContactsQuery(undefined);

	return (
		<div className={clsx(s.contacts, type && s[type])} style={styleContacts}>
			<div className={s.list}>
				<p className={clsx(type && s.hidden)}>Зв’язок з нами</p>

				<div className={clsx(s.contentContainer, type && s.burgerContacts)}>
					<p className={clsx(s.contactContainer, componentType === 'contactPage' && s.contactPage)}>
						<Phone
							className={clsx(s.contactIcn, componentType === 'contactPage' && s.contactPage)}
						/>
						{formatPhoneNumber(contacts?.phone_first)}
					</p>
					<p className={clsx(s.contactContainer, componentType === 'contactPage' && s.contactPage)}>
						<Phone
							className={clsx(s.contactIcn, componentType === 'contactPage' && s.contactPage)}
						/>
						{formatPhoneNumber(contacts?.phone_second)}
					</p>

					<p className={clsx(s.contactContainer, componentType === 'contactPage' && s.contactPage)}>
						<Email
							className={clsx(s.contactIcn, componentType === 'contactPage' && s.contactPage)}
						/>
						{contacts?.email}
					</p>
				</div>
			</div>

			<div className={clsx(s.socmediaContainer, type && s.burgerSocials)}>
				<div className={s.socmediaIcn}>
					<Link to={contacts?.facebook}>
						<Facebook className={clsx(componentType === 'contactPage' && s.contactPage)} />
					</Link>
				</div>

				<div className={s.socmediaIcn}>
					<Link to={contacts?.instagram}>
						<Instagram className={clsx(componentType === 'contactPage' && s.contactPage)} />
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ContactsInfo;
