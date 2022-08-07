const fs = require('fs');

//Defining functions

exports.writeFile = (path, string) => {
    fs.writeFile(path, string, (err) => {
        if (err) {
          console.log('Couldn\'t write file in ' + path);
          console.error(err);
          return
        }
        console.log('File written successfully: ' + path);
      });
}