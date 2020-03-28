import mem from 'mem';
import fetch from 'isomorphic-unfetch';

import {locationToCoords} from './location-to-coords';
import {getTime} from './get-time';

const memoized = mem(locationToCoords);

export const byLocation = async (key: string, location: string): Promise<string> => {
	const {lat, lon} = await memoized(location);
	const response = await fetch(`http://api.timezonedb.com/v2.1/get-time-zone?key=${key}&by=position&format=json&lat=${lat}&lng=${lon}`);
	const data = await response.json();

	return getTime(data);
};

export const byZone = async (key: string, zone: string): Promise<string> => {
	const response = await fetch(`http://api.timezonedb.com/v2.1/get-time-zone?key=${key}&by=zone&format=json&zone=${zone}`);
	const data = await response.json();

	return getTime(data);
};
