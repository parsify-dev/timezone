import {byLocation, byZone} from './utils/get-time-zone';

export default (key: string, prefersLong?: boolean) => async (expression: string): Promise<string> => {
	const expressionArray = expression.split(' ');

	if (/time|now|pm|am/i.exec(expression)) {
		if (expressionArray.length === 1 && /time/i.exec(expressionArray[0])) {
			return new Date().toLocaleTimeString(undefined, {hour: 'numeric', minute: 'numeric'});
		}

		if (expressionArray.length === 1 && /date|now/i.exec(expressionArray[0])) {
			return new Date().toLocaleDateString();
		}

		if (/time/i.exec(expressionArray[0]) && expressionArray[1] === 'in' && expressionArray[2]) {
			return byLocation(key, expressionArray.slice(2).join(' '), prefersLong ?? false);
		}

		if (expressionArray[0] !== expressionArray[0].toUpperCase() && /time/i.exec(expressionArray.slice(-1)[0])) {
			return byLocation(key, expressionArray.slice(0, -1).join(' '), prefersLong ?? false);
		}

		if (expressionArray[0] === expressionArray[0].toUpperCase() && /time/i.exec(expressionArray.slice(-1)[0])) {
			return byZone(expressionArray[0]);
		}
	}

	return expression;
};
