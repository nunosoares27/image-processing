import express, { Application } from 'express';
import { routes } from './routes';

export const server: Application = express();
routes(server);
