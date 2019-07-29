require('dotenv').config()
const config = {};

config.port = process.env.PORT || 3030;
config.secrets = {
  jwt: process.env.JWT_SECRET,
  jwtExp: process.env.JWT_EXP
}

module.exports = config;