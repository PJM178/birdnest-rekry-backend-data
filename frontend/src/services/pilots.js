import axios from 'axios';
const baseUrl = '/api/pilots';

const getPilot = async (serialNumber) => {
  const response = await axios.post(baseUrl, { serialNumber: serialNumber });

  return response.data;
};

export default { getPilot };