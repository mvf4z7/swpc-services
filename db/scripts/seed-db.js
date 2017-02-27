require('dotenv').config();
const createDb = require('./create-db');
const dropDb = require('./drop-db');
const migrateDb = require('./migrate-db');

const database = process.env['DB_NAME'];

dropDb(database)
  .then( () => {
    console.log(`${database} database dropped`);
    return createDb(database);
  })
  .then( () => {
    console.log(`${database} database created`)
    return migrateDb();
  })
  .then( () => {
    console.log(`${database} database migrated`);
  })
  .then( () => {
    const User = require('../models/user');
    return User.createAccount('test@email.com', 'password');
  })
  .then( () => {
    console.log(`${database} database seeded`);
    process.exit(0);
  });
