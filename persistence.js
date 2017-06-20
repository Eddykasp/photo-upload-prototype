var fs = require('fs');
var crypto = require('crypto');
var parse = require('csv-parse');

exports.allusers = [];

exports.initPersistence = function(){
  var input = fs.readFileSync('users.csv', 'utf-8');
  parse(input, callback = function(err, output){
    if (err) throw new Error('Error parsing users.csv');
    if(typeof output !== 'undefined') {
      exports.allusers = output;
    }
    console.log(exports.allusers);
  });
}

exports.saveUsers = function(){
  var outputString = '';
  exports.allusers.forEach(function(row) {
    var i = 0;
    row.forEach(function(element){
      outputString += element;
      if (i<3) {
        outputString += ',';
      } else {
        outputString += '\n';
      }
      i++;
    })
  }, this);
  fs.writeFileSync('users.csv', outputString, {encoding: 'utf-8'});
}

exports.createUser = function(userId, password, cb){
  var cbCalled = false;
  // check existence in users
  exports.allusers.forEach(function(element) {
    if (element[0] === userId){
      cbCalled = true;
      cb(new Error('User already exists'));
      return;
    }
  }, this);
  
  if (cbCalled){
    return;
  } else {
    var salt = crypto.randomBytes(128).toString('base64');
    var iterations = 10000;
    var derivedKey = crypto.pbkdf2Sync(password, salt, iterations, 512, 'sha512');
    var usrPwdHash = [
      userId.toString(), 
      derivedKey.toString('hex'),
      iterations.toString(),
      salt,
    ];
    exports.allusers.push(usrPwdHash);
    fs.mkdir('./uploads/' + userId, function(err){
      if (err){
        cb(new Error('Failed to create directory for user: ' + userId));
      } else {
            cb(null);
      }
    });
    //console.log(usrPwdHash);
  }

}

exports.validateUser = function(userId, password, cb){
  var user;
  exports.allusers.some(function(row){
    if (row[0] === userId){
      user = row;
      return true;
    }
  });
  if (typeof user === 'undefined') {
    cb(new Error('User does not exist'));
    return;
  }
  var salt = user[3];
  var iterations = user[2];
  var actualKey = user[1];
  var derivedKey = crypto.pbkdf2Sync(password, Buffer.from(salt, 'base64').toString('base64'), Number.parseInt(iterations), 512, 'sha512');
  if(derivedKey.toString('hex') === actualKey){
    cb(null);
    return;
  } else {
    cb(new Error('Wrong Password or UserId'));
    return;
  }
}

exports.savePhoto = function(buffer, userId, cb){
  var dir = './uploads/' + userId + '/';
  fs.readdir(dir, function(err, dirfiles){
    if (err) {cb(err);}
    else{
      var photoCount = dirfiles.length;
      if(photoCount < 12){
        var savePath = dir + (photoCount+1) + '.jpg';
        fs.writeFile(savePath, buffer, function(err){
          if (err) {cb(err)}
          else {
            cb(null, photoCount+1);
          }
        });

      } else {
        cb(new Error('Already uploaded 12 photos'));
      }
    }
  });
}