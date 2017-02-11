const path = require('path');

// TODO: Load through environment variables
module.exports = {
  client: 'pg',
  connection: {
    host     : '127.0.0.1',
    user     : 'postgres',
    password : '',
    database : 'swpc',
    charset  : 'utf8'
  },
  acquireConnectionTimeout: 60000,
  migrations: {
    tablename: 'migrations',
    directory: path.resolve('./migrations')
  }
};
