const servicetypemappingService = require('../service/servicetypemappingService');
class ServicetypemappingController {
    async getdataservicetype(req, res) {

        const ret = await servicetypemappingService.getdataservicetype();
        res.json(ret);
        res.end();
    }
    async  servicetypelist(req, res) {

        const ret = await servicetypemappingService.servicetypelist();
        res.json(ret);
        res.end();
    }
    async  servicetypedelete(req, res) {

        const ret = await servicetypemappingService.servicetypedelete(req.body);
        res.json(ret);
        res.end();
    }

    async  servicetypeedit(req, res) {

        const ret = await servicetypemappingService.servicetypeupdate(req.body);
        res.json(ret);
        res.end();
    }
}
const servicetypemappingController = new ServicetypemappingController();
module.exports = servicetypemappingController;