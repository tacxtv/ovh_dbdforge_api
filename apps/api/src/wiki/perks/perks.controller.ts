import { Controller, Delete, Get, Patch, Post } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"

@ApiTags('perks')
@Controller('perks')
export class PerksController {
  @Get()
  public async search() {
    return []
  }

  @Post()
  public async create() {
    return {}
  }

  @Get(':_id')
  public async read() {
    return {}
  }

  @Patch(':_id')
  public async update() {
    return {}
  }

  @Delete(':_id')
  public async delete() {
    return {}
  }
}