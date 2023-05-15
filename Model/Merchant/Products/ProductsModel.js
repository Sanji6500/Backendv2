const mongoose = require("mongoose");

////------------------------------------------------
const HauptCategory = new mongoose.Schema({
  HauptCategoryName: {
    type: String,
    trim: true,
    required: true,
  },
});
////------------------------------------------------

const SubCategory = new mongoose.Schema({
  HauptCategory_ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "HauptCategory-Data",
    required: true,
  },
  SubCategoryName: {
    type: String,
    trim: true,
  },
});

////------------------------------------------------
const Product = new mongoose.Schema({
  SubCategory_ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory-Data",
  },
  Shop_ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop-Data",
    required: true,
  },

  Tag_ID: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tags-Data",
    },
  ],

  ProductName: {
    type: String,
    trim: true,
    required: true,
  },
  Price: {
    type: Number,
    trim: true,
  },
  PriceAfterDiscount: {
    type: Number,
    trim: true,
  },
  VendorName: {
    type: String,
    trim: true,
  },

  Link: {
    type: String,
    trim: true,
  },
  Desciption: {
    type: String,
    trim: true,
  },
  Unit: {
    type: String,
    trim: true,
  },
  ProductBarcode: {
    type: Number,
    trim: true,
  },
  Photos: [
    {
      type: String,
    },
  ],
});

////------------------------------------------------

const Tags = new mongoose.Schema({
  TagName: {
    type: String,
    trim: true,
    required: true,
  },
});

////------------------------------------------------

const ProductsTags = new mongoose.Schema({
  Tags_ID: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tags-Data",
      required: true,
    },
  ],
  Product_ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product-Data",
    required: true,
  },
});
////------------------------------------------------

const Tags_Model = mongoose.model("Tags-Data", Tags);
const ProductsTags_Model = mongoose.model("ProductsTags-Data", ProductsTags);

const HauptCategory_Model = mongoose.model("HauptCategory-Data", HauptCategory);
const SubCategory_Model = mongoose.model("SubCategory-Data", SubCategory);
const Product_Model = mongoose.model("Product-Data", Product);

module.exports = [
  HauptCategory_Model,
  SubCategory_Model,
  Product_Model,
  Tags_Model,
  ProductsTags_Model,
];
