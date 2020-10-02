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

        let data=await this.DBRepository.executeQuery(`select code,description_th,description_en,module_name_th,module_name_en,desc_th,desc_en,custom_description_th,custom_description_en,start_dt,end_dt,offer_type,cost_type,price,company,cus_type from TB_M_Price_Plan `);

        let resultJson = {
            "columnname":columns,
            "data":data
        }
        return resultJson
    }

    async priceplanupdate(req){
        await this.DBRepository.executeQuery(`UPDATE  TB_M_Price_Plan set description_th='${req.description_th}', description_en='${req.description_en}', module_name_th='${req.module_name_th}',module_name_en='${req.module_name_en}', update_dt=CURRENT_TIMESTAMP, update_by='${req.user}' where code=${req.code};`)
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