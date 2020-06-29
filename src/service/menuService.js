const DBRepository = require('../../src/repositories/DBRepository');

class menuService {
    constructor() {
        this.DBRepository = new DBRepository();
    }

async menuService(req) {
    let resultJson
    let client =  await this.DBRepository.executeQuery(`select role_id,menu_id,sub_menu_id from TB_M_auth_menu where role_id='${req.role}'`);

}
}
const MenuService = new menuService();
module.exports = MenuService;