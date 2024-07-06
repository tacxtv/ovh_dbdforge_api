import { Module } from '@nestjs/common'
import { FilestorageController } from './filestorage.controller'
import { FilestorageService } from './filestorage.service'

@Module({
  controllers: [FilestorageController],
  providers: [FilestorageService]
})
export class FilestorageModule { }
