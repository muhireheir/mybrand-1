import multer from 'multer'
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'ui/img/blog/')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})
const upload = multer({ storage: storage })
const uploader = upload.single('image')

export default uploader