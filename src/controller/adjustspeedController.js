const adjustspeedService = require('../service/adjustspeedService');
class adjustspeedController {
    async adjustspeed(req, res) {
        // log.info("request Data:",req.body)
        const ret = await adjustspeedService.AdjustSpeedService(req.body, res);
        res.json(ret);
        res.end();
    }

    async uploadadjustspeed(req, res) {
        for(let [key,value] of Object.entries(req.body)){
            const ret = await adjustspeedService.AdjustSpeedService(value, res);
            console.log(ret)
        }
        // log.info("request Data:",req.body)
        // const ret = await adjustspeedService.AdjustSpeedService(req.body, res);
        // res.json(ret);
        res.end();
    }
}
const AdjustspeedController = new adjustspeedController();
module.exports = AdjustspeedController;