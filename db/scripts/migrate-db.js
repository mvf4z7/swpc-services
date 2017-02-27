const exec = require('child_process').exec;

function migrateDb() {
  return new Promise( (resolve, reject) => {
    exec(`npm run migrate`, (error) => {
      if(error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}
module.exports = migrateDb;

if(require.main === module) {
  migrateDb()
    .then(()=> {
      console.log(`database migrated`);
    })
    .catch( e => {
      console.error(e);
    });
}
