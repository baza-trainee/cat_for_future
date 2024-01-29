import React from 'react';
import s from './Menu.module.scss';
import { Link } from 'react-router-dom';
import { useGetDocumentQuery } from 'src/store/slice/documentsSlice.ts';
import { IDocuments } from 'src/types/IDocuments.ts';

interface INavLink {
	name: string;
	to: string;
}
interface IMenuProps {
	documents?: boolean;
	navClass?: string;
	unListClass?: string;
	onClick?: () => void;
}

const navLinks: INavLink[] = [
	{
		name: 'Перегляд кошенят',
		to: '/#ourCats',
	},
	{
		name: 'Щасливі історії',
		to: '/#happyStories',
	},
	{
		name: 'Контакти',
		to: '/contacts',
	},
];

const Menu: React.FC<IMenuProps> = ({ documents, unListClass, navClass, onClick }) => {
	const { data: documentList } = useGetDocumentQuery(undefined);

	return (
		<nav className={[s.menu, navClass && s[navClass]].join(' ')}>
			<ul className={[s.list, unListClass && s[unListClass]].join(' ')}>
				{navLinks.map((link) => (
					<li className={s.item} key={link.name}>
						<Link onClick={onClick} to={link.to}>
							{link.name}
						</Link>
					</li>
				))}

				{documents &&
					documentList?.map(({ id, name, media_path: url }: IDocuments) => (
						<li className={s.item} key={id}>
							<Link target="_blank" onClick={onClick} className={s.docLink} to={`${url}#toolbar=0`}>
								{name}
							</Link>
						</li>
					))}
			</ul>
		</nav>
	);
};

export default Menu;
