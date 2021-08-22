import expressCore from 'express-serve-static-core';
export declare const initializeServer: (options?: Options) => expressCore.Express & BootstrapServer;
interface Options {
    allowedOrigins?: string;
    allowedMethods?: string;
    allowedHeaders?: string;
}
interface BootstrapServer {
    loadMiddleware?: (middleware: any[]) => void | expressCore.Express;
    loadRoutes?: (routes: Route[]) => void | expressCore.Express;
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