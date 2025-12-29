import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { McpModule } from '@rekog/mcp-nest';
import { ormConfig } from '@src/db/ormconfig';

import { BookingsModule } from './bookings/bookings.module';
import { RoomsModule } from './rooms/rooms.module';

@Module({
  imports: [
    MikroOrmModule.forRoot(ormConfig),
    McpModule.forRoot({
      name: 'hotel-mcp-server',
      version: '1.0.0',
      instructions:
        'We provide a list of rooms with room number, type and capacity. You can check the availability of a room with room number, check-in and check-out date. If the room is available you can book the room with guest name and email.  If the room is not available, try another room. For every room we provide a detail room description suitable to create an image. Bookings can be cancelled as well.', // TODO: add a "usage guide" about your server for the LLM here
    }),
    BookingsModule,
    RoomsModule,
  ],
  controllers: [],
})
export class AppModule {}
