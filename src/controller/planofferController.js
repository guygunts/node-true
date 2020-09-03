const offerService = require('../service/planofferService');
class OfferController {

    async offerdropdown(req, res) {

        const ret = await offerService.offerdropdown(req.body);
        res.json(ret);
        res.end();
    }

    async Offerlist(req, res) {

        const ret = await offerService.offerlist();
        res.json(ret);
        res.end();
    }

    async offerinsert(req, res) {

        const ret = await offerService.offerinsert(req.body);
        res.json(ret);
        res.end();
    }

    async offerdelete(req, res) {

        const ret = await offerService.offerdelete(req.body);
        res.json(ret);
        res.end();
    }

    async offeredit(req, res) {

        const ret = await offerService.offeredit(req.body);
        res.json(ret);
        res.end();
    }

    async offerinsertfile(req, res) {
        
        const result=[]
        for(let [key,value] of Object.entries(req.body)){
            const ret = await offerService.offerinsert(value); 
            let datajson
                if(ret.mess == 'success'){
                    datajson={
                        'planId':value.planId,
                        'status':"success"
                    }
                }else{
                    datajson={
                        'planId':value.planId,
                        'status':ret.message
                    }
                }
                result.push(datajson);

        }  
    let data={
            "result":result
        }
    console.log(data)
     res.json(data);
        res.end();
    }
}
const offerController = new OfferController();
module.exports = offerController;