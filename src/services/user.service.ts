import { randomUUID } from 'crypto';

import { IBaseUser, IUser } from '../models/user';
import { users } from '../data/data';

export const getUserById = (id: string) => users.find((item) => item.id === id);

export const saveUser = (baseUser: IBaseUser) => {
	const user = createUser(baseUser);

	users.push(user);

	return user;
};

export const createUser = (user: IBaseUser): IUser => ({
	id: randomUUID(),
	isDeleted: false,
	...user,
});

export const getAutoSuggestUsers = (
	loginSubstring: string,
	limit: number
): IUser[] => {
	const sortedUsers = [...users].sort((a, b) =>
		a['login'].localeCompare(b['login'])
	);
	const suggestion = sortedUsers.filter((user) =>
		user.login
			.toLocaleLowerCase()
			.includes(loginSubstring.trim().toLocaleLowerCase())
	);

	return suggestion.slice(0, limit);
};

export const updateUser = (id: string, value: IBaseUser) => {
	const userIndex = users.findIndex((user) => user.id === id);

	if (userIndex === -1) {
		return undefined;
	}

	users[userIndex] = {
		id: users[userIndex].id,
		isDeleted: users[userIndex].isDeleted,
		...value,
	};

	return users[userIndex];
};

export const deleteUser = (id: string) => {
	const userIndex = users.findIndex((user) => user.id === id);

	if (userIndex === -1) {
		return false;
	}

	users[userIndex].isDeleted = true;
	return true;
};
