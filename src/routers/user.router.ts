import { Request, Response, Router } from 'express';
import { createValidator, ValidatedRequest } from 'express-joi-validation';

import { AutoSuggest } from '../models/auto-suggest';
import { BaseUser, User } from '../models/user';
import {
	saveUser,
	deleteUser,
	updateUser,
	createUser,
	getUserById,
	getAutoSuggestUsers,
} from '../controllers/user.controller';
import { schema, UserRequestSchema } from '../validators/user.validator';

const router = Router();
const validator = createValidator();

router.get(
	'/:id',
	(req: Request<{ id: string }, User, BaseUser>, res: Response<User>) => {
		const id = req.params.id;
		const user = getUserById(id);

		res.json(user);
	}
);

router.get(
	'/',
	(req: Request<{}, User[], {}, AutoSuggest>, res: Response<User[]>) => {
		const { loginSubstring, limit } = req.query;

		res.json(getAutoSuggestUsers(loginSubstring, limit));
	}
);

router.delete('/:id', (req, res) => {
	const id = req.params.id;
	deleteUser(id);

	res.status(200).send();
});

router.post(
	'/',
	validator.query(schema),
	(req: ValidatedRequest<UserRequestSchema>, res: Response<User>) => {
		const body = req.body;

		const user = saveUser(createUser(body));

		res.json(user);
	}
);

router.put(
	'/:id',
	validator.body(schema),
	(req: ValidatedRequest<UserRequestSchema>, res: Response<User>) => {
		const id = req.params.id;
		const body = req.body;

		const user = updateUser(id, body);

		res.json(user);
	}
);

export default router;
