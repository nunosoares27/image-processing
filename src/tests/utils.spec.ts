import path from 'path';
import fs from 'fs';
import { fileExistsInFullDirectory, fileExistsInThumbDirectory, isImage } from '../utils/fileExists';

const thumbDirectory = path.join(__dirname, '../../thumb');
const fullDirectory = path.join(__dirname, '../../full');

describe('testing utils:', async () => {
  it('Should return false when the wrong image file name is provided to fileExistsInFullDirectory', async () => {
    const res = await fileExistsInFullDirectory('wrong_filename.jpeg', fullDirectory);
    expect(res).toBeFalse();
  });

  it('Should return true when the correct image file name is provided to fileExistsInFullDirectory', async () => {
    const res = await fileExistsInFullDirectory('donkey.jpeg', fullDirectory);
    expect(res).toBeFalse();
  });

  it('Should return false when the wrong image file name is provided to fileExistsInThumbDirectory', async () => {
    const res = await fileExistsInThumbDirectory('wrong_filename.jpg', '', '', thumbDirectory);
    expect(res).toBeFalse();
  });

  it('Should return true when the correct image file name is provided to fileExistsInThumbDirectory', async () => {
    await fs.promises.copyFile('full/donkey.jpg', 'thumb/640_480donkey.jpg');
    const res = await fileExistsInThumbDirectory('donkey.jpg', '640', '480', thumbDirectory);
    expect(res).toBeTrue();
    fs.unlinkSync('thumb/640_480donkey.jpg');
  });

  it('Should return ["jpg"] when a correct a file name with a correct extension is provided to isImage', async () => {
    const res = isImage('donkey.jpg');
    expect(res).toEqual(['jpg']);
  });

  it('Should return null when a correct a file name with a incorrect extension is provided to isImage', async () => {
    const res = isImage('donkey.txt');
    expect(res).toEqual(null);
  });
});
