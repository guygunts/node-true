const DBRepository = require('../../src/repositories/DBRepository');
class Planoffer {
    constructor() {
        this.DBRepository = new DBRepository();
    }

    async offerdropdown(req){ 
        let dropdown
        if(req.cus_type ==2){ 
             dropdown=await this.DBRepository.executeQuery(`select code label ,code value  from TB_M_Package where 1=1 `)
        }else{
             dropdown=await this.DBRepository.executeQuery(`select code label ,code value  from TB_M_Package where cus_type=${req.cus_type} `)
        }
        let datajson = {
            "dropdown":dropdown
        }
        return datajson
    }
    async offerlist(){ 
        let columns=[]
        let columnname="No,Payment_Type,Company,promoMessage_th,promoMessage_en,planName_th,planName_en,planId,units,formOfPayment,planDescription_th,planDescription_en"
        let columndata="number_id,Payment_Type,Company,promoMessage_th,promoMessage_en,planName_th,planName_en,planId,units,formOfPayment,planDescription_th,planDescription_en"
        let dropdown=await this.DBRepository.executeQuery(`select code label ,code value  from TB_M_Package where 1=1 `)
       let arraycolumnname=columnname.split(',')
       let arraycolumndata=columndata.split(',')
       let arraycolumnstyle=[]
       for(let i=0; i<columnname.length; i++){ 
            let datajson
            if(i==0){ 
                datajson ={
                    width:'6em'
                }
            }else{
                datajson ={
                    width:'250px'
                }
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

        let data=await this.DBRepository.executeQuery(`select Plan_offers_id,number_id,Payment_Type,Company,promoMessage_th,promoMessage_en,planName_th,planName_en,planId,units,formOfPayment,planDescription_th,planDescription_en from TB_M_Plan_Offers order by number_id asc`);

        let resultJson = {
            "dropdown":dropdown,
            "columnname":columns,
            "data":data
        }
        return resultJson
    }

    async offerinsert(req){ 
        try{
            let datainsert =await this.DBRepository.executeQuery(`select company,tss_description_th,tss_description_en,module_name_th,module_name_en,custom_description_th,custom_description_en,price from TB_M_Package where code='${req.planId.trim()}'`)
            let planName_th
            let planName_en
            let module_name_th
            let module_name_en

            if(datainsert[0].module_name_th !== null && datainsert[0].module_name_th !== ''){
                module_name_th=datainsert[0].module_name_th
            }else if(datainsert[0].tss_description_th !== null && datainsert[0].tss_description_th !== ''){
                module_name_th=datainsert[0].tss_description_th
            }else if(datainsert[0].tss_description_en !== null && datainsert[0].tss_description_en !== ''){
                module_name_th=datainsert[0].tss_description_en
            }else{
                module_name_th=''
            }

            if(datainsert[0].custom_description_th !== null && datainsert[0].custom_description_th !== ''){
                planName_th=datainsert[0].custom_description_th
            }else if(datainsert[0].tss_description_th !== null && datainsert[0].tss_description_th !== ''){
                planName_th=datainsert[0].tss_description_th
            }else if(datainsert[0].tss_description_en !== null && datainsert[0].tss_description_en !== ''){
                planName_th=datainsert[0].tss_description_en
            }else{
                planName_th=''
            }


            if(datainsert[0].custom_description_en !== null &&  datainsert[0].custom_description_en !== ''){
                planName_en=datainsert[0].custom_description_en
            }else if(datainsert[0].tss_description_en !== null && datainsert[0].tss_description_en !== ''){ 
                planName_en=datainsert[0].tss_description_en
            }else if(datainsert[0].tss_description_th !== null && datainsert[0].tss_description_th !== ''){ 
                planName_en=datainsert[0].tss_description_th
            }else{
                planName_en=''
            }

            if(datainsert[0].module_name_en !== null &&  datainsert[0].module_name_en !== ''){
                module_name_en=datainsert[0].module_name_en
            }else if(datainsert[0].tss_description_en !== null && datainsert[0].tss_description_en !== ''){ 
                module_name_en=datainsert[0].tss_description_en
            }else if(datainsert[0].tss_description_th !== null && datainsert[0].tss_description_th !== ''){ 
                module_name_en=datainsert[0].tss_description_th
            }else{
                module_name_en=''
            }

            let promoMessage_th
        if(req.promoMessage_th != null){ 
            promoMessage_th=req.promoMessage_th.trim()
            
        }else{
            promoMessage_th=''
        }
        let promoMessage_en
        if(req.promoMessage_en != null){ 
            promoMessage_en=req.promoMessage_en.trim()
            
        }else{
            promoMessage_en=''
        }
      let no=  await this.DBRepository.executeQuery(`SELECT number_id FROM TB_M_Plan_Offers ORDER BY number_id DESC LIMIT 1`)

            await this.DBRepository.executeQuery(`INSERT INTO TB_M_Plan_Offers (number_id,Payment_Type,company,promoMessage_th,promoMessage_en,planName_th,planName_en,planId,units,formOfPayment,create_dt,create_by,planDescription_th,planDescription_en) 
            VALUES ('${no[0].number_id+1}','${req.Payment_Type}','${datainsert[0].company}','${promoMessage_th}','${promoMessage_en}','${planName_th}','${planName_en}','${req.planId}','${datainsert[0].price}','${req.formOfPayment}',CURRENT_TIMESTAMP,'${req.user}','${module_name_th}','${module_name_en}')`);  
            let resultJson = {
                "mess":'success'
            }
            return resultJson
        }catch(err){ 
            return err
        }
        // let rec = req.expireTime.split(" ")
        // let datetime=rec[0].split("/")

        // for(let i=1; i<=2; i++){
        //         for(let e=1; e<=9; e++){ 
        //             if(datetime[i]==e){ 
        //                 let datanew="0"
        //                 datanew+=datetime[i]
        //                 datetime[i]=datanew
        //                 continue
        //             }
        //         }
        // }
       
    }

    async offerdelete(req){ 

        let no=  await this.DBRepository.executeQuery(`SELECT number_id FROM TB_M_Plan_Offers ORDER BY number_id DESC LIMIT 1`)

        const betweennumber= await this.DBRepository.executeQuery(`select  number_id from TB_M_Plan_Offers where number_id  between ${req.number_id} and ${no[0].number_id}`)

            for(let i=0; i<betweennumber.length; i++){              
                console.log(betweennumber[i])  
                if(i==0){
                    await this.DBRepository.executeQuery(`delete from TB_M_Plan_Offers where Plan_offers_id='${req.Plan_offers_id}'`);
                    continue
                }
                await this.DBRepository.executeQuery(`UPDATE TB_M_Plan_Offers SET number_id =${betweennumber[i].number_id-1} WHERE number_id ='${betweennumber[i].number_id}'`)
        }         
        let resultJson = {
            "mess":'success'
        }
        return resultJson
    }

    async offeredit(req){ 
        // let rec = req.expireTime.split(" ")
        // let datetime=rec[0].split("/")

        // for(let i=1; i<=2; i++){
        //         for(let e=1; e<=9; e++){ 
        //             if(datetime[i]==e){ 
        //                 let datanew="0"
        //                 datanew+=datetime[i]
        //                 datetime[i]=datanew
        //                 continue
        //             }
        //         }
        // }
        // let newdate=datetime[0]+'-'+datetime[1]+'-'+datetime[2]+' '+rec[1]
        for(const[key,value] of Object.entries(req)){ 
            if(value == '' && value !== 0){
                req[key]=null
            }
        }
        let promoMessage_th
        if(req.promoMessage_th != null){ 
            promoMessage_th=req.promoMessage_th.trim()
            
        }else{
            promoMessage_th=''
        }
        let promoMessage_en
        if(req.promoMessage_en != null){ 
            promoMessage_en=req.promoMessage_en.trim()
            
        }else{
            promoMessage_en=''
        }
        
        const pknumber= await this.DBRepository.executeQuery(`select number_id from TB_M_Plan_Offers where Plan_offers_id='${req.id}'`)


        let datanumberbetweenone

        let datanumberbetweentwo
        // await this.DBRepository.executeQuery(`UPDATE  TB_M_Plan_Offers set Payment_Type=${req.Payment_Type}, promoMessage_th='${promoMessage_th}',promoMessage_en='${promoMessage_en}', formOfPayment='${req.formOfPayment}', update_dt=CURRENT_TIMESTAMP, update_by='${req.user}',planId='${req.planId}',planDescription_th='${req.planDescription_th}',planDescription_en='${req.planDescription_en}' where Plan_offers_id='${req.id}'`)
        await this.DBRepository.executeQuery(`UPDATE  TB_M_Plan_Offers set  promoMessage_th='${promoMessage_th}',promoMessage_en='${promoMessage_en}' where Plan_offers_id='${req.id}'`)
        if(pknumber[0].number_id > req.number_id){ 
            datanumberbetweenone=req.number_id
            datanumberbetweentwo=pknumber[0].number_id

            const betweennumber= await this.DBRepository.executeQuery(`select  number_id,planId from TB_M_Plan_Offers where number_id  between ${datanumberbetweenone} and ${datanumberbetweentwo}`)

            for(let i=betweennumber.length; i>0; i--){ 
                if(i==betweennumber.length){
                    console.log(betweennumber[i-1])
                    await this.DBRepository.executeQuery(`UPDATE TB_M_Plan_Offers SET number_id =0 WHERE number_id ='${betweennumber[i-1].number_id}'`)
                    continue
                }
                await this.DBRepository.executeQuery(`UPDATE TB_M_Plan_Offers SET number_id =${betweennumber[i-1].number_id+1} WHERE number_id ='${betweennumber[i-1].number_id}'`)
            }
            await this.DBRepository.executeQuery(`UPDATE TB_M_Plan_Offers SET number_id =${req.number_id} WHERE number_id =0`)


        }else{
            datanumberbetweenone=pknumber[0].number_id 
            datanumberbetweentwo=req.number_id

            const betweennumber= await this.DBRepository.executeQuery(`select  number_id,planId from TB_M_Plan_Offers where number_id  between ${datanumberbetweenone} and ${datanumberbetweentwo}`)

            for(let i=0; i<betweennumber.length; i++){              
                    console.log(betweennumber[i])  
                    if(i==0){
                        await this.DBRepository.executeQuery(`UPDATE TB_M_Plan_Offers SET number_id =0 WHERE number_id ='${betweennumber[i].number_id}'`)
                        continue
                    }
                    await this.DBRepository.executeQuery(`UPDATE TB_M_Plan_Offers SET number_id =${betweennumber[i].number_id-1} WHERE number_id ='${betweennumber[i].number_id}'`)
            }
            await this.DBRepository.executeQuery(`UPDATE TB_M_Plan_Offers SET number_id =${req.number_id} WHERE number_id =0`)
        }
        
       
        let resultJson = {
            "mess":'success'
        }
        return resultJson
    }


}
const planoffer = new Planoffer();
module.exports = planoffer;
