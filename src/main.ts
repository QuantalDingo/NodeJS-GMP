import 'reflect-metadata';

import { json } from 'express';
import { InversifyExpressServer } from 'inversify-express-utils';

import container from './utils/di';

import './controllers/user.controller';

const PORT = process.env.PORT || 3000;

const server = new InversifyExpressServer(container);
server
	.setConfig((app) => {
		app.use(json());
	})
	.build()
	.listen(PORT, () => console.log(`☢︎ Running server on port ${PORT}`));
