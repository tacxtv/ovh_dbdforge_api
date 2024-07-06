import { RedisModule } from '@nestjs-modules/ioredis'
import { BadRequestException, HttpException, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose'
import { RedisOptions } from 'ioredis'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import config from './config'
import { WikiModule } from './wiki/wiki.module'
import { MongooseValidationFilter, RequestContextModule, DtoValidationPipe } from '@the-software-compagny/nestjs_module_restools'
import { APP_FILTER, APP_PIPE } from '@nestjs/core'
import { Error } from 'mongoose'
import { ValidationError } from 'class-validator'
import { FactorydriveModule, FactorydriveService } from '@the-software-compagny/nestjs_module_factorydrive'
import { AwsS3Storage } from '@the-software-compagny/nestjs_module_factorydrive-s3'
import { CoreModule } from './core/core.module';

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
    FactorydriveModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        ...config.get('factorydrive.options'),
      }),
    }),
    RequestContextModule,
    WikiModule.register(),
    CoreModule.register(),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: MongooseValidationFilter([Error.ValidationError, Error.CastError, ValidationError]),
    },
    {
      provide: APP_PIPE,
      useClass: class extends DtoValidationPipe {
        public constructor() {
          super({
            exceptionFactory: (errors) => {
              throw new BadRequestException(this.exceptionHandler(errors))
            },
          })
        }
      },
    },
  ],
})
export class AppModule {
  public constructor(storage: FactorydriveService) {
    storage.registerDriver('s3', AwsS3Storage)
  }
}
