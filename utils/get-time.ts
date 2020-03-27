export const getTime = async (data: any): Promise<string> => {
	const timeOnly = (data.formatted).split(' ').slice(1).join();

	return `${timeOnly.split(':').slice(0, -1).join(':')} ${data.abbreviation}`;
};
