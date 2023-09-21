export interface ICat {
	id: number;
	name: string;
	age: number;
	sex: string;
	birthday: string;
	booking_status: boolean;
	photos: string[];
}

export const cats: ICat[] = [
	{
		id: 1,
		name: 'Морква',
		age: 1,
		sex: 'female',
		birthday: '28.08.2023',
		booking_status: true,
		photos: [
			'src/assets/images/cats/cat-1.jpg',
			'src/assets/images/cats/cat-2.jpg',
			'src/assets/images/cats/cat-5.jpg',
			'src/assets/images/cats/cat-3.jpg',
		],
	},
	{
		id: 2,
		name: ' Кокос',
		age: 3,
		sex: 'male',
		birthday: '28.08.2023',
		booking_status: false,
		photos: [
			'src/assets/images/cats/cat-2.jpg',
			'src/assets/images/cats/cat-3.jpg',
			'src/assets/images/cats/cat-5.jpg',
			'src/assets/images/cats/cat-4.jpg',
		],
	},
	{
		id: 3,
		name: 'Фінік',
		age: 2,
		sex: 'female',
		birthday: '20.06.2023',
		booking_status: true,
		photos: [
			'src/assets/images/cats/cat-3.jpg',
			'src/assets/images/cats/cat-2.jpg',
			'src/assets/images/cats/cat-5.jpg',
			'src/assets/images/cats/cat-4.jpg',
		],
	},
	{
		id: 4,
		name: 'Морква',
		age: 1,
		sex: 'male',
		birthday: '28.10.2023',
		booking_status: false,
		photos: [
			'src/assets/images/cats/cat-4.jpg',
			'src/assets/images/cats/cat-2.jpg',
			'src/assets/images/cats/cat-5.jpg',
			'src/assets/images/cats/cat-3.jpg',
		],
	},
	{
		id: 5,
		name: 'Кокос',
		age: 2,
		sex: 'female',
		birthday: '28.08.2023',
		booking_status: false,
		photos: [
			'src/assets/images/cats/cat-5.jpg',
			'src/assets/images/cats/cat-2.jpg',
			'src/assets/images/cats/cat-1.jpg',
			'src/assets/images/cats/cat-2.jpg',
		],
	},
	{
		id: 6,
		name: 'Морква',
		age: 2,
		sex: 'male',
		birthday: '08.11.2023',
		booking_status: true,
		photos: [
			'src/assets/images/cats/cat-6.jpg',
			'src/assets/images/cats/cat-3.jpg',
			'src/assets/images/cats/cat-5.jpg',
			'src/assets/images/cats/cat-2.jpg',
		],
	},
];
