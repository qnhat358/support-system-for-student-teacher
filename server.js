const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser')
const apiRouter = require('./routes/api');
const cors = require('cors')
const dotenv = require('dotenv').config();
const handleResponse = require('./app/middlewares/handleResponse')
const app = express()
const port = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://127.0.0.1:3001', // replace with your origin
  credentials: true // enable credentials
}));
app.use(cookieParser())
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
// app.use(formatErrorResponse)
app.use(handleResponse)
app.use(express.static('public'));
app.use('/api', apiRouter);

// global error handler

app.listen(port, () => {
  console.log(`Production server running at http://localhost:${port}`);
});
// if (process.env.NODE_ENV === 'development') {
//   const vite = require('vite');
//   const config = require('./vite.config');
//   (async () => {
//     const viteServer = await vite.createServer(config);
//     app.use(apiRouter);
//     app.use(viteServer.middlewares);
//     app.listen(port, () => {
//       console.log(`Vite development server running at http://localhost:${port}`);
//     });
//   })();
// } else {
// }