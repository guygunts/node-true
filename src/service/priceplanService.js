const DBRepository = require('../repositories/DBRepository');
class Priceplan {
    constructor() {
        this.DBRepository = new DBRepository();
    }

    async getdatapriceplan(req){
        let data=await this.DBRepository.executeQuery(``);
        let resultJson = {
            "data":data,
            "mess":'success'
        }
        return resultJson
    }
    async priceplanlist(){ 
        let columns=[]
        let columnname="code,description_th,description_en,module_name_th,module_name_en,desc_th,desc_en,custom_description_th,custom_description_en,start_dt,end_dt,offer_type,cost_type,price,company,cus_type"
        let columndata="code,description_th,description_en,module_name_th,module_name_en,desc_th,desc_en,custom_description_th,custom_description_en,start_dt,end_dt,offer_type,cost_type,price,company,cus_type"
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

        let data=await this.DBRepository.executeQuery(`select code,description_th,description_en,module_name_th,module_name_en,desc_th,desc_en,custom_description_th,custom_description_en,DATE_FORMAT(start_dt, "%Y-%m-%d %T") start_dt,DATE_FORMAT(end_dt, "%Y-%m-%d %T") end_dt,offer_type,cost_type,price,company,cus_type from TB_M_Price_Plan `);

        let resultJson = {
            "columnname":columns,
            "data":data
        }
        return resultJson
    }

    async priceplanupdate(req){
        let desc_th
        if(req.desc_th != null){ 
            desc_th=req.desc_th.trim()
            
        }else{
            desc_th=''
        }
        let desc_en
        if(req.desc_en != null){ 
            desc_en=req.desc_en.trim()
            
        }else{
            desc_en=''
        }
        let module_name_th
        if(req.module_name_th != null){ 
            module_name_th=req.module_name_th.trim()
            
        }else{
            module_name_th=''
        }
        let module_name_en
        if(req.module_name_en != null){ 
            module_name_en=req.module_name_en.trim()
            
        }else{
            module_name_en=''
        }

        let custom_description_th
        if(req.custom_description_th != null){ 
            custom_description_th=req.custom_description_th.trim()
            
        }else{
            custom_description_th=''
        }
        let custom_description_en
        if(req.custom_description_en != null){ 
            custom_description_en=req.custom_description_en.trim()
            
        }else{
            custom_description_en=''
        }
        await this.DBRepository.executeQuery(`UPDATE  TB_M_Price_Plan set desc_th='${desc_th}', desc_en='${desc_en}', module_name_th='${module_name_th}',module_name_en='${module_name_en}', update_dt=CURRENT_TIMESTAMP, update_by='${req.user}',custom_description_en='${custom_description_en}',custom_description_th='${custom_description_th}' where code='${req.code}'`)
    }

    async priceplandelete(req){ 
        if(req.length){ 
            for(let i=0; i<req.length; i++){ 
                await this.DBRepository.executeQuery(`delete from TB_M_Service_Type_Mapping where code=${req[i].code}`);
            }
        }
        let resultJson = {
            "mess":'success'
        }
        return resultJson
    }

}
const priceplan = new Priceplan();
module.exports = priceplan;