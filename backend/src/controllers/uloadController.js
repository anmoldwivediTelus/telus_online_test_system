import { uploadImage, uploadVideo } from '../services/upload.js'

export const uploadImageController = (req, res) => {
  uploadImage(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image file provided' });
    }
    res.status(200).json({
      success: true,
      message: 'Image uploaded successfully',
      filePath: req.file.path,
      fileName: req.file.filename,
    });
  });
};

// Controller for uploading a video
export const uploadVideoController = (req, res) => {
  uploadVideo(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No video file provided' });
    }
    res.status(200).json({
      success: true,
      message: 'Video uploaded successfully',
      filePath: req.file.path,
      fileName: req.file.filename,
    });
  });
};
