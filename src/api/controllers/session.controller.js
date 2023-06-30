import { generateToken } from "../../utils/jwt.utils.js";

const controller = {};

controller.registerUser = async (req, res) => {
  res.sendResponse.ok();
};

controller.loginUser = async (req, res) => {
  const user = {
    name: req.user.name,
    role: req.user.role,
    email: req.user.email,
    cart: req.user.cart,
  } // req.user viene dado por passport

  const accessToken = generateToken(user)
  const cookieExpirationTime = process.env.JWT_COOKIE_EXP_TIME_MS
  const cookieName = process.env.JWT_COOKIE_NAME
  res.cookie(cookieName, accessToken, {
    maxAge: cookieExpirationTime,
    httpOnly: true
  }).sendResponse.ok()

};

controller.githubAuthCallback= async (req, res) =>{
  const user = {
    name: req.user.name,
    role: req.user.role,
    email: req.user.email,
    cart: req.user.cart,
  };

  const accessToken = generateToken(user)
  const cookieExpirationTime = process.env.JWT_COOKIE_EXP_TIME_MS
  const cookieName = process.env.JWT_COOKIE_NAME
  res.cookie(cookieName, accessToken, {
    maxAge: cookieExpirationTime,
    httpOnly: true
  }).redirect('/products')
}

controller.endSession = async (req, res) => {
  const cookieName = process.env.JWT_COOKIE_NAME
  res.clearCookie(cookieName).redirect('/login')
};


export { controller as sessionController };
