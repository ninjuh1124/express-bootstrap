import { initializeServer } from '../index.js';
import controller from './controllers.js';
import routes from './routes.js';
const app = initializeServer();
if (app.loadRoutes) {
    app.loadRoutes([
        {
            path: '/',
            router: routes,
            controller: controller,
        },
    ]);
}
app.listen('8080');
//# sourceMappingURL=sample.js.map