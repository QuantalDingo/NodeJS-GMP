import { ValidatedRequestSchema, ContainerTypes } from 'express-joi-validation';
import Joi from 'joi';

export const autoSuggestSchema = Joi.object({
	loginSubstring: Joi.string().required().allow(''),
	limit: Joi.number().integer().min(1),
});

export interface IQuerySchema extends ValidatedRequestSchema {
	[ContainerTypes.Query]: {
		loginSubstring: string;
		limit: number;
	};
}
