const { successResMsg } = require("../helpers/response");
const AccountService = require("../services/account");
const {StatusCodes} = require("http-status-codes");


class AccountController {
  async createAccountHolder(req, res, next){
    try {
      const accountHolder = await AccountService.createAccountHolderService(req.body)
      return successResMsg(res, StatusCodes.CREATED, {
        data: accountHolder
      })
    } catch (error) {
      next(error)
    }
  }
  async fetchAllAccountHolder(req, res, next) {
    try {
      const {page, size} = req.query;
      const accountHolders = await AccountService.fetchAllAccountHoldersService(page, size)
      return successResMsg(res, StatusCodes.OK, {
        data: accountHolders
      })
    } catch (error) {
      next(error)
    }
  }

  async fetchAccountHolder(req, res, next) {
    try {
      const accountHolder = await AccountService.fetchSingleAccountHolderService(req.params.accountNumber);
      return successResMsg(res, StatusCodes.OK, {
        data: accountHolder
      })
    } catch (error) {
      next(error)
    }
  }
}


module.exports = new AccountController()
