import { PrismaClient, User } from '.prisma/client';
import { inject, injectable } from 'inversify';

import { TOKENS } from '../constants';
import { Repository } from '@models/repository';

@injectable()
export class UserRepository implements Repository<User> {
	constructor(
		@inject(TOKENS.PrismaClient) private readonly repo: PrismaClient
	) {}

	async create(user: User): Promise<User> {
		return this.repo.user.create({
			data: {
				...user,
			},
		});
	}

	async delete(id: string): Promise<User> {
		return this.repo.user.delete({ where: { id } });
	}

	async findAll<K extends keyof User>(
		key: K,
		value: User[K],
		take?: number
	): Promise<User[]> {
		return this.repo.user.findMany({
			where: { [key]: { contains: value } },
			orderBy: { [key]: 'asc' },
			take,
		});
	}

	async find(id: string): Promise<User | null> {
		return this.repo.user.findUnique({
			where: {
				id,
			},
		});
	}

	async update(id: string, updatedUser: Partial<User>): Promise<User> {
		return this.repo.user.update({
			where: { id },
			data: { ...updatedUser },
		});
	}

	async isUserInGroup(groupId: string, userId: string): Promise<boolean> {
		return !!this.repo.user.findFirst({
			where: {
				id: userId,
				UserGroup: {
					some: {
						group_id: groupId,
					},
				},
			},
		});
	}
}
