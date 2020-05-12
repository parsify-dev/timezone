import pMemoize from 'p-memoize';

import {byLocation, byZone} from './utils/get-time-zone';

const memLocation = pMemoize(byLocation, {cacheKey: arguments_ => arguments_[1]});
const memZone = pMemoize(byZone, {cacheKey: arguments_ => arguments_[1]});

export default (key: string) => async (expression: string): Promise<string> => {
	const expressionArray = expression.split(' ');

	if (/time|now|pm|am/i.exec(expression)) {
		if (expressionArray.length === 1 && /time|now/i.exec(expressionArray[0])) {
			const isSingleDigit = (number: number) => {
				return number.toString().charAt(0).startsWith(number.toString());
			};

			const today = new Date();
			const hours = today.getHours();
			const minutes = today.getMinutes();

			return `${hours === 0 ? '00' : (isSingleDigit(hours) ? `0${hours}` : hours)}:${minutes === 0 ? '00' : (isSingleDigit(minutes) ? `0${minutes}` : minutes)}`;
		}

		if (/time/i.exec(expressionArray[0]) && expressionArray[1] === 'in' && expressionArray[2]) {
			return memLocation(key, expressionArray.slice(2).join(' '));
		}

		if (expressionArray[0] !== expressionArray[0].toUpperCase() && /time/i.exec(expressionArray.slice(-1)[0])) {
			return memLocation(key, expressionArray.slice(0, -1).join(' '));
		}

		if (expressionArray[0] === expressionArray[0].toUpperCase() && /time/i.exec(expressionArray.slice(-1)[0])) {
			return memZone(key, expressionArray[0]);
		}
	}

	return expression;
};

