var persistence = require('./persistence');

exports.uploadPhoto = function(req, res, cb){
  //var err = new Error('There was an error uploading the file')
  var userId = req.body.userId;
  var password = req.body.password;
  
  persistence.validateUser(userId, password, function(err){
    if (err) {
      cb(err);
    } else {
      if (req.file !== 'undefined'){
        // TODO save file
      } else {
        cb(new Error('Missing file'));
      }
    }
  });
}