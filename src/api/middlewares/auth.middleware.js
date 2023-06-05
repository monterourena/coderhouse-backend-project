const routingPolicy = (policy) => (req, res, next) => {

  switch (policy) {
    case "AUTH_USERS_ONLY":
      if (req.session.user) {next()} 
      else {res.redirect("/login")}
      break;

    case "NOT_AUTH_USERS_ONLY":
      if (!req.session.user) {next()} 
      else {res.redirect("/products")}
      break;
  
    default:
      throw new Error("Invalid policy")
  }
};

const requiredRole = (validRoles) => (req, res, next) => {
  // validRoles: Array of strings

  if (validRoles.includes(req.session.user.role)) {
    next();
  } else {
    res.sendResponse.forbidden({ message: "Invalid Role" });
  }
};

export { routingPolicy, requiredRole };
