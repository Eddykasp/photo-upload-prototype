
exports.uploadPhoto = function(req, res, cb){
  //var err = new Error('There was an error uploading the file')
  console.log(req.file);
  cb(null, res);
}