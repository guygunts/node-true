const IRepository = require("./IRepository");
const mysqldb = require('../MysqlDatabase');
class DBRepository extends IRepository {
  constructor() {
    super();
    this.mysqldb = mysqldb;
  }
  async executeQuery(sqlcmd, param) {
    try {
      return this.mysqldb.query(sqlcmd, param)
    } catch (err) {
      console.log(err);
      return err;
    }

  }

}

module.exports = DBRepository