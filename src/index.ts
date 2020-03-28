import mem from 'mem';

import {byLocation, byZone} from './utils/get-time-zone';

const memoizedByLocation = mem(byLocation, {cacheKey: arguments_ => arguments_[1]});
const memoizedByZone = mem(byZone);

export default (key: string) => async (expression: string): Promise<string> => {
	const expressionArray = expression.split(' ');

	if (/time|now|pm|am/i.exec(expression)) {
		if (expressionArray.length === 1 && /time|now/i.exec(expressionArray[0])) {
			const today = new Date();
			const hours = today.getHours();
			const minutes = today.getMinutes();

			return `${hours === 0 ? '00' : hours}:${minutes === 0 ? '00' : minutes}`;
		}

		if (/time/i.exec(expressionArray[0]) && expressionArray[1] === 'in' && expressionArray[2]) {
			return memoizedByLocation(key, expressionArray.slice(2).join(' '));
		}

		if (expressionArray[0] !== expressionArray[0].toUpperCase() && /time/i.exec(expressionArray.slice(-1)[0])) {
			return memoizedByLocation(key, expressionArray.slice(0, -1).join(' '));
		}

		if (expressionArray[0] === expressionArray[0].toUpperCase() && /time/i.exec(expressionArray.slice(-1)[0])) {
			return memoizedByZone(key, expressionArray[0]);
		}
	}

	return expression;
};
