import bodyParser from 'body-parser';
import express from 'express';
import expressCore from 'express-serve-static-core';
import helmet from 'helmet';

export const initializeServer = (
	options: Options = {
		allowedOrigins: '*',
		allowedMethods: '*',
		allowedHeaders: '*',
	}
) => {
	const server: expressCore.Express & BootstrapServer = express();

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
		(
			request: expressCore.Request,
			response: expressCore.Response,
			next: expressCore.NextFunction
		) => {
			response.setHeader('X-Clacks-Overhead', 'GNU TERRY PRATCHET');
			next();
		},
		bodyParser.urlencoded({ extended: true }),
		bodyParser.json(),
	]);

	return server;
};

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
