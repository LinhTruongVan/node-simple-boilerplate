import express from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import compression from 'compression';
import bodyParser from 'body-parser';

import { notFoundErrorHandler, globalErrorHandler } from './utils/errorHandler';
import homeRoutes from './routes/homeRoutes';

// Create Express server
const app = express();

// Express configuration
app.set('port', process.env.PORT || 3000);
app.use(morgan('dev'));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Application routes
app.use('/', homeRoutes);

// Error handling
app.use(notFoundErrorHandler);
app.use(globalErrorHandler);

export default app;
