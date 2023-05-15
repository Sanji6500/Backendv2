const mongoose = require("mongoose");

const Adverstsing = new mongoose.Schema({
  Product_ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product-Data",
    required: true,
  },

  StartDate: {
    type: Date,
    trim: true,
    required: true,
    validate: {
      validator: function (v) {
        return v instanceof Date && !isNaN(v);
      },
      message: (props) => `${props.value} is not a valid date!`,
    },
  },
  EndeDate: {
    type: Number,
    trim: true,
    required: true,
    validate: {
      validator: function (v) {
        return v instanceof Date && !isNaN(v);
      },
      message: (props) => `${props.value} is not a valid date!`,
    },
  },
});

const Adverstsing_Model = mongoose.model("Adverstsing-Data", Adverstsing);

module.exports = [Adverstsing_Model];
