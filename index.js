const http = require('http');

const MILLISECONDS_PER_SECONDS = 1000;

function getRandomSecondBetween1And5() {
  return Math.floor(Math.random() * 5) + 1;
}

let globalValue = 0;

const app = http.createServer((request, response) => {
  const pid = process.pid;
  console.log('Request Received - pid', process.pid);

  // To block the code for random number for seconds
  const randomSecondsForDelay = getRandomSecondBetween1And5();
  const start = Date.now();
  while (
    Date.now() - start <
    randomSecondsForDelay * MILLISECONDS_PER_SECONDS
  ) {
    // This will block the event loop for 5 seconds
  }

  if (Math.random() < 0.5) {
    globalValue += 1;
  } else {
    globalValue *= 0;
  }

  console.log(
    'Sending Response - pid',
    pid,
    'after',
    randomSecondsForDelay,
    'Seconds. globalValue = ',
    globalValue
  );
  response.writeHead(200, { 'Content-Type': 'text/plain' });

  const responseText = `200 OK. Blocked for ${randomSecondsForDelay} Sec, pid: ${pid}`;

  response.end(responseText);
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
