import test from 'ava';
import {lightFormat} from 'date-fns';

import parsifyPluginTimezone from './src';

const key = process.env.KEY ?? '';

test('get current time', async t => {
	t.is(await parsifyPluginTimezone(key)('time'), lightFormat(new Date(), 'HH:mm'));
});

test('get time in specific location (1st method)', async t => {
	t.regex(await parsifyPluginTimezone(key)('time in warsaw'), /:/);
});

test('get time in specific location (2nd method)', async t => {
	t.regex(await parsifyPluginTimezone(key)('New York time'), /:/);
});

test('if an error occurs, just output the expression', async t => {
	t.is(await parsifyPluginTimezone(key)('foo / bar'), 'foo / bar');
});
