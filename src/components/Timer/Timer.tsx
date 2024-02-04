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
	const [days] = arrCorrectDate;

	const [dayOne, setDayOne] = useState({ value: days[0], name: 'dayOne' });
	const [dayTwo, setDayTwo] = useState({ value: days[1], name: 'dayTwo' });
	const [dayThree, setDayThree] = useState({ value: days[2], name: 'dayThree' });

	const checkChanges = (
		newValue: string,
		oldValue: TimeState,
		setter: Dispatch<SetStateAction<TimeState>>,
		elementList: NodeListOf<Element>
	) => {
		const newValueIndex = oldValue.name.endsWith('One') ? 0 : oldValue.name.endsWith('Two') ? 1 : 2;
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
		checkChanges(days, dayThree, setDayThree, timerNumElements);
	}, [arrCorrectDate]);

	return (
		<div className={clsx(s.timerBlockForMyKitten, className && s[className])}>
			<h3 className={s.timerTitle}>Я поїду додому через</h3>
			<div className={s.timerWrapper}>
				<div className={s.timerUnit}>
					<div className={s.timerNums}>
						<div className={s.timerNum}>
							<span
								className={clsx(s.timerDigit, s.timerNumAnimating)}
								data-time={`${dayOne.name}`}
							>
								{dayOne.value}
							</span>
						</div>
						<div className={s.timerNum}>
							<span
								className={clsx(s.timerDigit, s.timerNumAnimating)}
								data-time={`${dayTwo.name}`}
							>
								{dayTwo.value}
							</span>
						</div>
						<div className={s.timerNum}>
							<span
								className={clsx(s.timerDigit, s.timerNumAnimating)}
								data-time={`${dayThree.name}`}
							>
								{dayThree.value}
							</span>
						</div>
					</div>
					<div className={s.timerNoun}>{pluralize(Number(days), 'д', 'нів', 'ень', 'ні')}</div>
				</div>
			</div>
		</div>
	);
};

export default Timer;
