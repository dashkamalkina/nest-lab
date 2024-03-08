import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
// import { Server, Socket } from 'socket.io';
import UserRoles from 'supertokens-node/recipe/userroles';

@WebSocketGateway({
  cors: { origin: ['http://localhost:3000'], credentials: true },
})
export class EventGateway {
  @WebSocketServer()
  server: any;

  async emit(event: string, to: string, data: any) {
    this.server.to(to).emit(event, data);
  }

  @SubscribeMessage('join-admin')
  async joinChat(
    @MessageBody() userId: string,
    @ConnectedSocket() client: any,
  ) {
    const response = await UserRoles.getRolesForUser('public', userId);
    if (response.roles.includes('Admin')) {
      client.join('admin');
      console.log('joined');
    }
  }
}
