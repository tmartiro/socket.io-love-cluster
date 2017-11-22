
const cluster = require('cluster');

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
  
  // Fork workers.
  for (let i = 0; i < 4; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });

} else {
  console.log(`Worker ${process.pid} started`);
  var http = require('http').createServer();
  var io = require('socket.io')(http);
  //var io = require('socket.io').listen(4567);
  http.listen(4567, '127.0.0.1');
  
  io.sockets.on('connection', (socket) => {
    
    socket.on("message", (data) => {
      data = data.split('');
      data = data.map((a) => {return a + 1;});
      socket.emit("response", `${data.length} from ${process.pid}`);
    });
   
   
  
  });

 
  
}
