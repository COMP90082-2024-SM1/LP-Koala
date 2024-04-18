const express = require('express');
const authRouter = require('./routes/authRoute');
const userRouter = require('./routes/userRoute');
const projectRouter = require('./routes/projectRoute');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
app.use(cors());

app.use('/users', userRouter);
app.use('/projects', projectRouter);
// TODO: Implement global error handler here
//app.use(globalErrorHandler);

module.exports = app;
