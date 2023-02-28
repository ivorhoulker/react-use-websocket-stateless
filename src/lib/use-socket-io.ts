import { JsonValue, Options, WebSocketHook } from "./types";

import { DEFAULT_OPTIONS } from "./constants";
import { useMemo } from "react";
import { useWebSocket } from "./use-websocket";

export interface SocketIOMessageData {
  type: string;
  payload: JsonValue | null;
}

const emptyEvent: SocketIOMessageData = {
  type: "empty",
  payload: null,
};

const getSocketData = (
  event: WebSocketEventMap["message"] | null
): SocketIOMessageData => {
  if (!event || !event.data) {
    return emptyEvent;
  }

  const match = event.data.match(/\[.*]/);

  if (!match) {
    return emptyEvent;
  }

  const data = JSON.parse(match);

  if (!Array.isArray(data) || !data[1]) {
    return emptyEvent;
  }

  return {
    type: data[0],
    payload: data[1],
  };
};

export const useSocketIO = (
  url: string | (() => string | Promise<string>) | null,
  options: Options = DEFAULT_OPTIONS,
  connect: boolean = true
): WebSocketHook<SocketIOMessageData, SocketIOMessageData> => {
  const optionsWithSocketIO = useMemo(
    () => ({
      ...options,
      fromSocketIO: true,
    }),
    []
  );

  const { sendMessage, sendJsonMessage, readyState, getWebSocket } =
    useWebSocket(url, optionsWithSocketIO, connect);

  return {
    sendMessage,
    sendJsonMessage,
    readyState,
    getWebSocket,
  };
};
