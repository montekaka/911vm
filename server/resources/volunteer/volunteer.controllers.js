const instance = require('./../index');
const uuidv1 = require('uuid/v1');

const list = (req, res) => {
  //TODO: sorting, order on, pagination

  instance.cypher('MATCH (p:Person) RETURN p')
  .then((volunteers) => {    
    let _volunteers = volunteers.records.map((volunteer) => {
      return volunteer['_fields'][0]['properties'];
    })
    res.status(200).json({data: _volunteers});
  })
  .catch((err) => {
    console.error(err);
    res.status(400).end();
  });  
}

const create = (req, res) => {
  let data = {
    'firstName': req.body.firstName,
    'lastName': req.body.lastName,
    'emailAddress': req.body.emailAddress,
    'phoneNumber': req.body.phoneNumber,
    'class': req.body['class'],
    'uuid': uuidv1(),
  };

  const queries = [
    {query: 'CREATE (p: Person {firstName: {firstName}, lastName: {lastName}, emailAddress: {emailAddress}, phoneNumber: {phoneNumber}, class: {class}, uuid: {uuid}}) RETURN p', params: data}
  ];

  //TODO: Check if there is the same uuid in the database

  instance.batch(queries)
  .then((volunteers) => {    
    let volunteer = volunteers[0].records[0]['_fields'][0]['properties'];
    res.status(200).json({data: volunteer});
  })
  .catch((err) => {
    console.error(err);
    res.status(400).end();
  });
}

module.exports = {
  list: list,
  create: create,  
}