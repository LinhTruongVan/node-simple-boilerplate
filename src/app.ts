import express from "express";
import "express-async-errors";
import morgan from "morgan";
import compression from "compression";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import seedAsync from "./seedAsync";
import logger from "./utils/logger";
import { notFoundErrorHandler, globalErrorHandler } from "./utils/errorHandler";

import appRoutes from "./routes";

// Create Express server
const app = express();

(<any>mongoose).Promise = global.Promise;
mongoose
  .connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true }
  )
  .then(seedAsync)
  .catch(err => {
    logger.error("MongoDB connection error.", err);
    process.exit();
  });

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(morgan("dev"));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Application routes
app.use("/v1", appRoutes);

// Error handling
app.use(notFoundErrorHandler);
app.use(globalErrorHandler);

export default app;
