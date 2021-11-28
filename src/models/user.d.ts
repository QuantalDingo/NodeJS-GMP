export interface IBaseUser {
	login: string;
	password: string;
	age: number;
}

export interface IUser extends IBaseUser {
	id: string;
	isDeleted: boolean;
}
