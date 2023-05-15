const mongoose = require("mongoose");

////------------------------------------------------
const Plan = new mongoose.Schema({
  PlanName: {
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
  Desciption: {
    type: String,
    trim: true,
    require: true,
  },
  PlanPrice: {
    type: String,
    trim: true,
    require: true,
  },

  PlanDuration: {
    type: Date,
    trim: true,
    require: true,
  },
});

const Plan_Model = mongoose.model("Plan-Data", Plan);

module.exports = Plan_Model;
