import Menu from 'src/components/Menu/Menu';
import s from './BurgerMenu.module.scss';
import Button from 'src/components/Button/Button';
import Contacts from 'src/components/Contacts/Contacts';

interface BurgerMenuProps {
	onOpenModalDonate: () => void;
	handleOpenBurgerMenu: () => void;
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({ onOpenModalDonate, handleOpenBurgerMenu }) => {
	const handleOpenWindow = () => {
		handleOpenBurgerMenu();
		onOpenModalDonate();
	};

	const handleCloseBurgerMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (e.target === e.currentTarget) {
			handleOpenBurgerMenu();
		}
	};

	return (
		<div className={s.burgerMenu} onClick={handleCloseBurgerMenu}>
			<div className={s.container}>
				<Menu navClass="burgerMenu" onClick={handleOpenBurgerMenu} />
				<Button
					buttonClasses={'primaryBtn helpBtn'}
					type={'button'}
					name={'Допомогти'}
					onClick={handleOpenWindow}
					styleBtn={{ width: '9.8125rem', padding: '0rem' }}
				/>
				<Contacts type="contactsBurgerMenu" />
			</div>
		</div>
	);
};

export default BurgerMenu;
