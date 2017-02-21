const exec = require('child_process').exec;

function dropDb(database) {
  return new Promise( (resolve, reject) => {
    exec(`dropdb --if-exists ${database}`, (error) => {
      if(error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}
module.exports = dropDb;

if(require.main === module) {
  require('dotenv').config();
  const database = process.env['DB_NAME'];

  dropDb(database)
    .then(()=> {
      console.log(`dropped ${database}`);
    })
    .catch( e => {
      console.error(e);
    });
}
