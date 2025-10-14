import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/sqlite';
import { Injectable } from '@nestjs/common';
import { Room } from '@src/rooms/entities/room.entity';

import { Booking, BookingStatus } from './entities/booking.entity';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: EntityRepository<Booking>,
    @InjectRepository(Room)
    private roomRepository: EntityRepository<Room>,
    private readonly entityManager: EntityManager,
  ) {}

  // TODO: add business logic methods here...

  async checkBookingOverlap(
    roomNumber: string,
    checkInDate: Date,
    checkOutDate: Date,
    excludeBookingId?: number,
  ): Promise<boolean> {
    const qb = this.bookingRepository
      .createQueryBuilder('b')
      .where('b.roomNumber = ?', [roomNumber])
      .andWhere('b.status = ?', [BookingStatus.CONFIRMED])
      .andWhere('b.check_in_date < ?', [checkOutDate])
      .andWhere('b.check_out_date > ?', [checkInDate]);

    if (excludeBookingId) {
      qb.andWhere('b.id != ?', [excludeBookingId]);
    }

    const overlappingBookings = await qb.getResult();
    return overlappingBookings.length > 0;
  }
}
