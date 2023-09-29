import { useState, useEffect } from 'react';
import { SECOND, MINUTE, HOUR, DAY } from 'src/constants';

export default function useCountdownTimer(deadline: string, interval = SECOND) {
	const [timestamp, setTimestamp] = useState(new Date(deadline).getTime() - Date.now());

	useEffect(() => {
		const intervalId = setInterval(() => {
			setTimestamp((_timestamp) => _timestamp - interval);
		}, interval);

		return () => {
			clearInterval(intervalId);
		};
	}, [interval]);

	/* If the initial deadline value changes */
	useEffect(() => {
		setTimestamp(new Date(deadline).getTime() - Date.now());
	}, [deadline]);

	return {
		days: Math.floor(timestamp / DAY),
		hours: Math.floor((timestamp / HOUR) % 24),
		minutes: Math.floor((timestamp / MINUTE) % 60),
		seconds: Math.floor((timestamp / SECOND) % 60),
	};
}
