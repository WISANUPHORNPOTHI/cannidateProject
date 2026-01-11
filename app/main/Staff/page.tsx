import { WebSocketServer, WebSocket } from "ws";

const PORT = Number(process.env.PORT) || 3001;

type WSClient = WebSocket & {
  clientId?: string;
  role?: "PATIENT" | "STAFF";
};

const wss = new WebSocketServer({ port: PORT });

wss.on("connection", (ws: WSClient) => {
  console.log("Client connected");

  ws.on("message", (raw) => {
    let data: any;

    try {
      data = JSON.parse(raw.toString());
    } catch {
      return;
    }

    if (data.clientId) ws.clientId = data.clientId;
    if (data.source) ws.role = data.source;

    if (
      data.type === "FORM_STAGE_UPDATE" ||
      data.type === "PATIENT_TYPING" ||
      data.type === "FIELD_FOCUS" ||
      data.type === "FIELD_BLUR"
    ) {
      wss.clients.forEach((client) => {
        const c = client as WSClient;

        if (c.readyState !== WebSocket.OPEN) return;

        if (c.clientId === ws.clientId) return;

        if (c.role === ws.role) return;

        c.send(JSON.stringify(data));
      });
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

console.log("WebSocket running on port", PORT);
