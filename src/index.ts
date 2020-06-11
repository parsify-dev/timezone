import {format} from 'date-fns';
import pDebounce from 'p-debounce';

import {byLocation} from './utils/get-time-zone';

export default (key: string, {debounce = 400}: {debounce?: number} = {}) => async (expression: string): Promise<string> => {
	const debounced = pDebounce(byLocation, debounce);

	const expressionArray = expression.split(' ');

	if (/time|now|pm|am/i.exec(expression)) {
		if (expressionArray.length === 1 && /time|now/i.exec(expressionArray[0])) {
			return format(new Date(), 'HH:mm');
		}

		if (/time/i.exec(expressionArray[0]) && expressionArray[1] === 'in' && expressionArray[2]) {
			return debounced(key, expressionArray.slice(2).join(' '));
		}

		if (expressionArray[0] !== expressionArray[0].toUpperCase() && /time/i.exec(expressionArray.slice(-1)[0])) {
			return debounced(key, expressionArray.slice(0, -1).join(' '));
		}
	}

	return expression;
};

