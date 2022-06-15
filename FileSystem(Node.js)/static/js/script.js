
import { createServer } from 'http';
import respond from '../../libs/respond.js';


//create a server instance
const port = process.env.port || 3000;

const server = createServer(respond);

server.listen(port, ()=>
    {
        console.log(`listining on ${port}`);
    }
)