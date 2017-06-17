var express = require('express');
var uploader = require('../uploader');
var multer = require('multer');

var router = express.Router();
var upload = multer({dest: './uploads/'});

/* POST upload photo. */
router.post('/', upload.single('file'), function(req, res, next){
  uploader.uploadPhoto(req, res, function(err, res){
    if (err){
      res.render('error', {error: err});
    } else {
      res.render('uploadPhoto');
    }
  });
})

module.exports = router;
