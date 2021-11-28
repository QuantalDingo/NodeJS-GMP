import { Request, Response, Router } from 'express';
import { createValidator, ValidatedRequest } from 'express-joi-validation';

import { IBaseUser, IUser } from '../models/user';
import {
	saveUser,
	deleteUser,
	updateUser,
	getUserById,
	getAutoSuggestUsers,
} from '../services/user.service';
import {
	userSchema,
	IUserRequestSchema,
	IQuerySchema,
	autoSuggestSchema,
} from '../validators';

const router = Router();
const validator = createValidator();

router.get(
	'/:id',
	(req: Request<{ id: string }, IUser, IBaseUser>, res: Response<IUser>) => {
		const id = req.params.id;
		const user = getUserById(id);

		user && res.json(user);

		res.status(404).send();
	}
);

router.get(
	'/',
	validator.query(autoSuggestSchema),
	(req: ValidatedRequest<IQuerySchema>, res: Response<IUser[]>) => {
		const { loginSubstring, limit } = req.query;

		res.json(getAutoSuggestUsers(loginSubstring, limit));
	}
);

router.delete('/:id', (req, res) => {
	const id = req.params.id;
	deleteUser(id) && res.status(200).send();

	res.status(404).send();
});

router.post(
	'/',
	validator.body(userSchema),
	(req: ValidatedRequest<IUserRequestSchema>, res: Response<IUser>) => {
		const body = req.body;

		const user = saveUser(body);

		res.json(user);
	}
);

router.put(
	'/:id',
	validator.body(userSchema),
	(req: ValidatedRequest<IUserRequestSchema>, res: Response<IUser>) => {
		const id = req.params.id;
		const body = req.body;

		const user = updateUser(id, body);

		user && res.json(user);

		res.status(404).send();
	}
);

export default router;
