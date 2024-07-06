import { MongooseModuleOptions } from "@nestjs/mongoose"
import { SwaggerCustomOptions } from "@nestjs/swagger"
import { StorageManagerConfig } from "@the-software-compagny/nestjs_module_factorydrive"
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
  factorydrive: {
    options: StorageManagerConfig
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
    factorydrive: {
      options: {
        default: 's3',
        disks: {
          s3: {
            driver: 's3',
            config: {
              credentials: {
                accessKeyId: '******',
                secretAccessKey: '******',
              },
              endpoint: 'http://minio:9000/',
              region: 'us-east-1',
              bucket: 'example',
              forcePathStyle: true,
            },
          },
        },
      },
    },
    swagger: {
      path: 'swagger',
      api: '/swagger/json',
      options: {},
    },
  }
}
