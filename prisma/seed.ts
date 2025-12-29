import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
	connectionString: process.env.DATABASE_URL!
});

const prisma = new PrismaClient({ adapter });

async function main() {
	await prisma.pressPost.createMany({
		data: [
			{
				slug: 'first-post',
				title: 'My First Press Post',
				date: new Date('2024-01-01'),
				content: 'This is the content of the first press post.'
			},
			{
				slug: 'second-post',
				title: 'Another Press Update',
				date: new Date('2024-02-01'),
				content: 'More content goes here.'
			}
		]
	});

	console.log('Database seeded!');
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
