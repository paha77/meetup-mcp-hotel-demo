import { Injectable } from '@nestjs/common';
import { Tool } from '@rekog/mcp-nest';
import { z } from 'zod';

import { RoomService } from './room.service';

@Injectable()
export class RoomTool {
  constructor(private readonly roomService: RoomService) {}

  @Tool({
    name: 'get_room_details',
    description: 'Get detailed information about a specific room',
    parameters: z.object({
      roomNumber: z.string().describe('Room Number'),
    }),
  })
  async getRoomDetails({ roomNumber }: { roomNumber: string }) {
    return this.roomService.getRoomByRoomNumber(roomNumber);
  }

  // TODO: add tools here
}
