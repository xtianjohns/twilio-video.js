var os = require('os');

const Server = require("./dockerProxyServer.js");
async function main() {
  console.log('os.userInfo:', os.userInfo());
  console.log('os.homedir:', os.homedir());
  const server = new Server();
  console.log('starting server...');
  await server.startServer();
  console.log('server started!');
}

main();
