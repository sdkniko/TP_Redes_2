const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:6000');
ws.on('error', (error) => {
  console.error('Error en el cliente WebSocket:', error);
});
ws.on('open', () => {
  console.log('Conectado al servidor WebSocket');

  setInterval(() => {
    const minTemp = 10;
    const maxTemp = 40;
    const temperature = Math.floor(Math.random() * (maxTemp - minTemp + 1)) + minTemp;
    ws.send(JSON.stringify({ temperature }));
    console.log(`Temperatura enviada: ${temperature}`);
  }, 5000);
});
