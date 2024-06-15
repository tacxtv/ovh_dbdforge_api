import { Controller, Delete, Get, Patch, Post, Res } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { AddonsService } from "./addons.service"
import { Response } from "express"

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
  public async create(@Res() res: Response) {
    return {}
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
