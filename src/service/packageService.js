const DBRepository = require('../repositories/DBRepository');
class MainPackage {
    constructor() {
        this.DBRepository = new DBRepository();
    }

    async getdataMainPackage(req){
        let data=await this.DBRepository.executeQuery(``);
        let resultJson = {
            "data":data,
            "mess":'success'
        }
        return resultJson
    }
    async MainPackagelist(){ 
        let columns=[]
        let columnname="code,tss_description_th,tss_description_en,module_name_th,module_name_en,custom_description_th,custom_description_en,validity,package_type,charge_type,tss_display_type,sort_id,price,company,cus_type"
        let columndata="code,tss_description_th,tss_description_en,module_name_th,module_name_en,custom_description_th,custom_description_en,validity,package_type,charge_type,tss_display_type,sort_id,price,company,cus_type"
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

        let data=await this.DBRepository.executeQuery(`select code,tss_description_th,tss_description_en,module_name_th,module_name_en,custom_description_th,custom_description_en,validity,package_type,charge_type,tss_display_type,sort_id,price,company,cus_type from TB_M_Package `);

        let resultJson = {
            "columnname":columns,
            "data":data
        }
        return resultJson
    }

    async MainPackageupdate(req){
        await this.DBRepository.executeQuery(`UPDATE  TB_M_Package set tss_description_th='${req.tss_description_th}', tss_description_en='${req.tss_description_en}', module_name_th='${req.module_name_th}',module_name_en='${req.module_name_en}', update_dt=CURRENT_TIMESTAMP, update_by='${req.user}' where code=${req.code};`)
    }

    async MainPackagedelete(req){ 
        if(req.length){ 
            for(let i=0; i<req.length; i++){ 
                await this.DBRepository.executeQuery(`delete from TB_M_Package where code=${req[i].code}`);
            }
        }
        let resultJson = {
            "mess":'success'
        }
        return resultJson
    }

}
const mainPackage = new MainPackage();
module.exports = mainPackage;