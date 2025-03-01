import express from 'express';
import mongoose from 'mongoose';
import partsRouter from './routes/parts';
import Part from './models/Part';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use('/api/parts', partsRouter);

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/inso-atv', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as any)
  .then(async () => {
    console.log('Connected to MongoDB');
    await insertDemoData();
  })
  .catch(err => console.error('MongoDB connection error:', err));

// Demo Data with 20+ Hotlinked Products
async function insertDemoData() {
  await Part.deleteMany({});
  await Part.insertMany([
    { name: 'Assassinator Mud Tires 28x10-14', description: 'High-performance mud tires for extreme terrains.', price: 299.99, inventory: 15, imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c' },
    { name: 'Wild Boar Big Wheel Kits 26x9-14', description: 'Massive wheel kits for ultimate upgrades.', price: 599.99, inventory: 5, imageUrl: 'https://images.pexels.com/photos/1637859/pexels-photo-1637859.jpeg' },
    { name: 'Inso Pro Lift Kit 3"', description: 'Lift your ATV for superior clearance.', price: 199.99, inventory: 15, imageUrl: 'https://pixabay.com/photos/atv-quad-bike-off-road-4x4-1234567/' },
    { name: 'High-Flow Exhaust System', description: 'Boost horsepower with this beast.', price: 349.99, inventory: 8, imageUrl: 'https://images.unsplash.com/photo-1565035010267-90e15ce89eee' },
    { name: '4500lb Winch Kit', description: 'Heavy-duty winch for off-road recovery.', price: 249.99, inventory: 12, imageUrl: 'https://images.pexels.com/photos/414829/pexels-photo-414829.jpeg' },
    { name: 'Snorkel Kit Pro', description: 'Engine protection for deep water.', price: 179.99, inventory: 20, imageUrl: 'https://pixabay.com/photos/atv-water-crossing-off-road-1234568/' },
    { name: 'Rugged Front Bumper', description: 'Steel bumper for tough trails.', price: 129.99, inventory: 18, imageUrl: 'https://images.unsplash.com/photo-1590674725456-4a6ba0e0b6e6' },
    { name: 'Performance Seat', description: 'Durable seat for long rides.', price: 149.99, inventory: 14, imageUrl: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg' },
    { name: 'LED Lighting Kit 50W', description: 'Bright lights for night rides.', price: 99.99, inventory: 25, imageUrl: 'https://pixabay.com/photos/atv-lights-night-off-road-1234569/' },
    { name: 'Cargo Rack System', description: 'Heavy-duty rack for gear.', price: 189.99, inventory: 10, imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff' },
    { name: 'Suspension Kit 2"', description: 'Enhance handling with this kit.', price: 279.99, inventory: 7, imageUrl: 'https://images.pexels.com/photos/159754/pexels-photo-159754.jpeg' },
    { name: 'Storage Box Pro', description: 'Lockable box for ATV gear.', price: 79.99, inventory: 30, imageUrl: 'https://pixabay.com/photos/atv-box-storage-off-road-1234570/' },
    { name: 'Steel Skid Plate', description: 'Undercarriage protection.', price: 129.99, inventory: 15, imageUrl: 'https://images.unsplash.com/photo-1565035010267-90e15ce89eee' },
    { name: 'Heavy-Duty Mud Flaps', description: 'Prevent mud splash.', price: 49.99, inventory: 20, imageUrl: 'https://images.pexels.com/photos/1637859/pexels-photo-1637859.jpeg' },
    { name: 'Performance Brake Pads', description: 'High-grip pads for stopping.', price: 89.99, inventory: 12, imageUrl: 'https://pixabay.com/photos/atv-brakes-parts-off-road-1234571/' },
    { name: 'Rear Bumper Guard', description: 'Protect your rear on trails.', price: 119.99, inventory: 10, imageUrl: 'https://images.unsplash.com/photo-1590674725456-4a6ba0e0b6e6' },
    { name: 'Air Filter Pro', description: 'Keep your engine clean.', price: 59.99, inventory: 25, imageUrl: 'https://images.pexels.com/photos/414829/pexels-photo-414829.jpeg' },
    { name: 'Chain Sprocket Kit', description: 'Smooth power transfer.', price: 139.99, inventory: 8, imageUrl: 'https://pixabay.com/photos/atv-chain-parts-off-road-1234572/' },
    { name: 'Tie-Down Straps', description: 'Secure your ATV for transport.', price: 29.99, inventory: 50, imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff' },
    { name: 'Handlebar Grips Pro', description: 'Comfort grips for long rides.', price: 39.99, inventory: 30, imageUrl: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg' },
    { name: 'Fuel Tank Guard', description: 'Protect your fuel tank.', price: 99.99, inventory: 15, imageUrl: 'https://pixabay.com/photos/atv-fuel-tank-off-road-1234573/' },
  ]);
  console.log('Demo data inserted with 21 hotlinked products!');
}

// In-Memory Cart (for Demo Simplicity)
let cart: { partId: string; quantity: number }[] = [];
app.post('/api/cart/add', async (req, res) => {
  const { partId, quantity = 1 } = req.body;
  if (!partId) return res.status(400).json({ error: 'Part ID required' });
  cart.push({ partId, quantity });
  res.json({ message: 'Added to cart', cart });
});
app.get('/api/cart', (req, res) => res.json(cart));
app.delete('/api/cart/remove/:partId', (req, res) => {
  cart = cart.filter(item => item.partId !== req.params.partId);
  res.json({ message: 'Removed from cart', cart });
});

// Custom Kit Request
app.post('/api/custom-kit', (req, res) => {
  const { name, preferences } = req.body;
  if (!name || !preferences) return res.status(400).json({ error: 'Name and preferences required' });
  console.log(`Shady request from ${name}: ${preferences}`);
  res.json({ message: `Custom kit quote: $1,500 - Call 555-666-7777 for a devious deal!` });
});

// Admin Stats
app.get('/api/admin', async (req, res) => {
  const parts = await Part.find();
  res.json({ parts, cart, totalSales: 150000, partsSold: 1200 });
});

// Root Route
app.get('/', (req, res) => res.send('Inso ATV Parts Demo Backend - Unleashed!'));

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT} - Let's get wild!`));