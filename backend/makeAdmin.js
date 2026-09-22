import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import User from "./models/User.js";

dotenv.config();

const email = process.argv[2];

if (!email) {
  console.log("Usage: node makeAdmin.js your@email.com");
  process.exit(1);
}

await connectDB();

const user = await User.findOne({
  email: email.toLowerCase()
});

if (!user) {
  console.log("❌ User not found");
  await mongoose.connection.close();
  process.exit(1);
}

user.role = "admin";
await user.save();

console.log(`✅ ${user.email} is now an admin`);

await mongoose.connection.close();
process.exit(0);
