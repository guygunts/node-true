const maxrateService = require('../service/maxrateService');
class MaxrateController {
    async getdataMaxrate(req, res) {

        const ret = await maxrateService.getdatamax(req.query.id);
        res.json(ret);
        res.end();
    }
    async  Maxratelist(req, res) {

        const ret = await maxrateService.maxratelist();
        res.json(ret);
        res.end();
    }
    
    async  Maxrateinsert(req, res) {

        const ret = await maxrateService.maxrateinsert(req.body);
        res.json(ret);
        res.end();
    }

    async  Maxratedelete(req, res) {

        const ret = await maxrateService.maxratedelete(req.body);
        res.json(ret);
        res.end();
    }

    async  Maxrateedit(req, res) {

        const ret = await maxrateService.maxrateupdate(req.body);
        res.json(ret);
        res.end();
    }
}
const maxrateController = new MaxrateController();
module.exports = maxrateController;