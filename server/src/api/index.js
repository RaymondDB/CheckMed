const express = require('express');
const bodyParser = require('body-parser');
const appointmentRoutes = require('./routes/appointmentRoutes');
const statusRoutes = require('./routes/statusRoutes');
const { sqlConnection } = require('../infrastructure/db/dbconfig');

const app = express();
app.use(bodyParser.json());
app.use('/appointments', appointmentRoutes);
app.use('/statuses', statusRoutes);

sqlConnection();

app.listen(3000, () => {
    console.log('API running on port 3000');
});