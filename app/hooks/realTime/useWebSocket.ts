"use client";

import { useEffect, useRef } from "react";

export function useWebSocket(
  url: string,
  onMessage: (data: any) => void
) {
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onmessage = (event) => {
      onMessage(JSON.parse(event.data));
    };

    return () => ws.close();
  }, [url, onMessage]);

  const send = (data: any) => {
    wsRef.current?.send(JSON.stringify(data));
  };

  return { send };
}
