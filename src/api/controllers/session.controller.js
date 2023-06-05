import { UsersService } from "../services/users.service.js";

const controller = {};
const usersService = new UsersService();

controller.registerUser = async (req, res) => {
  const result = await usersService.createUser(req.body);
  res.sendResponse.ok({ data: result });
};

controller.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await usersService.getUserBy({ email, password });

  if (!user)
    return res.sendResponse.notFound({ message: "Wrong email/password" });

  req.session.user = {
    name: `${user.first_name} ${user.last_name}`,
    email: user.email,
    role: user.role,
  };

  req.session.save((err) => {
    err ? res.sendResponse.internalServerError() : res.sendResponse.ok();
  });
};

controller.endSession = async (req, res) => {
  req.session.destroy((err) => {
    err ? res.sendResponse.internalServerError() : res.sendResponse.ok();
  });
};


export { controller as sessionController };
