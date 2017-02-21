const exec = require('child_process').exec;

function createDb(database) {
  return new Promise( (resolve, reject) => {
    exec(`createdb ${database}`, (error) => {
      if(error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}
module.exports = createDb;

if(require.main === module) {
  require('dotenv').config();
  const database = process.env['DB_NAME'];

  createDb(database)
    .then(()=> {
      console.log(`created ${database}`);
    })
    .catch( e => {
      console.error(e);
    });
}
