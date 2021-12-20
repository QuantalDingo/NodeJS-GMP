import { inject, injectable, named } from 'inversify';

import { TOKENS } from '../constants';
import { Repository } from '@models/repository';
import { Group } from '@prisma/client';
import { IBaseGroup } from '@models/group';

@injectable()
export class GroupService {
	constructor(
		@inject(TOKENS.Repository)
		@named('group')
		private readonly repo: Repository<Group>
	) {}

	async getGroups() {
		return this.repo.findAll('name', '');
	}

	async getGroupById(id: string) {
		return this.repo.find(id);
	}

	async saveGroup(group: IBaseGroup) {
		return this.repo.create(group);
	}

	async deleteGroup(id: string) {
		return this.repo.delete(id);
	}

	async updateGroup(id: string, data: IBaseGroup) {
		return this.repo.update(id, data);
	}
}
