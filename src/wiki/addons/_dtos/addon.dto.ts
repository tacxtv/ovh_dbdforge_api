import { ApiProperty, PartialType } from "@nestjs/swagger"
import { IsArray, IsMongoId, IsOptional, IsString, ValidateNested } from "class-validator"
import { ItemParentsPartDto } from "./_parts/item-parents.part.dto"
import { Type } from "class-transformer"

export class AddonCreateDto {
  @IsString()
  @ApiProperty({ type: String })
  public name: string

  @IsString()
  @ApiProperty({ type: String })
  public description?: string

  @IsString()
  @ApiProperty({ type: String })
  public ratity?: string

  @IsArray()
  @IsOptional()
  @Type(() => ItemParentsPartDto)
  @ValidateNested({ each: true })
  @ApiProperty({ type: [ItemParentsPartDto] })
  public itemParents?: ItemParentsPartDto[]
}

export class AddonDto extends AddonCreateDto {
  @IsMongoId()
  @ApiProperty({ type: String })
  public _id: string
}

export class AddonUpdateDto extends PartialType(AddonCreateDto) {
}
