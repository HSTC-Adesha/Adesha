import {SubscribeMessage, WebSocketGateway, OnGatewayInit, WsResponse } from '@nestjs/websockets';
import {Logger} from '@nestjs/common';
import { Socket, Server } from 'socket.io';
@WebSocketGateway({namespace: ''})
export class AppGateway implements OnGatewayInit {
    private logger: Logger = new Logger('AppGateway');
    afterInit(server:any) {
        this.logger.log('Initialized!');
    }
    handleaddition (cheque: any){
        this.logger.log('cheque added:${cheque.id}');
    }
    handledeletion (cheque: any, ...args:any[]){
        this.logger.log('cheque deleted:${cheque.id}');
    }
    @SubscribeMessage ('msgToServer')
handleMessage(client: Socket, text: string): WsResponse<string>  {
    return { event: 'msgToclient', data:text};
}
}