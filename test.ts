import test from 'ava';

import parsifyPluginTimezone from './src';

const key = process.env.KEY ?? '';

const sleep = async (ms: number): Promise<any> => new Promise(resolve => setTimeout(resolve, ms));

test('get current time', async t => {
	const today = new Date();
	const hours = today.getHours();
	const minutes = today.getMinutes();

	t.is(await parsifyPluginTimezone(key)('time'), `${hours === 0 ? '00' : hours}:${minutes === 0 ? '00' : minutes}`);
});

test('get time in specific location (1st method)', async t => {
	t.regex(await parsifyPluginTimezone(key)('time in warsaw'), /CET|CEST/);
});

test('get time in specific location (2nd method)', async t => {
	await sleep(1000);
	t.regex(await parsifyPluginTimezone(key)('New York time'), /EDT|EST/);
});

test('get time in certain timezone', async t => {
	t.regex(await parsifyPluginTimezone(key)('PST time'), /PST/);
});

test('if an error occurs, just output the expression', async t => {
	t.is(await parsifyPluginTimezone(key)('foo / bar'), 'foo / bar');
});
