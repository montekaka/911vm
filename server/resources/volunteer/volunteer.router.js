const Router = require('express');
const controllers = require('./volunteer.controllers');

const router = Router();

// /api/volunteer
router
  .route('/')
  .get(controllers.list)
  .post(controllers.create)

module.exports = router;