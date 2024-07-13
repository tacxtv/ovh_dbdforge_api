import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { FilterSchema, FilterSearchOptions, SearchFilterOptions, SearchFilterSchema } from "@the-software-compagny/nestjs_module_restools"
import { Response } from "express"
import { AbstractController } from "~/_common/_abstracts/abstract.controller"
import { PartialProjectionType } from "~/_common/_types/partial-projection.type"
import { CharacterCreateDto, CharacterUpdateDto } from "./_dtos/character.dto"
import { Character } from "./_schemas/character.schema"
import { CharactersService } from "./characters.service"

@ApiTags('characters')
@Controller('characters')
export class CharactersController extends AbstractController {
  private readonly projection: PartialProjectionType<Character> = {
    name: 1,
    slug: 1,
  }

  public constructor(private readonly _service: CharactersService) {
    super()
  }

  @Get()
  public async search(
    @SearchFilterSchema() filters: FilterSchema,
    @SearchFilterOptions() options: FilterSearchOptions,
    @Res() res: Response,
  ) {
    const [data, total] = await this._service.findAndCount(filters, this.projection)

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data,
      total,
    })
  }

  @Post()
  public async create(@Res() res: Response, @Body() body: CharacterCreateDto): Promise<Response> {
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

  @Get(':slug')
  public async readBySlug(@Res() res: Response, @Param('slug') slug: string) {
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: await this._service.findOne({ slug }),
    })
  }

  @Patch(':_id([0-9a-fA-F]{24})')
  public async update(@Res() res: Response, @Param('_id') _id: string, @Body() body: CharacterUpdateDto) {
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
