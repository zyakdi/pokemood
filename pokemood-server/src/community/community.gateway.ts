import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UserDto } from 'src/user/user.dto';

@WebSocketGateway({ cors: true })
export class CommunityGateway implements OnGatewayConnection {
  @WebSocketServer() server: Server;
  private connectedUsers: UserDto[] = [];

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
    @MessageBody() user: Omit<UserDto, 'id'>,
    @ConnectedSocket() client: Socket,
  ) {
    const connectedUser: UserDto = {
      id: client.id,
      name: user.name,
      position: user.position,
    };
    console.log('User connected', connectedUser);
    this.connectedUsers.push(connectedUser);
    this.broadcastUserList();
  }

  private broadcastUserList() {
    this.server.emit(
      'connected-users-update',
      this.connectedUsers.map(({ name, position }) => ({
        name,
        position,
      })),
    );
  }
}
