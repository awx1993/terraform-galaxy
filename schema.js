// models/User.js
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    provider: { type: String, enum: ["aws", "azure", "gcp"] }
  });