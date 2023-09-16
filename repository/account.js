const Account = require("../models/account");

class AccountRepository {
  constructor(Account){
    this.Account = Account
  }
  async createAccountHolder(accountPayload) {
    return this.Account.create(accountPayload);
  }

  async fetchSingleAccountHolder(accountNumber){
    return this.Account.findOne({account_number: accountNumber})
  }

  async fetchAllAccountHolders(limit, skip){
    return this.Account.find()
      .limit(limit)
      .skip(skip)
      .exec();
  }
}

module.exports = new AccountRepository(Account)