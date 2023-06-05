import { userModel } from "../models/user.model.js";
class UsersService {
  getUserBy = (param) => userModel.findOne(param)

  createUser = (userData) => {
    return userModel.create(userData);
  };
}

export {UsersService}