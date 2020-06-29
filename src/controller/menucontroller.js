const menuService =require('../service/menuService');
class LoginController {
  async loginUser(req, res) {

    const ret = await menuService.menuService(req.body);
      res.json(ret);
      res.end();
  }
}
const loginController = new LoginController();
module.exports= loginController;