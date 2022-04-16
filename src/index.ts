import { server } from './server';

const port = 3000;
const host = 'http://localhost:';

server.listen(port, () => console.log(`Server is listening on port ${host}${port}`));
