import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/sqlite';
import { Injectable } from '@nestjs/common';
import { BookingService } from '@src/bookings/booking.service';

import { RoomResult } from './dto/room-result.dto';
import { Room, RoomType } from './entities/room.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: EntityRepository<Room>,
    private bookingService: BookingService,
  ) {}

  async getRoomByRoomNumber(roomNumber: string): Promise<RoomResult | null> {
    const room = await this.roomRepository.findOne({ roomNumber });

    if (!room) {
      return null;
    }

    return this.mapToRoomResult(room);
  }

  // TODO: add business logic methods here...

  private mapToRoomResult(room: Room): RoomResult {
    return {
      roomNumber: room.roomNumber,
      type: room.type,
      price: room.price,
      capacity: room.capacity,
      createdAt: room.createdAt,
      updatedAt: room.updatedAt,
    };
  }

  private getRoomTypeDescription(type: RoomType): string {
    switch (type) {
      case RoomType.STANDARD:
        return 'Comfortable rooms with essential amenities for a pleasant stay';
      case RoomType.DELUXE:
        return 'Spacious rooms with enhanced amenities and modern furnishings';
      case RoomType.SUITE:
        return 'Luxurious suites with separate living areas and premium amenities';
      case RoomType.EXECUTIVE:
        return 'Premium executive rooms with business amenities and exclusive services';
      default:
        return 'Quality accommodations with excellent service';
    }
  }
}
