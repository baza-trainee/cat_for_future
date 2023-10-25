import { MouseEvent } from 'react';
export const onClickModalBack = (e: MouseEvent, handleCloseModal: () => void) => {
	if (e.target === e.currentTarget) {
		handleCloseModal();
	}
};
