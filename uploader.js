
exports.uploadPhoto = function(req, res, cb){
  //var err = new Error('There was an error uploading the file')
  var userId = req.body.userId;
  var password = req.body.password;
  console.log(req.file);
  cb(null, res);
}