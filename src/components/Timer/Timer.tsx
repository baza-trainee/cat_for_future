import { FC, useState, useEffect, Dispatch, SetStateAction } from 'react';
import { pluralize } from 'src/utils/pluralize';
import clsx from 'clsx';
import s from './Timer.module.scss';

interface TimerProps {
	arrCorrectDate: string[];
	className?: string;
}

interface TimeState {
	value: string;
	name: string;
}

const Timer: FC<TimerProps> = ({ arrCorrectDate, className }) => {
	const [days, hours, minutes] = arrCorrectDate;
	// console.log(seconds); - for watching seconds you need to take it from arrCorrectDate
	const [dayOne, setDayOne] = useState({ value: hours[0], name: 'dayOne' });
	const [dayTwo, setDayTwo] = useState({ value: hours[1], name: 'dayTwo' });
	const [hourOne, setHourOne] = useState({ value: hours[0], name: 'hourOne' });
	const [hourTwo, setHourTwo] = useState({ value: hours[1], name: 'hourTwo' });
	const [minuteOne, setMinuteOne] = useState({ value: minutes[0], name: 'minuteOne' });
	const [minuteTwo, setMinuteTwo] = useState({ value: minutes[1], name: 'minuteTwo' });
	// const [secondOne, setSecondOne] = useState({ value: seconds[0], name: 'secondOne' });
	// const [secondTwo, setSecondTwo] = useState({ value: seconds[1], name: 'secondTwo' });

	const checkChanges = (
		newValue: string,
		oldValue: TimeState,
		setter: Dispatch<SetStateAction<TimeState>>,
		elementList: NodeListOf<Element>
	) => {
		const newValueIndex = oldValue.name.endsWith('One') ? 0 : 1;
		if (oldValue.value !== newValue[newValueIndex]) {
			elementList.forEach((element, index) => {
				if (element instanceof HTMLSpanElement && element.dataset.time === `${oldValue.name}`) {
					elementList[index].classList.add(s.timerNumAnimating);
				}
			});
			setter((prevState) => ({ ...prevState, value: newValue[newValueIndex] }));
			setTimeout(() => {
				elementList.forEach((element) => element.classList.remove(s.timerNumAnimating));
			}, 300);
		}
	};

	useEffect(() => {
		const timerNumElements = document.querySelectorAll(`.${s.timerDigit}`);
		timerNumElements.forEach((element) => element.classList.remove(s.timerNumAnimating));
		checkChanges(days, dayOne, setDayOne, timerNumElements);
		checkChanges(days, dayTwo, setDayTwo, timerNumElements);
		checkChanges(hours, hourOne, setHourOne, timerNumElements);
		checkChanges(hours, hourTwo, setHourTwo, timerNumElements);
		checkChanges(minutes, minuteOne, setMinuteOne, timerNumElements);
		checkChanges(minutes, minuteTwo, setMinuteTwo, timerNumElements);
		// checkChanges(seconds, secondOne, setSecondOne, timerNumElements);
		// checkChanges(seconds, secondTwo, setSecondTwo, timerNumElements);
	}, [arrCorrectDate]);

	return (
		<div className={clsx(s.timerBlockForMyKitten, className && s[className])}>
			<h3 className={s.timerTitle}>Я поїду додому через</h3>
			<div className={s.timerWrapper}>
				<div className={s.timerUnit}>
					<div className={s.timerNum}>
						<span className={clsx(s.timerDigit, s.timerNumAnimating)} data-time={`${dayOne.name}`}>
							{dayOne.value}
						</span>
					</div>
					<div className={s.timerNum}>
						<span className={clsx(s.timerDigit, s.timerNumAnimating)} data-time={`${dayTwo.name}`}>
							{dayTwo.value}
						</span>
					</div>
					<div className={s.timerNoun}>{pluralize(Number(days), 'дн')}</div>
				</div>

				<div className={s.timerUnit}>
					<div className={s.timerNum}>
						<span className={clsx(s.timerDigit, s.timerNumAnimating)} data-time={`${hourOne.name}`}>
							{hourOne.value}
						</span>
					</div>
					<div className={s.timerNum}>
						<span className={clsx(s.timerDigit, s.timerNumAnimating)} data-time={`${hourTwo.name}`}>
							{hourTwo.value}
						</span>
					</div>
					<div className={s.timerNoun}>годин</div>
				</div>

				<div className={s.timerUnit}>
					<div className={s.timerNum}>
						<span
							className={clsx(s.timerDigit, s.timerNumAnimating)}
							data-time={`${minuteOne.name}`}
						>
							{minuteOne.value}
						</span>
					</div>
					<div className={s.timerNum}>
						<span
							className={clsx(s.timerDigit, s.timerNumAnimating)}
							data-time={`${minuteTwo.name}`}
						>
							{minuteTwo.value}
						</span>
					</div>
					<div className={s.timerNoun}>хвилин</div>
				</div>
			</div>
		</div>
	);
};

export default Timer;
