import fetch from 'isomorphic-unfetch';

export const locationToCoords = async (location: string): Promise<any> => {
	const response = await fetch(`https://nominatim.openstreetmap.org/search/${location}?format=json`);
	const data = await response.json();

	return data[0];
};
