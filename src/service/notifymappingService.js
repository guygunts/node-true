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
        let arraycolumnstyle=[]
       let arraycolumnname=columnname.split(',')
       let arraycolumndata=columndata.split(',')
       for(let i=0; i<columnname.length; i++){ 
        let datajson
            
            datajson ={
                width:'250px'
            }
        
        arraycolumnstyle.push(datajson)
   }
        for (let e = 0; e < arraycolumnname.length; e++) {
            let items = {
                'header':arraycolumnname[e],
                'field': arraycolumndata[e],
                'style':arraycolumnstyle[e]
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

        let moduleName_en
        if(req.moduleName_en != null){ 
            moduleName_en=req.error_message_th.trim()
            
        }else{
            moduleName_en=''
        }

        let moduleName_th
        if(req.moduleName_th != null){ 
            moduleName_th=req.error_message_th.trim()
            
        }else{
            moduleName_th=''
        }

        let trafficCategories
        if(req.trafficCategories != null){ 
            trafficCategories=req.error_message_th.trim()
            
        }else{
            trafficCategories=''
        }

        let overUsagePolicy
        if(req.overUsagePolicy != null){ 
            overUsagePolicy=req.error_message_th.trim()
            
        }else{
            overUsagePolicy=''
        }

        let description_en
        if(req.description_en != null){ 
            description_en=req.error_message_th.trim()
            
        }else{
            description_en=''
        }

        let description_th
        if(req.description_th != null){ 
            description_th=req.error_message_th.trim()
            
        }else{
            description_th=''
        }

        let coarseBalanceLevel
        if(req.coarseBalanceLevel != null){ 
            coarseBalanceLevel=req.error_message_th.trim()
            
        }else{
            coarseBalanceLevel=''
        }

        let title_en
        if(req.title_en != null){ 
            title_en=req.error_message_th.trim()
            
        }else{
            title_en=''
        }

        let title_th
        if(req.title_th != null){ 
            title_th=req.error_message_th.trim()
            
        }else{
            title_th=''
        }

        await this.DBRepository.executeQuery(`INSERT INTO TB_M_Push_Notify_Mapping (Event_id,moduleName_en,moduleName_th,trafficCategories,overUsagePolicy,description_en,description_th,coarseBalanceLevel,title_en,title_th,cus_type,create_dt,create_by) 
        VALUES ('${req.Event_id.trim()}',
        '${moduleName_en}',
        '${moduleName_th}',
        '${trafficCategories}',
        '${overUsagePolicy}',
        '${description_en}',
        '${description_th}',
        '${coarseBalanceLevel}',
        '${title_en}',
        '${title_th}','${req.cus_type}',CURRENT_TIMESTAMP,'${req.user}');`);  
        let resultJson = {
            "mess":'success'
        }
        return resultJson
    }

    async Notifymappingupdate(req){
        let moduleName_en
        if(req.moduleName_en != null){ 
            moduleName_en=req.moduleName_en.trim()
            
        }else{
            moduleName_en=''
        }

        let moduleName_th
        if(req.moduleName_th != null){ 
            moduleName_th=req.moduleName_th.trim()
            
        }else{
            moduleName_th=''
        }

        let trafficCategories
        if(req.trafficCategories != null){ 
            trafficCategories=req.trafficCategories.trim()
            
        }else{
            trafficCategories=''
        }

        let overUsagePolicy
        if(req.overUsagePolicy != null){ 
            overUsagePolicy=req.overUsagePolicy.trim()
            
        }else{
            overUsagePolicy=''
        }

        let description_en
        if(req.description_en != null){ 
            description_en=req.description_en.trim()
            
        }else{
            description_en=''
        }

        let description_th
        if(req.description_th != null){ 
            description_th=req.description_th.trim()
            
        }else{
            description_th=''
        }

        let coarseBalanceLevel
        if(req.coarseBalanceLevel != null){ 
            coarseBalanceLevel=req.coarseBalanceLevel.trim()
            
        }else{
            coarseBalanceLevel=''
        }

        let title_en
        if(req.title_en != null){ 
            title_en=req.title_en.trim()
            
        }else{
            title_en=''
        }

        let title_th
        if(req.title_th != null){ 
            title_th=req.title_th.trim()
            
        }else{
            title_th=''
        }
        await this.DBRepository.executeQuery(`UPDATE  TB_M_Push_Notify_Mapping set 
        Event_id='${req.Event_id.trim()}',
        moduleName_en='${moduleName_en}',
        moduleName_th='${moduleName_th}',
        trafficCategories='${trafficCategories}',
        overUsagePolicy='${overUsagePolicy}',
        description_en='${description_en}',
        description_th='${description_th}',
        coarseBalanceLevel='${coarseBalanceLevel}',
        title_en='${title_en}',
        title_th='${title_th}',
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