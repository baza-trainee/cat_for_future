import { ReactNode } from 'react';
import { X } from 'lucide-react';
import styles from './ModalAccount.module.scss';
import clsx from 'clsx';

interface ModalAccountProps {
	children: ReactNode;
	onClose: () => void;
	className?: string;
}

const ModalAccount = ({ children, className, onClose }: ModalAccountProps) => {
	return (
		<div className={clsx(styles.modal, className ? className : null)}>
			<div className={styles.modalContent}>
				<div onClick={onClose} className={styles.closeBtn}>
					<X />
				</div>
				{children}
			</div>
		</div>
	);
};

export default ModalAccount;
