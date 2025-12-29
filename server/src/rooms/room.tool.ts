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

  @Tool({
    name: 'check_room_availability',
    description:
      'Check room availability with room number, check-in date, and check-out date',
    parameters: z.object({
      roomNumber: z.string().describe('Room Number'),
      checkInDate: z.string().describe('Check-in date in YYYY-MM-DD format'),
      checkOutDate: z.string().describe('Check-out date in YYYY-MM-DD format'),
    }),
  })
  async checkRoomAvailability({
    roomNumber,
    checkInDate,
    checkOutDate,
  }: {
    roomNumber: string;
    checkInDate: string;
    checkOutDate: string;
  }) {
    // console.log('check_room_availability', checkInDate, checkOutDate);
    return 'room is available';
  }

  @Tool({
    name: 'book_room',
    description:
      'Book a room with room number, check-in date, and check-out date, guest name and email',
    parameters: z.object({
      roomNumber: z.string().describe('Room Number'),
      checkInDate: z.date().describe('Check-in date in YYYY-MM-DD format'),
      checkOutDate: z.date().describe('Check-out date in YYYY-MM-DD format'),
      guestName: z.string().describe('Guest Name'),
      guestEmail: z.string().describe('Guest Email'),
    }),
  })
  async bookRoom({
    roomNumber,
    checkInDate,
    checkOutDate,
    guestName,
    guestEmail,
  }: {
    roomNumber: string;
    checkInDate: Date;
    checkOutDate: Date;
    guestName: string;
    guestEmail: string;
  }) {
    // console.log('book_room', roomNumber, checkInDate, checkOutDate, guestName, guestEmail);
    return 'room booked successfully';
    // throw new Error('Room not available');
  }

  @Tool({
    name: 'cancel_booking',
    description: 'Cancel a booking with booking ID',
    parameters: z.object({
      bookingId: z.number().describe('Booking ID'),
    }),
  })
  async cancelBooking({ bookingId }: { bookingId: number }) {
    // console.log('cancel_booking', bookingId);
    return 'booking cancelled successfully';
  }

  @Tool({
    name: 'get_room_description',
    description: 'Get detailed room description for generating an image',
    parameters: z.object({
      roomNumber: z.string().describe('Room Number'),
    }),
  })
  async getRoomDescription({ roomNumber }: { roomNumber: string }) {
    return {
      text: 'The room is 4 x 5 meters, with a four-poster bed and a large wardrobe with a large glass door to the balcony and lots of knick-knacks',
      imageUrl: 'https://picsum.photos/200/300',
    };
  }

  @Tool({
    name: 'get_rooms',
    description: 'Get a list of all rooms',
  })
  async getRooms() {
    return this.roomService.getRooms();
  }
}
