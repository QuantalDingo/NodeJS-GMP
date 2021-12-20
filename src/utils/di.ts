import { PrismaClient } from '@prisma/client';
import { ContainerModule, Container } from 'inversify';

import { TOKENS } from '../constants/tokens';
import { UserService } from '../services/user.service';
import { GroupRepository, UserRepository } from '../repository';

const serviceModule = new ContainerModule((bind) => {
	bind<UserRepository>(TOKENS.Repository)
		.to(UserRepository)
		.whenTargetNamed('user');
	bind<GroupRepository>(TOKENS.Repository)
		.to(GroupRepository)
		.whenTargetNamed('group');

	bind<UserService>(TOKENS.UserService).to(UserService);
});

const constantModule = new ContainerModule((bind) => {
	bind<PrismaClient>(TOKENS.PrismaClient).toDynamicValue(
		() => new PrismaClient()
	);
});

const container = new Container();
container.load(serviceModule, constantModule);

export default container;
