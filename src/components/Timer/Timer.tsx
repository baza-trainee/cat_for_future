import { FC } from 'react';
import { pluralize } from 'src/utils/pluralize';
import s from './Timer.module.scss';

interface TimerProps {
	arrCorrectDate: string[];
}

const Timer: FC<TimerProps> = ({ arrCorrectDate }) => {
	const [correctDays, correctHours, correctMinutes] = arrCorrectDate;

	return (
		<div className={s.timerBlock}>
			<h3 className={s.timerTitle}>Я поїду додому через</h3>
			<div className={s.timerWrapper}>
				<div className={s.timerUnit}>
					<div className={s.timerNum}>{correctDays[0]}</div>
					<div className={s.timerNum}>{correctDays[1]}</div>
					<div className={s.timerNoun}>{pluralize(Number(correctDays), 'дн')}</div>
				</div>

				<div className={s.timerUnit}>
					<div className={s.timerNum}>{correctHours[0]}</div>
					<div className={s.timerNum}>{correctHours[1]}</div>
					<div className={s.timerNoun}>годин</div>
				</div>

				<div className={s.timerUnit}>
					<div className={s.timerNum}>{correctMinutes[0]}</div>
					<div className={s.timerNum}>{correctMinutes[1]}</div>
					<div className={s.timerNoun}>хвилин</div>
				</div>
			</div>
		</div>
	);
};

export default Timer;
