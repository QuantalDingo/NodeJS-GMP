import Joi from 'joi';
import { ContainerTypes, ValidatedRequestSchema } from 'express-joi-validation';

export const schema = Joi.object({
	login: Joi.string().required().trim(),
	age: Joi.number().required().min(4).max(130),
	password: Joi.string()
		.alphanum()
		.required()
		.regex(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)),
});

export interface UserRequestSchema extends ValidatedRequestSchema {
	[ContainerTypes.Body]: {
		login: string;
		password: string;
		age: number;
	};
}
