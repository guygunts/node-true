const DBRepository = require('../../src/repositories/DBRepository');
class User {
    constructor() {
        this.DBRepository = new DBRepository();
    }

    async getdatauser(req){
        let data=await this.DBRepository.executeQuery(`select user_id,role_id,username,password from TB_M_Users where user_id=${req}`);
        let resultJson = {
            "data":data,
            "mess":'success'
        }
        return resultJson
    }
    async Userlist(){ 
        let columns=[]
        let columnname="username,role_name,password,create_date,create_by,update_date,update_by"
        let dropdown=await this.DBRepository.executeQuery(`select role_id value,role_name label from TB_M_role where role_active=1 and role_name <> 'admin';`);
        let columndata="username,role_name,password,create_date,create_by,update_date,update_by"

       let arraycolumnname=columnname.split(',')
       let arraycolumndata=columndata.split(',')

        for (let e = 0; e < arraycolumnname.length; e++) {
            let items = {
                'header':arraycolumnname[e],
                'field': arraycolumndata[e]
            }
            columns.push(items)
        }

        let data=await this.DBRepository.executeQuery(`select user_id,role_name,username,password,DATE_FORMAT(a.create_date, "%Y-%m-%d %T") create_date, a.create_by,DATE_FORMAT(a.update_date, "%Y-%m-%d %T") update_date, a.update_by from TB_M_Users a left join TB_M_role b on a.role_id=b.role_id where username <> 'admin'`);

        let resultJson = {
            "columnname":columns,
            "data":data,
            "dropdown":dropdown
        }
        return resultJson
    }

    async Userinsert (req){
        await this.DBRepository.executeQuery(`INSERT INTO TB_M_Users (role_id,username,password,create_date,create_by) 
        VALUES ('${req.role_id}','${req.username}','${req.password}',CURRENT_TIMESTAMP,'${req.user}');`);  
        let resultJson = {
            "mess":'success'
        }
        return resultJson
    }

    async Userupdate(req){
        await this.DBRepository.executeQuery(`UPDATE  TB_M_Users set role_id='${req.role_id}', username='${req.username}', password='${req.password}', update_date=CURRENT_TIMESTAMP, update_by='${req.user}' where user_id=${req.user_id};`)
    }

    async Userdelete(req){ 
        if(req.length){ 
            for(let i=0; i<req.length; i++){ 
                await this.DBRepository.executeQuery(`delete from TB_M_Users where user_id=${req[i].user_id}`);
            }
        }
        let resultJson = {
            "mess":'success'
        }
        return resultJson
    }

}
const user = new User();
module.exports = user;