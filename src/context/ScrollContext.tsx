import { createContext, FC, PropsWithChildren, RefObject, useCallback, useRef } from 'react';

interface ScrollContextType {
	registerRef: (id: string, ref: RefObject<HTMLElement>) => void;
	executeScroll: (id: string) => void;
}

export const ScrollContext = createContext<ScrollContextType | null>(null);

export const ScrollProvider: FC<PropsWithChildren<object>> = ({ children }) => {
	const refs = useRef<{ [key: string]: RefObject<HTMLElement> }>({});

	const registerRef = useCallback((id: string, ref: RefObject<HTMLElement>) => {
		refs.current[id] = ref;
	}, []);

	const executeScroll = useCallback((id: string) => {
		const ref = refs.current[id];
		if (ref?.current) {
			ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}, []);

	return (
		<ScrollContext.Provider value={{ registerRef, executeScroll }}>
			{children}
		</ScrollContext.Provider>
	);
};
