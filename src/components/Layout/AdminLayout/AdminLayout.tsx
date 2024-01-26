import { Outlet } from 'react-router-dom';
import SideBar from 'src/components/AdminPanel/Layout/SideBar.tsx';
import AdminHeader from 'src/components/AdminPanel/Layout/AdminHeader.tsx';
import styles from './AdminLayout.module.scss';
import LoginAdmin from 'src/pages/AdminPanel/LoginAdmin/LoginAdmin.tsx';

const AdminLayout = () => {
	return (
		<section className={styles.container}>
			<LoginAdmin />
			<SideBar />
			<div className={styles.main}>
				<AdminHeader />
				<main>
					<Outlet />
				</main>
			</div>
		</section>
	);
};

export default AdminLayout;
