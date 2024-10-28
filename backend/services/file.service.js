const multer = require("multer") //we are going to implement, savefiles here so we need multer lib.

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "uploads/")
    },

    filename: function (req, file, cb){
        cb(null, Date.now()+ "-" + file.originalname)
    }
});

const upload = multer({storage: storage});

module.exports = upload;