import test from 'ava';

import parsifyPluginTimezone from './src';

const sleep = async (ms: number): Promise<any> => {
	return new Promise(resolve => setTimeout(resolve, ms));
};

test('get current time', async t => {
	const today = new Date();
	const hours = today.getHours();
	const minutes = today.getMinutes();

	t.is(await parsifyPluginTimezone(process.env.KEY)('time'), `${hours === 0 ? '00' : hours}:${minutes === 0 ? '00' : minutes}`);
});

test('get time in specific location (1st method)', async t => {
	t.regex(await parsifyPluginTimezone(process.env.KEY)('time in warsaw'), /CET/);
});

test('get time in specific location (2nd method)', async t => {
	await sleep(1000);
	t.regex(await parsifyPluginTimezone(process.env.KEY)('New York time'), /EDT/);
});

test('get time in certain timezone', async t => {
	t.regex(await parsifyPluginTimezone(process.env.KEY)('PST time'), /PST/);
});

test('if an error occurs, just output the expression', async t => {
	t.is(await parsifyPluginTimezone(process.env.KEY)('foo / bar'), 'foo / bar');
});
