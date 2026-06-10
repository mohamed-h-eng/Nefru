require("dotenv").config();

const mongoose = require("mongoose");
const Admin = require("../models/admin.model");

const seedSuperAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB for seeding Super Admin");

    const existingAdmin = await Admin.findOne({
      email: process.env.EMAIL_ADMIN,
    });

    if (existingAdmin) {
      console.log("Super Admin already exists. Skipping seeding.");
    }
    // Create New Admin

    const superAdminData = {
      username: "Super Admin",
      email: process.env.EMAIL_ADMIN,
      password: process.env.PASSWORD_ADMIN,
    };

    const admin = await Admin.create(superAdminData);

    console.log(`Super Admin created successfully: ${admin.email}`);
  } catch (error) {
    console.error("Error creating Super Admin:", error.message);
  } finally {
    await mongoose.connection.close();
    console.log("Database connection closed");
    process.exit(0);
  }
};

seedSuperAdmin();
