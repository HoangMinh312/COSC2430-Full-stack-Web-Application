import mongoose from "mongoose"

// define schema for customer user
const customerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: Buffer,
    contentType: String,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  }
  // other fields specific to customer users
});

// define schema for vendor user
const vendorSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: Buffer,
    contentType: String,
  },
  businessName: {
    type: String,
    required: true,
  },
  businessAddress: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now
  }
  // other fields specific to vendor users
});

// define schema for shipper user
const shipperSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: Buffer,
    contentType: String
  },
  name: {
    type: String,
    required: true,
  },
  distributionHub: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  }
  // other fields specific to shipper users
});

// create models for each user type
const Customer = mongoose.model('Customer', customerSchema);
const Vendor = mongoose.model('Vendor', vendorSchema);
const Shipper = mongoose.model('Shipper', shipperSchema);

export { Customer, Vendor, Shipper}