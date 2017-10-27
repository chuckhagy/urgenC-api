class EntityRepository{
    constructor({entityName, db}){
        this._entityName = entityName;
        this._db = db;
    }
}

module.exports = EntityRepository;