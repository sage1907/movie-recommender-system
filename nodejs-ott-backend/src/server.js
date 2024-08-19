import http from "http"
// import fs from "fs";

import "./config/env.config.js"

import app from "./app/app.js";

// ssl config [not added for now]
// import sslConfig from "./config/ssl.config.js";
// const { keyPath, certPath, passphrase } = sslConfig;
// const options = {
//     key: fs.readFileSync(keyPath),
//     cert: fs.readFileSync(certPath),
//     passphrase: passphrase,
// };

// create the server
const PORT = process.env.PORT || 8000;
// const server = http.createServer(options, app);
const server = http.createServer(app);
server.listen(PORT, console.log(`Server is up and running at port ${PORT}`));