import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { BookingsModule } from '@src/bookings/bookings.module';

import { Room } from './entities/room.entity';
import { RoomService } from './room.service';
import { RoomTool } from './room.tool';

@Module({
  imports: [MikroOrmModule.forFeature([Room]), BookingsModule],
  controllers: [],
  providers: [RoomService, RoomTool],
  exports: [RoomService, RoomTool],
})
export class RoomsModule {}
