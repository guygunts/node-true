const UserService = require('../service/userService');
class UserController {
    async getdatauser(req, res) {

        const ret = await UserService.getdatauser(req.query.user_id);
        res.json(ret);
        res.end();
    }
    async Userlist(req, res) {

        const ret = await UserService.Userlist();
        res.json(ret);
        res.end();
    }
    
    async Userinsert(req, res) {

        const ret = await UserService.Userinsert(req.body);
        res.json(ret);
        res.end();
    }

    async Userdelete(req, res) {

        const ret = await UserService.Userdelete(req.body);
        res.json(ret);
        res.end();
    }

    async Useredit(req, res) {

        const ret = await UserService.Userupdate(req.body);
        res.json(ret);
        res.end();
    }
}
const userController = new UserController();
module.exports = userController;