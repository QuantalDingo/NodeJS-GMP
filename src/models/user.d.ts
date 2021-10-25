export interface BaseUser {
	login: string;
	password: string;
	age: number;
}

export interface User extends BaseUser {
	id: string;
	isDeleted: boolean;
}
