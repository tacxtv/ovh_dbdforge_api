import { Logger } from "@nestjs/common"
import { ModuleRef } from "@nestjs/core"


export interface AbstractControllerContext {
  moduleRef?: ModuleRef
}

export abstract class AbstractController {
  protected logger = new Logger(this.constructor.name)

  protected moduleRef?: ModuleRef

  public constructor(context?: AbstractControllerContext) {
    this.moduleRef = context?.moduleRef
  }
}
