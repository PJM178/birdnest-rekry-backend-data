import axios from 'axios';
const baseUrl = '/api/drones';

const getAllDrones = async () => {
  const response = await axios.get(baseUrl);

  return response.data;
};

export default { getAllDrones };