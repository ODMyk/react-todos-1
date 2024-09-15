import {WebSocketServer, WebSocket} from "ws";
const wss = new WebSocketServer({port: 8080});

let tasks = [
  {id: 1, title: "Buy milk", completed: false},
  {id: 2, title: "Bake cupcake", completed: false},
  {id: 3, title: "Be happy", completed: false},
];

const eventTypes = [
  "addTodo",
  "removeTodo",
  "updateTasks",
  "dragStart",
  "dragEnd",
];

wss.on("connection", (ws) => {
  ws.send(JSON.stringify({type: "updateTasks", data: tasks}));

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

function broadcast(ws, message) {
  wss.clients.forEach((client) => {
    if (client !== ws && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
}
