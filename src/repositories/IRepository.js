class IRepository {
    constructor() {
      if (this.executeQuery === undefined) {
        throw new Error("Must override .executeQuery() method");
      }
    }
  }
  
  module.exports = IRepository