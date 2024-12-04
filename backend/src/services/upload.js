import multer from 'multer';

// Storage engine for image uploads
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/images/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

// Storage engine for video uploads
const videoStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/videos/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

// Multer configuration for images
export const uploadImage = multer({
  storage: imageStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, 
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(file.originalname.toLowerCase());
    mimeType && extname ? cb(null, true) : cb(new Error('Only JPEG, JPG, and PNG files are allowed'), false);
  },
}).single('image');

// Multer configuration for videos
export const uploadVideo = multer({
  storage: videoStorage,
  limits: { fileSize: 50 * 1024 * 1024 }, 
  fileFilter: (req, file, cb) => {
    const fileTypes = /mp4|avi|mkv/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(file.originalname.toLowerCase());
    mimeType && extname ? cb(null, true) : cb(new Error('Only MP4, AVI, and MKV files are allowed'), false);
  },
}).single('video');
