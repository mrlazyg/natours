const express = require('express');
const morgan = require('morgan');
const tourRoutes = require('./routes/TourRoutes');
const userRoutes = require('./routes/UserRoutes');
const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/tours', tourRoutes);
app.use('/api/v1/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App is running on ${PORT}`));
