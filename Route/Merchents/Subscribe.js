const express = require("express");
const router = express.Router();
const errorResponse = require("../../Utills/ErrorResponse");
const MerchentModel = require("../../Model/Merchant/Shop/MerchentModel");

const Plan_Model = require("../../Model/Merchant/Subscribe and Plan/PlanModel");
const [
  Subscribe_Model,
  Invoice_Model,
] = require("../../Model/Merchant/Subscribe and Plan/SubscribeModel");

router.post("/InsertSubscribe", async (req, res, next) => {
  const { PlanName, email } = req.body;
  const existsPlan = await Plan_Model.findOne({
    PlanName: PlanName,
  });
  if (!existsPlan) return next(new errorResponse("Plan not found ", 404));

  const existsUser = await MerchentModel.findOne({
    email: email,
  });
  if (!existsUser) return next(new errorResponse("User not found", 404));

  const AddSubscribe_Model = new Subscribe_Model({
    Plan_ID: existsPlan._id,
    Merchent_ID: existsUser._id,
    ...req.body,
  });
  AddSubscribe_Model.save()
    .then(() =>
      res.status(201).json({
        success: true,
      })
    )
    .catch((err) => next(new errorResponse(err, 500)));
});

///-----------

router.post("/InsertInovice", async (req, res, next) => {
  const { PlanName, email } = req.body;
  const existsPlan = await Plan_Model.findOne({
    PlanName: PlanName,
  });
  if (!existsPlan) return next(new errorResponse("Plan not found ", 404));

  const existsUser = await MerchentModel.findOne({
    email: email,
  });
  if (!existsUser) return next(new errorResponse("User not found", 404));

  const AddInvoice_Model = new Invoice_Model({
    Plan_ID: existsPlan._id,
    Merchent_ID: existsUser._id,
    ...req.body,
  });
  AddInvoice_Model.save()
    .then(() =>
      res.status(201).json({
        success: true,
      })
    )
    .catch((err) => next(new errorResponse(err, 500)));
});

// Update a  subscribe  by  iD
router.put("/Updatesubscribe/:id", async (req, res, next) => {
  const { id } = req.params;
  const { PlanName } = req.body;

  const existsPlan = await Plan_Model.findOne({
    PlanName: PlanName,
  });
  if (!existsPlan) return next(new errorResponse("Plan not found ", 404));

  await Subscribe_Model.findByIdAndUpdate(id, {
    Plan_ID: existsPlan._id,
    ...req.body,
  })
    .then((updatedsubscribe) => {
      if (!updatedsubscribe) {
        return next(new errorResponse("Plan not found", 404));
      }
      res.status(200).json({
        success: true,
      });
    })
    .catch((err) => next(new errorResponse(err, 500)));
});
///----------Update-Invoice in future
//------*-------
////////------- just for test
router.delete("/deletePlan/:id", async (req, res, next) => {
  const { id } = req.params;

  await Subscribe_Model.findByIdAndDelete(id)
    .then((deletedsubscribe) => {
      if (!deletedsubscribe) {
        new errorResponse("Plan not Found ", 404);
      }
      res.status(200).json({
        success: true,
      });
    })
    .catch((err) => next(new errorResponse(err, 500)));
});

module.exports = router;
