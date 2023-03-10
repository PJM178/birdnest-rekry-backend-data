import axios from 'axios';
const baseUrl = '/api/pilots';

const getPilot = async () => {
  const response = await axios.get(baseUrl);

  return response.data;
};

export default { getPilot };