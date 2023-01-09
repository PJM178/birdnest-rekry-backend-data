const express = require('express');
const app = express();
const cors = require('cors');

// Controllers
const dronesRouter = require('./controllers/drones');
const pilotsRouter = require('./controllers/pilots');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('build'));

// API endpoints
app.use('/api/drones', dronesRouter.dronesRouter);
app.use('/api/pilots', pilotsRouter.pilotsRouter);

module.exports = app;