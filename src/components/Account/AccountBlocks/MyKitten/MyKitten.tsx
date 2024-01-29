import React, { useState } from 'react';
import CatInfoItem from './CatInfoItem/CatInfoItem';
import s from './MyKitten.module.scss';
import { useCancelReservationCatMutation, useGetMyCatsQuery } from 'src/store/slice/catsSlice';
import ModalAccount from '../../Modal/ModalAccount';
import QuestionModalAccount from '../../Modal/QuestionModalAccount';

interface RTKQueryError {
	data: {
		detail: string;
	};
	status: number;
}

const MyKitten: React.FC = () => {
	const [cancelReservationID, setCancelReservationID] = useState<number>();
	const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
	const { data: myCats = [], error } = useGetMyCatsQuery('', {
		refetchOnMountOrArgChange: true,
	});
	const [cancelReservation] = useCancelReservationCatMutation();
	const handleCancelReservation = async (id: number) => {
		await cancelReservation(id).unwrap();
		setIsQuestionModalOpen(false);
	};

	const handleCancelReservID = (id: number) => {
		setCancelReservationID(id);
		setIsQuestionModalOpen(true);
	};

	const errorStatus = error as RTKQueryError;

	return (
		<div className={s.wrapper}>
			<div className={s.kittensList}>
				{errorStatus?.status !== 404 &&
					myCats.map((cat) => (
						<CatInfoItem key={cat.id} {...cat} handleCancelReservID={handleCancelReservID} />
					))}
			</div>
			{isQuestionModalOpen && (
				<ModalAccount onClose={() => setIsQuestionModalOpen(false)}>
					<QuestionModalAccount
						question={'Скасувати бронь'}
						text={'Ви впевнені що бажаєте скасувати бронь кошеняти?'}
						btnLeft={'Ні'}
						btnRight={'Так'}
						successFnc={() => handleCancelReservation(cancelReservationID!)}
						declineFnc={() => setIsQuestionModalOpen(false)}
					/>
				</ModalAccount>
			)}
		</div>
	);
};

export default MyKitten;
