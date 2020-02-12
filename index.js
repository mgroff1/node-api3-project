require('dotenv').config();

const server = require('./server');

const port = process.env.PORT;

server.listen(5000, () => {
    console.log(`Server is running on http://localhost:${port} ^.^`)
})