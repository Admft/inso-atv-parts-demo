import express from 'express';
import Part from '../models/Part';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const parts = await Part.find();
    res.json(parts);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;