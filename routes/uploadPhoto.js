var express = require('express');
var uploader = require('../uploader');

var router = express.Router();

/* POST upload photo. */
router.post('/', function(req, res, next){
  uploader.uploadPhoto(req, res, function(err, res){
    if (err){
      res.render('error', {error: err});
    } else {
      res.render('uploadPhoto');
    }
  });
})

module.exports = router;
