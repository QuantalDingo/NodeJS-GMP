import { User } from '.prisma/client';
import { Response } from 'express';
import { createValidator, ValidatedRequest } from 'express-joi-validation';
import { inject } from 'inversify';
import {
	controller,
	httpGet,
	httpDelete,
	httpPost,
	httpPut,
	requestParam,
	response,
	queryParam,
	request,
} from 'inversify-express-utils';

import { TOKENS } from '../constants/tokens';
import { UserService } from '../services/user.service';
import { userSchema, IUserRequestSchema } from '../validators';

const validator = createValidator();

@controller('/users')
export default class UserController {
	constructor(
		@inject(TOKENS.UserService) private readonly userService: UserService
	) {}

	@httpGet('/:id')
	public async getUser(
		@requestParam('id') id: string,
		@response() res: Response<User>
	) {
		const user = await this.userService.getUserById(id);

		user && res.json(user);

		res.status(404).send();
	}

	@httpGet('/')
	async getUsers(
		@queryParam('loginSubstring') loginSubstring: string,
		@queryParam('limit') limit: string,
		@response() res: Response<User[]>
	) {
		const users = await this.userService.getUsers(loginSubstring, +limit);

		res.json(users);
	}

	@httpPost('/', validator.body(userSchema))
	async createUser(
		@request() req: ValidatedRequest<IUserRequestSchema>,
		@response() res: Response<User>
	) {
		const body = req.body;

		try {
			const user = await this.userService.saveUser(body);

			res.status(201).json(user);
		} catch (e) {
			res.status(500).send();
		}
	}

	@httpPut('/:id', validator.body(userSchema))
	async updateUser(
		@requestParam('id') id: string,
		@request() req: ValidatedRequest<IUserRequestSchema>,
		@response() res: Response<User>
	) {
		const body = req.body;
		try {
			await this.userService.updateUser(id, body);

			res.sendStatus(200);
		} catch (e) {
			res.status(404).send();
		}
	}

	@httpDelete('/:id')
	async deleteUser(
		@requestParam('id') id: string,
		@response() res: Response<User>
	) {
		try {
			await this.userService.deleteUser(id);
			res.status(200).send();
		} catch (e) {
			res.status(404).send();
		}
	}
}
