var express = require('express');
var multer = require('multer');
var persistence = require('../persistence');

var router = express.Router();
var upload = multer();

router.post('/', upload.array(), function(req, res, next){
  persistence.validateUser(req.body.userId, req.body.password, function(err){
    if (err) {
      res.render(err);
    } else {
      res.render('loginValid');
    }
  });
});

module.exports = router;