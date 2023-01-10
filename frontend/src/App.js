import pilotService from './services/pilots';
import droneService from './services/drones';
import { useState, useEffect } from 'react';

import Drones from './components/Drones';
import ScatterPlot from './components/ScatterPlot';
import Pilots from './components/Pilots';

const App = () => {
  const [drones, setDrones] = useState([]);
  const [timer, setTimer] = useState(1);
  const [violations, setViolations] = useState([]);
  const [uptime, setUptime] = useState(null);

  const timeout = () => {
    setTimeout(() => {
      setTimer(timer+1);
    }, 1000);
  };

  useEffect(() => {
    // call the api to start polling on refresh
    droneService.startPolling();
  }, []);

  useEffect(() => {
    const getDrones = async () => {
      // refactored code to keep the data on server so the route is slightly confusing
      const drones = await pilotService.getPilot();
      setDrones(drones.drones);
      setViolations(drones.violations);
      setUptime(Math.floor(Math.abs(drones.timer - Date.now())/1000));
    };
    getDrones();
    timeout();
    return () => {
      clearTimeout(timeout);
    };
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
        <Pilots violations={violations} uptime={uptime} />
      </div>
    </div>
  );
};

export default App;
