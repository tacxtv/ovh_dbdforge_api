import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppClusterService } from '@the-software-compagny/nestjs_module_restools'
import { Logger } from '@nestjs/common'

declare const module: any
AppClusterService.clusterize(async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: new Logger(process.env.npm_package_name),
    cors: true,
  })

  if (process.env.production !== 'production') {
    (await import('./swagger')).default(app)
  }

  await app.listen(4000, () => {
    Logger.log('Server is running on http://localhost:4000')
  })

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose((): Promise<void> => app.close());
  }
}, {
  clusterize: process.env.production === 'production',
})
