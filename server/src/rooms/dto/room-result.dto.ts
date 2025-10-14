import type { RoomType } from '../entities/room.entity';

export class RoomResult {
  roomNumber!: string;
  type!: RoomType;
  price!: number;
  capacity!: number;
  createdAt!: Date;
  updatedAt!: Date;
}
