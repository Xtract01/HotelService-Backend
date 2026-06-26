import express from "express";
import { serverConfig } from "./config";
import v1Router from "./routers/v1/index.router";
import v2Router from "./routers/v2/index.router";
import {
  appErrorHandler,
  genericErrorHandler,
} from "./middlewares/error.middleware";
import logger from "./config/logger.config";
import { attachCorrelationIdMiddleware } from "./middlewares/correlation.middleware";
import sequelize from "./db/models/sequelize";
import Hotel from "./db/models/hotel";
const app = express();

app.use(express.json());
app.use(attachCorrelationIdMiddleware);
app.use("/api/v1", v1Router);
app.use("/api/v2", v2Router);
app.use(appErrorHandler);
app.use(genericErrorHandler);

app.listen(serverConfig.PORT, async () => {
  logger.info(`Server is running on http://localhost:${serverConfig.PORT}`);
  logger.info(`Press Ctrl+C to stop the server.`);
  try {
    await sequelize.authenticate();
    logger.info("Database connection established successfully.");
    const hotel = await Hotel.create({
      name: "Hotel New York",
      address: "123 Main St, New York, NY",
      location: "New York",
      rating: 4.7,
      ratingCount: 10,
    });
    logger.info("Test hotel created successfully.", hotel.toJSON());
  } catch (error) {
    logger.error("Error occurred while creating test hotel.", error);
  }
});
