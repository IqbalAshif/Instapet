'use strict';
const sharp = require('sharp');

const makeThumbnail = async (file, thumbname) => {
  // file = full path to image (req.file.path), thumbname = filename (req.file.filename)
  // TODO: use sharp to create a png thumbnail of 160x160px, use async await
  console.log('make tnails', file, thumbname);
  const thumbnail = await sharp(file).resize({
    fit: sharp.fit.contain,
    width: 160,
    height:160,
}).toFile('./thumbnails/', thumbname);
  return thumbnail;

};

module.exports = {
  makeThumbnail,
};
