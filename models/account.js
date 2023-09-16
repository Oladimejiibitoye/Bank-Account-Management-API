const mongoose = require("mongoose");
const { AccountTypeEnum } = require("../helpers/enums");


const accountSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  bank_name: {
    type: String,
    required: true
  },
  account_number: {
    type: String,
    unique: true,
    required: true
  },
  date_of_birth: {
    type: Date,
    required: true
  },
  account_type: {
    type: String,
    enum: AccountTypeEnum,
    required: true
  },
  balance: {
    type: Number,
    required: true,
    default: 0.00
  }
},
{ timestamps: true }
);

module.exports = mongoose.model('account', accountSchema);