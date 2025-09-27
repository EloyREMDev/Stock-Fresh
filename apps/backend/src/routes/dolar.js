import express from 'express';
import { getDolarData } from '../services/dolar.js';

const router = express.Router();

// GET /api/dolar/rate
router.get('/rate', async (req, res) => {
  try {
    const data = await getDolarData();
    res.json(data);
  } catch (error) {
    console.error('Error al obtener la tasa del dólar:', error);
    res.status(500).json({ error: 'Failed to retrieve dolar rate' });
  }
});

export default router;
