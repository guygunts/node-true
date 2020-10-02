const DBRepository = require('../repositories/DBRepository');
class ServiceTypeMapping {
    constructor() {
        this.DBRepository = new DBRepository();
    }

    async getdataservicetype(req){
        let data=await this.DBRepository.executeQuery(``);
        let resultJson = {
            "data":data,
            "mess":'success'
        }
        return resultJson
    }
    async servicetypelist(){ 
        let columns=[]
        let columnname="service_type,traffic_category,desc_th,desc_en,custom_traffic_category_th,custom_traffic_category_en,cus_type"
        let columndata="service_type,traffic_category,desc_th,desc_en,custom_traffic_category_th,custom_traffic_category_en,cus_type"
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

        let data=await this.DBRepository.executeQuery(`select code,service_type,traffic_category,desc_th,desc_en,custom_traffic_category_th,custom_traffic_category_en,cus_type from TB_M_Service_Type_Mapping `);

        let resultJson = {
            "columnname":columns,
            "data":data
        }
        return resultJson
    }

    async servicetypeupdate(req){
        await this.DBRepository.executeQuery(`UPDATE  TB_M_Service_Type_Mapping set desc_th='${req.desc_th}', desc_en='${req.desc_en}', custom_traffic_category_th='${req.custom_traffic_category_th}',custom_traffic_category_en='${req.custom_traffic_category_en}', update_dt=CURRENT_TIMESTAMP, update_by='${req.user}' where code=${req.code};`)
    }

    async servicetypedelete(req){ 
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
const serviceTypeMapping = new ServiceTypeMapping();
module.exports = serviceTypeMapping;