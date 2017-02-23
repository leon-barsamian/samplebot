import {Db, MongoClient} from 'mongodb';

let assert = require('assert');

// Connection URL
let url = 'mongodb://127.0.0.1:27017/myproject';

export class Remember {

    public database: Db;

    constructor() {
        // Use connect method to connect to the server
        let newDatabase = this.database;
        MongoClient.connect(url, function (err: any, db: any) {
                assert.equal(null, err);
                console.log("Connected successfully to database server");
                newDatabase = db;
            }
        );
    }

}
