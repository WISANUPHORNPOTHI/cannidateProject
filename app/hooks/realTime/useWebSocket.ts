import { useEffect, useRef, useCallback } from "react";

export function useWebSocket(
  url: string,
  onMessage?: (data: any) => void
) {
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (wsRef.current) return; // 🔥 กัน reconnect

    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("✅ WS connected");
    };

    ws.onmessage = (event) => {
      try {
        onMessage?.(JSON.parse(event.data));
      } catch {
        onMessage?.(event.data);
      }
    };

    ws.onerror = (err) => {
      console.error("❌ WS error", err);
    };

    ws.onclose = () => {
      console.log("🔌 WS closed");
      wsRef.current = null;
    };

    return () => {
      ws.close();
    };
  }, [url, onMessage]);

  const send = useCallback((data: any) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(data));
    }
  }, []);

  return { send };
}
