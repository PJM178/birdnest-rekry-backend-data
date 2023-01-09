import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';
import annotationPlugin from 'chartjs-plugin-annotation';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend, annotationPlugin);

const options = {
  responsive: false,
  scales: {
    y: {
      beginAtZero: true,
      max: 500000
    },
    x: {
      beginAtZero: true,
      max: 500000
    }
  },
  plugins: {
    annotation: {
      annotations: {
        ellipse1: {
          type: 'ellipse',
          xMin: 150000,
          xMax: 350000,
          yMin: 150000,
          yMax: 350000,
          backgroundColor: 'rgba(255, 99, 132, 0.25)'
        }
      }
    }
  }
};

const ScatterPlot = (props) => {
  const data = {
    datasets: [
      {
        label: 'Drone',
        data: [],
        backgroundColor: 'rgba(124, 252, 0, 1)',
      },
      {
        label: 'NDZ drone',
        data: [],
        backgroundColor: 'rgba(255, 99, 132, 1)',
      },
    ],
  };

  props.drones.forEach(drone => {
    const distance = Math.sqrt((250000 - drone.positionX) ** 2 + (250000 - drone.positionY) ** 2)/1000;
    if (distance < 100) {
      data.datasets[1].data.push({ x: drone.positionX, y: drone.positionY });
    } else {
      data.datasets[0].data.push({ x: drone.positionX, y: drone.positionY });
    }
  });

  return (
    <Scatter width={300} height={300} options={options} data={data} />
  );
};

export default ScatterPlot;