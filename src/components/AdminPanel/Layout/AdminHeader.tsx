import { useState } from 'react';
import styles from 'src/components/Layout/AdminLayout/AdminLayout.module.scss';
import { ChevronDown, ChevronUp, LogOut, UserRound } from 'lucide-react';

const AdminHeader = () => {
	const [isOpen, setIsOpen] = useState(false);

	const dropDownHandler = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className={styles.header}>
			<h1>Кіт на виріст</h1>
			<div className={styles['account-info']}>
				<div
					className={`${styles['account-admin']} ${isOpen ? styles.active : ''}`}
					onClick={dropDownHandler}
				>
					<div className={styles['admin-logo']}>
						<UserRound size={36} />
					</div>
					<div className={styles['admin-dropdown']}>
						Admin {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
					</div>
					{isOpen && <button className={styles['dropdown-item']}>Зміна пароля</button>}
				</div>
				<div className={styles.divider} />
				<LogOut cursor="pointer" />
			</div>
		</div>
	);
};

export default AdminHeader;
