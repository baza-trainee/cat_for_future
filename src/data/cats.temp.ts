import { ICat } from 'src/types/ICat';
import cat_1 from 'src/assets/images/cats/cat-1.jpg';
import cat_2 from 'src/assets/images/cats/cat-2.jpg';
import cat_3 from 'src/assets/images/cats/cat-3.jpg';
import cat_4 from 'src/assets/images/cats/cat-4.jpg';

export const cats: ICat[] = [
	{
		id: 1,
		name: 'Морква',
		age: 1,
		sex: 'female',
		birthday: '28.08.2023',
		booking_status: true,
		photos: [cat_1, cat_2, cat_3, cat_4],
	},
	{
		id: 2,
		name: 'Кокос',
		age: 3,
		sex: 'male',
		birthday: '28.08.2023',
		booking_status: false,
		photos: [cat_2, cat_3, cat_1, cat_4],
	},
	{
		id: 3,
		name: 'Фінік',
		age: 2,
		sex: 'female',
		birthday: '20.06.2023',
		booking_status: true,
		photos: [cat_3, cat_1, cat_2, cat_4],
	},
	{
		id: 4,
		name: 'Морква',
		age: 1,
		sex: 'male',
		birthday: '28.10.2023',
		booking_status: false,
		photos: [cat_4, cat_1, cat_2, cat_4],
	},
	{
		id: 5,
		name: 'Кокос',
		age: 2,
		sex: 'female',
		birthday: '28.08.2023',
		booking_status: false,
		photos: [cat_1, cat_2, cat_3, cat_4],
	},
	{
		id: 6,
		name: 'Морква',
		age: 2,
		sex: 'male',
		birthday: '08.11.2023',
		booking_status: true,
		photos: [cat_4, cat_1, cat_2, cat_4],
	},
];
