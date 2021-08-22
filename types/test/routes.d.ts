import expressCore from 'express-serve-static-core';
declare const _default: (controller: APIController) => expressCore.Router;
export default _default;
interface APIController {
    [key: string]: expressCore.RequestHandler;
}
//# sourceMappingURL=routes.d.ts.map