const fs = require('fs').promises;
const path = require('path');

const removeOldTourPhotos = async (fieldName, tour) => {
  const tourImagePath = path.join(__dirname, '..', 'public', 'img', 'tours');

  if (fieldName === 'imageCover') {
    const coverImagePath = path.join(tourImagePath, tour.imageCover);
    await fs.rm(coverImagePath, { force: true }).catch(console.log);
  }

  if (fieldName === 'images') {
    const imagesPath = tour.images.map((img) => path.join(tourImagePath, img));
    await Promise.all(
      imagesPath.map((img) => fs.rm(img, { force: true }).catch(console.log))
    );
  }
};

const removeOldUserPhoto = async (filename) => {
  if (filename.startsWith('default')) return;

  const filePath = path.join(
    __dirname,
    '..',
    'public',
    'img',
    'users',
    filename
  );
  await fs.rm(filePath, { force: true }).catch(console.log);
};

exports.removeOldTourPhotos = removeOldTourPhotos;
exports.removeOldUserPhoto = removeOldUserPhoto;
