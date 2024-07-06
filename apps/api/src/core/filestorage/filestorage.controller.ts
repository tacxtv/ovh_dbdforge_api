import { Body, Controller, Delete, Get, HttpStatus, Param, ParseFilePipe, Patch, Post, Res, UploadedFile } from '@nestjs/common'
import { AbstractController } from '~/_common/_abstracts/abstract.controller'
import { FilestorageService } from './filestorage.service'
import { Response } from 'express'

@Controller('filestorage')
export class FilestorageController extends AbstractController {

  public constructor(private readonly _service: FilestorageService) {
    super()
  }

  @Get()
  public async search(@Res() res: Response) {
    // const [data, total] = await this._service.findAndCount(filters)
    // const data = await this._service.find(filters, this.projection, options)
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      // data,
      // total,
    })
  }

  @Post()
  public async create(
    @Res() res: Response,
    @Body() body: any,
    @UploadedFile(new ParseFilePipe({ fileIsRequired: false })) file?: Express.Multer.File,
  ): Promise<Response> {
    console.log('body', body)
    console.log('file', file)
    return res.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      // data: await this._service.create(body),
    })
  }

  @Get(':_id')
  public async read(@Res() res: Response, @Param('_id') _id: string) {
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      // data: await this._service.findById(_id),
    })
  }

  @Patch(':_id([0-9a-fA-F]{24})')
  public async update(@Res() res: Response, @Param('_id') _id: string, @Body() body: any) {
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      // data: await this._service.update(_id, body),
    })
  }

  @Delete(':_id([0-9a-fA-F]{24})')
  public async delete(@Res() res: Response, @Param('_id') _id: string) {
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      // data: await this._service.delete(_id),
    })
  }
}
