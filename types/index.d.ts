import expressCore from 'express-serve-static-core';
export declare const initializeServer: (options?: Options) => expressCore.Express;
export declare const loadMiddleware: (server: expressCore.Express, middleware: any[]) => void;
export declare const loadRoutes: (server: expressCore.Express, routes: Route[]) => void;
interface Options {
    allowedOrigins?: string;
    allowedMethods?: string;
    allowedHeaders?: string;
}
interface Route {
    path: string;
    controller: Controller;
    router: (controller: Controller) => expressCore.RequestHandler;
}
interface Controller {
    [key: string]: any;
}
export {};
//# sourceMappingURL=index.d.ts.map