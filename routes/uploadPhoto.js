var express = require('express');
var router = express.Router();

/* POST upload photo. */
router.post('/', function(req, res, next){
  console.log('post request received');
  res.render('uploadPhoto');
})

module.exports = router;
