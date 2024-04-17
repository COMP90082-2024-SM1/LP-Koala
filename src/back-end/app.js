const express = require("express");
const authRouter = require("./routes/authRoute");
const userRouter = require("./routes/userRoute");
const app = express();

// TODO: Implement middlewares
app.use(express.json());
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// TODO: Implement routers
app.use("/users", userRouter);

// TODO: Implement global error handler here
//app.use(globalErrorHandler);

module.exports = app;
