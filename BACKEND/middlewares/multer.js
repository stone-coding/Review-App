const multer = require('multer')

const storage = multer.diskStorage({})

const fileFilter = (req, file, cb) => {
    // console.log(file);
    if(!file.mimetype.startsWith('image')){
        cb('Support only image files!',false)
    }
    cb(null, true)
}

exports.uploadImage = multer({storage, fileFilter})