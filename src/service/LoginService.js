const DBRepository = require('../../src/repositories/DBRepository');
const e = require('express');

class LoginService {
    constructor() {
        this.DBRepository = new DBRepository();
    }

    async loginUsers(req) {
        let resultJson
        let client = await this.DBRepository.executeQuery("select username, password from TB_M_Users where username='" + req.username + "'");
        if (client.length != 0) {
            let clientpass = await this.DBRepository.executeQuery("select username, password from TB_M_Users where username='" + req.username + "' and password ='" + req.password + "'");
            if (clientpass.length != 0) {
                resultJson = {
                    "code": '200',
                    "msg": 'success',
                    "user": client[0].username
                }
            } else {
                resultJson = {
                    "code": '500',
                    "msg": 'password is Wrong'
                }
            }
            return resultJson
        } else {
            resultJson = {
                "code": '500',
                "msg": 'Username is Wrong'
            }
            return resultJson
        }
    }

    async authuser(req) {
        let client = await this.DBRepository.executeQuery("select role_id from TB_M_Users where username='" + req.username + "'");
       if(client){
        let auth = await this.DBRepository.executeQuery(`select role_id,a.menu_id,menu_name from  TB_M_auth_menu a left join TB_M_menu b on a.menu_id= b.menu_id where role_id=${client[0].role_id} and  b.menu_url='${req.url}'`)
            if(auth.length !== 0){
                let data={
                    "active":1
                }
                return data
            }else{
                let data={
                    "active":0
                }
                return data
            }
        }
    }
}
const loginService = new LoginService();
module.exports = loginService;