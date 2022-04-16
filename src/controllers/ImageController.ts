import { NextFunction, Request, Response, Router } from 'express';
import handleImages from '../services/handleImages';
import { messages } from '../utils/messages';

export const ImageController: Router = Router();

ImageController.get('/images', async (req: Request, res: Response, next: NextFunction) => handleImages(req, res, next));

ImageController.get('*', (req: Request, res: Response) => {
  res.status(200).end(messages.wrongRoute);
});
