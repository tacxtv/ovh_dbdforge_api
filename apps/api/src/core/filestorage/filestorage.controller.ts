import { Body, Controller, Delete, Get, HttpStatus, Param, ParseFilePipe, Post, Query, Res, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Response } from 'express'
import { AbstractController } from '~/_common/_abstracts/abstract.controller'
import { FileDto } from './_dtos/file.dto'
import { FilestorageService } from './filestorage.service'

@Controller('filestorage')
export class FilestorageController extends AbstractController {
  public constructor(private readonly _service: FilestorageService) {
    super()
  }

  @Get()
  public async search(@Res() res: Response, @Query('path') path?: string): Promise<Response> {
    const [data, total] = await this._service.listFiles(path)
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data,
      total,
    })
  }

  @Post()
  //TODO: Add ApiBody type multipart/form-data decorator
  @UseInterceptors(FileInterceptor('file'))
  public async create(
    @Res() res: Response,
    @Body() body: FileDto,
    @UploadedFile(new ParseFilePipe({ fileIsRequired: true })) file: Express.Multer.File,
  ): Promise<Response> {
    return res.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      data: await this._service.uploadFile(
        [body.path, body.name || file.originalname].join('/'),
        file,
      ),
    })
  }

  @Get(':path')
  public async read(@Res() res: Response, @Param('path') path: string): Promise<Record<any, any>> {
    try {
      const stat = await this._service.getFileStat(path)
      const stream = await this._service.getFileStream(path)
      res.setHeader('Content-Disposition', `inline; filename=${path}`)
      res.setHeader('Content-Length', stat.size.toString())

      return stream.pipe(res)
    } catch (e) {
      return res.status(HttpStatus.NOT_FOUND).send()
    }
  }

  @Delete(':path')
  public async delete(@Res() res: Response, @Param('path') path: string) {
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: await this._service.deleteFile(path),
    })
  }
}
