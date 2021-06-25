const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/TourRoutes');
const userRouter = require('./routes/UserRoutes');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App is running on ${PORT}`));
