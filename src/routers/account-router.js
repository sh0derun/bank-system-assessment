const {Router} = require("express");
const accountRouter = Router();
const controller = require("../controllers/account-controller");

/*
- Deposit API should accept amount to deposit and user Id, then return with the total amount that this user has after deposit. Check also if user Id is valid
- Withdrawal API should accept amount to withdraw and user Id, then return with the total amount that this user has after withdraw. Check also if user Id is valid
*/

accountRouter.put("/deposit", controller.accountValidator, controller.despositAmount);

accountRouter.put("/withdraw", controller.accountValidator, controller.withdrawAmount);

module.exports = accountRouter;