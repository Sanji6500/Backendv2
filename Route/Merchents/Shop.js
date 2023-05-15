const express = require("express");
const router = express.Router();
const [
  MainShopCategory_Model,
  SubShopCategory_Model,
  ShopAndMerchent_Model,

  Shop_Model,
] = require("../../Model/Merchant/Shop/ShopInfosModel");

const errorResponse = require("../../Utills/ErrorResponse");

// Insert a new main shop category
router.post("/InsertShopCategory", async (req, res, next) => {
  const { MainShopCategoryName } = req.body;
  const Result = await MainShopCategory_Model.findOne({
    MainShopCategoryName: MainShopCategoryName,
  });

  if (Result)
    return next(new errorResponse("Main shop category already exists", 404));

  const AddMainShopCategory = new MainShopCategory_Model({
    MainShopCategoryName: MainShopCategoryName,
  });
  AddMainShopCategory.save()
    .then(() =>
      res.status(201).json({
        success: true,
      })
    )
    .catch((err) => next(new errorResponse(err, 500)));
});

// Insert a new sub shop category
router.post("/InsertSubShopCategory", async (req, res, next) => {
  const { MainShopCategoryName, SubShopCategoryName } = req.body;
  const Result = await SubShopCategory_Model.findOne({
    SubShopCategoryName: SubShopCategoryName,
  });
  if (Result)
    return next(new errorResponse("Sub Shop Category  already exists ", 400));

  const MainShopCategory_ID = await MainShopCategory_Model.findOne({
    MainShopCategoryName: MainShopCategoryName,
  }).select("_id");

  const AddSubShopCategoryName = new SubShopCategory_Model({
    MainShopCategory_ID: MainShopCategory_ID,

    SubShopCategoryName: SubShopCategoryName,
  });
  AddSubShopCategoryName.save()
    .then(() =>
      res.status(201).json({
        success: true,
      })
    )
    .catch((err) => next(new errorResponse(err, 500)));
});

// Insert a new  Shop
router.post("/InsertShop", async (req, res, next) => {
  const { SubShopCategoryName } = req.body;
  const ShopCategory_ID = await SubShopCategory_Model.findOne({
    SubShopCategoryName: SubShopCategoryName,
  }).select("_id");

  if (ShopCategory_ID) return next(new errorResponse("ShopCategory_ID", 400));

  const AddShop_Model = new Shop_Model({
    ShopCategory_ID: ShopCategory_ID,
    ...req.body,
  });
  AddShop_Model.save()
    .then(() =>
      res.status(201).json({
        success: true,
      })
    )
    .catch((err) => next(new errorResponse(err, 500)));
});

// Update a main shop category by name
router.put("/UpdateShopCategory/:id", async (req, res, next) => {
  const { id } = req.params;
  const { MainShopCategoryName } = req.body;

  await MainShopCategory_Model.findByIdAndUpdate(id, {
    MainShopCategoryName: MainShopCategoryName,
  })
    .then((updatedCategory) => {
      if (!updatedCategory) {
        return next(
          new errorResponse("Main shop category already exists", 404)
        );
      }
      res.status(200).json({
        success: true,
        updatedCategory,
      });
    })
    .catch((err) => next(new errorResponse(err, 500)));
});
// Update a main shop category by name
router.put("/UpdateSubShopCategory/:id", async (req, res, next) => {
  const { id } = req.params;
  const { SubShopCategoryName } = req.body;

  await SubShopCategory_Model.findByIdAndUpdate(id, {
    SubShopCategoryName: SubShopCategoryName,
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

// Update a main shop category by name
router.put("/UpdateShop/:id", async (req, res, next) => {
  const { id } = req.params;
  const ShopData = req.body;
  const { SubShopCategoryName } = req.body;
  const ShopCategory_ID = await SubShopCategory_Model.findOne({
    SubShopCategoryName: SubShopCategoryName,
  }).select("_id");

  await Shop_Model.findByIdAndUpdate(id, {
    ...ShopData,
    ShopCategory_ID: ShopCategory_ID,
  })
    .then((updatedShop) => {
      if (!updatedShop) {
        return next(new errorResponse("Shop not already exists", 404));
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
router.delete("/UpdateShopCategory/:id", async (req, res, next) => {
  const { id } = req.params;

  await MainShopCategory_Model.findByIdAndDelete(id)
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

// test later
/// to Delelte something u  must  Select Data than not  had subCategory
// Update a main shop category by name
router.delete("/UpdateShopCategory/:id", async (req, res, next) => {
  const { id } = req.params;

  await SubShopCategory_Model.findByIdAndDelete(id)
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
