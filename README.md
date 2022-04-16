# Image processing - Udacity Fullstack javascript nanodegree

In this first project, the students where chalenged to create, from scratch, an Api when the users could place images into the frontend with the size set via URL parameters.

Properly handled scale versions of images to the front end to reduce page load size. If the image with the same name and size was already provided, the backend should return a cached version.

## Techonologies used in this project:

Express, TypeScript, Jasmine, Eslint, and Prettier.

## How to run the project

To build the project and start the production version run:

```sh
npm run build && npm start
```

To run the unity tests:

```sh
npm run test
```

To run a development version:

```sh
npm run dev
```

To fix linting:

```sh
npm run lint:fix
```

To run lint:

```sh
npm run lint
```

To run prettier:

```sh
npm run prettier
```

## Path
just pass the correct filename, width and height. Read use cases for more info.

```ssh
http:\\localhost:3000?filename={file_name}&width={width}&height={height}
```

## Use cases

- [x] if the user visits a route different of images, we receives a message warning him to visit /images and pass the filename and width and height params.
- [x] if the user provides a filename that doesn't exist, or provides a filename that is not and image, we receives a warning message.
- [x] if the user provides a valid filename and don't provide width or height, then an thumbnail is generated with 200x200.
- [x] if the user provides a valid filename and only provide width or height, then the user receives a warning about the missing params.
- [x] if the user provides a valid filename and provide width and height, then an thumbnail is generated with the dimensions specified.
- [x] if the user provides a valid filename and provide width and height, and theres already one image with the same filename and dimensions inside the thumb folder, no image will be generated. The user will get the cached version.
