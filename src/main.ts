import express, { json } from 'express';

import router from './routers/user.router';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(json());

app.use('/users', router);

app.listen(PORT, () => console.log(`☢︎ Running server on port ${PORT}`));
