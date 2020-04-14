const http = require('http');
const axios = require('axios');

const API_KEY = 'e483313869d897b683a64dad3b7f4cc0';

const server = http.createServer(async (req, res) => {
  const url = 'https://currate.ru/api/?get=rates&pairs=USDRUB,EURRUB&key=' + API_KEY;
  try {
    const response = await axios.get(url, {responseType: 'json'});
    const data = response.data.data;
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET'
    });
    res.end(JSON.stringify(data));
  } catch (error) {
    console.error(error);
  }
  res.writeHead(500, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET'
  });
  res.end('{}');

});

server.listen(3000, '127.0.0.1', () => {
  console.log('Сервер запущен http://127.0.0.1:3000/');
});
