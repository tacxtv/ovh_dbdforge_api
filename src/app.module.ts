import { Module } from '@nestjs/common'
import { WikiModule } from './wiki/wiki.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import config from './config'
import { RequestContextModule } from 'nestjs-request-context'
// import { RedisModule } from '@nestjs-modules/ioredis'
// import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose'
// import { RedisOptions } from 'ioredis'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    // MongooseModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: async (config: ConfigService) => ({
    //     ...config.get<MongooseModuleOptions>('mongoose.options'),
    //   }),
    // }),
    // RedisModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: async (config: ConfigService) => ({
    //     type: 'single',
    //     url: config.get<string>('ioredis.url'),
    //     options: config.get<RedisOptions>('ioredis.options'),
    //   }),
    // }),
    RequestContextModule,
    WikiModule.register(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
