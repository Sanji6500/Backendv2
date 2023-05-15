const express = require("express");
const router = express.Router();
const [
  HauptCategory_Model,
  SubCategory_Model,
  Product_Model,
  Tags_Model,
  ProductsTags_Model,
] = require("../../Model/Merchant/Products/ProductsModel");
const upload = require("../../Middelware/Upload");
const fs = require("fs");

// const [
//   MainShopCategory_Model,
//   SubShopCategory_Model,
//   ShopAndMerchent_Model,

//   Shop_Model,
// ] = require("../../Model/Merchant/Shop/ShopInfosModel");

const errorResponse = require("../../Utills/ErrorResponse");

// Insert a new main shop category
router.post("/InsertHauptCategory", async (req, res, next) => {
  const { HauptCategoryName } = req.body;
  const Result = await HauptCategory_Model.findOne({
    HauptCategoryName: HauptCategoryName,
  });

  if (Result)
    return next(new errorResponse("HauptCategory  already exists", 400));

  const AddHauptCategory_Model = new HauptCategory_Model({
    HauptCategoryName: HauptCategoryName,
  });
  AddHauptCategory_Model.save()
    .then(() =>
      res.status(201).json({
        success: true,
      })
    )
    .catch((err) => next(new errorResponse(err, 500)));
});

// Insert a new sub shop category
router.post("/InsertSubCategory", async (req, res, next) => {
  const { HauptCategoryName, SubCategoryName } = req.body;
  const ExistingSubCategory = await SubCategory_Model.findOne({
    SubCategoryName: SubCategoryName,
  });

  if (ExistingSubCategory) {
    return next(new errorResponse("SubCategory already exists", 400));
  }

  const HauptCategory_ID = await HauptCategory_Model.findOne({
    HauptCategoryName: HauptCategoryName,
  }).select("_id");

  const AddSubCategory_Model = new SubCategory_Model({
    HauptCategory_ID: HauptCategory_ID,

    SubCategoryName: SubCategoryName,
  });
  AddSubCategory_Model.save()
    .then(() =>
      res.status(201).json({
        success: true,
      })
    )
    .catch((err) => next(new errorResponse(err, 500)));
});

// Insert a new main shop category
router.post("/InsertTag", async (req, res, next) => {
  const { TagName } = req.body;
  const Result = await Tags_Model.findOne({
    TagName: TagName,
  });

  if (Result) return next(new errorResponse("Tag Name  already exists", 400));

  const AddTags_Model = new Tags_Model({
    TagName: TagName,
  });
  AddTags_Model.save()
    .then(() =>
      res.status(201).json({
        success: true,
      })
    )
    .catch((err) => next(new errorResponse(err, 500)));
});

// Insert a new  Product
router.post(
  "/InsertProduct",
  upload.upload.single("Photos"),
  async (req, res, next) => {
    const { SubCategoryName, ShopName, ProductName, ProductBarcode } = req.body;

    const SubCategory_ID = await SubCategory_Model.findOne({
      SubCategoryName: SubCategoryName,
    }).select("_id");

    const Shop_ID = await Shop_Model.findOne({
      ShopName: ShopName,
    }).select("_id");

    const ExistingProduct = await Product_Model.findOne({
      $or: [{ ProductName: ProductName }, { ProductBarcode: ProductBarcode }],
    });

    if (ExistingProduct) {
      fs.unlink(req.file.path, function (err) {
        if (err) return console.log(err);
      });
      return res.json({ Message: " Product already exists", Success: false });
    }

    const AddProduct_Model = new Product_Model({
      SubCategory_ID: SubCategory_ID,
      Shop_ID: Shop_ID,
      Photos: req.file.path,
      ...req.body,
    });
    AddProduct_Model.save()
      .then(() =>
        res.status(201).json({
          success: true,
        })
      )
      .catch((err) => next(new errorResponse(err, 500)));
  }
);
//////////////-----------------------------------

// Update a  HauptCategory category by  iD
router.put("/UpdateHauptCategory/:id", async (req, res, next) => {
  const { id } = req.params;
  const { HauptCategoryName } = req.body;

  await HauptCategory_Model.findByIdAndUpdate(id, {
    HauptCategoryName: HauptCategoryName,
  })
    .then((updatedCategory) => {
      if (!updatedCategory) {
        return next(new errorResponse("HauptCategory already exists", 404));
      }
      res.status(200).json({
        success: true,
        updatedCategory,
      });
    })
    .catch((err) => next(new errorResponse(err, 500)));
});
// Update a main shop category by name
router.put("/UpdateSubCategory/:id", async (req, res, next) => {
  const { id } = req.params;
  const { SubCategoryName } = req.body;

  await SubCategory_Model.findByIdAndUpdate(id, {
    SubCategoryName: SubCategoryName,
  })
    .then((updatedCategory) => {
      if (!updatedCategory) {
        return next(
          new errorResponse("SubShopCategory not already exists", 404)
        );
      }
      res.status(200).json({
        success: true,
        updatedCategory,
      });
    })
    .catch((err) => next(new errorResponse(err, 500)));
});

// Update a  Product  category by name
router.put("/UpdateProduct/:id", async (req, res, next) => {
  const { id } = req.params;
  const ProductData = req.body;
  const { SubCategoryName } = req.body;

  const SubCategory_ID = await SubCategory_Model.findOne({
    SubCategoryName: SubCategoryName,
  }).select("_id");

  await Shop_Model.findByIdAndUpdate(id, {
    ...ProductData,
    SubCategory_ID: SubCategory_ID,
  })
    .then((updatedShop) => {
      if (!updatedShop) {
        return next(new errorResponse("Product not already exists", 404));
      }
      res.status(200).json({
        success: true,
        updatedShop,
      });
    })
    .catch((err) => next(new errorResponse(err, 500)));
});
// test later
/// to Delelte something u  must  Select Data than not  had subCategory
// Update a main shop category by name
router.delete("/deleteShopCategory/:id", async (req, res, next) => {
  const { id } = req.params;

  await HauptCategory_Model.findByIdAndDelete(id)
    .then((deletedCategory) => {
      if (!deletedCategory) {
        new errorResponse("HauptCategory  already exists", 404);
      }
      res.status(200).json({
        success: true,
      });
    })
    .catch((err) => next(new errorResponse(err, 500)));
});

// test later
/// to Delelte something u  must  Select Data than not  had subCategory
// Update a main shop category by name
router.delete("/DeleteSubCategory/:id", async (req, res, next) => {
  const { id } = req.params;

  await SubCategory_Model.findByIdAndDelete(id)
    .then((deletedCategory) => {
      if (!deletedCategory) {
        new errorResponse("Main shop category already exists", 404);
      }
      res.status(200).json({
        success: true,
      });
    })
    .catch((err) => next(new errorResponse(err, 500)));
});

module.exports = router;
