const importCSV = require('./importcsv');
const queryBuilder = require('./queryBuilder');
var Promise = require("bluebird");
const Neode = require('neode');
const Person = require('../person');
const DriverTrainingCourse = require('../driver_training_course');
const instance = new Neode.fromEnv();

// Define models
instance.model('Person', Person);
instance.model('DriverTrainingCourse', DriverTrainingCourse);

const files = [
  {filename: 'volunteers.csv', helpername: 'volunteers'},
  {filename: 'driver_training.csv', helpername: 'driver_training'}
];

Promise.map(files, (file) => {
  importCSV(file.filename, (queries) => {
    instance.batch(queryBuilder[file.helpername](queries));
  });
}, {
  concurrency: 2
})
.then(() => {
  console.log('done');
})
.catch((err) => {
  console.log(err);
})
