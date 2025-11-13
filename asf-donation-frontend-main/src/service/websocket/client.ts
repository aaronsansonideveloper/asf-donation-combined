import { config } from 'config.file';
import { io, Socket } from 'socket.io-client';
import storageHelper from 'src/common/utils/storageHelper';

// const socket = io("localhost:4001", {
//   reconnectionDelayMax: 10000,
//   transports: ["websocket"],
//   autoConnect: true,
//   reconnection: true,
//   reconnectionAttempts: 20,
//   auth: {
//     token: storageHelper.getItem("ACCESS_TOKEN"),
//   }
// });

// const socketIOService = {
//   connect: () => {
//     socket.on("connect", () => {
//       //   console.log("connected, ", socket.id);
//       storageHelper.setItem("SOCKET_ID", socket.id);
//       storageHelper.setItem("SOCKET_STATUS", SocketStatus.connected);
//     })
//   },
//   reconnect: () => {
//     socket.io.on("reconnect_attempt", () => {
//       //   console.log("websocket reconnectting");
//       storageHelper.setItem("SOCKET_STATUS", SocketStatus.reconnecting);
//     })
//   },
//   reconnected: () => {
//     socket.io.on("reconnect", () => {
//       //   console.log("websocket reconnected");
//       storageHelper.setItem("SOCKET_ID", socket.id);
//       storageHelper.setItem("SOCKET_STATUS", SocketStatus.connected);
//     })
//   },
//   disconnect: () => {
//     socket.on("disconnect", () => {
//       //   console.log(socket.id); // undefined
//       storageHelper.setItem("SOCKET_STATUS", SocketStatus.disconnected);
//     })
//   }
// }

// export default socketIOService;

class SocketIOService {
  private socket: Socket | null = null;
  public socket_status = 'pending';
  private _wss: string;
  constructor(wss: string) {
    // wss: websocket server => localhost:4001 / scaling.com.au
    this._wss = wss;
  }

  public connect() {
    const token = storageHelper.getItem('ACCESS_TOKEN', 'local');
    this.socket = io(this._wss, {
      reconnectionDelayMax: 10000,
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 20,
      extraHeaders: {
        token: token,
      },
    });
    this.socket.on('connect', () => {
      //   console.log('connected, ', this.socket!.id);

      sessionStorage.setItem('SOCKET_ID', this.socket!.id!);
      storageHelper.setItem('SOCKET_STATUS', SocketStatus.connected);
    });

    this.socket.on('message', (data) => {
      //   console.log(data);
    });

    this.socket.on('reload', () => {
      //   console.log('reload');
    });
  }

  public reconnect() {
    this.socket?.io.on('reconnect_attempt', () => {
      storageHelper.setItem('SOCKET_STATUS', SocketStatus.reconnecting);
    });
  }

  public reconnected() {
    this.socket?.io.on('reconnect', () => {
      //   console.log('websocket reconnected');
      storageHelper.setItem('SOCKET_ID', this.socket!.id);
      storageHelper.setItem('SOCKET_STATUS', SocketStatus.connected);
    });
  }

  public disconnect() {
    this.socket?.on('disconnect', () => {
      //   console.log(this.socket!.id); // undefined
      storageHelper.setItem('SOCKET_STATUS', SocketStatus.disconnected);
    });
  }
}

enum SocketStatus {
  pending = 'pending',
  reconnecting = 'reconnecting',
  connected = 'connected',
  disconnected = 'disconnected',
}

export const socketIOServiceSingleton = new SocketIOService(
  process.env.NEXT_PUBLIC_DOMAIN_URI || 'https://scaling.com.au'
);
