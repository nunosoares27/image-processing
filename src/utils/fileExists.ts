import fs from 'fs';
import { messages } from './messages';

export const isImage = (file: string) => file.match(/(?:jpg|gif|png|jpeg)/g);

export const fileExistsInFullDirectory = async (filename: string, directory: string) => {
  let found = false;
  try {
    const files = await fs.promises.readdir(directory);
    files.map((file) => {
      if (isImage(file) && file.includes(filename)) {
        found = true;
        return found;
      }
    });
    return found;
  } catch (error) {
    console.log(messages.failToReadContentsFullDir + error);
    return found;
  }
};

export const fileExistsInThumbDirectory = async (filename: string, width: string, height: string, directory: string) => {
  let found = false;
  try {
    const files = await fs.promises.readdir(directory);
    files.map((file) => {
      if (isImage(file) && file.includes(`${width}_${height}${filename}`)) {
        found = true;
        return found;
      }
    });
    return found;
  } catch (error) {
    console.log(messages.failToReadContentsFullDir + error);
    return found;
  }
};
