const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const multer = require('multer');
const storage = multer.memoryStorage()
var upload = multer({ storage: storage })

app.listen(3000, () => {
  console.log('listening on 3000')
})

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.post('/uploadfile', timeCheck('before'), upload.single('myFile'), timeCheck('after'), (req, res, next) => {
  const file = req.file
  // console.log('file', file.originalname);
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
  res.send({ message: 'Test' })
})

function timeCheck(type) {
  return (req, res, next) => {
    if (type === 'before') {
      req.start = Date.now()
    } else {
      console.log(`${type} multer: ${(Date.now() - req.start) / 1000}`)
    }
    next()
  }
}
