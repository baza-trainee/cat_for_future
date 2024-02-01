import styles from './CatsList.module.scss';
import { ICat } from 'src/types/ICat.ts';
import { Fragment, useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useRemoveCatMutation } from 'src/store/slice/catsApiSlice.ts';
import ModalAdmin from 'src/components/AdminPanel/Modal/ModalAdmin.tsx';
import QuestionModal from 'src/components/AdminPanel/Modal/QuestionModal.tsx';
import SuccessModal from 'src/components/AdminPanel/Modal/SuccessModal.tsx';

const CatItem = ({ cat }: { cat: ICat }) => {
	const [removeCat, { isSuccess }] = useRemoveCatMutation();
	const [isQuestion, setIsQuestion] = useState(false);

	const removeCatHandler = (id: number) => {
		removeCat(id);
	};

	const parts = cat.date_of_birth.split('-');
	const formattedDate = `${parts[2]}.${parts[1]}.${parts[0]}`;

	return (
		<div className={styles.item}>
			<div className={styles.images}>
				{cat.photos.map((photo) => (
					<Fragment key={photo.id}>
						<img src={photo.media_path} alt={cat.name} />
					</Fragment>
				))}
			</div>
			<div className={styles.name}> {cat.name} </div>
			<div className={styles.sex}> {cat.is_male ? 'Кіт' : 'Кішка'} </div>
			<div className={styles.birth}> {formattedDate} </div>
			<div className={styles.description}>{cat.description} </div>
			<div className={styles.icons}>
				<NavLink to={`edit/${cat.id}`}>
					<Pencil />
				</NavLink>
				<div onClick={() => setIsQuestion(true)}>
					<Trash2 />
				</div>
			</div>

			{isQuestion && (
				<ModalAdmin className={styles.modal} withCLose={false}>
					<QuestionModal
						className={styles.question}
						question="Ви впевнені, що хочете видалити карту кота?"
						btnLeft={'НІ'}
						btnRight={'ТАК'}
						successFnc={() => {
							removeCatHandler(cat.id);
						}}
						declineFnc={() => setIsQuestion(false)}
					/>
				</ModalAdmin>
			)}

			{isSuccess && (
				<ModalAdmin>
					<SuccessModal text={`Кота ${cat.name} видалено `} />
				</ModalAdmin>
			)}
		</div>
	);
};

export default CatItem;
