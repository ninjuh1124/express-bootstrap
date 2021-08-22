import expressCore from 'express-serve-static-core';
import { Router } from 'express';

export default (controller: APIController) => {
	const router = Router();
	router.get('/', controller.sample);
	return router;
};

interface APIController {
	[key: string]: expressCore.RequestHandler;
}
