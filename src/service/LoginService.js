const DBRepository = require('../../src/repositories/DBRepository');

class LoginService {
    constructor() {
        this.DBRepository = new DBRepository();
    }

async loginUsers(req) {
    let resultJson
    let client =  await this.DBRepository.executeQuery("select username,role_id from TB_M_Users where username='"+req.username+"' and password ='"+req.password+"'");
    if (client.length != 0) {
            if (client[0].password == req.password) {
                resultJson = {
                    "code": '200',
                    "msg": 'success',
                    "user":client[0].username,
                    "role":client[0].role_id
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
}
const loginService = new LoginService();
module.exports = loginService;