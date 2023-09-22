import MyData from './MyData/MyData.tsx';
import MyKitten from './MyKitten/MyKitten.tsx';
import ChangePassword from './ChangePassword/ChangePassword.tsx';
import PersonalAccountModal from './PersonalAccountModal/PersonalAccountModal.tsx';

export const routesPersonalAccount = [
	{
		index: true,
		path: 'my-data',
		element: <MyData />,
	},
	{
		path: 'my-kitten',
		element: <MyKitten />,
	},
	{
		path: 'change-password',
		element: <ChangePassword />,
	},
	{
		path: 'logout',
		element: (
			<PersonalAccountModal
				status={true}
				title={'Вихід з акаунта'}
				text={'Ви впевнені що бажаєте вийти з акаунта?'}
			/>
		),
	},
	{
		path: 'delete-account',
		element: (
			<PersonalAccountModal
				status={true}
				title={'Видалення акаунта'}
				text={
					'Ви впевнені що бажаєте видалити акаунт? Видалення акаунту призведе до втрати всіх даних профілю'
				}
			/>
		),
	},
];
