import { RedisModule } from '@nestjs-modules/ioredis'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose'
import { RedisOptions } from 'ioredis'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import config from './config'
import { WikiModule } from './wiki/wiki.module'
import { RequestContextModule } from '@the-software-compagny/nestjs_module_restools'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('mongoose.url'),
        ...config.get<MongooseModuleOptions>('mongoose.options'),
      }),
    }),
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: 'single',
        url: config.get<string>('ioredis.url'),
        options: config.get<RedisOptions>('ioredis.options'),
      }),
    }),
    RequestContextModule,
    WikiModule.register(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
