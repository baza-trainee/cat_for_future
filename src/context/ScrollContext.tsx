import { createContext, FC, PropsWithChildren, useCallback, useRef } from 'react';

interface ScrollContextType {
	registerRef: (id: string, ref: React.RefObject<HTMLElement>) => void;
	executeScroll: (id: string, offset?: number) => void; // Оновлення типів для підтримки зсуву
}

export const ScrollContext = createContext<ScrollContextType | null>(null);

export const ScrollProvider: FC<PropsWithChildren<object>> = ({ children }) => {
	const refs = useRef<{ [key: string]: React.RefObject<HTMLElement> }>({});

	const registerRef = useCallback((id: string, ref: React.RefObject<HTMLElement>) => {
		refs.current[id] = ref;
	}, []);

	// Оновлення executeScroll для прийняття другого параметру (offset)
	const executeScroll = useCallback((id: string, offset: number = 0) => {
		const ref = refs.current[id];
		if (ref?.current) {
			const elementTop = ref.current.getBoundingClientRect().top + window.scrollY + offset; // Врахування зсуву
			window.scrollTo({
				top: elementTop,
				behavior: 'smooth',
			});
		}
	}, []);

	return (
		<ScrollContext.Provider value={{ registerRef, executeScroll }}>
			{children}
		</ScrollContext.Provider>
	);
};
