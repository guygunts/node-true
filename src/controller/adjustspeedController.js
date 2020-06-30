const adjustspeedService = require('../service/adjustspeedService');
class adjustspeedController {
    async adjustspeed(req, res) {
        // log.info("request Data:",req.body)
        const ret = await adjustspeedService.AdjustSpeedService(req.body, res);
        res.json(ret);
        res.end();
    }

    async uploadadjustspeed(req, res) {

			let result=[]
        for(let [key,value] of Object.entries(req.body)){
            const ret = await adjustspeedService.AdjustSpeedService(value, res);
			if(ret.code == 200){
				value={...value,'status':"success"}
			}else{
				value={...value,'status':ret.error}
			}
			result.push(value)
        }
        let data={
				"result":result
			}
		console.log(data)
         res.json(data);
        res.end();
    }
}
const AdjustspeedController = new adjustspeedController();
module.exports = AdjustspeedController;