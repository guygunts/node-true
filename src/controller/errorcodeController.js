const ErrorcodeService = require('../service/ErrorcodeService');
class ErrorcodeController {
    async getdataErrorcode(req, res) {

        const ret = await ErrorcodeService.getdropdown();
        res.json(ret);
        res.end();
    }
    async  Errorcodelist(req, res) {

        const ret = await ErrorcodeService.errorcodelist();
        res.json(ret);
        res.end();
    }
    
    async  Errorcodeinsert(req, res) {

        const ret = await ErrorcodeService.errorcodeinsert(req.body);
        res.json(ret);
        res.end();
    }

    async  Errorcodedelete(req, res) {

        const ret = await ErrorcodeService.errorcodedelete(req.body);
        res.json(ret);
        res.end();
    }

    async  Errorcodeedit(req, res) {

        const ret = await ErrorcodeService.errorcodeupdate(req.body);
        res.json(ret);
        res.end();
    }
}
const errorcodeController = new ErrorcodeController();
module.exports = errorcodeController;