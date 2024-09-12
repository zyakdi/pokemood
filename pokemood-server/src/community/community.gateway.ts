import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class CommunityGateway implements OnGatewayConnection {
  @WebSocketServer() server: Server;
  private connectedUsers: { id: string; name: string }[] = [];

  constructor() {}

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
    this.connectedUsers = this.connectedUsers.filter(
      ({ id }) => id !== client.id,
    );
    this.broadcastUserList();
  }

  @SubscribeMessage('connect-user')
  handleConnectUser(
    @MessageBody() user: { name: string },
    @ConnectedSocket() client: Socket,
  ) {
    const connectedUser = { id: client.id, name: user.name };
    console.log('User connected', connectedUser);
    this.connectedUsers.push(connectedUser);
    this.broadcastUserList();
  }

  private broadcastUserList() {
    this.server.emit(
      'connected-users-update',
      this.connectedUsers.map(({ name }) => name),
    );
  }
}
