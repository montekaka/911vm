const Neode = require('neode');

const schema = {
  id: {
    primary: true,
    type: 'uuid',
  },
  first_name: 'name',
  last_name: 'name',
  email_address: {
    type: 'email',
    empty: true,
  },
  phone_number: {
    type: 'string',
    empty: true,
  },
  class: {
    type: 'string',
    empty: true,
  },
  createdAt: {
    type: 'datetime',
    default: () => new Date,
  },
  driverTraining: {
    type: 'relationship',
    relationship: 'DRIVERTRAINING',
    direction: 'out',    
  },
}

const instance = new Neode.fromEnv().with({
  Person: schema
})

// instance.model('Person', schema);

const all = (cb) => {
  instance.cypher('MATCH (p:Person) RETURN p')
  .then((res) => {
    cb(null, res.records);
  })
  .catch((err) => {
    cb(err, null);
  })
}

const insert = (data, cb) => {
  // return instance.create('Person', data);
  instance.batch([
    {query: 'CREATE (p: Person {first_name: {first_name}, last_name: {last_name}, email_address: {email_address}, phone_number: {phone_number}, class: {class}, uuid: {uuid}}) RETURN p', params: data}
  ])
  .then((res) => {
    cb(null, res);
  })
  .catch((err) => {
    cb(err, null);
  })
}


module.exports = {
  schema:schema,
  insert: insert,
  all: all
};
