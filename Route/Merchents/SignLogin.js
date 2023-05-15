const router = require("express").Router();
const errorResponse = require("../../Utills/ErrorResponse");
const MerchentModel = require("../../Model/Merchant/Shop/MerchentModel");

router.post("/register", async (req, res, next) => {
  const { email } = req.body;

  const UserExists = await MerchentModel.findOne({ email: email });

  if (!UserExists) {
    const AddMerchent = new MerchentModel(req.body);
    AddMerchent.save()
      .then(() => sendtoken(AddMerchent, res))
      .catch((err) => next(new errorResponse(err, 500)));
  } else return next(new errorResponse("Email is already exists", 409));
});
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  MerchentModel.findOne({ email: email })
    .select("+password")
    .then(async (Result) => {
      if (!Result) return next(new errorResponse("User Not Found", 404));

      isMatch = await Result.matchPasswords(password);
      if (!isMatch) return next(new errorResponse("Password is wrong", 401));

      sendtoken(Result, res);
    })
    .catch((err) => next(new errorResponse(err, 500)));
});
const sendtoken = (Model, res) => {
  const token = Model.getSigndtToken();
  res.json({ Succes: true, token });
};
module.exports = router;
