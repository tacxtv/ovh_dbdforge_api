import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { Response } from "express"
import { AddonCreateDto, AddonUpdateDto } from "./_dtos/addon.dto"
import { AddonsService } from "./addons.service"
import { AbstractController } from "~/_common/_abstracts/abstract.controller"
import { PartialProjectionType } from "~/_common/_types/partial-projection.type"
import { Addon } from "./_schemas/addon.schema"
import { FilterSchema, FilterSearchOptions, SearchFilterOptions, SearchFilterSchema } from "@the-software-compagny/nestjs_module_restools"

@ApiTags('addons')
@Controller('addons')
export class AddonsController<C = AddonCreateDto, U = AddonUpdateDto> extends AbstractController {
  private readonly projection: PartialProjectionType<Addon> = {
    name: 1,
  }

  public constructor(private readonly _service: AddonsService) {
    super()
  }

  @Get()
  public async search(
    @SearchFilterSchema() filters: FilterSchema,
    @SearchFilterOptions() options: FilterSearchOptions,
    @Res() res: Response,
  ) {
    const [data, total] = await this._service.findAndCount(filters, this.projection)
    // const data = await this._service.find(filters, this.projection, options)
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data,
      total,
    })
  }

  @Post()
  public async create(@Res() res: Response, @Body() body: C): Promise<Response> {
    return res.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      data: await this._service.create(body),
    })
  }

  @Get(':_id([0-9a-fA-F]{24})')
  public async readbyId(@Res() res: Response, @Param('_id') _id: string) {
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: await this._service.findById(_id),
    })
  }

  @Get(':name')
  public async readByName(@Res() res: Response, @Param('name') name: string) {
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: await this._service.findOne({ name }),
    })
  }

  @Patch(':_id([0-9a-fA-F]{24})')
  public async update(@Res() res: Response, @Param('_id') _id: string, @Body() body: U) {
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: await this._service.update(_id, body),
    })
  }

  @Delete(':_id([0-9a-fA-F]{24})')
  public async delete(@Res() res: Response, @Param('_id') _id: string) {
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: await this._service.delete(_id),
    })
  }
}
