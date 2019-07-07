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

// ['volunteers.csv','driver_training.csv']

importCSV('volunteers.csv', (queries) => {
  instance.batch(queryBuilder['volunteers'](queries));
});

importCSV('driver_training.csv', (queries) => {
  instance.batch(queryBuilder['driver_training'](queries));
});

// instance.close();

// MATCH (person:Person {first_name: 'Todd', last_name: 'Baker'}), 
// (course:DriverTrainingCourse {name: 'Written Test'})
// CREATE (person)-[:DRIVERTRAINING{received:"3/16/2018"}]->(course)

// MATCH (person:Person {first_name: 'Cody', last_name: 'Daig'}), 
// (course:DriverTrainingCourse {name: 'Light Cones'})
// CREATE (person)-[:DRIVERTRAINING{received:"1/28/2020"}]->(course)

// instance.create('DriverTrainingCourse', {
//   name: 'Written Test'
// })

// instance.first('Person', 'email_address', 'todd.baker@leu-rescue.org')
// .then((person) => {
//   return instance.first('DriverTrainingCourse','name', 'Written Test')
//   .then((exam) => {
//     return person.relateTo(exam, 'driverTraining', {received: new Date(2018, 2, 16)})
//   })
// })