'use strict';
const sharp = require('sharp');

const makeThumbnail = async (size, file, thumbname) => {
  // file = full path to image (req.file.path), thumbname = filename (req.file.filename)
  // TODO: use sharp to create a png thumbnail of 160x160px, use async await
  console.log('make tnails', file, thumbname);
  const thumbnail = await sharp(file).resize(size.width, size.height).toFile(thumbname);
  return thumbnail;

};

module.exports = {
  makeThumbnail,
};
