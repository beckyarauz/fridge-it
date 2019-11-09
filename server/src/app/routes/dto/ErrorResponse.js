/**
 * @swagger
 * definition:
 *   respError:
 *     properties:
 *       message:
 *         type: string
 */
const ErrorResponse = function (res, code, message) {
  return res.status(code).json({"message": message});
};

module.exports = ErrorResponse;
