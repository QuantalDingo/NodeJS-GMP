import { Group, PrismaClient } from '.prisma/client';
import { inject, injectable } from 'inversify';

import { TOKENS } from '../constants';
import { IBaseGroup } from '@models/group';
import { Repository } from '@models/repository';

@injectable()
export class GroupRepository implements Repository<Group> {
	constructor(
		@inject(TOKENS.PrismaClient) private readonly repo: PrismaClient
	) {}

	async create(item: IBaseGroup): Promise<Group> {
		return this.repo.group.create({ data: { ...item } });
	}

	async delete(id: string): Promise<Group> {
		return this.repo.group.delete({
			where: {
				id,
			},
		});
	}

	async findAll<K extends keyof Group>(
		key: K,
		value: Group[K],
		take?: number
	): Promise<Group[]> {
		return this.repo.group.findMany({
			where: { [key]: { contains: value } },
			orderBy: { [key]: 'asc' },
			take,
		});
	}

	async find(id: string): Promise<Group | null> {
		return this.repo.group.findUnique({ where: { id } });
	}

	async update(id: string, item: Partial<Group>): Promise<Group> {
		return this.repo.group.update({ where: { id }, data: { ...item } });
	}

	async addUsersToGroup(groupId: string, userIds: string[]) {
		return this.repo.$transaction([
			...userIds.map((userId) =>
				this.repo.userGroup.create({
					data: { user_id: userId, group_id: groupId },
				})
			),
		]);
	}
}
