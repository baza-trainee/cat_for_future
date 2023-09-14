export interface ICat {
	id: number;
	name: string;
	age: number;
	sex: string;
	birthday: string;
	booking_status: boolean;
	photo: string;
}

export const cats: ICat[] = [
	{
		id: 1,
		name: 'Морква',
		age: 1,
		sex: 'male',
		birthday: '28.08.2023',
		booking_status: true,
		photo: 'src/assets/images/cats/cat_1.jpg',
	},
	{
		id: 2,
		name: ' Кокос',
		age: 1,
		sex: 'male',
		birthday: '28.08.2023',
		booking_status: false,
		photo: 'src/assets/images/cats/cat_2.jpg',
	},
	{
		id: 3,
		name: 'Фінік',
		age: 1,
		sex: 'male',
		birthday: '20.06.2023',
		booking_status: true,
		photo: 'src/assets/images/cats/cat_3.jpg',
	},
	{
		id: 4,
		name: 'Морква',
		age: 1,
		sex: 'male',
		birthday: '28.10.2023',
		booking_status: false,
		photo: 'src/assets/images/cats/cat_4.jpg',
	},
	{
		id: 5,
		name: 'Кокос',
		age: 1,
		sex: 'male',
		birthday: '28.08.2023',
		booking_status: false,
		photo: 'src/assets/images/cats/cat_5.jpg',
	},
	{
		id: 6,
		name: 'Морква',
		age: 1,
		sex: 'male',
		birthday: '08.11.2023',
		booking_status: true,
		photo: 'src/assets/images/cats/cat_6.jpg',
	},
];
