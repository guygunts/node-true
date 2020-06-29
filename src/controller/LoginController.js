const loginService =require('../service/LoginService');
const menuService =require('../service/menuService');
class LoginController {
  async loginUser(req, res) {
    // log.info("request Data:",req.body)
    const ret = await loginService.loginUsers(req.body);
      res.json(ret);
      res.end();
  }
  async menuauth(req, res) {
    // log.info("request Data:",req.body)
    const ret = await menuService.menuService(req.query.user);
      res.json(ret);
      res.end();
  }
}
const loginController = new LoginController();
module.exports= loginController;