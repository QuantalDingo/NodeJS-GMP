import csv from 'csvtojson';
import { readFile, open } from 'fs/promises';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';

const csvPath = 'csv/nodejs-hw1-ex1-2.csv';

async function run(path: string): Promise<void> {
	const outputPath = 'csv/json.txt';

	try {
		const file = await readFile(path, { encoding: 'utf-8' });
		const parsedCSV = await csv().fromString(file);

		const outputFile = await open(outputPath, 'w');
		parsedCSV.forEach(
			async (item) => await outputFile.appendFile(JSON.stringify(item) + '\n')
		);
	} catch (e) {
		console.error(e);
	}
}

async function run_with_pipe(path: string): Promise<void> {
	const outputPath = 'csv/json_with_pipe.txt';

	try {
		await pipeline(
			createReadStream(path),
			csv(),
			createWriteStream(outputPath)
		);
	} catch (e) {
		console.error(e);
	}
}

run(csvPath);
run_with_pipe(csvPath);
