const WebSocket = require('ws');
const axios = require('axios');

const wss = new WebSocket.Server({ port: 6000 });

wss.on('connection', (ws) => {
  console.log('Cliente conectado');

  ws.on('message', (message) => {
    const data = JSON.parse(message);
    console.log(`Temperatura recibida: ${data.temperature}`);

    axios.post('http://localhost:3000/temperatures', data)
      .then((response) => {
        console.log('Temperatura almacenada en la base de datos');
      })
      .catch((error) => {
        console.error('Error al almacenar la temperatura:', error);
      });
  });
});