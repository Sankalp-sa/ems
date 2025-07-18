// src/notifications/notifications.gateway.ts

import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class SocketGateway implements OnGatewayConnection {

    @WebSocketServer()
    server: Server;

    handleConnection(client: any) {
        console.log(`Client connected: ${client.id}`);
    }

    sendLeaveStatusUpdate(userId: string, data: any) {
        // Emit to specific user
        // console.log("Status update in socket",userId, data);
        this.server.to(userId).emit('leaveStatusUpdated', data);
    }

    // Optionally, join user to a room based on their ID
    // handleJoin(client: any, userId: string) {
    //     client.join(userId);
    // }

    @SubscribeMessage('join')
    handleJoinRoom(@MessageBody() userId: string, @ConnectedSocket() client: Socket) {
        client.join(userId);
        console.log(`User ${userId} joined their room`);
    }
}
