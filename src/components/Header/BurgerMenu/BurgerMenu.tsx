import Menu from 'src/components/Menu/Menu';
import s from './BurgerMenu.module.scss';
import Button from 'src/components/Button/Button';
import ContactsInfo from 'src/components/ContactsInfo/ContactsInfo';

interface BurgerMenuProps {
	onOpenModalDonate: () => void;
	closeBurgerMenu: () => void;
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({ onOpenModalDonate, closeBurgerMenu }) => {
	const handleOpenWindow = () => {
		closeBurgerMenu();
		onOpenModalDonate();
	};

	const handleCloseBurgerMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (e.target === e.currentTarget) {
			closeBurgerMenu();
		}
	};

	return (
		<div className={s.burgerMenu} onClick={handleCloseBurgerMenu}>
			<div className={s.container}>
				<Menu navClass="burgerMenu" onClick={closeBurgerMenu} />
				<Button
					buttonClasses={'primaryBtn helpBtn'}
					type={'button'}
					name={'Допомогти'}
					onClick={handleOpenWindow}
					styleBtn={{ width: '9.8125rem', padding: '0rem' }}
				/>
				<ContactsInfo type="contactsBurgerMenu" />
			</div>
		</div>
	);
};

export default BurgerMenu;
