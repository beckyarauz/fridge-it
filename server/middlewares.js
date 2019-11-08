const roles = require('./src/roles');

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else next({ status: 403, message: 'Unauthorized' })
}

const hasRight = (role, right) => {
  if (!role) {
    return false;
  }

  if (!roles[role]) {
    return false;
  }

  return roles[role][right] || false;
};

const acl = (right) => {
  return (req, res, next) => {
    if(!req.isAuthenticated()) {
      next({status: 403, message: 'Unauthorized'})
    }

    if (!hasRight(req.user.role, right)) {
      next({status: 403, message: 'Unauthorized'})
    }

    next();
  }
};

module.exports = {
  isLoggedIn,
  acl
};
