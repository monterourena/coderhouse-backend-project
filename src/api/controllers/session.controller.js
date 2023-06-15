import { UsersService } from "../services/users.service.js";

const controller = {};
const usersService = new UsersService();

controller.registerUser = async (req, res) => {
  res.sendResponse.ok();
};

controller.failedRegister = async (req, res) =>{
  res.sendResponse.badRequest({ message: req.session.messages })
}

controller.loginUser = async (req, res) => {
  req.session.user = {
    name: req.user.name,
    role: req.user.role,
    email: req.user.email,
  } // req.user viene dado por passport

  req.session.save((err) => {
    err ? res.sendResponse.internalServerError() : res.sendResponse.ok()
  })
};
controller.failedLogin = async (req, res) =>{
  res.sendResponse.badRequest({ message: req.session.messages })
}


controller.githubAuthCallback= async (req, res) =>{
  const user = req.user;

  req.session.user = {
    id: user._id,
    name: user.first_name,
    email: user.email,
    role: user.role,
  };

  res.redirect('/products')
}

controller.endSession = async (req, res) => {
  req.session.destroy((err) => {
    err ? res.sendResponse.internalServerError() : res.sendResponse.ok();
  });
};


export { controller as sessionController };
