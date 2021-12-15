import { randomUUID } from 'crypto';
import { inject, injectable } from 'inversify';
import { User } from '.prisma/client';

import { IBaseUser } from '@models/user';
import { TOKENS } from '../constants';
import { Repository } from '@models/repository';

@injectable()
export class UserService {
	constructor(
		@inject(TOKENS.Repository) private readonly repo: Repository<User>
	) {}

	async getUsers(loginSubstring: string, limit: number) {
		return this.repo.findAll('login', loginSubstring, limit);
	}

	async getUserById(id: string) {
		return this.repo.find(id);
	}

	async saveUser(user: IBaseUser) {
		return this.repo.create(this.createUser(user));
	}

	async deleteUser(id: string) {
		return this.repo.delete(id);
	}

	async updateUser(id: string, data: IBaseUser) {
		return this.repo.update(id, data);
	}

	private createUser(user: IBaseUser) {
		return {
			id: randomUUID(),
			isDeleted: false,
			...user,
		};
	}
}
