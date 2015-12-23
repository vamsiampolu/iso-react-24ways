var path = require('path');
var entry = path.join(process.cwd(),'client-render.js');
module.exports = {
  entry:entry,
  output:{
    path:'./public',
    filename:'build.js'
  },
  module:{
    loaders:[
      { 
        test:/\.js$/,
        loader:'babel'
      }
    ] 
  }
};
