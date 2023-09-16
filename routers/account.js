const AccountController = require("../controllers/account");
const { accountValidationRules, validate, accountNumberValidationRules } = require("../validators/account");

const router = require("express").Router();



router.post('/', accountValidationRules(), validate, AccountController.createAccountHolder)
router.get('/', AccountController.fetchAllAccountHolder)
router.get('/:accountNumber', accountNumberValidationRules('accountNumber'), validate, AccountController.fetchAccountHolder)

module.exports = router;