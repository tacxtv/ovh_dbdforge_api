import { Module } from '@nestjs/common'
import { WikiModule } from './wiki/wiki.module'

@Module({
  imports: [
    WikiModule,
  ],
})
export class AppModule {
}
