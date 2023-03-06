from fastapi import (
    APIRouter,
    WebSocket,
    WebSocketDisconnect,
)
from typing import List
import json


class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, web_socket:WebSocket):
        await web_socket.accept()
        self.active_connections.append(web_socket)

    def disconnect(self, web_socket:WebSocket):
        self.active_connections.remove(web_socket)

    async def send_message(self, message:str, client_id:int,
                            web_socket:WebSocket):
        payload = json.dumps({'client_id':client_id, 'message': message})
        await web_socket.send_text(payload)

    async def broadcast(self, message:str, client_id:int):
        payload = json.dumps({'client_id':client_id, 'message': message})
        for connection in self.active_connections:
            await connection.send_text(payload)

manager = ConnectionManager()
router = APIRouter()

@router.websocket('/ws/{client_id}')
async def web_socket_endpoint(client_id:int, web_socket:WebSocket):
    await manager.connect(web_socket)
    try:
        while True:
            message = await web_socket.receive_text()
            await manager.broadcast(message, client_id)
    except WebSocketDisconnect:
        manager.disconnect(web_socket)
