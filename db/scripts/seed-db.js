require('dotenv').config();
const createDb = require('./create-db.js');
const dropDb = require('./drop-db.js');

const database = process.env['DB_NAME'];

function seedDb() {
  return Promise.resolve();
}

dropDb(database)
  .then( () => {
    console.log(`${database} database dropped`);
    return createDb(database);
  })
  .then( () => {
    console.log(`${database} database created`)
    return seedDb();
  })
  .then( () => {
    console.log(`${database} database seeded`);
  });
