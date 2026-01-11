"use client";

import { useEffect, useRef, useState } from "react";

export function useWebSocket(
  url: string,
  onMessage: (data: any) => void
) {
  const wsRef = useRef<WebSocket | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("✅ WebSocket connected");
      setIsReady(true);
    };

    ws.onmessage = (event) => {
      onMessage(JSON.parse(event.data));
    };

    ws.onerror = (err) => {
      console.error("❌ WebSocket error", err);
    };

    ws.onclose = () => {
      console.log("🔌 WebSocket disconnected");
      setIsReady(false);
    };

    return () => {
      ws.close();
    };
  }, [url, onMessage]);

  const send = (data: any) => {
    if (!wsRef.current) return;
    if (wsRef.current.readyState !== WebSocket.OPEN) {
      console.warn("⏳ WebSocket not ready, skip send");
      return;
    }

    wsRef.current.send(JSON.stringify(data));
  };

  return { send, isReady };
}
