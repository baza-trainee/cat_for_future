import Menu from 'src/components/Menu/Menu';
import s from './BurgerMenu.module.scss';
import Button from 'src/components/Button/Button';
import Contacts from 'src/components/Contacts/Contacts';

interface BurgerMenuProps {
	onOpenModalDonate: () => void;
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({ onOpenModalDonate }) => {
	return (
		<div className={s.burgerMenu}>
			<div className={s.container}>
				<Menu navClass="burgerMenu" />
				<Button
					buttonClasses={'primaryBtn helpBtn'}
					type={'button'}
					name={'Допомогти'}
					onClick={onOpenModalDonate}
					styleBtn={{ width: '9.8125rem', padding: '0rem' }}
				/>
				<Contacts />
			</div>
		</div>
	);
};

export default BurgerMenu;
