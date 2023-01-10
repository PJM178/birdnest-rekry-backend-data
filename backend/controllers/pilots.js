const dronesRouter = require('../controllers/drones');
const pilotsRouter = require('express').Router();

// get droneArray object from dronesRouter and send it to the client
pilotsRouter.get('/', async (request, response) => {
  if (dronesRouter.droneArray) {
    response.status(200).json(dronesRouter.droneArray);
  } else {
    response.status(404);
  }
});

module.exports = {
  pilotsRouter
};