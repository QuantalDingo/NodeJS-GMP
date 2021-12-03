import { PrismaClient, User } from '.prisma/client';
import { inject, injectable } from 'inversify';

import { TOKENS } from '../constants';
import { Repository } from '@models/repository';

@injectable()
export default class UserRepository implements Repository<User> {
	constructor(
		@inject(TOKENS.PrismaClient) private readonly repo: PrismaClient
	) {}

	async create(user: User): Promise<User> {
		return await this.repo.user.create({
			data: {
				...user,
			},
		});
	}

	async delete(id: string): Promise<User> {
		return await this.repo.user.delete({ where: { id: id } });
	}

	async findAll(
		key: keyof User,
		value: User[keyof User],
		take?: number
	): Promise<User[]> {
		return await this.repo.user.findMany({
			where: { [key]: { contains: value } },
			orderBy: { [key]: 'asc' },
			take,
		});
	}

	async find(id: string): Promise<User | null> {
		return await this.repo.user.findUnique({
			where: {
				id,
			},
		});
	}

	async update(id: string, updatedUser: Partial<User>): Promise<User> {
		return await this.repo.user.update({
			where: { id },
			data: { ...updatedUser },
		});
	}
}
