// const util = require('util')
import util from 'util'
// const path = require('path')
import path from 'path' // this is just for destination
// const multer = require('multer')
import multer from 'multer'
// import __dirname from '__dirname'
const __dirname = path.resolve();
// require('../../uploads')

var storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './uploads') //path.join(`${__dirname}/../../uploads`)
  },
  filename: (req, file, callback) => {
    const match = [
      'image/png',
      'image/jpeg',
      'image/PNG',
      'image/JPEG',
      'image/svg+xml',
      'image/SVG+XML'
    ]
    console.log(file.mimetype)
    console.log(`${__dirname}/../../uploads`)
    if (match.indexOf(file.mimetype) === -1) {
      console.log('Invalid Mimi') // mime
      var message = `${file.originalname} is invalid. Only accept png/jpeg.`
      return callback(message, null)
    }

    var filename = `${Date.now()}-ShopAndWalk-${file.originalname}`  // because sometimes we have same image for many products

    callback(null, filename) // used for whenever we are triggering this function where we insitiating 
  },
})

var uploadFiles = multer({ storage: storage }).single('product_image')//.array('multiple_images', 10)
var upload = util.promisify(uploadFiles)
export default upload
// module.exports = upload
