"use client";

import { useEffect, useRef, useState } from "react";

export function useWebSocket(
  url: string,
  onMessage?: (data: any) => void
) {
  const wsRef = useRef<WebSocket | null>(null);
  const onMessageRef = useRef<((data: any) => void) | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    onMessageRef.current = onMessage ?? null;
  }, [onMessage]);


  useEffect(() => {
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("✅ WS connected");
      setIsReady(true);
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessageRef.current?.(data);
      } catch {
        // ignore
      }
    };

    ws.onclose = () => {
      console.log("🔌 WS closed");
      setIsReady(false);
    };

    return () => ws.close();
  }, [url]);

  const send = (data: any) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(data));
    }
  };

  return { send, isReady };
}
