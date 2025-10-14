import {
  Collection,
  Entity,
  OneToMany,
  OptionalProps,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { BaseEntity } from '@mikro-orm/sqlite';
import { Booking } from '@src/bookings/entities/booking.entity';

export enum RoomType {
  STANDARD = 'Standard',
  DELUXE = 'Deluxe',
  SUITE = 'Suite',
  EXECUTIVE = 'Executive',
}

@Entity()
export class Room extends BaseEntity {
  [OptionalProps]?: 'createdAt' | 'updatedAt';

  @PrimaryKey()
  roomNumber!: string;

  @Property()
  type!: RoomType;

  @Property()
  price!: number;

  @Property()
  capacity!: number;

  @OneToMany(() => Booking, (booking) => booking.room)
  bookings = new Collection<Booking>(this);

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
