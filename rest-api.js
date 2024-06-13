const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());

// Configuración de CORS para permitir todos los puertos y orígenes
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

// URI de conexión a MongoDB Atlas
const mongoUri = 'mongodb+srv://sdkgastaldi:nqgFvwFoTp2o0tlc@cluster0.0fh4emf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Conexión a la base de datos
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado a la base de datos');
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
  });

// Modelo de temperatura
const Temperature = mongoose.model('Temperature', {
  temperature: Number,
  timestamp: { type: Date, default: Date.now }
});

// Ruta para almacenar una temperatura
app.post('/temperatures', (req, res) => {
  const { temperature } = req.body;

  const newTemperature = new Temperature({ temperature });
  newTemperature.save()
    .then((savedTemperature) => {
      res.status(201).json(savedTemperature);
    })
    .catch((error) => {
      console.error('Error al almacenar la temperatura:', error);
      res.sendStatus(500);
    });
});

// Ruta para obtener todas las temperaturas
app.get('/temperatures', (req, res) => {
  Temperature.find()
    .then((temperatures) => {
      res.json(temperatures);
    })
    .catch((error) => {
      console.error('Error al obtener las temperaturas:', error);
      res.sendStatus(500);
    });
});

app.listen(3000, () => {
  console.log('API REST escuchando en el puerto 3000');
});
