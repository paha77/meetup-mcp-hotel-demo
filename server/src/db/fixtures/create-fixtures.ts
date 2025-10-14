import { type EntityManager } from '@mikro-orm/core';
import { Booking, BookingStatus } from '@src/bookings/entities/booking.entity';
import { Room, RoomType } from '@src/rooms/entities/room.entity';

/**
 * Create sample room data
 */
export async function createRooms(em: EntityManager): Promise<Room[]> {
  const rooms = [
    em.create(Room, {
      roomNumber: '101',
      type: RoomType.STANDARD,
      price: 100,
      capacity: 2,
    }),
    em.create(Room, {
      roomNumber: '102',
      type: RoomType.STANDARD,
      price: 100,
      capacity: 2,
    }),
    em.create(Room, {
      roomNumber: '201',
      type: RoomType.DELUXE,
      price: 200,
      capacity: 3,
    }),
    em.create(Room, {
      roomNumber: '202',
      type: RoomType.DELUXE,
      price: 200,
      capacity: 3,
    }),
    em.create(Room, {
      roomNumber: '301',
      type: RoomType.SUITE,
      price: 350,
      capacity: 4,
    }),
    em.create(Room, {
      roomNumber: '401',
      type: RoomType.EXECUTIVE,
      price: 500,
      capacity: 2,
    }),
  ];

  await em.persistAndFlush(rooms);
  console.log('✅ Created sample rooms');
  return rooms;
}

/**
 * Create sample booking data
 */
export async function createBookings(
  em: EntityManager,
  rooms: Room[],
): Promise<void> {
  // Get today's date
  const today = new Date();

  // Create some bookings for different rooms
  const bookings = [
    em.create(Booking, {
      room: rooms[0], // Room 101
      guestName: 'John Doe',
      guestEmail: 'john.doe@example.com',
      checkInDate: new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 1,
      ), // tomorrow
      checkOutDate: new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 3,
      ), // 3 days from now
      numberOfGuests: 2,
      status: BookingStatus.CONFIRMED,
      totalPrice: rooms[0].price * 2, // 2 nights stay
    }),
    em.create(Booking, {
      room: rooms[2], // Room 201
      guestName: 'Jane Smith',
      guestEmail: 'jane.smith@example.com',
      checkInDate: new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 5,
      ), // 5 days from now
      checkOutDate: new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 8,
      ), // 8 days from now
      numberOfGuests: 3,
      status: BookingStatus.CONFIRMED,
      totalPrice: rooms[2].price * 3, // 3 nights stay
    }),
    em.create(Booking, {
      room: rooms[4], // Room 301
      guestName: 'Bob Johnson',
      guestEmail: 'bob.johnson@example.com',
      checkInDate: new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 2,
      ), // 2 days ago
      checkOutDate: new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 1,
      ), // tomorrow
      numberOfGuests: 4,
      status: BookingStatus.CONFIRMED,
      totalPrice: rooms[4].price * 3, // 3 nights stay
    }),
  ];

  await em.persistAndFlush(bookings);
  console.log('✅ Created sample bookings');
}

/**
 * Main function to create all fixtures
 */
export async function createFixtures(em: EntityManager): Promise<void> {
  console.log('🌱 Creating fixture data...');
  const rooms = await createRooms(em);
  await createBookings(em, rooms);
  console.log('✅ All fixtures created successfully!');
}
