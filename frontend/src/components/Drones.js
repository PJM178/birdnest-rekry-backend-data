const Drones = (props) => {
  const drones = props.drones;

  return (
    <div>
      {drones.map((drone, i) =>
        <div key={i}>
          {Math.sqrt((250000 - drone.positionX) ** 2 + (250000 - drone.positionY) ** 2)/1000 < 100
            ? <div style={{ color: 'rgba(255, 99, 132, 1)' }}>{drone.manufacturer}</div>
            : <div style={{ color: 'rgba(124, 252, 0, 1)' }}>{drone.manufacturer}</div>
          }
        </div>)}
    </div>
  );
};

export default Drones;