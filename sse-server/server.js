const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

const PORT = 3000;

function eventsHandler(request, response) {
  const clientId = request.query.id;
  const headers = {
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache',
    'Access-Control-Allow-Origin': 'http://localhost:3001',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'Access-Control-Allow-Credentials': 'true'

  };
  response.writeHead(200, headers);


  const timeId = setInterval(() => {
    const data = `data: ${JSON.stringify({ data: Math.random() })}\n\n`;
    response.write(data);
  })

  request.on('close', () => {
    console.log(`${clientId} Connection closed`);
    clearInterval(timeId);
  });
}

app.get('/events', eventsHandler);

app.listen(PORT, () => {
  console.log(`Facts Events service listening at http://localhost:${PORT}`)
})