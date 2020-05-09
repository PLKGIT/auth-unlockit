const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  const API_URL = "https://auth-unlockit.herokuapp.com" + "/api/test";

  app.get( 
    API_URL + "/all", controller.allAccess);

  app.get(
    API_URL + "/user", 
    [authJwt.verifyToken], controller.userBoard);

  app.get(
    API_URL + "/teacher",
    [authJwt.verifyToken, authJwt.isTeacher], controller.teacherBoard
  );

  app.get(
    API_URL + "/admin",
    [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard
  );
};