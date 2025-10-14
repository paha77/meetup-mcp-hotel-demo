import {
  BaseEntity,
  Entity,
  ManyToOne,
  OptionalProps,
  PrimaryKey,
  Property,
} from '@mikro-orm/sqlite';
import { Room } from '@src/rooms/entities/room.entity';

export enum BookingStatus {
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
}

@Entity()
export class Booking extends BaseEntity {
  [OptionalProps]?: 'createdAt' | 'updatedAt';

  @PrimaryKey()
  id!: number;

  @ManyToOne(() => Room, { joinColumn: 'roomNumber' })
  room!: Room;

  @Property()
  guestName!: string;

  @Property()
  guestEmail!: string;

  @Property()
  checkInDate!: Date;

  @Property()
  checkOutDate!: Date;

  @Property()
  numberOfGuests!: number;

  @Property()
  status: BookingStatus = BookingStatus.CONFIRMED;

  @Property()
  totalPrice!: number;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
