const express = require("express");
const router = express.Router();
const errorResponse = require("../../Utills/ErrorResponse");

const Plan_Model = require("../../Model/Merchant/Subscribe and Plan/PlanModel");

router.post("/InsertPlan", async (req, res, next) => {
  const { PlanName } = req.body;
  const exists = await Plan_Model.findOne({
    PlanName: PlanName,
  });
  if (exists)
    return next(new errorResponse("HauptCategory  already exists", 400));

  const AddPlan_Model = new Plan_Model(req.body);
  AddPlan_Model.save()
    .then(() =>
      res.status(201).json({
        success: true,
      })
    )
    .catch((err) => next(new errorResponse(err, 500)));
});

///-----------

// Update a  HauptCategory category by  iD
router.put("/UpdatePlan/:id", async (req, res, next) => {
  const { id } = req.params;
  const { PlanName } = req.body;

  await Plan_Model.findByIdAndUpdate(id, {
    PlanName: PlanName,
  })
    .then((updatedPlan) => {
      if (!updatedPlan) {
        return next(new errorResponse("Plan not found ", 404));
      }
      res.status(200).json({
        success: true,
        updatedPlan,
      });
    })
    .catch((err) => next(new errorResponse(err, 500)));
});
///-----------
router.delete("/deletePlan/:id", async (req, res, next) => {
  const { id } = req.params;

  await Plan_Model.findByIdAndDelete(id)
    .then((deletedPlan) => {
      if (!deletedPlan) {
        new errorResponse("Plan not Found ", 404);
      }
      res.status(200).json({
        success: true,
      });
    })
    .catch((err) => next(new errorResponse(err, 500)));
});

module.exports = router;
