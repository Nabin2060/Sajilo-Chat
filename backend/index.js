// const http = require('http');


// http.createServer((req, res) => {
//     res.writeHead(200, { "content-type": "text/plain" });
//     res.end("Hello World");
// }).listen(8000, () => {
//     console.log("server is running in localhost:8000");
// })

// const express = require('express');

// const app = express();

// const PORT = 9000;
// app.get('/', (req, res) => {
//     res.json({
//         message: "api is running..."
//     })
// })

// app.listen(PORT, () => {
//     console.log(`server is running on port ${PORT}`);
// })

[1, 2, 3].map(x => x * 2);      // [2,4,6]
[1, 2, 3].filter(x => x > 1);   // [2,3]
[1, 2, 3].reduce((a, b) => a + b, 0); // 6
[1, 2, 3].forEach(x => console.log(x));
