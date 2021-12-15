import { PrismaClient } from '@prisma/client';

import data from './data.json';

const prisma = new PrismaClient();

async function main() {
	await prisma.user.createMany({ data: [...data.users] });
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
