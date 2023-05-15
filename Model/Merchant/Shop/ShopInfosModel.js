const mongoose = require("mongoose");

////------------------------------------------------

const ShopAndMerchent = new mongoose.Schema({
  Shop_ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop-Data",
  },
  Merchent_ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Merchent-Data",
  },
});

////------------------------------------------------
const MainShopCategory = new mongoose.Schema({
  MainShopCategoryName: {
    type: String,
    trim: true,
  },
});

////------------------------------------------------
const SubShopCategory = new mongoose.Schema({
  MainShopCategory_ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MainShopCategory-Data",
  },
  SubShopCategoryName: {
    type: String,
    trim: true,
  },
});
////------------------------------------------------
const Shop = new mongoose.Schema({
  ShopName: {
    type: String,
    trim: true,
  },
  ShopCategory_ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubShopCategory-Data",
  },
  Street: {
    type: String,
    trim: true,
  },
  HouseNumber: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    trim: true,
  },
  State: {
    type: String,
    trim: true,
  },
  ZipCode: {
    type: Number,
    trim: true,
  },
  ShopTelefon: {
    type: String,
    trim: true,
  },
  GoogleMapPoint: String,

  Loge: {
    type: String,
  },
});
const ShopAndMerchent_Model = mongoose.model(
  "ShopAndMerchent-Data",
  ShopAndMerchent
);
const MainShopCategory_Model = mongoose.model(
  "MainShopCategory-Data",
  MainShopCategory
);
const SubShopCategory_Model = mongoose.model(
  "SubShopCategory-Data",
  SubShopCategory
);

const Shop_Model = mongoose.model("Shop-Data", Shop);

module.exports = [
  MainShopCategory_Model,
  SubShopCategory_Model,
  ShopAndMerchent_Model,
  Shop_Model,
];
