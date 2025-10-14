import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Booking } from '@src/bookings/entities/booking.entity';
import { Room } from '@src/rooms/entities/room.entity';

import { BookingService } from './booking.service';
import { BookingTool } from './booking.tool';

@Module({
  imports: [MikroOrmModule.forFeature([Booking, Room])],
  controllers: [],
  providers: [BookingService, BookingTool],
  exports: [BookingService, BookingTool],
})
export class BookingsModule {}
