import { ReactNode } from 'react';
import { X } from 'lucide-react';
import styles from './ModalAdmin.module.scss';

interface ModalAdminProps {
	children: ReactNode;
	onClose?: () => void;
	className?: string;
	withCLose?: boolean;
}

const ModalAdmin = ({ children, className, onClose, withCLose = true }: ModalAdminProps) => {
	return (
		<div className={`${styles.modal} `}>
			<div className={`${styles.modalContent} ${className ? className : null}`}>
				{withCLose && (
					<div onClick={onClose} className={styles.closeBtn}>
						<X />
					</div>
				)}
				{children}
			</div>
		</div>
	);
};

export default ModalAdmin;
