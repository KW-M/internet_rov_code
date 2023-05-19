import asyncio
import websockets

class WebSocketServer:
    def __init__(self, msgReceivedFn):
        self.msgReceivedFn = msgReceivedFn
        self.connections = set()


    async def _register(self, websocket, path):
        self.connections.add(websocket)
        print("Client connected to Web Socket Server: ", websocket) 
        
        # While client is connected, await messages and process them
        # with the provided message-received-function
        async for message in websocket:
            self.msgReceivedFn(message, "Dummy") # For now, add dummy metadata. TODO extract with protobuf
        
        print("Client disconnected from Web Socket Server: ", websocket)
        self.connections.remove(websocket)

    """Send out a message to all connected clients"""
    async def broadcast(self, message):
        websockets.broadcast(self.connections, message)


    """Start Websocket Server"""
    async def start_wss(self):
        async with websockets.serve(self._register, "localhost", 8765):
            await asyncio.Future()  # run forever

    def is_connected(self):
        return len(self.connections) > 0

# asyncio.run(main())

"""
import asyncio
import datetime
import random
import websockets

CONNECTIONS = set()

async def register(websocket):
    CONNECTIONS.add(websocket)
    try:
        await websocket.wait_closed()
    finally:
        CONNECTIONS.remove(websocket)

async def show_time():
    while True:
        message = datetime.datetime.utcnow().isoformat() + "Z"
        websockets.broadcast(CONNECTIONS, message)
        await asyncio.sleep(random.random() * 2 + 1)

async def main():
    async with websockets.serve(register, "localhost", 5678):
        await show_time()

if __name__ == "__main__":
    asyncio.run(main())

"""