import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Patch, Post, Res } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { AddonsService } from "./addons.service"
import { Response } from "express"
import { AddonCreateDto } from "./_dtos/addon.dto"

@ApiTags('addons')
@Controller('addons')
export class AddonsController {
  public constructor(private readonly _service: AddonsService) {
  }

  @Get()
  public async search(@Res() res: Response) {
    return []
  }

  @Post()
  public async create(@Res() res: Response, @Body() body: AddonCreateDto): Promise<Response> {
    return res
      .status(HttpStatus.CREATED)
      .json({
        statusCode: HttpStatus.CREATED,
        data: await this._service.create(body),
      })
  }

  @Get(':_id([0-9a-fA-F]{24})')
  public async read(@Res() res: Response) {
    return {}
  }

  @Patch(':_id([0-9a-fA-F]{24})')
  public async update(@Res() res: Response) {
    return {}
  }

  @Delete(':_id([0-9a-fA-F]{24})')
  public async delete(@Res() res: Response) {
    return {}
  }
}
