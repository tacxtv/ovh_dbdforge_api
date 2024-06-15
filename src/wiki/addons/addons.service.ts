import { Injectable } from "@nestjs/common"

@Injectable()
export class AddonsService {
  public async create(body: any): Promise<any> {
    return body
  }
}
