const _ = require('lodash');
const roles = require('./src/roles');

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else next({status: 403, message: 'Unauthorized'})
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

const own = function (path) {
  return function (role, req) {
    if (!req.user || !req.user._id || !req.user._id.toString) {
      return false;
    }

    return req.user._id.toString() === _.get(req, path);
  }
};

const or = function (fnA, fnB) {
  return function (role, req) {
    return fnA(role, req) || fnB(role, req);
  };
};

const has = function (right) {
  return function (role, req) {
    return hasRight(role, right);
  }
};

const acl = (right, fn) => {
  return (req, res, next) => {
    let role = (req.isAuthenticated()) ? req.user.role : 'anonymous';

    if (!has(right)(role, req) || (fn && !fn(role, req))) {
      return next({status: 403, message: 'Unauthorized', right: right})
    }

    next();
  }
};

module.exports = {
  isLoggedIn,
  acl,
  own,
  or,
  has
};
