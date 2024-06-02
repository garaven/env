const express = require('express');
const router = express.Router();
const { devicesList } = require('../controllers/deviceController');

router.get('/api/analytics', (req, res) => {
  devicesList((err, devices) => {
    if (err) {
      return res.status(500).json({ error: 'Error retrieving devices' });
    }

    // Procesa los datos de dispositivos para los gráficos
    const totalConsumption = devices.reduce((sum, device) => sum + device.consumption, 0);
    
    const deviceDistribution = devices.reduce((acc, device) => {
      acc[device.device_type] = (acc[device.device_type] || 0) + device.consumption;
      return acc;
    }, {});

    const consumptionTrend = devices.reduce((acc, device) => {
      const month = new Date(device.date).getMonth();
      acc[month] = (acc[month] || 0) + device.consumption;
      return acc;
    }, {});

    // Convierte el objeto a un array de datos para el gráfico de distribución de dispositivos
    const deviceDistributionData = Object.entries(deviceDistribution).map(([name, value]) => ({ name, value }));

    // Convierte el objeto a un array de datos para la tendencia de consumo
    const consumptionTrendData = Array.from({ length: 12 }, (_, i) => consumptionTrend[i] || 0);

    res.json({
      totalConsumption,
      deviceDistributionData,
      consumptionTrendData
    });
  });
});

module.exports = router;
