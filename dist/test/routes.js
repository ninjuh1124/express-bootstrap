import { Router } from 'express';
export default (controller) => {
    const router = Router();
    router.get('/', controller.sample);
    return router;
};
//# sourceMappingURL=routes.js.map