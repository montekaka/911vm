const neode = require('./../resources/index');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('./../../config/config');
// create a new json web token
// give an user object, it will return a jwt
const newToken = (user) => {
  return jwt.sign({id: user.id}, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp
  })
}

// given a token, it will verfiy
const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if(err) return reject(err);
      resolve(payload);
    })
  })
}

const signup = (req, res) => {
  if(!req.body.email_address || !req.body.password || !req.body.first_name || !req.body.last_name) {
    return res.status(404).json({error_message: 'Email, password and name require.'}); 
  }

  bcrypt.hash(req.body.password, 8)
  .then((hash) => {
    return {
      email_address: req.body['email_address'],
      first_name: req.body['first_name'],
      last_name: req.body['last_name'],
      password: hash
    };
  })
  .then((data) => {
    return neode.create('Person', data)
  })
  .then((person) => {
    const user = {
      id: person.get('id')    
    }
    const token = newToken(user);
    return res.status(201).json({
      data: {
        token: token,
        id: user.id
      }
    })
  })
  .catch((err) => {
    console.log(err);
    return res.status(404).json({error_message: err.message});
  })
}

const signin = (req, res) => {  
  if(!req.body.email_address || !req.body.password ) {
    return res.status(404).json({error_message: 'Email and password require.'}); 
  }

  let user;

  neode.first('Person', {'email_address': req.body.email_address})
  .then((person) => {
    if(person) {
      return person;
    } else {
      res.status(404).json({error_message: 'Email and Password are not matched.'});
    }
  })
  .then((person) => {
    const hashedPassword = person.get('password');
    user = person;
    return bcrypt.compare(req.body.password, hashedPassword)
  })
  .then(() => {
    const _user = {
      id: user.get('id')  
    }
    const token = newToken(user); 
    return res.status(201).json({
      data: {
        token: token,
        id: user.get('id')
      }
    })    
  })
  .catch((err) => {
    res.status(404).json({error_message: err.message});
  })  
} 

module.exports = {
  signup: signup,
  signin: signin
}