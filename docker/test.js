const Server = require("./dockerProxyServer.js");
async function main() {
  const server = new Server();
  console.log('starting server...');
  await server.startServer();
  console.log('server started!');
}

main();
