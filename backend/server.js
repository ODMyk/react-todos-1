import {WebSocketServer, WebSocket} from "ws";
import {config} from "dotenv";
import http from "http";
config();

const broadcast = (ws, message) => {
  wss.clients.forEach((client) => {
    if (client !== ws && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
};

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/api/trigger-socket") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const {verification_token, amount} = JSON.parse(
        decodeURIComponent(body).slice(5),
      );
      if (verification_token !== process.env.KOFI_TOKEN) {
        res.writeHead(400, {"Content-Type": "text/plain"});
        res.end("Wrong token");
      }
      coffeeCups += +amount;

      const message = {
        type: "updateDonations",
        data: Math.trunc(coffeeCups / 3),
      };

      broadcast(null, message);

      res.writeHead(204, {"Content-Type": "application/json"});
      res.end();
    });
  } else {
    res.writeHead(404, {"Content-Type": "text/plain"});
    res.end("Not Found");
  }
});

const wss = new WebSocketServer({server});

let tasks = [
  {id: 1, title: "Buy milk", completed: false},
  {id: 2, title: "Bake cupcake", completed: false},
  {id: 3, title: "Be happy", completed: false},
];

let coffeeCups = 0;

const eventTypes = [
  "addTodo",
  "removeTodo",
  "updateTasks",
  "dragStart",
  "dragEnd",
];

wss.on("connection", (ws) => {
  ws.send(JSON.stringify({type: "updateTasks", data: tasks}));
  ws.send(
    JSON.stringify({type: "updateDonations", data: Math.trunc(coffeeCups / 3)}),
  );

  ws.on("message", (message) => {
    const {type, data} = JSON.parse(message);

    if (!eventTypes.includes(type)) {
      return;
    }

    if (type === "addTodo") {
      tasks = [...tasks, data];
    } else if (type === "removeTodo") {
      tasks = tasks.filter((t) => t.id !== data);
    } else if (type === "updateTasks") {
      tasks = data;
    }

    broadcast(ws, {type, data});
  });
});

server.listen(process.env.PORT, "0.0.0.0", () => {
  console.log("Server is listening on port " + process.env.PORT);
});
