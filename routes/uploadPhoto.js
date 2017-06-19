var express = require('express');
var uploader = require('../uploader');
var multer = require('multer');

var router = express.Router();
var upload = multer();

/* POST upload photo. */
router.post('/', upload.single('file'), function(req, res, next){
  uploader.uploadPhoto(req, res, function(err, res, photoCount){
    if (err){
      res.render('error', {error: err});
    } else {
      var src = '/../uploads/' + req.body.userId + '/' + photoCount + '.jpg';
      res.render('uploadPhoto', {imgSrc: src});
    }
  });
})

module.exports = router;
