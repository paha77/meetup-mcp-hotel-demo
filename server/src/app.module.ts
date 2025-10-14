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
      instructions: '', // TODO: add a "usage guide" about your server for the LLM here
    }),
    BookingsModule,
    RoomsModule,
  ],
  controllers: [],
})
export class AppModule {}
