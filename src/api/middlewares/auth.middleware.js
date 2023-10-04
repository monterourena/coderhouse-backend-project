const routingPolicy = (policy) => (req, res, next) => {

  switch (policy) {
    case "AUTH_USERS_ONLY":
      if (req.user) {next()} 
      else {res.redirect("/login")}
      break;

    case "NOT_AUTH_USERS_ONLY":
      if (!req.user) {next()} 
      else {res.redirect("/products")}
      break;
  
    default:
      throw new Error("Invalid policy")
  }
};

const requiredRole = (validRoles) => (req, res, next) => {
  if (validRoles.includes(req.user.role)) {
    next();
  } else {
    res.sendForbidden({ message: "Invalid Role" });
  }
};

export { routingPolicy, requiredRole };
