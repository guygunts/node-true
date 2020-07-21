const DBRepository = require('../../src/repositories/DBRepository');
class User {
    constructor() {
        this.DBRepository = new DBRepository();
    }
    async userlist(){ 

    }

    async userinsert (req){

    }

    async userupdate(req){

    }

    async userdelete(req){ 
        
    }

}
const user = new User();
module.exports = user;