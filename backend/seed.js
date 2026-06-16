import mongoose from 'mongoose';
import { env } from './src/config/env.js';
import { User } from './src/models/user.model.js';
import { Trip } from './src/models/trip.model.js';

const seedData = async () => {
  try {
    await mongoose.connect(env.mongoUri);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await User.deleteMany({ email: 'guide@nefru.com' });
    await Trip.deleteMany({});

    // 1. Create a Test Guide
    const guide = await User.create({
      name: 'Ahmed Hassan',
      email: 'guide@nefru.com',
      password: 'password123', // In a real app, this should be hashed
      role: 'guide'
    });

    console.log('Test Guide created.');

    // 2. Create Sample Trips
    const trips = [
      {
        title: 'Sunsets at Giza',
        description: 'Experience the majestic pyramids at the golden hour with a professional photographer.',
        location: 'Giza, Egypt',
        price: 45,
        duration: '3 hours',
        category: 'History',
        guide: guide._id,
        image: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&q=80&w=1000'
      },
      {
        title: 'Luxor Temple Night Tour',
        description: 'Walk through the illuminated columns of Luxor Temple after the crowds have left.',
        location: 'Luxor, Egypt',
        price: 60,
        duration: '4 hours',
        category: 'History',
        guide: guide._id,
        image: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&q=80&w=1000'
      },
      {
        title: 'Cairo Street Food Crawl',
        description: 'Taste the best Koshary, Falafel, and desserts in the hidden alleys of Old Cairo.',
        location: 'Cairo, Egypt',
        price: 30,
        duration: '2.5 hours',
        category: 'Food',
        guide: guide._id,
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=1000'
      },
      {
        title: 'Red Sea Snorkeling',
        description: 'Dive into the crystal clear waters of Hurghada and explore vibrant coral reefs.',
        location: 'Hurghada, Egypt',
        price: 85,
        duration: 'Full Day',
        category: 'Adventure',
        guide: guide._id,
        image: 'https://images.unsplash.com/photo-1544551763-47a0159c92b2?auto=format&fit=crop&q=80&w=1000'
      }
    ];

    await Trip.insertMany(trips);
    console.log(`${trips.length} Sample Trips created.`);

    console.log('Seeding completed successfully!');
    process.exit();
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedData();
