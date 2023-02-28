# React useWebSocket without the state updates

Calling update state on all websocket messages causes react native to crash with frequent updates - this just removes the stateful last message stuff.
