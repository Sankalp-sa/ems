import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000'); // adjust port
  }

  // Join a room after login
  joinUserRoom(userId: string) {
    this.socket.emit('join', userId);
  }

  // Optional: Listen for updates
  onLeaveStatusUpdate(callback: (data: any) => void) {
    this.socket.on('leaveStatusUpdated', callback);
  }
}

 