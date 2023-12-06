import multer from 'multer'

const generateFilename = (originalName) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const extention = originalName.split('.').pop()
    return `${uniqueSuffix}.${extention}`
}

const profileImageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/profile')
    },
    filename: (req, file, cb) => {
        cb(null, generateFilename(file.originalname))
    }
})

const reviewImageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/review')
    },
    filename: (req, file, cb) => {
        cb(null, generateFilename(file.originalname))
    }
})

export const profileImageUpload = multer({ storage: profileImageStorage })
export const reviewImageUpload = multer({ storage: reviewImageStorage })