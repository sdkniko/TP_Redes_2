// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const App = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Temperatura',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  });

  const fetchTemperatures = () => {
    axios.get('http://localhost:3000/temperatures')
      .then(response => {
        const temperatures = response.data;

        // Selecciona solo algunos puntos de datos para espaciar más la gráfica
        const filteredTemperatures = temperatures.filter((temp, index) => index % 5 === 0);

        const labels = filteredTemperatures.map(temp => new Date(temp.timestamp).toLocaleTimeString());
        const data = filteredTemperatures.map(temp => temp.temperature);

        setChartData({
          labels,
          datasets: [
            {
              ...chartData.datasets[0],
              data,
            },
          ],
        });
      })
      .catch(error => {
        console.error('Error al obtener las temperaturas:', error);
      });
  };

  useEffect(() => {
    fetchTemperatures();
    const interval = setInterval(fetchTemperatures, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>Gráfico de Temperaturas</h1>
      <Line data={chartData} options={{ scales: { y: { beginAtZero: true } } }} />
    </div>
  );
};

export default App;
