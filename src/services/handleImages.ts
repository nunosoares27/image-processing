import { NextFunction, Request, Response } from 'express';
import path from 'path';
import sharp from 'sharp';
import { fileExistsInFullDirectory, fileExistsInThumbDirectory } from '../utils/fileExists';
import { messages } from '../utils/messages';

const thumbDirectory = path.join(__dirname, '../../thumb');
const fullDirectory = path.join(__dirname, '../../full');
const defaults = { width: '200', height: '200' };
const sharpOptions: sharp.ResizeOptions = {
  kernel: sharp.kernel.nearest,
  fit: 'contain',
  position: 'right top',
  background: 'transparent',
};

const handleImages = async (req: Request, res: Response, next: NextFunction) => {
  const fileExistsFullDir = await fileExistsInFullDirectory(req.query.filename as string, fullDirectory);
  const { width, height, filename } = req.query;
  let fileExistsThumbDir;

  try {
    if (filename) {
      if (!fileExistsFullDir) {
        res.status(404).end(messages.fileNotFoundInsideFullDir);
      }
      if ((width && !height) || (!width && height)) res.status(200).end(messages.missingSomeParams);
      if (width && height) {
        fileExistsThumbDir = await fileExistsInThumbDirectory(filename as string, width as string, height as string, thumbDirectory);
        if (fileExistsThumbDir)
          res.sendFile(`${thumbDirectory}/${width}_${height}${filename}`, (error) => {
            if (error) {
              console.log(messages.failedToSendImage + error);
            }
            return res.status(200).end();
          });
        if (fileExistsFullDir && !fileExistsThumbDir) {
          sharp(`${fullDirectory}/${filename}`)
            .resize(parseInt(width as string), parseInt(height as string), sharpOptions)
            .toFile(`${thumbDirectory}/${width}_${height}${filename}`)
            .then(() => res.status(200).sendFile(`${thumbDirectory}/${width}_${height}${filename}`));
        }
      } else {
        fileExistsThumbDir = await fileExistsInThumbDirectory(filename as string, defaults.width, defaults.height, thumbDirectory);
        if (fileExistsThumbDir)
          res.sendFile(`${thumbDirectory}/${defaults.width}_${defaults.height}${filename}`, (error) => {
            if (error) {
              console.log(messages.failedToSendImage + error);
            }
            return res.status(200).end();
          });
        if (fileExistsFullDir && !fileExistsThumbDir) {
          sharp(`${fullDirectory}/${filename}`)
            .resize(parseInt(defaults.width), parseInt(defaults.height), sharpOptions)
            .toFile(`${thumbDirectory}/${defaults.width}_${defaults.height}${filename}`)
            .then(() => res.status(200).sendFile(`${thumbDirectory}/${defaults.width}_${defaults.height}${filename}`));
        }
      }
    } else {
      res.status(200).end(messages.missingParams);
    }
  } catch (e) {
    next(e);
  }
};

export default handleImages;
