import fetch from 'isomorphic-unfetch';
import {getUnixTime, format} from 'date-fns';
import {zonedTimeToUtc} from 'date-fns-tz';

import {locationToCoords} from './location-to-coords';

export const byLocation = async (key: string, location: string): Promise<string> => {
	const {lat, lon} = await locationToCoords(location);
	const response = await fetch(`https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lon}&timestamp=${getUnixTime(new Date())}&key=${key}`);
	const data = await response.json();
	const utcDate = zonedTimeToUtc(new Date(), data.timeZoneId);

	return format(utcDate, 'HH:mm');
};
