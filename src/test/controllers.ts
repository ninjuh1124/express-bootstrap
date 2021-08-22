import expressCore from 'express-serve-static-core';

export default {
	sample: (request: expressCore.Request, response: expressCore.Response) => {
		return response.status(200).json({ content: 'Hello World!' });
	},
};
