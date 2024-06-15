import { MongooseModuleOptions } from "@nestjs/mongoose"
import { SwaggerCustomOptions } from "@nestjs/swagger"
import { HelmetOptions } from "helmet"
import { RedisOptions } from "ioredis"

export interface ConfigInstance {
  application: any
  helmet: HelmetOptions
  mongoose: {
    url?: string
    options: MongooseModuleOptions
  }
  ioredis: {
    url?: string
    options?: RedisOptions
  }
  swagger: {
    path?: string
    api?: string
    options?: SwaggerCustomOptions
  }
}

export default (): ConfigInstance => {
  return {
    application: {
    },
    helmet: {
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          objectSrc: ["'self'"],
          frameSrc: ["'self'"],
          styleSrc: ["'self'"],
          fontSrc: ["'self'"],
          imgSrc: ["'self'"],
          scriptSrc: ["'self'"],
        },
      },
    },
    mongoose: {
      url: process.env['DBDFORGE_MONGOOSE_URL'] || 'mongodb://localhost:27017/dbdforge',
      options: {
        directConnection: true,
      },
    },
    ioredis: {
      url: process.env['DBDFORGE_IOREDIS_URL'] || 'redis://localhost:6379/0',
      options: {
        maxRetriesPerRequest: null,
        showFriendlyErrorStack: true,
        keyPrefix: (process.env['DBDFORGE_IOREDIS_KEYPREFIX'] || 'dbdforge') + ':',
      },
    },
    swagger: {
      path: '/swagger',
      api: '/swagger/json',
      options: {},
    },
  }
}
