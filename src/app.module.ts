import { Module } from '@nestjs/common'
import { WikiModule } from './wiki/wiki.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [
    WikiModule.register(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
