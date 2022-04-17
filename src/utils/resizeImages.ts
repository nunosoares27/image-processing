import { Response } from 'express';
import sharp from 'sharp';

export const sharpOptions: sharp.ResizeOptions = {
  kernel: sharp.kernel.nearest,
  fit: 'contain',
  position: 'right top',
  background: 'transparent',
};

export const resizeImages = (initialPath: string, width: string, height: string, destinationPath: string, res: Response) => {
  sharp(initialPath)
    .resize(parseInt(width as string), parseInt(height as string), sharpOptions)
    .toFile(destinationPath)
    .then(() => res.status(200).sendFile(destinationPath));
};
