import express from "express";

const app = express();

/**
 * Enables the request.body variables to be accessible when performing requests the has information sent
 * through the body.
 */
import bodyParser from "body-parser";

//  Registers the bodyParser middleware.
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);


/**
 * Requests that handle stock levels.
 */
import stockRouter from "./routers/stock_router.js";

app.use(stockRouter);

/**
 * Sets the port for the application to listen for requests that have to be handled.
 * This is the entire application's server event listener.
 * (Event meaning api calls through exposed routes).
 */
app.listen(3300, () => {
    console.log("application running on port: 3300");
});