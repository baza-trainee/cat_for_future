import React from 'react';
import { useNavigate } from 'react-router';
import Home from 'src/pages/Home/Home';
import ModalWhiteCat from 'src/components/ModalWhiteCat/ModalWhiteCat';
import catImage from 'src/assets/images/modal/cat-donate.png';

const Return: React.FC = () => {
	const navigate = useNavigate();
	const onClick = () => {
		navigate('/my');
	};

	const image = catImage;
	const message = 'Дякуємо за вашу допомогу!';
	const name = 'На Головну';

	return (
		<>
			<Home />
			<ModalWhiteCat image={image} message={message} name={name} onClick={onClick} />
		</>
	);
};

export default Return;
