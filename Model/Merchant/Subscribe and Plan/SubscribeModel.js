const mongoose = require("mongoose");

////------------------------------------------------
const Subscribe = new mongoose.Schema({
  Plan_ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plan-Data",
    trim: true,
    require: true,
  },
  Merchent_ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Merchent-Data",
    trim: true,
    require: true,
  },
  SubscribeStart: {
    type: Date,
    trim: true,
    require: true,
  },
  SubscribeEnde: {
    type: Date,
    trim: true,
    require: true,
  },
  SubscribContinue: {
    type: Boolean,
    trim: true,
    require: true,
  },
});

const Invoice = new mongoose.Schema({
  Plan_ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plan-Data",
    trim: true,
    require: true,
  },
  User_ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Merchent-Data",
    trim: true,
    require: true,
  },
  InvoiceStart: {
    type: Date,
    trim: true,
    require: true,
  },

  InvoiceEnde: {
    type: Date,
    trim: true,
    require: true,
  },
  InvoiceDescription: {
    type: String,
    trim: true,
    require: true,
  },
  InvoiceAmount: {
    type: Number,

    trim: true,
    require: true,
  },
  InvoiceDescription: {
    type: String,

    trim: true,
    require: true,
  },
});

const Subscribe_Model = mongoose.model("Subscribe-Data", Subscribe);
const Invoice_Model = mongoose.model("Invoice-Data", Invoice);

module.exports = [Subscribe_Model, Invoice_Model];
