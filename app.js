const express = require("express");
require("dotenv").config();
const cors = require("cors");
const helmet = require('helmet');
const logger = require('morgan');
const rtracer = require('cls-rtracer');
const accountRouter = require("./routers/account");
const { errorHandler } = require('./middlewares/error-handler');
const { setCache } = require("./middlewares/cache");


const app = express();

//middleWares
app.use(helmet.hidePoweredBy());
app.use(express.json({ limit: '200mb' }));
app.use(
  express.urlencoded({
    limit: '200mb',
    extended: true,
    parameterLimit: 1000000,
  }),
);
app.use(cors());

app.use(rtracer.expressMiddleware());

// logging
const loggerFormat
  = '[:requestId] :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"';
app.use(logger(loggerFormat)); // to output stream logss to the console
logger.token('requestId', () => rtracer.id());

//routes
app.use("/api/v1/accounts", accountRouter );

//cache
app.use(setCache)
// Global error handler
app.use(errorHandler);


module.exports = app


