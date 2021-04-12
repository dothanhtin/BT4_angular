const path = require('path');
const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser')
const app = express();

const DIR = './uploads';
 
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIR);
    },
    filename: (req, file, cb) => {
      // cb(null, file.fieldname + '-' + Date.now() + '.' + path.extname(file.originalname));
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
let upload = multer({storage: storage});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/uploads', express.static('uploads'));
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
 
app.get('/api/:filename', function (req,res) {
  // res.end('file upload');
  filepath = path.join(__dirname,'./uploads') +'/'+ req.params.filename;
    res.sendFile(filepath);
    console.log(res.na);
});

// app.get('/*', (req, res) => {
//   res.end('file upload');
// });
 
app.post('/api/upload',upload.single('file'), function (req, res) {
    if (!req.file) {
        console.log("Your request doesn’t have any file");
        return res.send({
          success: false,
          msg:"Your request doesn’t have any file"
        });
      }
    // else if(req.files.length()>1){
    //   console.log("Your request have more 1 file");
    //     return res.send({
    //       success: false,
    //       msg:"Your request have more 1 file"
    //     });
    // }
    else {
        console.log('Your file has been received successfully');
        console.log(req.file.filename);
        //console.log(res);
        // return res.send({
        //   success: true
        // })
        return res.send({success: req.file.filename})
      }
});
 
const PORT = process.env.PORT || 4000;
 
app.listen(PORT, function () {
  console.log('Node.js server is running on port ' + PORT);
});