import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { EntityManager } from 'typeorm';

@Module({
  providers: [DatabaseService],
  exports: [DatabaseService]
})
export class DatabaseModule {}
