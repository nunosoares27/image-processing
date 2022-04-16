import supertest from 'supertest';
import path from 'path';
import fs from 'fs';
import { server } from '../server';
import { messages } from '../utils/messages';
import { fileExistsInThumbDirectory } from '../utils/fileExists';

const requestWithSupertest = supertest(server);
const thumbDirectory = path.join(__dirname, '../../thumb');

describe('testing endpoints and functionality:', () => {
  it('Should return wrongRoute message when the user visit the wrong route', async () => {
    const res = await requestWithSupertest.get('/');
    expect(res.status).toEqual(200);
    expect(res.text).toEqual(messages.wrongRoute);
  });

  it('Should return fileNotFoundInsideFullDir message when the image don´t exist inside the full folder', async () => {
    const res = await requestWithSupertest.get('/images').query('filename=image_dont_exist.jpg');
    expect(res.status).toEqual(404);
    expect(res.text).toEqual(messages.fileNotFoundInsideFullDir);
  });

  it('Should return fileNotFoundInsideFullDir message when a file is not a image inside full folder', async () => {
    fs.writeFile('full/wrongfile.txt', 'Wrong File', () => '');
    const res = await requestWithSupertest.get('/images').query('filename=wrongfile.txt');
    expect(res.status).toEqual(404);
    expect(res.text).toEqual(messages.fileNotFoundInsideFullDir);
    fs.unlinkSync('full/wrongfile.txt');
  });

  it('Should return missingParams message when the user don´t provide the filename', async () => {
    const res = await requestWithSupertest.get('/images');
    expect(res.status).toEqual(200);
    expect(res.text).toEqual(messages.missingParams);
  });

  it('Should return missingSomeParams message when the user provide the filename and width and don´t provide the height', async () => {
    const res = await requestWithSupertest.get('/images').query('filename=donkey.jpg&width=600');
    expect(res.status).toEqual(200);
    expect(res.text).toEqual(messages.missingSomeParams);
  });

  it('Should generate a thumb image with 200x200 when the user only provide the filename', async () => {
    expect(await fileExistsInThumbDirectory('donkey', '200', '200', thumbDirectory)).toBeFalse();
    const res = await requestWithSupertest.get('/images').query('filename=donkey.jpg');
    expect(res.status).toEqual(200);
    expect(await fileExistsInThumbDirectory('donkey', '200', '200', thumbDirectory)).toBeTrue();
    fs.unlinkSync('thumb/200_200donkey.jpg');
  });

  it('Should generate a thumb image with 600x600 when the user provide the filename, and 600x600 dimensions', async () => {
    expect(await fileExistsInThumbDirectory('donkey', '600', '600', thumbDirectory)).toBeFalse();
    const res = await requestWithSupertest.get('/images').query('filename=donkey.jpg&width=600&height=600');
    expect(res.status).toEqual(200);
    expect(await fileExistsInThumbDirectory('donkey', '600', '600', thumbDirectory)).toBeTrue();
    fs.unlinkSync('thumb/600_600donkey.jpg');
  });
});
