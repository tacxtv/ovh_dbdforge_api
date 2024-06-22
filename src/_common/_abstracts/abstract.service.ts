import { Injectable, Logger } from "@nestjs/common"
import { ModuleRef } from "@nestjs/core"

export interface AbstractServiceContext {
  moduleRef?: ModuleRef
}

@Injectable()
export abstract class AbstractService {
  protected logger = new Logger(this.constructor.name)

  protected moduleRef?: ModuleRef

  public constructor(context?: AbstractServiceContext) {
    this.moduleRef = context?.moduleRef
  }
}
