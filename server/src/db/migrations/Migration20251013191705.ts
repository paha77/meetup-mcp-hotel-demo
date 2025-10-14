import { Migration } from '@mikro-orm/migrations';

export class Migration20251013191705 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`room\` (\`room_number\` text not null, \`type\` text not null, \`price\` integer not null, \`capacity\` integer not null, \`created_at\` datetime not null, \`updated_at\` datetime not null, primary key (\`room_number\`));`);

    this.addSql(`create table \`booking\` (\`id\` integer not null primary key autoincrement, \`roomNumber\` text not null, \`guest_name\` text not null, \`guest_email\` text not null, \`check_in_date\` datetime not null, \`check_out_date\` datetime not null, \`number_of_guests\` integer not null, \`status\` text not null default 'confirmed', \`total_price\` integer not null, \`created_at\` datetime not null, \`updated_at\` datetime not null, constraint \`booking_roomNumber_foreign\` foreign key(\`roomNumber\`) references \`room\`(\`room_number\`) on update cascade);`);
    this.addSql(`create index \`booking_roomNumber_index\` on \`booking\` (\`roomNumber\`);`);
  }

}
