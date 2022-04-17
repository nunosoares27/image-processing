import { NextFunction, Request, Response } from 'express';
import path from 'path';
import { fileExistsInFullDirectory, fileExistsInThumbDirectory } from '../utils/fileExists';
import { resizeImages } from '../utils/resizeImages';
import { messages } from '../utils/messages';

const thumbDirectory = path.join(__dirname, '../../thumb');
const fullDirectory = path.join(__dirname, '../../full');
const defaults = { width: '200', height: '200' };

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
          resizeImages(`${fullDirectory}/${filename}`, width as string, height as string, `${thumbDirectory}/${width}_${height}${filename}`, res);
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
          resizeImages(
            `${fullDirectory}/${filename}`,
            defaults.width,
            defaults.height,
            `${thumbDirectory}/${defaults.width}_${defaults.height}${filename}`,
            res,
          );
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
