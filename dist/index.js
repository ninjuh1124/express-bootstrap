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
    server.loadMiddleware = (middleware) => {
        middleware.forEach((m) => server.use(m));
    };
    server.loadRoutes = (routes) => {
        routes.forEach((route) => {
            server.use(route.path, route.router(route.controller));
        });
    };
    server.loadMiddleware([
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
//# sourceMappingURL=index.js.map