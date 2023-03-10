import {
  DEFAULT_EVENT_SOURCE_OPTIONS,
  EMPTY_EVENT_HANDLERS,
} from "./constants";
import {
  EventSourceEventHandlers,
  EventSourceHook,
  EventSourceOptions,
  Options,
} from "./types";
import { useEffect, useRef } from "react";

import { useWebSocket } from "./use-websocket";

export const useEventSource = (
  url: string | (() => string | Promise<string>) | null,
  {
    withCredentials,
    events,
    ...options
  }: EventSourceOptions = DEFAULT_EVENT_SOURCE_OPTIONS,
  connect: boolean = true
): EventSourceHook => {
  const optionsWithEventSource: Options = {
    ...options,
    eventSourceOptions: {
      withCredentials,
    },
  };
  const eventsRef = useRef<EventSourceEventHandlers>(EMPTY_EVENT_HANDLERS);
  if (events) {
    eventsRef.current = events;
  }

  const { readyState, getWebSocket } = useWebSocket(
    url,
    optionsWithEventSource,
    connect
  );

  return {
    readyState,
    getEventSource: getWebSocket,
  };
};
