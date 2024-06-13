const express = require('express');
const axios = require('axios');

const app = express();

app.post('/webhook', (req, res) => {
  console.log('Notificación recibida del webhook');

  axios.get('http://localhost:3000/temperatures')
    .then((response) => {
      const temperatures = response.data;
      console.log('Temperaturas obtenidas:', temperatures);
      // Aquí puedes realizar acciones adicionales con las temperaturas recibidas
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error('Error al obtener las temperaturas:', error);
      res.sendStatus(500);
    });
});

app.listen(3001, () => {
  console.log('Servidor webhook escuchando en el puerto 3001');
});