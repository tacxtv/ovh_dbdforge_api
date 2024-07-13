import { Injectable } from '@nestjs/common'
import { ContentResponse, FactorydriveService, FileListResponse, StatResponse } from '@the-software-compagny/nestjs_module_factorydrive'
import { AbstractService } from '~/_common/_abstracts/abstract.service'

@Injectable()
export class FilestorageService extends AbstractService {
  public constructor(private readonly factorydrive: FactorydriveService) {
    super()
  }

  public async uploadFile(path: string, file: Express.Multer.File): Promise<string> {
    const res = await this.factorydrive.getDisk('s3').put(path, file.buffer)
    return res.raw as string
  }

  public async getFileStat(path: string): Promise<StatResponse> {
    return await this.factorydrive.getDisk('s3').getStat(path)
  }

  public async getFileStream(path: string): Promise<NodeJS.ReadableStream> {
    return await this.factorydrive.getDisk('s3').getStream(path)
  }

  public async deleteFile(path: string): Promise<void> {
    await this.factorydrive.getDisk('s3').delete(path)
  }

  public async moveFile(path: string, target: string): Promise<void> {
    await this.factorydrive.getDisk('s3').move(path, target)
  }

  public async copyFile(path: string, target: string): Promise<void> {
    await this.factorydrive.getDisk('s3').copy(path, target)
  }

  public async listFiles(path?: string): Promise<[FileListResponse[], number]> {
    let total = 0
    const data = []
    const list = await this.factorydrive.getDisk('s3').flatList(path)

    for await (const item of list) {
      data.push(item)
      total++
    }

    return [data, total]
  }
}
