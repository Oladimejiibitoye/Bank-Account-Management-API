const Account = require("../models/account");


const getPagination = (page, size) => {
  const currentPage = page;
  const limit = size ? +size : 25;
  const skip = currentPage ? currentPage * limit : 0;

  return { limit, skip };
};

const getPagingData = async (data, Model, page, size) => {
  const totalItems = await Model.countDocuments();
  const currentPage = page ? +page : 0;
  const limit = size ? +size : 25;
  const totalPages = Math.ceil(totalItems / limit);

  return {
    totalItems,
    totalPages,
    currentPage,
    data
  };
};

const generateAccountNumber = async() => {
  let newAccountNumber;
  let counter = 0;
  
  do {
    newAccountNumber = (1000000000 + counter).toString();
    counter++;
  } while (await Account.exists({ account_number: newAccountNumber }));
  
  return newAccountNumber;
}

module.exports = {
  getPagination,
  getPagingData,
  generateAccountNumber
}