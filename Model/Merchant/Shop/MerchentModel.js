const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Merchent = new mongoose.Schema({
  email: {
    type: String,
    unique: [true, " Email is already exists"],
    required: true,
    validate: {
      validator: function (v) {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email address.`,
    },
  },
  password: {
    type: String,
    trim: true,
    minlength: 8,
    maxlength: 128,
    validate: [
      {
        validator: function (v) {
          return /[A-Z]/.test(v);
        },
        message: (props) =>
          `Password must contain at least one uppercase letter.`,
      },
      {
        validator: function (v) {
          return /[a-z]/.test(v);
        },
        message: (props) =>
          `Password must contain at least one lowercase letter.`,
      },
      {
        validator: function (v) {
          return /\d/.test(v);
        },
        message: (props) => `Password must contain at least one number.`,
      },
      {
        validator: function (v) {
          return /[^A-Za-z0-9]/.test(v);
        },
        message: (props) =>
          `Password must contain at least one special character.`,
      },
    ],
  },

  fristName: {
    type: String,
    trim: true,
    minlength: 2,
    maxlength: 255,
    validate: {
      validator: function (v) {
        return /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(v);
      },
      message: (props) => `${props.value} is not a valid first name.`,
    },
  },
  lastName: {
    type: String,
    trim: true,
    minlength: 2,
    maxlength: 255,
    validate: {
      validator: function (v) {
        return /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(v);
      },
      message: (props) => `${props.value} is not a valid last name.`,
    },
  },
  streetName: {
    type: String,
    trim: true,
    trim: true,
    minlength: 2,
    maxlength: 200,
  },
  hauseNumber: {
    type: String,
    required: true,
    trim: true,
    maxlength: 10,
  },
  cityName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 200,
  },
  counteryName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 200,
  },
  ZipCode: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 10,
  },
  telefonNumber: {
    type: Number,
    required: true,
    trim: true,
    validate: {
      validator: function (v) {
        return /^\+?\d{1,3}[- ]?\d{3}[- ]?\d{4}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number.`,
    },
  },

  restPasswordToken: String,
  restPasswordExpire: Date,
  isActive: Boolean,
});
////------------------------------------------------
Merchent.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(8);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
Merchent.methods.matchPasswords = async function (passwords) {
  return await bcrypt.compare(passwords, this.password);
};
Merchent.methods.getSigndtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const Merchent_Model = mongoose.model("Merchent-Data", Merchent);
module.exports = Merchent_Model;
