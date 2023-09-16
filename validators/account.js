const { body, check, validationResult, query, param } = require('express-validator');
const { StatusCodes } = require('http-status-codes');
const { AccountTypeEnum } = require('../helpers/enums');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const resultErrors = [];
  errors.array().forEach((err) => resultErrors.push({ [err.path]: err.msg }));

  const errorObject = Object.assign({}, ...resultErrors);
  return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(errorObject);
};

const enumCustom = (value, type, arrayEnum) => {
  if (!value) return Promise.reject(`${type} type cannot be empty`);
  if (!arrayEnum.includes(value)) {
    return Promise.reject(`${value} is not a valid ${type} type. Valid ${type} are: ${arrayEnum}`);
  }
};

const accountValidationRules = () => [
  body('first_name')
  .exists()
  .trim()
  .isString()
  .isAlpha()
  .notEmpty()
  .withMessage('Please provide first name and must be a string'),
  body('last_name')
  .exists()
  .trim()
  .isString()
  .isAlpha()
  .notEmpty()
  .withMessage('Please provide last name and must be a string'),
  body('date_of_birth')
  .exists()
  .trim()
  .isString()
  .isDate({ format: 'DD-MM-YYYY' })
  .notEmpty()
  .withMessage('date of birth is required'),
  body('account_type')
  .exists()
  .trim()
  .isString()  
  .withMessage('account_number is required and must be a string')
  .custom((value) => {
    return enumCustom(value, "Account Type", AccountTypeEnum) ?? true;
  })
]

const accountNumberValidationRules = (accountNumber) => {
  return [
    param(accountNumber)
    .isString()
    .notEmpty()
    .isLength(10)
    .withMessage('Please provide a valid account number')
  ];
};

module.exports = {
  validate,
  accountValidationRules,
  accountNumberValidationRules
}