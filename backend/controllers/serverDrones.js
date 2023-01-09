const axios = require('axios');
const { XMLParser, XMLValidator} = require('fast-xml-parser');

const getDrones = async () => {
  console.log('jorma');
  setTimeout(getDrones, 1000);
};

getDrones();

// const drones = await axios.get('http://assignments.reaktor.com/birdnest/drones')
// .catch((error) => {
//   if (error.response) {
//     console.log('Axios error data:', error.response.data);
//     console.log('Axios error status:', error.response.status);
//     console.log('Axios error headers:', error.response.headers);
//   } else if (error.request) {
//     console.log('Axios no response received:', error.request);
//   } else {
//     console.log('Axios error:', error.message.data.error);
//   }
// });