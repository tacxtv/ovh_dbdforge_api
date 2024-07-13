import { Controller, Get, HttpStatus, Res } from "@nestjs/common"
import { Response } from "express"
import { AppService } from "./app.service"

@Controller()
export class AppController {
  public constructor(private readonly _service: AppService) {
  }

  @Get()
  public getInfos(@Res() res: Response) {
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: this._service.getInfos(),
    })
  }
}
