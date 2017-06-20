var persistence = require('./persistence');

exports.uploadPhoto = function(req, res, cb){
  //var err = new Error('There was an error uploading the file')
  var userId = req.body.userId;
  var password = req.body.password;
  
  persistence.validateUser(userId, password, function(err, photoCount){
    if (err) {
      cb(err, res);
    } else {
      if (typeof req.file !== 'undefined'){
        if (req.file.mimetype === 'image/jpeg'){
          persistence.savePhoto(req.file.buffer, userId, function(err, photoCount){
            cb(null, res, photoCount);
          });
        } else {
          cb(new Error('Illegal file type'));
        }
        
      } else {
        cb(new Error('Missing file'), res);
      }
    }
  });
}