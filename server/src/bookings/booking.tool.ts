import { Injectable } from '@nestjs/common';
import { Tool } from '@rekog/mcp-nest';
import { z } from 'zod';

import { BookingService } from './booking.service';

@Injectable()
export class BookingTool {
  constructor(private readonly bookingService: BookingService) {}

  // TODO: add tools here
}
