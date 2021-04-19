var db = require('../db');

module.exports = {
  publicLinks: {
    get: (cb) => {
      db.query('SELECT publicLink from gifLinks', (error, results, fields) => {
        if (error) {
          throw error;
        } else {
          cb(results)
        }
      })
    },
    post: (link, cb) => {
      db.query(`insert into gifLinks(publicLink) values ('${link}')`, (error, results, fields) => {
        if (error) {
          throw error;
        } else {
          cb()
        }
      })
    }
  }
}


