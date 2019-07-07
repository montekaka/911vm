const fs = require("fs");
const path = require('path');
const fastcsv = require('fast-csv');

const read = (fileName, cb) => {  
  let queries = [];
  return fs.createReadStream(path.join(__dirname, fileName))
  .pipe(fastcsv.parse({headers: true}))
  .on('data', (row) => {
    queries.push(row);
  })
  .on('end', () => {
    cb(queries);
  })
};

module.exports = read;
