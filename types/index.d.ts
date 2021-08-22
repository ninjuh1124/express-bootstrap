import expressCore from 'express-serve-static-core';
export declare const initializeServer: (options?: Options) => expressCore.Express;
export declare const loadMiddleware: (server: expressCore.Express, middleware: any[]) => void;
export declare const loadRoutes: (server: expressCore.Express, routes: Route[]) => void;
export interface Options {
    allowedOrigins?: string;
    allowedMethods?: string;
    allowedHeaders?: string;
}
export interface Route {
    path: string;
    controller: Controller;
    router: (controller: Controller) => expressCore.RequestHandler;
}
export interface Controller {
    [key: string]: (request: expressCore.Request, response: expressCore.Response) => any;
}
//# sourceMappingURL=index.d.ts.map