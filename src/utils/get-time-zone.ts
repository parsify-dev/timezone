import got from 'got';

import {locationToCoords} from './location-to-coords';
import {getTime} from './get-time';

const map = new Map();

export const byLocation = async (key: string, location: string): Promise<string> => {
	const {lat, lon} = await locationToCoords(location);
	const response = await got(`http://api.timezonedb.com/v2.1/get-time-zone?key=${key}&by=position&format=json&lat=${lat}&lng=${lon}`, {cache: map}).json();

	return getTime(response);
};

export const byZone = async (key: string, zone: string): Promise<string> => {
	const response = await got(`http://api.timezonedb.com/v2.1/get-time-zone?key=${key}&by=zone&format=json&zone=${zone}`, {cache: map}).json();

	return getTime(response);
};
