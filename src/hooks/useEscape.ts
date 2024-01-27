import { useEffect } from 'react';

type onEscapeFnType = () => void;

export const useEscape = (onEscapeFn: onEscapeFnType) => {
	useEffect(() => {
		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onEscapeFn();
			}
		};
		document.addEventListener('keyup', handleEsc);

		return () => {
			document.removeEventListener('keyup', handleEsc);
		};
	}, []);
};
