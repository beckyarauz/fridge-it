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
    let role = (req.isAuthenticated()) ? req.user.role : 'anonymous';

    if (!hasRight(role, right)) {
      return next({status: 403, message: 'Unauthorized', right: right})
    }

    next();
  }
};

module.exports = {
  isLoggedIn,
  acl
};
