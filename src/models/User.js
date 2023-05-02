const mongoose = require('mongoose');

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
    type: Image,
  },
  name: {
    type: String,
  },
  address: {
    type: String,
    required: true
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
    type: Image,
  },
  businessName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
    unique: true,
  },
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
    type: Image,
  },
  distributionHub: {
    type: String,
    required: true,
  }
  // other fields specific to shipper users
});

// create models for each user type
const Customer = mongoose.model('Customer', customerSchema);
const Vendor = mongoose.model('Vendor', vendorSchema);
const Shipper = mongoose.model('Shipper', shipperSchema);

module.exports = { Customer, Vendor, Shipper };