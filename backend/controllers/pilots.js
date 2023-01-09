const axios = require('axios');

const dronesRouter = require('../controllers/drones');
const pilotsRouter = require('express').Router();

const pilotArray = [];

pilotsRouter.post('/', async (request, response) => {
  const body = request.body;
  // console.log(body);
  const pilot = await axios.get(`http://assignments.reaktor.com/birdnest/pilots/${body.serialNumber}`)
    .catch((error) => {
      if (error.response) {
        console.log('Axios error data:', error.response.data);
        console.log('Axios error status:', error.response.status);
        console.log('Axios error headers:', error.response.headers);
      } else if (error.request) {
        console.log('Axios no response received:', error.request);
      } else {
        console.log('Axios error:', error.message.data.error);
      }
    });
  if (pilot) {
    // console.log(pilot.data);
    pilotArray.push(pilot);
  }
});

pilotsRouter.get('/test', async (request, response) => {
  // const body = request.body;
  // // console.log(body);
  // const pilot = await axios.get(`http://assignments.reaktor.com/birdnest/pilots/${body.serialNumber}`)
  //   .catch((error) => {
  //     if (error.response) {
  //       console.log('Axios error data:', error.response.data);
  //       console.log('Axios error status:', error.response.status);
  //       console.log('Axios error headers:', error.response.headers);
  //     } else if (error.request) {
  //       console.log('Axios no response received:', error.request);
  //     } else {
  //       console.log('Axios error:', error.message.data.error);
  //     }
  //   });
  // if (pilot) {
  //   // console.log(pilot.data);
  //   response.status(200).json(pilot.data);
  // } else {
  //   response.status(404);
  // }
  response.json(dronesRouter.droneArray);
});

module.exports = {
  pilotsRouter,
  pilotArray
};