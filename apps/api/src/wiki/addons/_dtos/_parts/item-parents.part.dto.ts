import { ApiProperty } from "@nestjs/swagger"
import { IsMongoId, IsOptional, IsString } from "class-validator"

export class ItemParentsPartDto {
  @IsString()
  @ApiProperty({ type: String })
  public $ref: string

  @IsMongoId()
  @ApiProperty({ type: String })
  public id: string

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String })
  public name?: string
}
