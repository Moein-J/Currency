import { InjectModel } from '@nestjs/sequelize';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { Currency } from './currency.model';
import { Injectable } from '@nestjs/common';

@WebSocketGateway(3002, {
  cors: { origin: 'http://localhost:5173' },
})
@Injectable()
export class CurrencyGateWay
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(@InjectModel(Currency) private currencyModel: typeof Currency) {}
  @WebSocketServer() server: Server;

  async handleConnection(client: Socket) {
    const currencies = await this.currencyModel.findAll({
      order: [['updatedAt', 'DESC']],
    });
    console.log('new user connected ... ', client.id);
    await this.server.emit('user-joined', currencies);
  }
  handleDisconnect(client: Socket) {
    console.log('user left the server ... ', client.id);
    this.server.emit('user-disconnected', {
      message: 'user disconnected the server : ' + client.id,
    });
  }
}
