import { Injectable } from '@nestjs/common'
import { FactorydriveService } from '@the-software-compagny/nestjs_module_factorydrive'
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

  public async deleteFile(path: string): Promise<void> {
    await this.factorydrive.getDisk('s3').delete(path)
  }

  public async moveFile(path: string, target: string): Promise<void> {
    await this.factorydrive.getDisk('s3').move(path, target)
  }

  public async copyFile(path: string, target: string): Promise<void> {
    await this.factorydrive.getDisk('s3').copy(path, target)
  }

  public async listFiles(path: string): Promise<void> {
    await this.factorydrive.getDisk('s3').flatList(path)
  }
}
