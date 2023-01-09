import droneService from './services/drones';
import pilotService from './services/pilots';
import { useState, useEffect } from 'react';

import Drones from './components/Drones';
import ScatterPlot from './components/ScatterPlot';
import Pilots from './components/Pilots';

const App = () => {
  const [drones, setDrones] = useState([]);
  const [timer, setTimer] = useState(1);
  const [violations, setViolations] = useState([]);

  const timeout = () => {
    setTimeout(() => {
      console.log('tik-tok', timer);
      setTimer(timer+1);
    }, 5000);
  };

  const findPilot = async (drone, distance) => {
    const pilotCheck = violations.find(item => item.drone.serialNumber === drone.serialNumber);
    if (pilotCheck === undefined) {
      const pilot = await pilotService.getPilot(drone.serialNumber);
      console.log('pilot not in array:', pilot.firstName, distance);
      setViolations(violations => [...violations, {
        pilot: pilot,
        drone: drone,
        distance: distance,
        time: Date.now()
      }]);
    } else {
      console.log('pilot in array:', pilotCheck.pilot.firstName, distance);
      const newDistance = pilotCheck.distance <= distance ? pilotCheck.distance : distance;
      console.log(newDistance);
      setViolations(violations => violations.map(item => (item.drone.serialNumber === drone.serialNumber ? { ...item, time: Date.now(), distance: newDistance } : item)));
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

  useEffect(() => {
    const getDrones = async () => {
      const drones = await droneService.getAllDrones();
      setDrones(drones.report.capture.drone);
      countViolations(drones.report.capture.drone);
    };
    getDrones();
    timeout();
  }, [timer]);


  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div style={{ height: 'fit-content' }}>
          <ScatterPlot drones={drones}/>
          <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
            <h3>Drones in the area</h3>
            <div><Drones drones={drones} /></div>
          </div>
        </div>
        <Pilots violations={violations} />
      </div>
    </div>
  );
};

export default App;
