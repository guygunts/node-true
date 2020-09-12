const DBRepository = require('../repositories/DBRepository');
class Notifymapping {
    constructor() {
        this.DBRepository = new DBRepository();
    }

    async getdropdown(req){
        let data=await this.DBRepository.executeQuery(``);
        let resultJson = {
            "data":data,
            "mess":'success'
        }
        return resultJson
    }
    async Notifymappinglist(){ 
        let columns=[]
        let columnname="Event_id,moduleName_en,moduleName_th,trafficCategories,overUsagePolicy,description_en,description_th,coarseBalanceLevel,title_en,title_th,cus_type"
        let columndata="Event_id,moduleName_en,moduleName_th,trafficCategories,overUsagePolicy,description_en,description_th,coarseBalanceLevel,title_en,title_th,cus_type"

       let arraycolumnname=columnname.split(',')
       let arraycolumndata=columndata.split(',')

        for (let e = 0; e < arraycolumnname.length; e++) {
            let items = {
                'header':arraycolumnname[e],
                'field': arraycolumndata[e]
            }
            columns.push(items)
        }

        let data=await this.DBRepository.executeQuery(`select id,Event_id,moduleName_en,moduleName_th,trafficCategories,overUsagePolicy,description_en,description_th,coarseBalanceLevel,title_en,title_th,cus_type from TB_M_Push_Notify_Mapping `);

        let resultJson = {
            "columnname":columns,
            "data":data
        }
        return resultJson
    }

    async Notifymappinginsert (req){
        await this.DBRepository.executeQuery(`INSERT INTO TB_M_Push_Notify_Mapping (Event_id,moduleName_en,moduleName_th,trafficCategories,overUsagePolicy,description_en,description_th,coarseBalanceLevel,title_en,title_th,cus_type,create_dt,create_by) 
        VALUES ('${req.Event_id}','${req.moduleName_en}','${req.moduleName_th}','${req.trafficCategories}','${req.overUsagePolicy}','${req.description_en}','${req.description_th}','${req.coarseBalanceLevel}','${req.title_en}','${req.title_th}','${req.cus_type}',CURRENT_TIMESTAMP,'${req.user}');`);  
        let resultJson = {
            "mess":'success'
        }
        return resultJson
    }

    async Notifymappingupdate(req){
        await this.DBRepository.executeQuery(`UPDATE  TB_M_Push_Notify_Mapping set 
        Event_id='${req.Event_id}',
        moduleName_en='${req.moduleName_en}',
        moduleName_th='${req.moduleName_th}',
        trafficCategories='${req.trafficCategories}',
        overUsagePolicy='${req.overUsagePolicy}',
        description_en='${req.description_en}',
        description_th='${req.description_th}',
        coarseBalanceLevel='${req.coarseBalanceLevel}',
        title_en='${req.title_en}',
        title_th='${req.title_th}',
        cus_type='${req.cus_type}',
        update_dt=CURRENT_TIMESTAMP,
        update_by='${req.user}'
         where id=${req.id};`)

         let resultJson = {
            "mess":'success'
        }
        return resultJson
    }

    async Notifymappingdelete(req){ 
        if(req.length){ 
            for(let i=0; i<req.length; i++){ 
                await this.DBRepository.executeQuery(`delete from TB_M_Push_Notify_Mapping where id=${req[i].id}`);
            }
        }
        let resultJson = {
            "mess":'success'
        }
        return resultJson
    }

}
const notifymapping = new Notifymapping();
module.exports = notifymapping;