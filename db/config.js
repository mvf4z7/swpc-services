require('dotenv').config({ path: '../.env'});

const host = process.env['DB_HOST'];
const user = process.env['DB_USER'];
const password = process.env['DB_PASS'];
const database = process.env['DB_NAME'];

module.exports = {
  client: 'pg',
  connection: {
    host     : host,
    user     : user,
    password : password,
    database : database,
    charset  : 'utf8'
  },
  acquireConnectionTimeout: 60000,
  migrations: {
    tableName: 'migrations',
    directory: './migrations'
  }
};
