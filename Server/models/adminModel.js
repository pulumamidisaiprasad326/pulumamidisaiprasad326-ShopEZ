import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  banner: { type: String },
  categories: { type: Array }
});

const Admin = mongoose.model("admin", adminSchema);

export default Admin;