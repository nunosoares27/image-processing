import { Application, Router } from 'express';
import { ImageController } from './controllers/ImageController';

const _routes: [string, Router][] = [['/', ImageController]];

export const routes = (server: Application) => {
  _routes.forEach((route) => {
    const [url, controller] = route;
    server.use(url, controller);
  });
};
