export const messages = {
  failToReadContentsFullDir: 'Fail to read contents inside full directory: ',
  fileNotFoundInsideFullDir: 'There is no image with that name inside the full directory.',
  failedToSendImage: 'Failed to send image: ',
  wrongRoute: 'To use this aplication you need to use the path /images and provid the correct params.',
  missingSomeParams: 'You need to provide the width and height otherwise it will resize 200x200',
  missingParams: `Please add in url the name of the file and the dimensions.\n
The image should be located inside the full directory.\n
If no dimensions provided it will resize 200x200.\n
Example: localhost:3000?filename={file name}&width=400&height=400`,
};
