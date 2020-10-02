const MainPackageService = require('../service/packageService');
class MainpackageController {
    async getdataMainPackage(req, res) {

        const ret = await MainPackageService.getdataMainPackage();
        res.json(ret);
        res.end();
    }
    async  MainPackagelist(req, res) {

        const ret = await MainPackageService.MainPackagelist();
        res.json(ret);
        res.end();
    }
    async  MainPackagedelete(req, res) {

        const ret = await MainPackageService.MainPackagedelete(req.body);
        res.json(ret);
        res.end();
    }

    async  MainPackageedit(req, res) {

        const ret = await MainPackageService.MainPackageupdate(req.body);
        res.json(ret);
        res.end();
    }
}
const mainpackageController = new MainpackageController();
module.exports = mainpackageController;