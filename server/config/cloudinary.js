require('dotenv').config();
const config = require('./config')
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: config.CLOUDINARY_NAME,
    secure: true,
    api_key: config.CLOUDINARY_API_KEY,
    api_secret: config.CLOUDINARY_API_SECRET
  });

module.exports = { cloudinary };