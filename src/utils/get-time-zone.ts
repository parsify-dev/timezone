import got from 'got';
import {addMilliseconds, subMilliseconds} from 'date-fns';
import {utcToZonedTime} from 'date-fns-tz';

const utc = new Date(Date.now());
const map = new Map();

export const byLocation = async (key: string, location: string, prefersLong: boolean): Promise<string> => {
	const response: any = await got(`https://api.opencagedata.com/geocode/v1/json?q=${location}&key=${key}`, {cache: map}).json();
	const offset = response.results[0]?.annotations?.timezone?.offset_sec;

	if (offset > 0) {
		return `${new Date(addMilliseconds(utc, offset)).toLocaleTimeString(undefined, {hour: 'numeric', minute: 'numeric'})} ${prefersLong ? response.results[0]?.annotations?.timezone.name : response.results[0]?.annotations?.timezone.short_name}`;
	}

	return `${new Date(subMilliseconds(utc, offset)).toLocaleTimeString(undefined, {hour: 'numeric', minute: 'numeric'})} ${prefersLong ? response.results[0]?.annotations?.timezone.name : response.results[0]?.annotations?.timezone.short_name}`;
};

export const byZone = async (zone: string): Promise<string> => {
	return `${new Date(utcToZonedTime(utc, zone)).toLocaleTimeString(undefined, {hour: 'numeric', minute: 'numeric'})} ${zone}`;
};
