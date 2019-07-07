const fs = require('fs');
const path = require('path');
const Neode = require('neode');
const fastcsv = require('fast-csv');
const Person = require('../person');
const instance = new Neode.fromEnv();

// Define a Perons
instance.model('Person', Person);

let result = [];
fs.createReadStream(path.join(__dirname, 'volunteers.csv'))
  .pipe(fastcsv.parse({ headers: true }))
  .on('data', row => result.push(row))
  .on('end', () => {
    let queries = result.map((item) => {
      return {'query': 'CREATE (p: Person {first_name: {first_name}, last_name: {last_name}, email_address: {email_address}, phone_number: {phone_number}}) RETURN p', 'params': item }
    });

    instance.batch(queries)
    .then((res) => {
      instance.close();
      console.log(`Imported total ${res.length} records`);
    })
    .catch((err) => {
      console.log(err)
    })
  })
