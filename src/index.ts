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

export const loadMiddleware = (
	server: expressCore.Express,
	middleware: any[]
) => {
	middleware.forEach((m) => server.use(m));
};

export const loadRoutes = (server: expressCore.Express, routes: Route[]) => {
	routes.forEach((route) => {
		server.use(route.path, route.router(route.controller));
	});
};

export interface Options {
	/** Comma separated list of origins from which requests can come from */
	allowedOrigins?: string;
	/** Comma separated list of methods allowed to handle */
	allowedMethods?: string;
	/** Comma separated list of headers allowed to handle */
	allowedHeaders?: string;
}

export interface Route {
	/** Route path. Accepts anything `express.use` will take as path name. */
	path: string;
	/** Route controller. Will handle requests, generate responses, and send them back to client. */
	controller: Controller;
	/** Router. Generates routes, and passes request off to controller. */
	router: (controller: Controller) => expressCore.RequestHandler;
}

export interface Controller {
	[key: string]: (
		request: expressCore.Request,
		response: expressCore.Response
	) => any;
}
