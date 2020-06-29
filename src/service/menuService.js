const DBRepository = require('../../src/repositories/DBRepository');

class MenuService {
    constructor() {
        this.DBRepository = new DBRepository();
    }

async menuService(req) {
    let resultJson
    let menus=[]
    let client =  await this.DBRepository.executeQuery("select role_id from TB_M_Users where username='"+req+"'");
    if(client.length != 0){
        let auth =  await this.DBRepository.executeQuery(`select menu_id,sub_menu_id from TB_M_auth_menu where role_id=${client[0].role_id}`);
        if(auth.length !=0){
            for(let i =0; i<auth.length; i++){
                let menu =  await this.DBRepository.executeQuery(`select menu_name,menu_url,menu_icon from TB_M_menu where menu_active=1 and menu_id=${auth[i].menu_id}`);
                menus.push(menu[0])
            }
        }
        resultJson = {
            "code": '200',
            "msg": 'success',
            "menu":menus
        }
        return resultJson
    }
}
}
const menuService = new MenuService();
module.exports = menuService;