import { ReactNode } from 'react';
import { X } from 'lucide-react';
import styles from './ModalAdmin.module.scss';

interface ModalAdminProps {
	children: ReactNode;
	onClose: () => void;
	className?: string;
}

const ModalAdmin = ({ children, className, onClose }: ModalAdminProps) => {
	return (
		<div className={`${styles.modal} ${className ? className : null}`}>
			<div className={styles.modalContent}>
				<div onClick={onClose} className={styles.closeBtn}>
					<X />
				</div>
				{children}
			</div>
		</div>
	);
};

export default ModalAdmin;
