import { DynamicModule, Module } from '@nestjs/common'
import { RouterModule } from '@nestjs/core'
import { FilestorageModule } from './filestorage/filestorage.module'
import { CoreController } from './core.controller'
import { CoreService } from './core.service'

@Module({
  imports: [
    FilestorageModule,
  ],
  controllers: [CoreController],
  providers: [CoreService],
})
export class CoreModule {
  public static register(): DynamicModule {
    return {
      module: this,
      imports: [
        RouterModule.register([
          {
            path: 'core',
            children: [...Reflect.getMetadata('imports', this)],
          },
        ])
      ],
    }
  }
}
