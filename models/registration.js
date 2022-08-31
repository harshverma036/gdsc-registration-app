const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    roll: {
      type: String,
    },
    department: {
      type: String,
    },
    college: {
        type: String,
      },
    token: {
        type: String
    }
  },
  {
    timestamps: true,
  }
);

const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration;