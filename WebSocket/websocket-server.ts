import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 3001 });

wss.on("connection", (ws, req) => {
  console.log("Client connected from", req.socket.remoteAddress);

  ws.on("message", (message) => {
    console.log("Received:", message.toString());

    wss.clients.forEach((client) => {
      if (client.readyState === client.OPEN) {
        client.send(message.toString());
      }
    });
  });

  ws.on("error", (err) => {
    console.error("WS error:", err);
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

wss.on("error", (err) => {
  console.error("Server error:", err);
});

console.log("WebSocket running at ws://localhost:3001");
