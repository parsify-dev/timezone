import got from 'got';
import {addSeconds, subSeconds} from 'date-fns';
import {utcToZonedTime} from 'date-fns-tz';

const map = new Map();

export const byLocation = async (key: string, location: string, prefersLong: boolean): Promise<string> => {
	const response: any = await got(`https://api.opencagedata.com/geocode/v1/json?q=${location}&key=${key}`, {cache: map}).json();
	// eslint-disable-next-line no-unsafe-optional-chaining
	const offset = response.results[0]?.annotations?.timezone?.offset_sec - 3600;

	if (offset > 0) {
		return `${new Date(addSeconds(new Date(Date.now()), offset)).toLocaleTimeString(undefined, {hour: 'numeric', minute: 'numeric'})} ${prefersLong ? response.results[0]?.annotations?.timezone.name : response.results[0]?.annotations?.timezone.short_name}`;
	}

	return `${new Date(subSeconds(new Date(Date.now()), Math.abs(offset))).toLocaleTimeString(undefined, {hour: 'numeric', minute: 'numeric'})} ${prefersLong ? response.results[0]?.annotations?.timezone.name : response.results[0]?.annotations?.timezone.short_name}`;
};

export const byZone = async (zone: string): Promise<string> => {
	return `${new Date(utcToZonedTime(new Date(Date.now()), zone)).toLocaleTimeString(undefined, {hour: 'numeric', minute: 'numeric'})} ${zone}`;
};
