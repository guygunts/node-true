const loginService =require('../service/LoginService');
class LoginController {
  async loginUser(req, res) {
    // log.info("request Data:",req.body)
    const ret = await loginService.loginUsers(req.body);
      res.json(ret);
      res.end();
  }
}
const loginController = new LoginController();
module.exports= loginController;