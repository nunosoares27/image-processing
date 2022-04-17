import path from 'path';
import fs from 'fs';
import sharp from 'sharp';
import { sharpOptions } from '../utils/resizeImages';

const thumbDirectory = path.join(__dirname, '../../thumb');
const fullDirectory = path.join(__dirname, '../../full');
const dimensions = { width: 300, height: 300 };
const filename = 'donkey.jpg';

describe('testing resize image:', () => {
  it('should generate a image with 300x300', async () => {
    const uploadedImage = await sharp(`${fullDirectory}/${filename}`)
      .resize(dimensions.width, dimensions.height, sharpOptions)
      .toFile(`${thumbDirectory}/${dimensions.width}_${dimensions.height}${filename}`);

    expect(uploadedImage.height).toBe(dimensions.height);
    expect(uploadedImage.width).toBe(dimensions.width);
    fs.unlinkSync('thumb/300_300donkey.jpg');
  });
});
