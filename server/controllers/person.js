const uuidv1 = require('uuid/v1');
const person = require('./../models/Person');

const get = (req, res) => {
  person.all((err, result) => {
    if(err) {
      console.log(err);
      res.sendStatus(404);      
    } else {
      res.send(result);
    }
  })
}

const post = (req, res) => {

  const data = {
    'first_name': req.body.first_name,
    'last_name': req.body.last_name,
    'email_address': req.body.email_address,
    'phone_number': req.body.phone_number,
    'class': req.body['class'],
    'uuid': uuidv1(),
  };
    
  person.insert(data, (err, result) => {
    if(err) {
      console.log(err);
      res.sendStatus(404);
    } else {
      res.send(result);
    }
  });
};

module.exports = {
  get: get,
  post: post
}