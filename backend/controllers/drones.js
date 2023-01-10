const axios = require('axios');
const { XMLParser, XMLValidator} = require('fast-xml-parser');

const dronesRouter = require('express').Router();

const droneArray = {
  drones: [],
  violations: [],
  timer: null
};

const findPilot = async (drone, distance) => {
  const pilotCheck = droneArray.violations.find(item => item.drone.serialNumber === drone.serialNumber);
  if (pilotCheck === undefined) {
    const pilot = await axios.get(`http://assignments.reaktor.com/birdnest/pilots/${drone.serialNumber}`)
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
      console.log('pilot not in array:', pilot.firstName, distance);
      const violation = {
        pilot: pilot.data,
        drone: drone,
        distance: distance,
        time: Date.now()
      };
      droneArray.violations.push(violation);
    }
  } else {
    console.log('pilot in array:', pilotCheck.pilot.firstName, distance);
    const newDistance = pilotCheck.distance <= distance ? pilotCheck.distance : distance;
    console.log(newDistance);
    const newViolations = droneArray.violations.map(item => (item.drone.serialNumber === drone.serialNumber ? { ...item, time: Date.now(), distance: newDistance } : item));
    droneArray.violations = newViolations;
  }
};

const countViolations = (drones) => {
  drones.forEach(drone => {
    const distance = Math.sqrt((250000 - drone.positionX) ** 2 + (250000 - drone.positionY) ** 2)/1000;
    if (distance < 100) {
      findPilot(drone, distance);
    }
  });
};

//  count server uptime and help to start polling
let serverTimer = 0;
droneArray.timer = Date.now();
const serverUptime = () => {
  serverTimer += 1;
  // droneArray.timer = serverTimer;
  setTimeout(serverUptime, 1000);
};

dronesRouter.get('/', async () => {
  let timer = 0;
  // start polling if there hasn't been any polling yet
  if (serverTimer === 0) {
    console.log('jorma');
    const getDrones = async () => {
      const drones = await axios.get('http://assignments.reaktor.com/birdnest/drones')
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
      if (drones) {
        // Validate the form of the XML data
        const validatedDrones = XMLValidator.validate(drones.data);
        // If true, parse the data to json format and return it
        if (validatedDrones === true) {
          const dronesJson = new XMLParser().parse(drones.data);
          const parsedDrones = dronesJson.report.capture.drone;
          countViolations(parsedDrones);
          // current drones in the area, replace earlier ones
          droneArray.drones = parsedDrones;
        } else if (validatedDrones.err) {
          const error = validatedDrones.err.msg;
          console.log(`XML is invalid: ${error}`);
        }
      }
      // log the number of api calls
      timer += 1;
      console.log(timer);
      setTimeout(getDrones, 5000);  
    };
    getDrones();
    serverUptime();
  }
});

module.exports = {
  dronesRouter,
  droneArray
};