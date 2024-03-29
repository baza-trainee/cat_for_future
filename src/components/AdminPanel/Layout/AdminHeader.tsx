import { useState } from 'react';
import styles from 'src/components/Layout/AdminLayout/AdminLayout.module.scss';
import { ChevronDown, ChevronUp, LogOut, UserRound } from 'lucide-react';
import ModalAdmin from 'src/components/AdminPanel/Modal/ModalAdmin.tsx';
import ChangePassForm from 'src/components/AdminPanel/ChangePassword/ChangePassForm.tsx';
import { useLogOutMutation } from 'src/store/slice/authApiSlice.ts';

const AdminHeader = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isModalOpen, setModalIsOpen] = useState(false);
	const [logOut] = useLogOutMutation();

	const dropDownHandler = () => {
		setIsOpen(!isOpen);
	};

	const openPassModalHandler = () => {
		setModalIsOpen(!isModalOpen);
	};

	const logOutHandler = () => {
		logOut(undefined);
		localStorage.removeItem('token');
		window.location.href = '/admin';
	};

	return (
		<>
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
						{isOpen && (
							<button onClick={openPassModalHandler} className={styles['dropdown-item']}>
								Зміна пароля
							</button>
						)}
					</div>
					<div className={styles.divider} />
					<LogOut cursor="pointer" onClick={logOutHandler} />
				</div>
			</div>
			{isModalOpen && (
				<ModalAdmin onClose={() => setModalIsOpen(false)}>
					<ChangePassForm />
				</ModalAdmin>
			)}
		</>
	);
};

export default AdminHeader;
