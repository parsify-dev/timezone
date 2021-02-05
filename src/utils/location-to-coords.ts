import got from 'got';

const map = new Map();

export const locationToCoords = async (location: string): Promise<any> => {
	const response = await got(`https://nominatim.openstreetmap.org/search/${location}?format=json`, {cache: map}).json();

	// @ts-expect-error
	return response[0];
};
