import { MongooseModuleOptions } from "@nestjs/mongoose"
import { SwaggerCustomOptions } from "@nestjs/swagger"
import { RedisOptions } from "ioredis"

export interface ConfigInstance {
  application: any
  helmet: any
  mongoose: {
    options: MongooseModuleOptions
  }
  ioredis: {
    url?: string
    options?: RedisOptions
  }
  swagger: {
    path: string
    api: string
    options: SwaggerCustomOptions
  }
}

export default (): ConfigInstance => {
  return {
    application: {
    },
    helmet: {

    },
    mongoose: {
      options: {

      },
    },
    ioredis: {
      url: 'redis://localhost:6379',
      options: {
        keyPrefix: 'dbdforge:',
      },
    },
    swagger: {
      path: '/swagger',
      api: '/swagger/json',
      options: {},
    },
  }
}
