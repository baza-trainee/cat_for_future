import styles from './Instructions.module.scss';
import InstructionItem from 'src/components/AdminPanel/Instructions/InstructionItem.tsx';
import { useGetInstructionsQuery } from 'src/store/slice/instructionsApiSlice.ts';
import { Fragment } from 'react';
import '../../Loader/loader.css';

interface Instruction {
	id: number;
	title: string;
	description: string;
}

const InstructionsList = () => {
	const { data: instructions, isLoading, isError } = useGetInstructionsQuery(undefined);

	return (
		<div className={styles.container}>
			{isLoading ? (
				<div className="loader" />
			) : (
				<>
					{isError && <div className={styles.error}>Упс...Щось пішло не так</div>}
					{instructions?.map(({ id, title, description }: Instruction) => (
						<Fragment key={id}>
							<InstructionItem id={id} title={title} description={description} />
						</Fragment>
					))}
				</>
			)}
		</div>
	);
};

export default InstructionsList;
