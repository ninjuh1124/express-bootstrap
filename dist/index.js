import bodyParser from 'body-parser';
import express from 'express';
import helmet from 'helmet';
export const initializeServer = (options = {
    allowedOrigins: '*',
    allowedMethods: '*',
    allowedHeaders: '*',
}) => {
    const server = express();
    server.options('/*', (request, response) => {
        const { allowedOrigins, allowedMethods, allowedHeaders } = options;
        response.header('Access-Control-Allow-Origin', allowedOrigins);
        response.header('Access-Control-Allow-Methods', allowedMethods);
        response.header('Access-Control-Allow-headers', allowedHeaders);
        response.sendStatus(200);
    });
    loadMiddleware(server, [
        helmet(),
        (request, response, next) => {
            response.setHeader('X-Clacks-Overhead', 'GNU TERRY PRATCHET');
            next();
        },
        bodyParser.urlencoded({ extended: true }),
        bodyParser.json(),
    ]);
    return server;
};
export const loadMiddleware = (server, middleware) => {
    middleware.forEach((m) => server.use(m));
};
export const loadRoutes = (server, routes) => {
    routes.forEach((route) => {
        server.use(route.path, route.router(route.controller));
    });
};
//# sourceMappingURL=index.js.map