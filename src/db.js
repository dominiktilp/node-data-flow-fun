import Datastore from 'nedb';
import fs from 'fs';
import path from 'path';

let db = {};
var exists = fs.existsSync(path.resolve(__dirname, "../lists.db")) && fs.existsSync(path.resolve(__dirname, "../users.db"));
db.lists = new Datastore({ filename: path.resolve(__dirname, "../lists.db"), autoload: true, timestampData: true });
db.users = new Datastore({ filename: path.resolve(__dirname, "../users.db"), autoload: true, timestampData: true });

if (!exists) {
  console.log("INIT DB;")
  db.users.insert({_id: "1", name: "Joe"});
  db.users.insert({_id: "2", name: "Peter"});
  db.users.insert({_id: "3", name: "Marco"});

  db.lists.insert({_id: "1", name: "Buy for the weekend", user_id: "1",
    content: "<div>beer</div><div>beat</div><div>chilli</di>"});
  db.lists.insert({_id: "2", name: "Take from work", user_id: "3",
    content: "<div>speakers</div><div>projector</div>"});
  db.lists.insert({_id: "3", name: "Do before leave", user_id: null,
    content: "<div>water the plants</div>"});
}

export default db;
