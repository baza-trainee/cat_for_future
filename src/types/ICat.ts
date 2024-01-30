export interface ICat {
	id: number;
	name: string;
	is_male: boolean;
	is_reserved: boolean;
	description: string;
	date_of_birth: string;
	photos: { id: number; media_path: string }[];
}
