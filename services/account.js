const { getPagination, getPagingData, generateAccountNumber } = require("../helpers/utilities");
const AccountRepository = require("../repository/account");
const AccountModel = require("../models/account")

class AccountService{
  constructor(AccountRepository){
    this.AccountRepository = AccountRepository
  }

  async createAccountHolderService(accountBody){
    accountBody.account_number = await generateAccountNumber()
    accountBody.bank_name = 'Flutterwave',
    accountBody.balance = 0.00
    return this.AccountRepository.createAccountHolder(accountBody)
  }

  async fetchSingleAccountHolderService(accountNumber){
    return this.AccountRepository.fetchSingleAccountHolder(accountNumber)
  }

  async fetchAllAccountHoldersService(page, size){
    const pageNumber = parseInt(page);
    const sizeNumber = parseInt(size);

    const {limit, skip} = getPagination(pageNumber, sizeNumber)
    const accountHolders = await this.AccountRepository.fetchAllAccountHolders(limit, skip)
    return getPagingData(accountHolders, AccountModel, pageNumber, sizeNumber )
  }
}


module.exports = new AccountService(AccountRepository)